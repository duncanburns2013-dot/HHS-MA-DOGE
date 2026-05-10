# DOJ ROUTING — NEW ENGLAND STRIKE FORCE

If you've sent a fraud package to the main Department of Justice and not heard back, the more responsive channel for a Massachusetts-focused MassHealth/Medicaid fraud referral is the **Health Care Fraud Unit's New England Strike Force**, which DOJ explicitly stood up in 2024 to target healthcare fraud in Massachusetts.

---

## The unit

- **Name:** Health Care Fraud Unit — New England Strike Force
- **DOJ branch:** Criminal Division, Fraud Section, Health Care Fraud Unit
- **Lead:** Assistant Chief Kevin Lowell
- **Coordination:** USAO-MA Health Care Fraud Unit + FBI + HHS-OIG + FDA + MA Medicaid Fraud Control Unit (state AG)
- **Announcement:** [DOJ press release](https://www.justice.gov/opa/pr/justice-department-expands-health-care-fraud-unit-target-health-care-fraud-massachusetts)

## Why this is the right door

1. **Mandate is geographically targeted.** Mainline DOJ Fraud Section receives fraud referrals from all 50 states and triages by perceived fit. The Strike Force has explicit MA jurisdiction and MA prosecutors.
2. **Already wired into the MA MFCU.** The state-level Medicaid Fraud Division (the same office that brought the indictments in `2026-MA-INDICTMENTS.md`) is a partner — a Strike Force referral lands in the same pipeline that produces actual MassHealth indictments.
3. **HHS-OIG sits at the table.** The provider-level T-MSIS data this repo relies on is HHS data; OIG investigators are the natural counterparty for an analytic case.
4. **Faster intake than mainline DOJ.** Strike Forces operate on a takedown cadence (the National Takedown of 324 defendants / $14.6B is the marquee output) and need a constant feed of referrals.

## How to refer

**Federal channels (recommended for the fraud spreadsheet sent to mainline DOJ):**

1. **USAO-MA Health Care Fraud Unit** — file via the District of Massachusetts intake (justice.gov/usao-ma). Reference the New England Strike Force in the cover letter and ask the duty AUSA to route accordingly.
2. **HHS-OIG hotline** — [oig.hhs.gov/fraud/report-fraud](https://oig.hhs.gov/fraud/report-fraud). Specify MA and MassHealth. OIG investigators sit on the Strike Force.
3. **FBI tip line** — tips.fbi.gov, healthcare-fraud category, MA jurisdiction.

**State channel (parallel, not substitute):**

- **MA AG Medicaid Fraud Division:** [mass.gov/attorney-generals-medicaid-fraud-division](https://www.mass.gov/attorney-generals-medicaid-fraud-division)
- **MA AG complaint form:** [mass.gov/how-to/file-a-medicaid-fraud-complaint](https://www.mass.gov/how-to/file-a-medicaid-fraud-complaint)
- **State Auditor BSI:** see `STATE-AUDITOR-BSI-FY25.md`

## What to include in the package

The repo's existing structure is well-suited:

- **`data/fraud-detection/priority-targets.csv`** — entity / address / controller / billed-amount table
- **`data/fraud-detection/Fraud_Detection.xlsx`** — the original spreadsheet
- **`analysis/FRAUD-MARKUP-CROSSREF.md`** — the structural theory tying markup to fraud
- **`analysis/MARKUP-MATH.md`** — the dollar arithmetic
- **`analysis/LEGAL-FRAMEWORK.md`** — the statutory structure
- **`entities/*/`** — per-entity packages with OCPF + lobbying + 990

Strike Force investigators want: NPIs, addresses, dollar amounts, the specific scheme allegation, the data source, and any direct evidence (whistleblower statements, internal documents). The repo already has the first four.

## Tracking outcomes

If you do refer, log the date and channel here so future updates can track response time:

| Date | Channel | Reference # | Status |
|------|---------|-------------|--------|
| YYYY-MM-DD | Mainline DOJ (initial spreadsheet) | n/a | No response as of 2026-05-10 |
|  |  |  |  |
