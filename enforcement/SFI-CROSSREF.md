# SFI CROSSREF — Massachusetts Statements of Financial Interest

29,729 redacted MA Statement-of-Financial-Interest filings (2019–2025, every legislator, judge, agency head, board member, and designated public employee) were obtained as a bulk release in 2026 and cross-referenced against this repo's flagged-entity data.

Full corpus, extraction pipeline, and the live searchable UI live at: [`duncanburns2013-dot/The-Peoples-Audit`](https://github.com/duncanburns2013-dot/The-Peoples-Audit).

This document records only the matches that come back to data already in this repo.

---

## 1. Tempus Unlimited — 9 state officials with disclosed spousal employment

**Tempus Unlimited, Inc.** sits at **rank 1** in [`fraud_flags_summary.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_summary.csv): **$6.62B total Medicaid spending** across 7 NPIs all registered to **600 Technology Center Dr, Stoughton, MA 02072** — the highest single-address concentration in the MA dataset. The single authorized official across all 7 NPIs at that address is **LARRY SPENCER, CEO**.

Word-boundary substring scan of every SFI filing's Q7 section (*Spouse Business Employment*) found nine MA public officials, across all three branches of state government, who themselves disclosed that their spouse was employed by Tempus Unlimited. Disclosures verified by direct PDF read.

| Filer | Branch / agency (from work email) | Years disclosed |
|---|---|---:|
| Reardon, James G | Judiciary (`jud.state.ma.us`) | 2019 · 2020 · 2021 · 2022 · 2023 · 2024 · 2025 |
| Barrett, James A | Executive (`mass.gov`) | 2019 · 2020 · 2021 · 2022 · 2023 · 2024 |
| Sacramone, Ralph V | Treasury (`tre.state.ma.us`) | 2021 · 2022 · 2023 · 2024 · 2025 |
| Marsi Jr, John J | House (`mahouse.gov`) | 2023 · 2024 · 2025 |
| Travers, Jeffrey T | Executive (`mass.gov`) | 2023 · 2024 |
| Rinella, Matthew P | MassDOT (`dot.state.ma.us`) | 2019 · 2020 |
| Gomez, Carmen Z | Judiciary (`jud.state.ma.us`) | 2022 |
| Valentine, Teri W | DOE (`doe.mass.edu`) | 2019 |

**These are the officials' own disclosures, filed under penalty of perjury with the MA State Ethics Commission. They are lawful disclosures and no wrongdoing by the named officials is alleged.** What they do establish:

1. Tempus Unlimited's payroll reaches into the House, the Judiciary, the Treasury, MassDOT, the Department of Education, and the executive branch. The persistence (Reardon every year for seven years; Barrett six straight; Sacramone five straight) is not transient.
2. The state officials' professional duties relevant to MassHealth, transportation, education, or judicial oversight should be cross-checked against whether they recused themselves from matters touching Tempus.

### 1a. "Cerebral Palsy of Massachusetts" is Tempus's pre-2017 legal name

Reardon's 2024 Q7 also lists his spouse as an independent contractor for **"Cerebral Palsy of Massachusetts"** at the same building. Public-records research (BBB Boston profile, ProPublica Nonprofit Explorer, CauseIQ, MassDevelopment 2014 bond announcement, the company's own history timeline, April 2017 rename announcement signed by CEO Larry Spencer) confirms this is **the same nonprofit, listed under its legacy pre-rename name**:

- **Same EIN: 04-2239746**
- **Same MA principal office: 600 Technology Center Drive, Stoughton, MA 02072**
- **Same incorporation date: June 20, 1952**
- **Same CEO across the rename: Larry Spencer** (FY2024 990 compensation $441,995)
- **Board approved name change Dec 2016, publicly announced April 10, 2017**

Tempus is the **sole statewide MassHealth PCA Fiscal Intermediary**, FY2024 revenue ~$2.13B per ProPublica 990 (which contextualizes the $6.62B accumulated address-billing concentration in `fraud_flags_summary.csv`).

So Reardon's 2024 SFI lists the same employer twice — once under the post-2017 name (Tempus Unlimited) and once under the pre-2017 name (Cerebral Palsy of Massachusetts). This is **not** a separate affiliated entity. It does mean the SFI spouse-employer field carries some legacy-name inconsistency that affects any text-only name-match approach.

Sources: ProPublica Nonprofit Explorer (EIN 042239746), BBB Boston (Tempus Unlimited Inc., alternate names "Cerebral Palsy of Massachusetts" / "Cerebral Palsy Of Ma"), MassDevelopment 2014 press release re: 600 Technology Center Drive acquisition, [masscp.org](https://www.masscp.org/fiscal-intermediary/report-abuse-fraud-andor-suspicious-activity) (legacy domain still hosts Tempus content), April 2017 rename announcement at [facebook.com/MASSCP](https://www.facebook.com/MASSCP/posts/1640418735988146/) signed by Larry Spencer.

---

## 2. Real-estate-ownership overlap with flagged Medicaid-billing addresses

60 (filer-year, DOGE-flagged-address) matches where the SFI filer disclosed owning, holding in trust, or transferring real estate at the **same street number + street name + ZIP5** as a Medicaid-billing entity from [`fraud_flags_shared_addresses.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_shared_addresses.csv).

Full table: [`The-Peoples-Audit/data/sfi/crossref/pass3_sfi_addr_in_doge.csv`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/crossref/pass3_sfi_addr_in_doge.csv).

Highest-spending intersections (by total flagged spending at the shared address):

| SFI filer | Year | SFI section | Address | DOGE entity / official | Spend at address |
|---|---:|:--:|---|---|---:|
| Harris, Patricia M (`sec.state.ma.us`) | 2019, 2020 | Q13 own real estate | 725 North Street, Pittsfield, MA 01201 | ERIC KORENMAN ($168.7M, 28 NPIs at addr) | $168,691,902 |
| Correira, Kelley J (`doc.state.ma.us`) | 2019 | Q14 spouse real estate | 88 Plain Street, Taunton, MA 02780 | JOHN CORNWELL ($42M, 13 NPIs at addr) | $42,200,481 |
| Rockwell, David P (MHP) | 2019 | Q15 own-trust real estate | 2014 Washington Street, Newton, MA 02462 | EDGAR CASADO ($40M, 20 NPIs at addr) | $40,197,297 |
| Sacks, Peter W (`jud.state.ma.us`) | 2019 | Q17 transfer | 243 Charles St, Boston, MA 02114 | CHRISTOPHER HARTNICK ($76.2M, 38 NPIs at addr) | $76,215,549 |
| Polito, Karyn E (former Lt. Gov, `state.ma.us`) | 2019 | Q17 transfer | 370 Main Street, Worcester, MA 01608 | AUGUSTUS SEALY ($1M) | $1,031,532 |

Caveats: same street-number+name+ZIP5 does not guarantee the same building (mixed-use addresses exist). Each row is a research lead, not a conclusion.

---

## 3. Filer-name vs. DOGE-authorized-official (lower confidence)

65 (filer, year) candidate matches where the SFI filer's normalized "LASTNAME, FIRSTNAME" exactly matches a DOGE [`fraud_flags_shared_officials.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_shared_officials.csv) authorized-official name.

**Most of these are NOT the same person.** The candidate file includes a `name_commonness_in_sfi` column (count of SFI filers sharing the same Last,FirstInitial). For meaningful follow-up, filter to rows where `name_commonness ≤ 2` and **manually compare middle initials, agency, and any available employment history** before treating any individual row as a real match.

Full candidate file: [`The-Peoples-Audit/data/sfi/crossref/pass1_filer_vs_doge_official_grouped.csv`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/crossref/pass1_filer_vs_doge_official_grouped.csv).

Lowest-name-commonness candidates (most likely to be real same-person matches):

| Filer (SFI) | name_commonness | Putative DOGE org(s) | DOGE spending |
|---|:-:|---|---:|
| Smith, Brian C | **1** | Mount Auburn Hospital / UMass Memorial Medical Ctr / Sleep Medicine Services of W MA | $31.6M |
| Archer, Damian (`mass.gov`) | 2 | Outer Cape Health Services Inc (Harwich Port / Provincetown / Wellfleet) | $15.8M |

These are starting points for verification only.

---

## Methodology

All three passes implemented in [`The-Peoples-Audit/audit-scripts/sfi/04_crossref.py`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/audit-scripts/sfi/04_crossref.py).

- **Pass 1.** Normalize both sides to "LASTNAME, FIRSTINITIALONLY," intersect.
- **Pass 2.** Word-boundary substring scan of all DOGE entity names against each SFI filing's per-question section text. Only Q7 (spouse business employment) yielded headline hits; all Tempus Unlimited matches collapse to a single legal entity that pre-2017 went by "Cerebral Palsy of Massachusetts."
- **Pass 3.** Build `(street_number, normalized_street_name, ZIP5)` keys from `fraud_flags_shared_addresses.csv`; regex-extract address-shaped strings from SFI real-estate sections (Q13–Q20); intersect.

Pass 2 is the highest-confidence pass because the matches are the officials' **own attested disclosures** of the named entity. Pass 1 and Pass 3 are lower-confidence and require manual verification before any individual claim.
