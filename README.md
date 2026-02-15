# Where $31 Billion Goes

**A data investigation into Massachusetts Medicaid spending — $31.6 billion across three state departments, exposed through public records.**

Massachusetts spends 51% more per Medicaid beneficiary than the national average — an $8.9 billion annual premium. This repository documents where that money goes, who receives it, and the policy mechanisms that make it grow automatically.

---

## Key Findings

| Metric | Value |
|---|---|
| **DDS + DMH + EOHHS FY2025** | **$31.62 billion** |
| **4-year growth (DDS+DMH)** | +$1.56B (+49.8%) |
| **Largest single vendor (EOHHS)** | BMC Health Plan — $4.63B |
| **Largest nonprofit (DDS+DMH)** | Vinfen Corporation — $238M |
| **State employee payroll growth** | +$241M (+39%) in 4 years |
| **MA AG fraud recovery rate** | 0.076% of total spending |
| **Procedure codes above national avg** | 46 of 50 analyzed |
| **Highest code ratio** | DDS Residential — 19.8× national |

## The Money Flow

```
Union Contracts → State Facility Costs → Chapter 257 Formula
    → Automatic Rate Increases → Provider Billing → Surplus Revenue
        → Lobbying for More → Repeat
```

**Chapter 257 (2008)** converts actual provider costs into Medicaid rates automatically. The State Auditor found this mechanism creates "surplus revenues for providers with minimal wage increases" to frontline staff. An $800M+ reserve fund exists with NO tracking of the required 75% wage pass-through.

## Data Sources

All data is from public records:

| Source | What It Contains | URL |
|---|---|---|
| **CTHRU Statewide Spending** | Every vendor payment by every state department since FY2010 | cthruspending.mass.gov |
| **CTHRU Socrata API** | Same data, no row limits | cthru.data.socrata.com/resource/pegc-naaa.json |
| **CMS T-MSIS** | 227M rows of Medicaid provider spending by procedure code | data.medicaid.gov |
| **NPPES NPI Registry** | 9.4M provider records with authorized officials | npiregistry.cms.hhs.gov |
| **OIG LEIE** | Excluded individuals/entities (fraud convictions) | oig.hhs.gov/exclusions |
| **IRS 990s** | Nonprofit executive compensation and financials | projects.propublica.org/nonprofits |

## Repository Structure

```
/data/
  /cthru/
    /dds/           - Dept of Developmental Services vendor payments FY2021-2025
    /dmh/           - Dept of Mental Health vendor payments FY2021-2025
    /eohhs/         - Executive Office of Health & Human Services FY2022-2025
    /eohhs_summaries/ - Top 200 vendors per year (summary CSVs)
/dashboards/
    ma_medicaid_investigation_dashboard.jsx  - Full investigation dashboard (6 tabs)
    cthru_vendor_analysis.jsx               - CTHRU vendor payment analysis dashboard
    ma_medicaid_50_codes.jsx                - 50-code procedure analysis dashboard
/scripts/
    pull_eohhs_socrata.py   - Script to pull EOHHS data via Socrata API
    filter_npi_contacts.py  - Script to filter NPI contact person data
```

## Three Layers of Spending

### Layer 1: EOHHS — Managed Care ($26.93B in FY2025)

The largest bucket. MassHealth pays managed care organizations (MCOs) capitated rates per enrollee. The MCOs then pay hospitals and providers.

| MCO | FY2022 | FY2025 | Growth |
|---|---|---|---|
| BMC Health Plan | $2,706M | $4,627M | +71% |
| Mass General Brigham Health Plan | $0 | $1,437M | NEW |
| Tufts Health Public Plans | $2,503M | $1,556M | -38% |
| Commonwealth Care Alliance | $1,081M | $1,334M | +23% |
| Fallon Community Health Plan | $1,234M | $1,239M | flat |
| Tempus Unlimited | $681M | $1,032M | +52% |

**BMC Health Plan gained $1.9 billion in 3 years.** Mass General Brigham launched its own health plan in FY2024 and immediately captured $1.4B.

### Layer 2: DDS — Developmental Services ($3.42B in FY2025)

83% flows to nonprofits via "Purchased Client/Program Services." These rates are set by Chapter 257.

| Provider | FY2021 | FY2025 | Growth |
|---|---|---|---|
| Seven Hills Foundation | $88M | $129M | +47% |
| Vinfen Corporation | $63M DDS | $100M DDS | +59% |
| Advocates Inc | $43M | $98M | +128% |
| ServiceNet | $44M | $95M | +116% |
| Amego Inc | $39M | $86M | +120% |
| Brockton Area Multi-Servs | $61M | $85M | +39% |

### Layer 3: DMH — Mental Health ($1.27B in FY2025)

| Provider | FY2021 | FY2025 | Growth |
|---|---|---|---|
| Vinfen Corporation | $93M DMH | $138M DMH | +49% |
| Eliot Community Human Srvcs | $60M | $86M | +42% |
| Bay Cove Human Services | $42M | $55M | +31% |
| Bridge of Central Mass | $31M | $42M | +35% |

**Vinfen combined (DDS+DMH): $156M → $238M (+53%).** CEO Jean Yang previously served on the Health Connector Board and at Point32Health (a MassHealth MCO).

## Who Benefits

### Five Beneficiary Layers

1. **State agencies** ($9B+): DDS residential billing at 19.8× national average
2. **Nonprofit executives** ($2.4B+): Seven Hills CEO $797K, Vinfen CEO $590K — frontline workers $12-25/hr
3. **Public unions** ($853M payroll): SEIU 509, NAGE — 90% state workforce unionized, +39% payroll growth in 4 years
4. **Hospital systems** ($3-4B facility fees): Mass General Brigham, Beth Israel at 2-3× national rates
5. **Political infrastructure**: ADDP sued state for rate increases (won), provider CEOs fund lobbying

### The Pay-to-Play Circuit

Vendor gets $X million from state → vendor executives donate to legislators controlling that funding → vendor's trade group (ADDP, Providers' Council) has registered lobbyists working Health Committee and Ways & Means → legislators approve next rate increase → repeat.

**Next steps: cross-reference CTHRU vendors against OCPF campaign donations, lobbyist registry, and SFI ethics disclosures.**

## Comparison: MA vs Maine Medicaid Fraud

| | Maine (Luke Thomas) | Massachusetts |
|---|---|---|
| **Pattern** | Ghost companies billing from apartments | State agencies billing legal-but-inflated rates |
| **Mechanism** | Phantom T1019 personal care claims | Chapter 257 automatic rate escalation |
| **Key code** | T1019 at 3-6× national | H2016 at 19.8× national (DDS residential) |
| **Same code in MA** | T1019 is 22% BELOW national | Different fraud pattern entirely |
| **Fix** | Criminal prosecution | Policy reform required |

## How to Use This Data

### Pull EOHHS data yourself (Python):
```python
import urllib.request, json

base = 'https://cthru.data.socrata.com/resource/pegc-naaa.json'
url = f"{base}?%24limit=50000&%24where=department_code%3D'EHS'%20AND%20budget_fiscal_year%3D'2025'"
data = json.loads(urllib.request.urlopen(url).read())
```

### View dashboards:
The `.jsx` files in `/dashboards/` are React components. Open them in claude.ai or any React environment.

## License

Public data, public interest. All source data is from government transparency portals subject to FOIA.

## Related Work

- [Pay-To-Play-Massachusetts-Non-Profits](https://github.com/duncanburns2013-dot/Pay-To-Play-Massachusetts-Non-Profits)
- [fraud-detection](https://github.com/duncanburns2013-dot/fraud-detection)
- [Massachusetts-Disaster](https://github.com/duncanburns2013-dot/Massachusetts-Disaster)
- [ma-electricity-analysis](https://github.com/duncanburns2013-dot/ma-electricity-analysis)
- [MBTA-Scam](https://github.com/duncanburns2013-dot/MBTA-Scam)
