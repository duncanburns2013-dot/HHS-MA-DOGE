# SFI CROSSREF — Massachusetts Statements of Financial Interest (LOCKED v1)

29,729 redacted MA Statement-of-Financial-Interest filings (2019–2025, every legislator, judge, agency head, board member, and designated public employee) were obtained as a bulk release in 2026 and cross-referenced against this repo's flagged-entity data.

Full corpus, extraction pipeline, locked findings doc, and the live searchable UI live at: [`duncanburns2013-dot/The-Peoples-Audit`](https://github.com/duncanburns2013-dot/The-Peoples-Audit). The locked headline findings document is [`findings/FINDINGS-SFI-LOCKED.md`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/findings/FINDINGS-SFI-LOCKED.md).

This document records only the matches that come back to data already in this repo.

> **What changed from earlier v0 drafts of this doc:** Independent verification (per-PDF re-read, public-records identity check, PCA program docs, NPPES, ProPublica 990) corrected three errors: (1) count is **8 officials, not nine** (off-by-one); (2) the spouses are **PCA workers paid through Tempus as Fiscal Intermediary**, not Tempus corporate employees — the MassHealth member is the legal employer of record; (3) the $6.62B figure is **cumulative 2018–2024 PCA-program pass-through**, a structural artifact of Tempus being the sole statewide PCA FI by program design, not Tempus net revenue.

---

## 1. PCA program household-income pattern — 8 state officials

**Tempus Unlimited, Inc.** sits at **rank 1** in [`fraud_flags_summary.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_summary.csv): **$6,620,437,058.40 cumulative Medicaid pass-through 2018–2024** across 7 NPIs (10 per NPPES) all registered to **600 Technology Center Dr, Stoughton, MA 02072**, all authorized by **LARRY SPENCER, CEO**.

Tempus is the **sole statewide MassHealth Personal Care Attendant (PCA) Fiscal Intermediary**. The MassHealth program structurally routes every PCA paycheck through this one entity; the MassHealth member (the "consumer") is the legal employer of record and Tempus issues the W-2 on their behalf. Tempus FY2024 financials (ProPublica 990, EIN 04-2239746): revenue $2.13B, expenses $2.12B, net surplus $2.57M, Spencer compensation $441,995.

Word-boundary substring scan of every SFI filing's Q7 section (*Spouse Business Employment*) found **eight MA public officials** who disclosed that a spouse or household dependent was paid through Tempus, totaling **28 individual disclosures** across 2019–2025. **Each of the 28 disclosures was independently re-verified by live PDF re-read** ([verification log](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/verify/tempus_verified.md)).

| Filer | Verified position | Years disclosed |
|---|---|---:|
| **Hon. James G. Reardon Jr.** | Associate Justice, MA Superior Court (Worcester County Presiding Justice) | 2019 · 2020 · 2021 · 2022 · 2023 · 2024 · 2025 |
| **James A. Barrett** | Deputy Commissioner of Depository Institutions Supervision, MA Division of Banks (most-likely identity match) | 2019 · 2020 · 2021 · 2022 · 2023 · 2024 |
| **Ralph V. Sacramone** | Executive Director, MA Alcoholic Beverages Control Commission | 2021 · 2022 · 2023 · 2024 · 2025 |
| **Rep. John J. Marsi Jr. (R)** | MA House, 6th Worcester District (special-elected March 2024) | 2023 · 2024 · 2025 |
| **Jeffrey T. Travers** | Deputy CIO, MA Trial Court (soft-confirm) | 2023 · 2024 · 2025 |
| **Matthew P. Rinella** | Director, Accounting & Financial Reporting, MassDOT | 2019 · 2020 |
| **Dr. Carmen Z. Gomez, PhD** | Deputy Commissioner of Pretrial Services, MA Probation Service (Trial Court) | 2022 |
| **Teri Williams Valentine** | Former Director, Special Ed Planning & Policy, MA DESE; now Sr. Program Associate, WestEd | 2019 |

**These are the officials' own disclosures, filed under penalty of perjury with the MA State Ethics Commission. They are lawful disclosures and no wrongdoing by any named official is alleged.**

What this is, structurally:

- A meaningful cohort of MA public officials — across the Judiciary, the House, MassDOT, DESE, Probation, the Treasury (via ABCC), and a state banking regulator — have household income that depends on the continued funding of the MassHealth PCA program (~$1.75B in FY2024, the most rapidly-growing line in the MassHealth budget).
- The persistence (Reardon for 7 consecutive years, Barrett for 6, Sacramone for 5) shows this is stable, ongoing household-income exposure.
- The officials' professional duties touching MassHealth oversight, the ABCC's regulatory role, judicial proceedings involving the program, or budget appropriations are appropriate subjects of public-records review for whether recusal occurred.

### 1a. "FBO" construction (Rinella) and the family-PCA prohibition

Matthew Rinella's 2019 + 2020 Q7 disclosures literally read **"TEMPUS UNLIMITED, INC., FBO MELISSA RAFFERTY"** — i.e., his spouse is a Personal Care Attendant *For Benefit Of* MassHealth recipient Melissa Rafferty.

Per 130 CMR 422.402 and PCA-15 bulletin, a **spouse** of the MassHealth consumer **cannot** be paid as that consumer's PCA. Therefore Melissa Rafferty is necessarily **not** Rinella's spouse — she is a third-party MassHealth recipient (likely a non-spouse relative whose personal care is provided by Rinella's spouse and billed through Tempus as Fiscal Intermediary). Adult children, parents of adult children, and in-laws are explicitly allowed as paid PCAs under the regulation.

### 1b. "Cerebral Palsy of Massachusetts" is Tempus's pre-2017 legal name

Reardon's 2024 Q7 also lists "Cerebral Palsy of Massachusetts" at the same building. Public-records research (BBB Boston, ProPublica 990, MassDevelopment 2014 bond announcement, the April 2017 rename announcement signed by Larry Spencer) confirms this is **the same nonprofit** under its legacy pre-2017 name: same EIN 04-2239746, same address, same CEO. The Board approved the name change Dec 2016 and announced April 10, 2017. The SFI's free-text employer field carried the legacy name forward in one row.

---

## 2. Real-estate disclosure overlap — Karyn E. Polito (former Lt. Gov.) at 370 Main St, Worcester

Polito's 2019 SFI Q17 (Real Estate Transferred) discloses her family-controlled LLCs at 370 Main Street, Worcester, MA 01608:

- **Cobblestone Properties, LLC** — 370 Main Street, Worcester
- **Uxbridge Farms, LLC** — 370 Main Street, 11th Floor, Worcester

[`fraud_flags_shared_addresses.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_shared_addresses.csv) lists 370 Main St Worcester as a Medicaid-billing address with authorized official AUGUSTUS SEALY at $1.03M cumulative spending. Whether Sealy's Medicaid-billing entity is or was a **tenant** of Polito's family LLCs at that building is the unanswered question. The records-research follow-up is a Worcester city assessor query + Cobblestone Properties LLC tenant roster.

This is the only Pass-3-derived hit that survived per-row verification (see methodology section for the downgrade explanation).

---

## 3. Filer-name vs. DOGE-authorized-official candidates (RESEARCH LEADS, NOT VERIFIED)

65 (filer, year) candidate name matches in [`pass1_filer_vs_doge_official_grouped.csv`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/crossref/pass1_filer_vs_doge_official_grouped.csv). The lowest-name-commonness candidates (Smith, Brian C — `name_commonness=1`; Archer, Damian — `name_commonness=2`) were checked by public-records identity search:

- **Smith, Brian C** — no public record ties any MA-state SFI-required position to the Mount Auburn / UMass Memorial Medicaid-NPI authorized-official "Brian Smith." Different-person assumption holds.
- **Archer, Damian** — Dr. Damian K.L. Archer became CEO of Outer Cape Health Services in Dec 2023. The `damian.archer@mass.gov` SFI account's link to him is plausible (possible board appointment) but **not directly evidenced** by any public state staff page.

These are research leads, not headline findings.

---

## 4. Pass 3 (real-estate-address overlap) — DOWNGRADED

The original Pass-3 finding (60 address overlaps between SFI real-estate sections and DOGE-flagged addresses) was demoted from headline status because per-row spot-checks (Patricia M. Harris, Peter W. Sacks) revealed the Q-section splitter occasionally misattributes Q7 (spouse business employment) text into Q13/Q17 (real estate). Several "real-estate overlap" hits were actually "spouse works at hospital with many NPIs at one address" — a normal hospital structure, not a real-estate finding.

The Polito entry (above) survived per-row verification and is published as the only headline-grade Pass-3-derived finding. The full candidate file remains available as a research-lead dataset; treat each row as requiring per-PDF section-attribution check before citing.

---

## Methodology

All three passes are implemented in [`The-Peoples-Audit/audit-scripts/sfi/04_crossref.py`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/audit-scripts/sfi/04_crossref.py); the Tempus re-verification is in [`09_verify_tempus.py`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/audit-scripts/sfi/09_verify_tempus.py).

- **Pass 1.** Normalize both sides to "LASTNAME, FIRSTINITIALONLY," intersect. Candidate matches only; manual identity verification required.
- **Pass 2.** Word-boundary substring scan of all DOGE entity names against each SFI filing's per-question section text. The Tempus hits were independently re-verified by live PDF re-read; verification log at [`tempus_verified.md`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/verify/tempus_verified.md).
- **Pass 3.** Build `(street_number, normalized_street_name, ZIP5)` keys from `fraud_flags_shared_addresses.csv`; regex-extract address-shaped strings from SFI real-estate sections (Q13–Q20); intersect. Per-row spot-check is required before publication because the Q-section splitter has known misattribution risk on filings where Q7 spans into the real-estate section's page range.

Pass 2 is the highest-confidence pass because the matches are the officials' **own attested disclosures** of the named entity, independently re-verified by PDF re-read. Pass 1 and Pass 3 candidates require manual verification before any individual claim.

## Notification

Per G.L. c. 268B, the MA State Ethics Commission notifies every individual whose SFI is released in a public-records request. All filers whose disclosures are quoted in this document were notified by the Commission's release process.
