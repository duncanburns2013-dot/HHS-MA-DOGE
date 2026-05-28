# SFI CROSSREF — Massachusetts Statements of Financial Interest

29,729 redacted MA Statement-of-Financial-Interest filings 2019–2025 (bulk release from the MA State Ethics Commission) were cross-referenced against this repository's flagged-entity data. This document records only the matches that come back to data already in this repository, with each claim sourced.

Full corpus and pipeline: [`duncanburns2013-dot/The-Peoples-Audit`](https://github.com/duncanburns2013-dot/The-Peoples-Audit).

> **Disambiguation.** "Tempus Unlimited, Inc." below refers exclusively to the MA disability-services nonprofit at 600 Technology Center Drive, Stoughton, MA 02072 (EIN 04-2239746, 501(c)(3) since 1959; former legal name "Cerebral Palsy of Massachusetts, Inc." until April 2017). It is **not** Tempus AI (NASDAQ: TEM), the Chicago-based health-tech / oncology data company. Different entity.

> **What this document is.** A list of verified factual cross-references between SFI disclosures and this repository's existing flagged-address / authorized-official data, each sourced to a primary record.

> **What this document is not.** It is not an accusation, inference, or finding of wrongdoing. The SFI disclosures cited are the filers' own filings under penalty of perjury, made in compliance with G.L. c. 268B.

---

## 1. SFI Q7 ↔ Tempus Unlimited (28 disclosures across 8 filers, all re-verified)

Word-boundary substring scan of every SFI filing's Q7 ("Spouse Business Employment") section for the text "Tempus" returned 28 hits across 8 unique filers spanning 2019–2025. Every hit was independently re-verified by live PDF text re-extraction: [`tempus_verified.md`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/verify/tempus_verified.md).

| Filer (verified identity) | Years SFI Q7 names Tempus |
|---|---|
| Hon. James G. Reardon Jr., Associate Justice, MA Superior Court — Worcester County Presiding Justice | 2019 · 2020 · 2021 · 2022 · 2023 · 2024 · 2025 |
| James A. Barrett, Deputy Commissioner of Depository Institutions Supervision, MA Division of Banks | 2019 · 2020 · 2021 · 2022 · 2023 · 2024 |
| Ralph V. Sacramone, Executive Director, MA Alcoholic Beverages Control Commission | 2021 · 2022 · 2023 · 2024 · 2025 |
| Rep. John J. Marsi Jr. (R), MA House — 6th Worcester District | 2023 · 2024 · 2025 |
| Jeffrey T. Travers, Deputy CIO, MA Trial Court (soft-confirm) | 2023 · 2024 · 2025 |
| Matthew P. Rinella, Director, Accounting & Financial Reporting, MassDOT | 2019 · 2020 |
| Dr. Carmen Z. Gomez, PhD, Deputy Commissioner of Pretrial Services, MA Probation Service | 2022 |
| Teri Williams Valentine, former Director Special Ed Planning & Policy, MA DESE | 2019 |

Identity sources are cited per-filer in [`The-Peoples-Audit/findings/FINDINGS-SFI-LOCKED.md`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/findings/FINDINGS-SFI-LOCKED.md).

### Tempus Unlimited — sourced facts

| Fact | Value | Source |
|---|---|---|
| Sole statewide MassHealth PCA Fiscal Intermediary | yes | [mass.gov PCA FI page](https://www.mass.gov/info-details/masshealth-personal-care-attendant-pca-fiscal-intermediary-tempus) |
| EIN | 04-2239746 | [ProPublica Nonprofit Explorer](https://projects.propublica.org/nonprofits/organizations/42239746) |
| Principal office | 600 Technology Center Drive, Stoughton, MA 02072 | [tempusunlimited.org](https://tempusunlimited.org/) + ProPublica |
| Former legal name (pre-2017) | Cerebral Palsy of Massachusetts, Inc. | [April 10, 2017 rename announcement, signed by CEO L. Spencer](https://www.facebook.com/MASSCP/posts/1640418735988146/) |
| FY2024 revenue / surplus / CEO compensation | $2.13B / $2.57M (0.12% margin) / $441,995 | ProPublica 990 |
| Medicaid-billing NPIs at the Stoughton address in this repo's flagged-address dataset | 7 NPIs, authorized by Larry Spencer (CEO), cumulative entity_spending $6,620,437,058.40 across the 7 NPIs | [`fraud_flags_shared_addresses.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_shared_addresses.csv) (direct CSV computation) |
| Tempus Unlimited organization NPIs at the Stoughton address per live NPPES | 10 | [NPPES API](https://npiregistry.cms.hhs.gov/api/?version=2.1&organization_name=TEMPUS*&state=MA) |
| MA MassHealth PCA program total annual spend FY2024 | ~$1.75B | [GBH News, Feb 10, 2025](https://www.wgbh.org/news/health/2025-02-10/healey-seeks-controls-as-home-care-costs-soar-for-personal-care-assistants) |

### MassHealth PCA program structural facts (sourced)

- The MassHealth member (the "consumer") is the legal employer of record for their Personal Care Attendant. Tempus, as Fiscal/Employer Agent, issues W-2s on the member's behalf. Sources: [mass.gov Tempus FI page](https://www.mass.gov/info-details/masshealth-personal-care-attendant-pca-fiscal-intermediary-tempus); [Tempus FI page](https://tempusunlimited.org/fiscal-intermediary/).
- Adult children, parents of adult children, sons-in-law, and daughters-in-law of the consumer may be paid PCAs. The consumer's spouse, the parent of a minor consumer, a surrogate, and a legally responsible relative (including court-appointed guardian) are prohibited from being paid as that consumer's PCA. Sources: [130 CMR 422](https://www.mass.gov/doc/personal-care-attendant-services-regulations/download); [PCA-15 bulletin](https://www.mass.gov/doc/pca-15-revised-regulations-about-the-definition-of-family-member-and-personal-care-management-0/download).
- The "FBO [name]" construction in a PCA pay record names the MassHealth consumer for whose benefit the PCA payment is made.

### "Cerebral Palsy of Massachusetts" in SFI text

Reardon, James G's 2024 SFI Q7 lists "Cerebral Palsy of Massachusetts" at "600 Technology Center Drive, Sroughton [sic], MA, 02072, US." This is the pre-2017 legal name of Tempus Unlimited, Inc. — same EIN, same address, same CEO across the rename. Sources cited above.

---

## 2. SFI Q17 ↔ flagged-address overlap — Karyn E. Polito (former Lt. Gov), 370 Main Street, Worcester

Polito's 2019 SFI Q17 (Real Estate Transferred During the Year) discloses family-controlled LLCs holding/transferring real estate at, among other addresses:

- 370 Main Street, Worcester, MA 01608 — Cobblestone Properties LLC
- 370 Main Street, 11th Floor, Worcester, MA 01608 — Uxbridge Farms LLC

[`fraud_flags_shared_addresses.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_shared_addresses.csv) records that 370 Main Street, Worcester is the listed address of a Medicaid-billing NPI authorized by "AUGUSTUS SEALY" with $1,031,532 cumulative `entity_spending` in the dataset window. The two records share the same street address and ZIP5.

The relationship between the Polito family LLCs and the Sealy NPI (landlord/tenant, co-tenant, no relationship, or other) is not established in the records cited above and is not asserted by this document.

Karyn E. Polito's verified public identity: 72nd Lieutenant Governor of Massachusetts (Jan 8, 2015 – Jan 5, 2023). Source: [Wikipedia](https://en.wikipedia.org/wiki/Karyn_Polito) corroborated by [Clean Harbors press release](https://ir.cleanharbors.com/news-releases/news-release-details/clean-harbors-appoints-former-massachusetts-lieutenant-governor).

---

## 3. Pass 1 — filer name = DOGE authorized-official: candidates only

A normalized "LASTNAME, FIRSTINITIAL" intersection between the SFI filer list and [`fraud_flags_shared_officials.csv`](https://github.com/duncanburns2013-dot/HHS-MA-DOGE/blob/gh-pages/fraud_flags_shared_officials.csv) returned 65 name-collision candidates across (filer, year) pairs.

Two lowest-name-commonness candidates (Smith, Brian C; Archer, Damian) were checked for same-person identity by public-records search; neither could be confirmed as the same person as the Medicaid-NPI authorized official. Default assumption: different people. Not matches.

Full candidate file (research dataset, not findings): [`pass1_filer_vs_doge_official_grouped.csv`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/crossref/pass1_filer_vs_doge_official_grouped.csv).

---

## 4. Pass 3 — SFI real-estate-section address overlap with flagged addresses: research dataset only

A `(street_number, normalized_street_name, ZIP5)` intersection between SFI real-estate sections (Q13–Q20) and `fraud_flags_shared_addresses.csv` returned 60 hits. Per-row spot-checks indicate that some hits originate from Q7 (spouse business employment) text that the section-splitter attributed to Q13 / Q17. The Polito record in section 2 above is the only hit confirmed by per-row PDF re-read as actually originating in Q17.

Full candidate file for downstream per-row verification: [`pass3_sfi_addr_in_doge.csv`](https://github.com/duncanburns2013-dot/The-Peoples-Audit/blob/main/data/sfi/crossref/pass3_sfi_addr_in_doge.csv).

---

## Records NOT in this dataset (any of which would be required for further inference)

- G.L. c. 268A § 23(b)(3) appearance-disclosure filings (separately maintained by MA SEC)
- Per-official recusal records and matter-screening logs
- Roll-call votes (legislators); court dockets (judiciary); agency decisions
- OCPF campaign-finance receipts and SOS lobbyist-registration cross-references
- CTHRU vendor-payment records for any named entity
- EOHHS / MassHealth contract documentation
- MA AG / MFCU enforcement-action history for any named entity

This document does not draw inferences from records it does not contain.

---

## Provenance

Bulk SFI release obtained from the MA State Ethics Commission. Per [G.L. c. 268B](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIV/Chapter268B), the Commission notified every individual whose SFI was released in the bulk-release process at the time of release.
