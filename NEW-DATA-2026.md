# NEW DATA AND CHANGES — 5/10/2026

This file is a changelog of what was added in the 5/10/2026 refresh. No analysis text was modified — only data sources, an enforcement-layer index, and an ingest script were added.

---

## What changed

### 1. New data source: HHS DOGE Medicaid Provider Spending (released 2026-02-13)

The largest public Medicaid claims aggregation ever released. Built from T-MSIS, aggregated by **billing/servicing provider × HCPCS × month**, covering FFS + managed care + CHIP for **2018–2024**.

- **Size:** 10.32 GB, 227M+ rows
- **Portal:** [opendata.hhs.gov/datasets/medicaid-provider-spending/](https://opendata.hhs.gov/datasets/medicaid-provider-spending/)
- **Coverage:** Total Medicaid program spend ~$849B (federal + state) in 2023, ~90M enrollees

**Why this matters here:** This repo's existing fraud-detection layer (`data/fraud-detection/`) was built from the prior, lower-granularity T-MSIS releases. The new DOGE dataset adds **monthly resolution per provider per HCPCS code**, which is exactly the cut needed to:

- Verify the billed-amount totals in `priority-targets.csv` against the official aggregation
- Detect month-over-month billing ramps for flagged NPIs (a classic up-coding / phantom-billing tell)
- Validate the G0156 / S5170 / T1019 codes that the markup-math proof depends on

A skeleton ingest script is added at:

  `data/fraud-detection/ingest_hhs_doge_provider_spending.py`

### 2. Refreshed: CMS T-MSIS TAF for service years 2023 and 2024

CMS has released the 2023 and 2024 annual T-MSIS Analytic Files. The repo's prior pulls predate these. The 2024 file in particular closes a gap MASTER-SUMMARY flagged: bulk MassHealth claims for hospitals like BMC that were not visible in CTHRU.

- [TAF documentation](https://www.medicaid.gov/medicaid/data-systems/macbis/medicaid-chip-research-files/transformed-medicaid-statistical-information-system-t-msis-analytic-files-taf)

### 3. New folder: `enforcement/`

External enforcement and oversight that corroborates the structural fraud thesis. This is *not* original investigation — it's a curated index of government-issued reports and indictments with pointers back to the entities and patterns the rest of the repo documents.

- `enforcement/README.md` — overview
- `enforcement/2026-MA-INDICTMENTS.md` — Waltham NEMT $770K, home health/lab/physician $7.8M, UHS $15M+, National HCF Takedown 324 defendants / $14.6B
- `enforcement/STATE-AUDITOR-BSI-FY25.md` — DiZoglio's Bureau of Special Investigations FY25 ($11.95M) + Mar 2026 follow-up ($4.4M)
- `enforcement/HHS-OIG-MFCU-FY25.md` — OIG annual MFCU report ($2B recoveries, 1,185 convictions); active OIG focus on EVV data and deceased-beneficiary payments
- `enforcement/DOJ-ROUTING.md` — how to route the fraud package to the **DOJ Health Care Fraud Unit — New England Strike Force** (USAO-MA + FBI + HHS-OIG + MA MFCU) instead of mainline DOJ

### 4. Updated: `MASTER-SUMMARY.md` and `README.md`

- New rows in the Data Sources tables for the items above
- Updated date stamp + DOJ routing pointer in MASTER-SUMMARY
- File manifest updated to reflect the new `enforcement/` folder and the ingest script

---

## What did NOT change

- No edits to `analysis/MARKUP-MATH.md`, `analysis/LEGAL-FRAMEWORK.md`, `analysis/FRAUD-MARKUP-CROSSREF.md`, or `analysis/G0156-CROSS-ENTITY-COMPARISON.md`
- No edits to any `entities/*/` content
- No edits to `data/fraud-detection/Fraud_Detection.xlsx`, `priority-targets.csv`, or `elder-homecare-targets.csv`
- No edits to dashboards
- No edits to transcripts

The original investigation and findings stand as written. This refresh adds context and refreshes data plumbing.

---

## Suggested next steps

1. **Run the ingest.** Download the HHS DOGE dataset (10 GB, instructions in the script) and produce `hhs-doge-ma-providers.parquet` filtered to MA NPIs in the priority list.
2. **Generate trend charts.** With monthly resolution per provider × HCPCS, the markup-proof dashboard can show *how* billing volume evolved — useful for narrative and for any referral package.
3. **Re-route the DOJ package.** The existing fraud spreadsheet went to mainline DOJ (no response). Re-send to the New England Strike Force / USAO-MA Health Care Fraud Unit / HHS-OIG hotline (see `enforcement/DOJ-ROUTING.md`). Log the date and channel in the routing tracker at the bottom of that file.
4. **State-level parallel referral.** File the same package with MA AG Medicaid Fraud Division and State Auditor BSI — these channels have produced FY25 indictments and recoveries.
