# HHS-MA-DOGE: Complete Investigation Reference

**Last Updated:** February 15, 2026
**Author:** Duncan Burns
**Repository:** https://github.com/duncanburns2013-dot/HHS-MA-DOGE

---

## TABLE OF CONTENTS

1. Executive Summary
2. The $31.6 Billion Breakdown
3. EOHHS — Managed Care Layer ($26.93B)
4. DDS — Developmental Services ($3.42B)
5. DMH — Mental Health ($1.27B)
6. Key Vendor Profiles
7. The Chapter 257 Mechanism
8. Procedure Code Analysis (T-MSIS)
9. Pay-to-Play Investigation Roadmap
10. All Data Sources with URLs
11. File Inventory
12. Scripts & Reproduction
13. Comparison: MA vs Maine Fraud
14. Next Steps

---

## 1. EXECUTIVE SUMMARY

Massachusetts Medicaid (MassHealth) spends $31.6 billion annually across three departments — EOHHS, DDS, and DMH. This is 51% more per beneficiary than the national average, creating an $8.9 billion annual premium.

This investigation uses exclusively public data to trace where the money goes:

- **CTHRU** (cthruspending.mass.gov): Every vendor payment by every state agency since FY2010
- **CMS T-MSIS** (data.medicaid.gov): 227M rows of Medicaid claims by procedure code
- **Socrata API**: Bulk CTHRU data without row limits
- **NPPES/LEIE/990s**: Provider registry, exclusion list, nonprofit compensation

Key findings:
- BMC Health Plan alone receives $4.63B/year (grew +71% in 3 years)
- Mass General Brigham launched a health plan in FY2024 and immediately captured $1.4B
- Tempus Unlimited crossed $1B (fiscal intermediary processing paperwork)
- DDS+DMH grew $1.56B (+49.8%) in 4 years
- Vinfen Corporation: $238M from two departments (CEO: ex-Health Connector → Point32Health → Vinfen)
- Chapter 257 auto-converts provider costs to Medicaid rates with no cap
- State Auditor found "surplus revenues for providers with minimal wage increases"
- $800M+ reserve fund with NO tracking of required 75% wage pass-through
- AG fraud recovery rate: 0.076% of total spending

---

## 2. THE $31.6 BILLION BREAKDOWN (FY2025)

| Department | FY2025 Total | Primary Recipients |
|---|---|---|
| EOHHS | $26.93B | MCOs, hospitals, pharmacies, fiscal intermediaries |
| DDS | $3.42B | Nonprofit residential/day providers (Chapter 257) |
| DMH | $1.27B | Nonprofit mental health providers (Chapter 257) |
| **TOTAL** | **$31.62B** | |

### Combined DDS+DMH Trend

| Year | Combined | Growth | State Payroll | Vinfen |
|---|---|---|---|---|
| FY2021 | $3.13B | — | $612M | $156M |
| FY2022 | $3.65B | +16.4% | $762M | $174M |
| FY2024 | $3.99B | — | $754M | $193M |
| FY2025 | $4.69B | +17.6% | $853M | $238M |

4-year growth: +$1.56B (+49.8%)

---

## 3. EOHHS — MANAGED CARE LAYER

### EOHHS Annual Totals

| Year | Total | Rows | Vendors |
|---|---|---|---|
| FY2021 | $2.26B* | 143,863 | 7,756 |
| FY2022 | $22.73B | 1,251,842 | 8,912 |
| FY2023 | $25.27B | 1,233,328 | 8,870 |
| FY2024 | $24.02B | 1,158,837 | 8,653 |
| FY2025 | $26.93B | 1,182,554 | 8,660 |

*FY2021 pulled via CTHRU web (100K row cap), likely partial. FY2022-2025 via Socrata API (complete).

### Top MCOs (FY2022 → FY2025)

| MCO | FY2022 | FY2025 | Change |
|---|---|---|---|
| BMC Health Plan | $2,706M | $4,627M | +$1,921M (+71%) |
| Mass General Brigham HP | $0 | $1,437M | NEW in FY2024 |
| Tufts Health Public Plans | $2,503M | $1,556M | -$947M (-38%) |
| Medicaid (direct) | $1,247M | $1,596M | +$350M |
| Commonwealth Care Alliance | $1,081M | $1,334M | +$253M |
| Fallon Community HP | $1,234M | $1,239M | flat |
| Tempus Unlimited | $681M | $1,032M | +$351M (+52%) |
| Mass Behavioral Health Prt | $1,069M | $580M | -$489M (-46%) |
| United Healthcare | $471M | $618M | +$147M |
| Health New England | $379M | $533M | +$154M |
| BMC Corp (direct) | $350M | $727M | +$378M (+108%) |
| Tufts Associated HMO | $245M | $459M | +$214M (+87%) |
| Senior Whole Health | $403M | $389M | flat |

### Key EOHHS Observations

- **BMC Health Plan** gained $1.9B in 3 years — larger than entire DDS department
- **Mass General Brigham** launched MCO in FY2024, immediately $1.2B, grew to $1.4B in FY2025
- **Tempus Unlimited** crossed $1B — fiscal intermediary processing PCA payments, not providing care
- **BMC appears under 3+ entities**: Health Plan, Corp, direct — combined ~$5.4B in FY2025
- **Tufts lost share** to MGB Health Plan entry — market reshuffling
- **Community Care Cooperative** appeared FY2024 at $251M, grew to $280M FY2025

---

## 4. DDS — DEPT OF DEVELOPMENTAL SERVICES

### DDS Annual Totals

| Year | Total | Payroll | Programs | Vendors |
|---|---|---|---|---|
| FY2021 | $2.26B | $352M | $1.90B | 1,085 |
| FY2022 | $2.64B | $439M | $2.20B | 1,071 |
| FY2023 | $1.26B* | $407M | — | 930 |
| FY2024 | $2.88B | $429M | $2.45B | 1,141 |
| FY2025 | $3.42B | $476M | $2.94B | 1,207 |

*FY2023 partial (100K row limit via web). 83% of DDS flows to "Purchased Client/Program Services" (nonprofits).

### Top 20 DDS Vendors FY2025

| Rank | Vendor | FY2025 | FY2021 | Growth |
|---|---|---|---|---|
| 1 | DMR Summary Payroll | $476M | $352M | +35% |
| 2 | Seven Hills Comm Svs | $129M | $88M | +47% |
| 3 | Vinfen Corporation | $100M | $63M | +59% |
| 4 | Advocates Inc | $98M | $43M | +128% |
| 5 | ServiceNet Inc | $95M | $44M | +116% |
| 6 | Amego Inc | $86M | $39M | +120% |
| 7 | Brockton Area Multi-Servs | $85M | $61M | +39% |
| 8 | Bridgewell Inc | $67M | — | — |
| 9 | May Institute | $66M | $48M | +36% |
| 10 | Toward Independent Living | $63M | — | — |
| 11 | Community Resources | $44M | — | — |
| 12 | Bay Cove Human Services | $47M | $34M | +40% |
| 13 | Venture Community Services | $43M | — | — |
| 14 | Northeast Arc | $38M | $23M | +66% |
| 15 | Cooperative Human Services | $38M | — | — |
| 16 | Delta Projects | $37M | — | — |
| 17 | Riverside Community Care | $34M | $23M | +47% |
| 18 | JRI | $32M | $24M | +34% |
| 19 | Judge Rotenberg | $29M | $16M | +75% |
| 20 | Seven Hills Family Svs | $19M | — | — |

Seven Hills network total from DDS: ~$148M (Comm Svs + Family Svs + other affiliates)

---

## 5. DMH — DEPT OF MENTAL HEALTH

### DMH Annual Totals

| Year | Total | Payroll | Programs | Vendors |
|---|---|---|---|---|
| FY2021 | $877M | $260M | $617M | 769 |
| FY2022 | $1.00B | $323M | $681M | 820 |
| FY2023 | $1.07B | $310M | $757M | 757 |
| FY2024 | $1.11B | $325M | $786M | 770 |
| FY2025 | $1.27B | $377M | $896M | 759 |

### Top 15 DMH Vendors FY2025

| Rank | Vendor | FY2025 | FY2021 | Growth |
|---|---|---|---|---|
| 1 | DMH Summary Payroll | $377M | $260M | +45% |
| 2 | Vinfen Corporation | $138M | $93M | +49% |
| 3 | Eliot Community Human Srvcs | $86M | $60M | +42% |
| 4 | Bay Cove Human Services | $55M | $42M | +31% |
| 5 | Bridge of Central Mass | $42M | $31M | +35% |
| 6 | Center for Human Development | $38M | — | — |
| 7 | Riverside Community Care | $33M | $26M | +29% |
| 8 | Advocates Inc | $31M | $24M | +29% |
| 9 | UMass | $31M | — | — |
| 10 | North Suffolk Community Svs | $29M | — | — |
| 11 | JRI | $25M | $18M | +43% |
| 12 | ServiceNet | $20M | $13M | +51% |
| 13 | Comm Counseling of BC | $19M | — | — |
| 14 | Edinburg Center | $18M | — | — |
| 15 | Brockton Area Multi-Servs | $14M | $10M | +39% |

---

## 6. KEY VENDOR PROFILES

### Cross-Department Vendors (FY2025 DDS + DMH Combined)

| Vendor | DDS | DMH | Combined | 4-Yr Growth |
|---|---|---|---|---|
| Vinfen Corporation | $100M | $138M | **$238M** | +53% |
| Advocates Inc | $98M | $31M | **$129M** | +92% |
| ServiceNet Inc | $95M | $20M | **$115M** | +102% |
| Bay Cove Human Services | $47M | $55M | **$102M** | +36% |
| Eliot Community | $14M | $86M | **$99M** | +47% |
| Brockton Area Multi-Servs | $85M | $14M | **$99M** | +39% |
| Riverside Community Care | $34M | $33M | **$67M** | +37% |
| JRI | $32M | $25M | **$57M** | +38% |

### Vendor Intelligence

**VINFEN CORPORATION — $238M (DDS+DMH) + EOHHS**
- CEO: Jean Yang (~$590K compensation)
- Career path: Health Connector Board → Point32Health (MassHealth MCO) → Vinfen CEO
- Point32Health IS a MassHealth MCO that pays Vinfen
- Revolving door: regulator → MCO → provider

**SEVEN HILLS FOUNDATION — $148M+ (DDS network)**
- CEO: Kathleen Jordan ($797K compensation)
- Chairs ADDP (Association of Developmental Disabilities Providers)
- ADDP lobbied for Chapter 257 rate increases
- ADDP sued the state for higher rates and won
- Frontline DSP workers: $12-25/hr

**TEMPUS UNLIMITED — $1.03B (EOHHS)**
- Fiscal intermediary — processes PCA payments
- Does not provide direct care
- Runs $6.4B+ through its books annually
- Crossed $1B threshold in FY2025

**JUDGE ROTENBERG EDUCATIONAL CENTER — $29M (DDS)**
- Uses electric shock devices on disabled residents (GED device)
- FDA attempted ban in 2020, overturned by court in 2021
- Active lobbyist in MA
- 75% payment growth despite controversy
- UN called practices "torture"

**BMC HEALTH PLAN — $4.63B (EOHHS)**
- Largest single vendor in entire state system
- 71% growth in 3 years
- BMC appears under 3+ entity names: Health Plan, Corp, BMC direct
- Combined BMC entities: ~$5.4B in FY2025

**MASS GENERAL BRIGHAM HEALTH PLAN — $1.44B (EOHHS)**
- NEW MCO — launched FY2024
- Immediately captured $1.2B, grew to $1.44B in FY2025
- MGB already bills 2-3× facility fees as hospital system
- Now also collecting capitated MCO payments — both sides of the transaction

---

## 7. THE CHAPTER 257 MECHANISM

Chapter 257 (2008) created an automatic cost-to-rate conversion:

1. **Union Contract**: SEIU 509/NAGE negotiate raises (90% of workforce unionized)
2. **Costs Rise**: Provider labor costs increase → reported to state
3. **Rates Adjust**: Chapter 257 formula converts actual costs to Medicaid rates automatically
4. **Billing Grows**: Providers bill new higher rates to MassHealth
5. **Surplus Captured**: State Auditor found "surplus revenues with minimal wage increases" to frontline
6. **Lobby for More**: ADDP/Providers' Council lobby for next rate increase → cycle repeats

### Key Chapter 257 Facts
- Passed 2008, effective for DDS and DMH nonprofit providers
- Converts ACTUAL provider costs into rates (not benchmarked to efficiency)
- No cap on rate increases
- State Auditor found rate increases created surplus for providers, not worker wages
- $800M+ provider reserve fund accumulated
- Required 75% wage pass-through — NO tracking mechanism exists
- ADDP (chaired by Seven Hills CEO) successfully sued for higher rates

---

## 8. PROCEDURE CODE ANALYSIS (T-MSIS)

### Source
CMS T-MSIS TAF Other Services dataset: data.medicaid.gov
227 million rows, all 50 states + DC, FY2023

### Key Findings — MA vs National Average

| Code | Description | MA Rate | National | Ratio |
|---|---|---|---|---|
| H2016 | DDS Residential Habilitation | ~$690/unit | ~$35/unit | **19.8×** |
| H2015 | DDS Day Habilitation | ~$180/unit | ~$30/unit | **6.0×** |
| H0036 | DMH Community Psychiatric | 65% of ALL US spending | — | monopoly |
| G0156 | Home Health Aide (Elder) | $85-120/unit | $1.50/unit | **40-80×** |
| T1019 | Personal Care (PCA) | $3.34/unit | $4.27/unit | **0.78× (below)** |

### 50-Code Comparison Results
- 46 of 50 codes: MA above national average
- 4 codes below (including T1019 — the Maine fraud code)
- Total MA spending across 50 codes: significantly above national
- State-operated facility codes: extreme multiples (6-20×)
- Hospital facility fees: 2-3× national

### Elder Services (ASAPs)
- 27 Area Agencies on Aging (ASAPs) billing G0156 at 40-80× national
- Mystic Valley Elder Services, Springwell, BayPath Elder Services among top billers
- These are quasi-governmental entities with their own Chapter 257-style rate setting

---

## 9. PAY-TO-PLAY INVESTIGATION ROADMAP

### The 7-Step Join

1. ✅ **CTHRU**: Pull top 200 DDS/DMH/EOHHS vendors — **DONE**
2. ⏳ **OCPF**: Search vendor executives in campaign donor database → ocpf.us
3. ⏳ **Lobbyist Registry**: Check for registered lobbyists → sec.state.ma.us/lobbyistpublicsearch
4. ⏳ **IRS 990s**: Pull executive comp for each nonprofit → projects.propublica.org/nonprofits
5. ⏳ **SFI Disclosures**: Check state official financial conflicts → sfi.eth.mass.gov
6. ⏳ **Legislative Map**: Which Health/Ways & Means members received vendor-employee donations
7. ⏳ **COMMBUYS**: Check contract award method (competitive vs sole-source) → commbuys.com

### Priority Executives to Search (OCPF + 990s)

**Tier 1 — Largest Providers:**
- Kathleen Jordan, Seven Hills Foundation CEO ($797K)
- Jean Yang, Vinfen Corporation CEO ($590K)
- CEO, Advocates Inc (name TBD — pull 990)
- CEO, Bay Cove Human Services (name TBD)
- CEO, ServiceNet Inc (name TBD)
- CEO, Eliot Community Human Services (name TBD)
- CEO, Brockton Area Multi-Services (name TBD)
- CEO, May Institute (name TBD)
- CEO, Riverside Community Care (name TBD)
- CEO, Northeast Arc (name TBD)
- CEO, JRI (name TBD)

**Tier 2 — Trade Associations:**
- ADDP leadership/board (chaired by Seven Hills CEO)
- Providers' Council leadership
- Mass Home Care leadership
- Mass Senior Action Council

**Tier 3 — MCOs:**
- BMC Health Plan executives
- Mass General Brigham Health Plan executives
- Commonwealth Care Alliance executives
- Tempus Unlimited executives

**Tier 4 — Controversial:**
- Judge Rotenberg Center leadership
- Centrus Inc (settled $14.2M fraud case, still billing)
- Arbour Health System ($100M conviction, still operating)

### Key Legislative Targets
- Joint Committee on Health Care Financing
- Joint Committee on Ways and Means
- Joint Committee on Children, Families and Persons with Disabilities
- Governor's office / EOHHS Secretary

---

## 10. ALL DATA SOURCES WITH URLS

### Financial/Spending Data
| Source | URL | What |
|---|---|---|
| CTHRU Checkbook | https://cthruspending.mass.gov | All state vendor payments FY2010+ |
| CTHRU Socrata API | https://cthru.data.socrata.com/resource/pegc-naaa.json | Same, no row limits |
| CMS T-MSIS | https://data.medicaid.gov | Medicaid claims by procedure code |
| COMMBUYS | https://www.commbuys.com | State procurement contracts |

### Political/Influence Data
| Source | URL | What |
|---|---|---|
| OCPF | https://www.ocpf.us | Campaign finance donations ($1K cap post-2023) |
| Lobbyist Registry | https://www.sec.state.ma.us/lobbyistpublicsearch | Registered lobbyists 2005+ |
| SFI Disclosures | https://sfi.eth.mass.gov | State employee financial conflicts |
| Ethics Commission | https://www.mass.gov/orgs/state-ethics-commission | Advisory opinions, enforcement |

### Provider/Entity Data
| Source | URL | What |
|---|---|---|
| NPPES NPI Registry | https://npiregistry.cms.hhs.gov | 9.4M provider records |
| OIG LEIE | https://oig.hhs.gov/exclusions | Excluded/convicted providers |
| IRS 990s (ProPublica) | https://projects.propublica.org/nonprofits | Nonprofit exec comp & financials |
| MA Corporate Database | https://corp.sec.state.ma.us/CorpWeb/CorpSearch/CorpSearch.aspx | Entity registration |

### Socrata API Query Examples

**All EOHHS vendors for a fiscal year:**
```
https://cthru.data.socrata.com/resource/pegc-naaa.json?$limit=50000&$where=department_code='EHS' AND budget_fiscal_year='2025'
```

**Department codes:**
- EHS = EOHHS (Executive Office of Health & Human Services)
- DMR = DDS (Dept of Developmental Services, formerly DMR)
- DMH = DMH (Dept of Mental Health)

**Object codes:**
- R10 = Medicaid payments
- MM = Purchased Client/Program Services (Chapter 257 nonprofit payments)
- AA = Regular Employee Compensation (union payroll)

---

## 11. FILE INVENTORY

### Repository: HHS-MA-DOGE

```
/data/cthru/dds/
  dds_fy2021.csv          - 79MB, 100K rows, all DDS vendors
  dds_fy2022.csv          - 86MB, 100K rows
  dds_fy2024.csv          - 86MB, 100K rows
  dds_fy2025.csv          - 91MB, 100K rows

/data/cthru/dmh/
  dmh_fy2021.csv          - 24MB
  dmh_fy2022.csv          - 28MB
  dmh_fy2023.csv          - 28MB
  dmh_fy2024.csv          - 28MB
  dmh_fy2025.csv          - 32MB

/data/cthru/eohhs_summaries/
  eohhs_fy2022_summary.csv - 9KB, top 200 vendors
  eohhs_fy2023_summary.csv - 9KB
  eohhs_fy2024_summary.csv - 9KB
  eohhs_fy2025_summary.csv - 9KB

/dashboards/
  cthru_vendor_analysis.jsx           - CTHRU vendor payment dashboard
  ma_medicaid_investigation_dashboard.jsx - Full investigation dashboard
  ma_medicaid_50_codes.jsx            - Procedure code comparison dashboard

/scripts/
  pull_eohhs_socrata.py    - Pull full EOHHS data via Socrata API
  summarize_eohhs.py       - Summarize EOHHS data by vendor
  split_eohhs.py           - Split large CSVs for GitHub

README.md
INVESTIGATION_REFERENCE.md  (this file)
```

### Local Files (not in repo — too large)

```
C:\Users\dunca\Downloads\Contact person\
  eohhs_fy2022.csv          - 535MB, 1,251,842 rows (COMPLETE)
  eohhs_fy2023.csv          - 528MB, 1,233,328 rows (COMPLETE)
  eohhs_fy2024.csv          - 496MB, 1,158,837 rows (COMPLETE)
  eohhs_fy2025.csv          - 506MB, 1,182,554 rows (COMPLETE)
  eohhs_fy*_part*.csv       - Split files (128MB each, still too big for GitHub)
  contact_person_output.json - DataRepublican NPI analysis (3.3M records)

C:\Users\dunca\Downloads\
  checkbook_data_2026-02-14 (13).csv  - EOHHS FY2021 (62MB, partial)
  checkbook_data_2026-02-14 (18).csv  - 772MB (unknown, possibly full CTHRU dump)
```

---

## 12. SCRIPTS & REPRODUCTION

### Pull EOHHS Data (Python)

```python
import urllib.request, json, csv, time

base = 'https://cthru.data.socrata.com/resource/pegc-naaa.json'

for year in ['2022','2023','2024','2025']:
    print(f'=== EOHHS FY{year} ===')
    offset = 0
    all_rows = []
    while True:
        url = f"{base}?$limit=50000&$offset={offset}&$where=department_code='EHS' AND budget_fiscal_year='{year}'"
        data = json.loads(urllib.request.urlopen(url).read())
        if not data:
            break
        all_rows.extend(data)
        offset += 50000
        print(f'  Fetched {len(data)} rows (total: {len(all_rows)})')
        time.sleep(1)
    
    # Save to CSV
    with open(f'eohhs_fy{year}.csv', 'w', newline='', encoding='utf-8') as f:
        if all_rows:
            w = csv.DictWriter(f, fieldnames=all_rows[0].keys())
            w.writeheader()
            w.writerows(all_rows)
    print(f'  Saved eohhs_fy{year}.csv ({len(all_rows)} rows)')
```

### Summarize Any CTHRU CSV

```python
import csv
fname = 'your_file.csv'
vendors = {}
with open(fname, 'r') as f:
    for row in csv.DictReader(f):
        v = row.get('Vendor', row.get('vendor', ''))
        try: amt = float(row.get('Amount', row.get('amount', 0)))
        except: continue
        vendors[v] = vendors.get(v, 0) + amt
for v, a in sorted(vendors.items(), key=lambda x: -x[1])[:30]:
    print(f'{a/1e6:.1f}M - {v}')
```

---

## 13. COMPARISON: MA vs MAINE MEDICAID FRAUD

| Dimension | Maine (Luke Thomas) | Massachusetts |
|---|---|---|
| Pattern | Ghost companies billing from apartments | Legal policy-driven overpayment |
| Mechanism | Phantom T1019 personal care claims at 3-6× | Chapter 257 auto rate escalation |
| Key evidence | Same addresses, LEIE-excluded NPIs, multi-state networks | CTHRU payments, T-MSIS rate ratios |
| Somali network | Yes — DataRepublican flagged 65,866 NPIs | Different pattern entirely |
| T1019 in MA | 22% BELOW national average | Not the fraud vector here |
| DDS residential | N/A | 19.8× national average |
| Fix required | Criminal prosecution | Policy/legislative reform |
| AG response | Active investigation | 0.076% recovery rate |
| Scale | Millions in fraudulent billing | $8.9B annual premium over national avg |

---

## 14. NEXT STEPS (PRIORITY ORDER)

### Immediate (Week 1)
- [ ] Push all data to HHS-MA-DOGE repo ← IN PROGRESS
- [ ] Pull IRS 990s for top 15 DDS/DMH vendors (CEO names + comp)
- [ ] Search top vendor CEOs in OCPF donor database
- [ ] Check ADDP and Providers' Council in lobbyist registry

### Short-term (Week 2-3)
- [ ] Map Health Committee + Ways & Means members receiving vendor-linked donations
- [ ] Pull COMMBUYS procurement data for DDS/DMH contracts
- [ ] Search SFI disclosures for EOHHS/DDS/DMH leadership
- [ ] Build comprehensive pay-to-play dashboard

### Medium-term (Month 1-2)
- [ ] FOIA request: Chapter 257 rate-setting worksheets
- [ ] FOIA request: 75% wage pass-through compliance data
- [ ] Compare MA nonprofit CEO comp to national benchmarks
- [ ] Analyze board member overlaps between providers and trade associations
- [ ] Research Judge Rotenberg lobbying expenditures

### Long-term
- [ ] Build automated pipeline: CTHRU → OCPF → 990 → visualization
- [ ] Create public-facing website/dashboard
- [ ] Submit findings to State Auditor / Inspector General
- [ ] Media outreach with documented findings

---

## APPENDIX: SESSION LOG

| Date | Session | Key Output |
|---|---|---|
| Feb 14, 2026 | T-MSIS procedure code analysis | 50-code dashboard, national comparison |
| Feb 14, 2026 | Who benefits analysis | 5-layer beneficiary map, Chapter 257 deep dive |
| Feb 14, 2026 | Data source hunting | 40+ sources, 9 categories, pay-to-play join strategy |
| Feb 14, 2026 | Investigation dashboard | Follow-the-money dashboard with all sources |
| Feb 15, 2026 | CTHRU data extraction | DDS 4yr, DMH 5yr, EOHHS 4yr via Socrata API |
| Feb 15, 2026 | Vendor payment analysis | $4.69B DDS+DMH, $26.93B EOHHS, key vendor growth |
| Feb 15, 2026 | GitHub repo setup | HHS-MA-DOGE repo, data push in progress |

### Transcript Locations (Claude)
- /mnt/transcripts/2026-02-15-12-54-12-ma-medicaid-cthru-vendor-payments-analysis.txt
- /mnt/transcripts/2026-02-14-19-41-11-ma-medicaid-dashboard-data-sources.txt
- /mnt/transcripts/2026-02-14-19-19-25-ma-medicaid-who-benefits-analysis.txt
- /mnt/transcripts/2026-02-14-19-03-20-ma-medicaid-fraud-investigation-tools.txt
- /mnt/transcripts/2026-02-14-18-48-58-ma-medicaid-national-comparison-46-codes.txt
- /mnt/transcripts/journal.txt
