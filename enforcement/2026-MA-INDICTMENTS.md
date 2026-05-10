# 2026 MA HEALTHCARE FRAUD INDICTMENTS — CROSSREF

Recent Massachusetts AG indictments and USAO-MA cases that exhibit the same structural patterns this repo documents (single controller, multiple LLCs, MassHealth/Medicaid billing for services not rendered, kickback flows).

These are not allegations made by this repo — they are charges filed by Massachusetts and federal prosecutors. They are listed here because they validate the structural fraud thesis in `analysis/FRAUD-MARKUP-CROSSREF.md`.

---

## 1. Waltham Non-Emergency Medical Transportation — $770K MassHealth fraud

- **Charge:** Money laundering + transportation fraud
- **Allegation:** ~16,000 non-emergency rides billed to MassHealth that were never provided
- **Charging authority:** MA Attorney General
- **Source:** [Mass.gov press release](https://www.mass.gov/news/ags-office-secures-indictments-against-waltham-based-non-emergency-medical-transportation-provider-and-former-owner-over-money-laundering-and-medicaid-fraud-scheme)

**Pattern overlap with this repo:**
- Single owner controlling the billing entity
- High-volume, low-rigor MassHealth billing code
- Ride/visit-based billing where verification is weak — same incentive structure as G0156 home-health-aide billing in `MARKUP-MATH.md`

---

## 2. Home Health Agencies + Lab + Physician — $7.8M MassHealth kickback ring

- **Charge:** Medicaid False Claims, Larceny over $1,200, Medicaid Kickbacks
- **Allegation:** Billing for services not rendered, false drug-test claims, false home-health claims, kickbacks, money laundering
- **Charging authority:** MA Attorney General
- **Source:** [Mass.gov press release](https://www.mass.gov/news/home-health-agencies-laboratory-and-physician-indicted-for-masshealth-fraud-and-kickback-schemes-involving-over-78-million-in-false-claims)

**Pattern overlap with this repo:**
- Home-health-agency + lab + physician triad, exactly the kind of multi-entity stack flagged in `priority-targets.csv` rows where one address hosts 5–23 entities (e.g. 140 High St Springfield, 599 Canal St Lawrence, 360 Merrimack St Lawrence)
- Kickback flows between linked entities — the same structural risk in the ASAP → for-profit-LLC pass-through model

---

## 3. National Health Care Fraud Takedown — 324 defendants / $14.6B alleged

- **Charging authority:** DOJ + 50 federal districts including USAO-MA
- **Massachusetts participation:** MA Medicaid Fraud Control Unit (MFCU) participated in investigations
- **Source:** [DOJ Office of Public Affairs](https://www.justice.gov/opa/pr/national-health-care-fraud-takedown-results-324-defendants-charged-connection-over-146)

**Why this matters:** establishes that the MA MFCU is actively pursuing criminal Medicaid-fraud cases — not just the State Auditor's civil-recovery BSI track. A criminal referral via MFCU has different pressure than a civil referral.

---

## 4. Universal Health Services — $15M+ Massachusetts whistleblower settlement

- **Resolution:** False Claims Act settlement
- **Charging authority:** MA AG (joined federal qui tam)
- **Source:** [Mass.gov press release](https://www.mass.gov/news/universal-health-services-to-pay-massachusetts-more-than-15-million-to-resolve-whistleblower-false-claims-cases)

**Pattern overlap:** behavioral-health provider settling whistleblower-driven False Claims Act cases — relevant model for any whistleblower path the entity-level work in this repo might support.

---

## How to file your own complaint

- **MA AG Medicaid Fraud Division:** [mass.gov filing form](https://www.mass.gov/how-to/file-a-medicaid-fraud-complaint)
- **State Auditor BSI:** see `STATE-AUDITOR-BSI-FY25.md` for the FY25 intake channel
- **Federal (USAO-MA / DOJ Strike Force):** see `DOJ-ROUTING.md`
