"""
Ingest the HHS DOGE Medicaid Provider Spending dataset (released 2026-02-13)
and filter to Massachusetts NPIs for cross-reference against priority-targets.csv.

Source dataset:
    https://opendata.hhs.gov/datasets/medicaid-provider-spending/
    ~10.32 GB, 227M+ rows
    Provider-level T-MSIS spending aggregated by:
        billing/servicing provider (NPI)
        HCPCS code
        month
    Coverage: FFS + managed care + CHIP, 2018 - 2024

Why this matters for HHS-MA-DOGE:
    The original repo built priority-targets.csv from CMS T-MSIS at the
    historical aggregate level. The Feb 2026 DOGE release exposes
    provider-level granularity for the first time, which lets us:

      1. Verify the billing volumes already in priority-targets.csv against
         the official aggregated data.
      2. Add monthly trend lines for each flagged NPI (sudden ramps are a
         classic up-coding / phantom-billing signal).
      3. Pull in HCPCS-level breakdowns to validate the G0156 / S5170 /
         T1019 codes that the markup analysis turns on.

Usage:
    # 1. Download the dataset (one-time, ~10 GB):
    python ingest_hhs_doge_provider_spending.py --download

    # 2. Filter to MA NPIs and join against priority-targets.csv:
    python ingest_hhs_doge_provider_spending.py --filter-ma

    # 3. Produce per-target monthly billing trends:
    python ingest_hhs_doge_provider_spending.py --trends

Outputs:
    data/fraud-detection/hhs-doge-ma-providers.parquet
    data/fraud-detection/hhs-doge-target-trends.csv

Requires:
    pandas, pyarrow, requests, tqdm
    (Optional) duckdb for out-of-core querying without loading all 10 GB
"""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

DATASET_PAGE = "https://opendata.hhs.gov/datasets/medicaid-provider-spending/"
HEALTHDATA_SEARCH = "https://healthdata.gov/dataset/?q=Medicaid+Provider+Spending"

REPO_ROOT = Path(__file__).resolve().parents[2]
FRAUD_DIR = REPO_ROOT / "data" / "fraud-detection"
RAW_FILE = FRAUD_DIR / "hhs-doge-provider-spending.csv.gz"
MA_PARQUET = FRAUD_DIR / "hhs-doge-ma-providers.parquet"
TRENDS_CSV = FRAUD_DIR / "hhs-doge-target-trends.csv"
PRIORITY_TARGETS = FRAUD_DIR / "priority-targets.csv"


def download() -> None:
    """Stream the dataset from opendata.hhs.gov.

    The HHS portal does not publish a stable direct CSV URL - the file lives
    behind a Socrata/CKAN-style export endpoint that occasionally rotates.
    Resolve the current download link from the dataset page rather than
    hardcoding a URL that will rot.
    """
    print(f"Open the dataset page and copy the current export URL:\n  {DATASET_PAGE}")
    print(f"Or search healthdata.gov for the canonical mirror:\n  {HEALTHDATA_SEARCH}")
    print(f"Save to: {RAW_FILE}")
    print("File is ~10 GB - use a download manager that supports resume.")


def filter_ma() -> None:
    """Filter the national dataset down to MA-state NPIs.

    Strategy: stream the CSV in chunks via pandas, keep rows where state == 'MA'
    and where NPI appears in either priority-targets.csv (controller NPIs) or
    elder-homecare-targets.csv. Write to parquet for fast re-querying.
    """
    try:
        import pandas as pd
    except ImportError:
        sys.exit("pip install pandas pyarrow")

    if not RAW_FILE.exists():
        sys.exit(f"Dataset not found at {RAW_FILE}. Run --download first.")

    target_npis = _load_target_npis()
    print(f"Loaded {len(target_npis)} target NPIs from priority-targets.csv")

    chunks = []
    reader = pd.read_csv(RAW_FILE, chunksize=500_000, dtype={"npi": str})
    for i, chunk in enumerate(reader):
        ma = chunk[chunk["state"] == "MA"]
        if target_npis:
            ma = ma[ma["npi"].isin(target_npis)] if "npi" in ma.columns else ma
        chunks.append(ma)
        if i % 10 == 0:
            print(f"chunk {i}: {len(ma):,} MA rows kept (running total {sum(len(c) for c in chunks):,})")

    df = pd.concat(chunks, ignore_index=True)
    df.to_parquet(MA_PARQUET, index=False)
    print(f"Wrote {len(df):,} rows to {MA_PARQUET}")


def trends() -> None:
    """For each priority-target NPI, emit monthly billing trend rows."""
    try:
        import pandas as pd
    except ImportError:
        sys.exit("pip install pandas pyarrow")

    if not MA_PARQUET.exists():
        sys.exit(f"Filtered MA file not found at {MA_PARQUET}. Run --filter-ma first.")

    df = pd.read_parquet(MA_PARQUET)
    grouped = (
        df.groupby(["npi", "provider_name", "hcpcs_code", "month"], dropna=False)
        ["total_paid_amt"]
        .sum()
        .reset_index()
        .sort_values(["npi", "hcpcs_code", "month"])
    )
    grouped.to_csv(TRENDS_CSV, index=False)
    print(f"Wrote {len(grouped):,} trend rows to {TRENDS_CSV}")


def _load_target_npis() -> set[str]:
    """Pull NPIs out of why_flagged column, e.g. '... 222949564 ...'.

    The current priority-targets.csv embeds the controller's primary NPI in
    the why_flagged free-text field. Extract any 10-digit number that looks
    like an NPI.
    """
    import re

    if not PRIORITY_TARGETS.exists():
        return set()

    npis: set[str] = set()
    npi_pattern = re.compile(r"\b(\d{9,10})\b")
    with PRIORITY_TARGETS.open(newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            for field in ("why_flagged", "all_entities"):
                for m in npi_pattern.findall(row.get(field, "") or ""):
                    npis.add(m)
    return npis


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--download", action="store_true", help="Print download instructions for the 10 GB dataset")
    parser.add_argument("--filter-ma", action="store_true", help="Filter to MA NPIs and save parquet")
    parser.add_argument("--trends", action="store_true", help="Produce per-target monthly trend CSV")
    args = parser.parse_args()

    if args.download:
        download()
    if args.filter_ma:
        filter_ma()
    if args.trends:
        trends()
    if not (args.download or args.filter_ma or args.trends):
        parser.print_help()


if __name__ == "__main__":
    main()
