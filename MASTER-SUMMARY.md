# HHS-MA-DOGE INVESTIGATION — MASTER SUMMARY

Updated: 3/10/2026

---

## THE CORE FINDING

Massachusetts pays **$40.72/hour** for a home health aide (G0156, 101 CMR 350.04). The aide earns **~$18.50/hour** (BLS). The **$22.22/hr gap** passes through two layers — a nonprofit middleman and a for-profit LLC — before anyone touches a patient.

The IRS 990 for Mystic Valley Elder Services proves it: **72.4% of expenses** ($87M of $120M) are subcontracted to for-profit home care LLCs. The nonprofit keeps 27.6% for administration, including $1.2M for six executives. State law (MGL c. 19A § 4B) **prohibits** the nonprofit from employing the aides directly — it must subcontract. Chapter 257 sets rates based on provider costs with no cap. The State Auditor found EOHHS has no documented process for how rates are calculated.

This structure is replicated across all 28 Area Agencies on Aging, which collectively received **$3.4 billion** from Elder Affairs over FY2021–2025 (CTHRU).

**Full proof:** `analysis/MARKUP-MATH.md`
**Legal framework:** `analysis/LEGAL-FRAMEWORK.md`

---

## DATA SOURCES

| Source | What It Provides | Access |
|--------|-----------------|--------|
| **101 CMR 350.04** | G0156 rate = $10.18/15 min | mass.gov/regulations |
| **CMS T-MSIS** | Medicaid claims by provider & code | data.medicaid.gov |
| **CTHRU** | State payments by vendor & agency | cthru.data.socrata.com |
| **IRS Form 990** | Nonprofit expenses, exec comp | propublica.org/nonprofits |
| **MA OCPF** | Campaign donations by employer | ocpf.us |
| **MA SOS** | Lobbyist registrations & spending | sec.state.ma.us |
| **BLS OES** | Occupational wages by state | bls.gov/oes |
| **957 CMR 6.00** | LLC cost reports (via CHIA PRR) | chiamass.gov |

---

## ENTITIES — FULL DATA PACKAGES

### 1. MYSTIC VALLEY ELDER SERVICES (EIN 04-2562646)
- **CTHRU:** $422.6M over 5 years (FY2021–2025), #1 Elder Affairs vendor
- **T-MSIS:** $222.9M Medicaid, $84.1M in G0156 alone = 2.07M aide-hours
- **990 Part IX:** 72.4% ($87.1M) subcontracted to for-profit LLCs
- **CEO:** Lisa Gurgone, $299,064 | Top 6 execs: $1,234,448
- **OCPF:** $8,157 (777 records) — 48% SEIU Local 509 PAC
- **Lobbying:** None
- **Key:** The billing markup case study. Pass-through middleman model proved by 990.
- **Data:** `entities/mystic-valley/`

### 2. BOSTON MEDICAL CENTER (EIN 04-3314093)
- **CTHRU:** $68.8M over 5 years (not including MassHealth claims — bulk of $2.6B revenue)
- **990:** Revenue $2.6B, exec comp $6.1M, significant internal controls deficiency
- **OCPF:** $453,912 (12,936 records) — 7-layer influence operation
- **Lobbying:** $180K+/yr federal
- **Key:** CEO Kate Walsh → EOHHS Secretary ($27B budget) → General Catalyst (VC). Revolving door.
- **Data:** `entities/bmc/`

### 3. UMASS MEMORIAL HEALTH CARE
- **CTHRU:** $33.2M over 5 years
- **OCPF:** $356,149 (1,985 records) — CEO is registered state lobbyist earning $3.9M
- **Lobbying:** $618K (2021–2025) — Smith Costello & Crawford + in-house
- **Key:** 3 registered lobbyist-donors gave $48K combined. Bipartisan: $80K to Governor's office.
- **Data:** `entities/umass-memorial/`

### 4. ELIOT COMMUNITY HUMAN SERVICES (EIN 04-2316924)
- **CTHRU:** $449.3M over 5 years
- **OCPF:** $142,444 (27,229 records) — 92.5% SEIU union PAC
- **Lobbying:** $1.62M (2021–2025) via MSPCC division + O'Neill & Associates
- **Key:** $100M revenue explosion from no-bid migrant shelter contracts
- **Data:** `entities/eliot/`

### 5. JUSTICE RESOURCE INSTITUTE (EIN 04-2105871)
- **CTHRU:** $471.4M over 5 years
- **OCPF:** $42,305 (225 records) — two people = 60%
- **Lobbying:** $106K (2021–2025) — Philip W. Johnston Associates
- **Key:** Lobbyist was former EOHHS Secretary + twice MA Dem Party Chairman. Firm merged with Smith Costello (UMass Memorial's firm) after Johnston died 4/2025.
- **Data:** `entities/jri/`

---

## ENTITIES — PRIOR SESSIONS (data in transcripts)

| Entity | OCPF | Lobbying | Key Finding |
|--------|------|---------|-------------|
| Riverside Community Care | $34,600 | ~$127K | ABH revolving door to CEO |
| Beth Israel Lahey Health | $52,500 | $1.92M | Hospital system lobbying operation |
| Point32Health | $63,300 | $2.43M | Insurance + lobbyist-to-VP pipeline |
| Fallon Health | $431K* | $857K | *Data contaminated by Fallon Company |
| Stavros Center | $693K | $0 | 99% union PAC payroll deductions |
| 1199 SEIU | $14.09M PAC | $197K | The union political machine |
| Northeast Arc | $6,847 | ~$25K | Control group — clean |
| MHA/MHAPAC | $421K | Trade assoc | Industry PAC pass-through |

---

## CROSS-ENTITY PATTERNS

### The Revolving Door
- **Kate Walsh:** BMC CEO (2010–23) → EOHHS Secretary (2023–25) → General Catalyst
- **Marylou Sudders:** EOHHS Secretary (2015–23) → Smith, Costello & Crawford
- **Philip W. Johnston:** EOHHS Secretary (1984–91) → JRI lobbyist → died 4/2025 → firm merged into Smith Costello

### The Lobbying Firm Network
- **Smith, Costello & Crawford:** UMass Memorial ($450K) + JRI (via Johnston merger) + Marylou Sudders
- **O'Neill & Associates:** Eliot CHS ($120K/yr)

### The $27 Billion Question
Kate Walsh controlled the $27B EOHHS budget overseeing MassHealth, DDS, DMH, DCF, DPH. Every entity in this investigation receives funding from that agency.

---

## THE BILLING MARKUP — PROVED

```
STATE PAYS (101 CMR 350.04):             $40.72/hr     (100%)

LAYER 1 — NONPROFIT ASAP (27.6%):
  Staff salaries (990 Ln 7):             −$6.35
  Benefits & payroll (990 Ln 8-10):      −$1.55
  Overhead (990 Ln 12-24):               −$3.14
  Executive comp (990 Ln 5):             −$0.26
                                          ──────
LAYER 2 — FOR-PROFIT LLC (72.4%):         $29.48

  Aide wage (BLS):                       −$18.50
                                          ──────
  LLC overhead & profit:                  $10.98

AIDE SEES:  45¢ of every dollar
MVES KEEPS: 28¢
LLC KEEPS:  27¢
```

**Sources:** 101 CMR 350.04, T-MSIS (data.medicaid.gov), CTHRU, IRS 990 (EIN 04-2562646), BLS OES

---

## FILE MANIFEST

```
HHS-MA-DOGE/
├── MASTER-SUMMARY.md (this file)
├── README.md
├── analysis/
│   ├── LEGAL-FRAMEWORK.md (Ch. 19A/257/118E — how the markup is legal)
│   └── MARKUP-MATH.md (step-by-step arithmetic proof)
├── dashboards/
│   └── markup-proof-final.jsx (visual proof graphic)
├── entities/
│   ├── bmc/ (analysis + OCPF + federal lobbying)
│   ├── eliot/ (analysis + OCPF + lobbying PDFs + 990 data)
│   ├── jri/ (analysis + OCPF + lobbying PDFs)
│   ├── mystic-valley/ (analysis + OCPF + 990 PDFs + billing proof)
│   └── umass-memorial/ (analysis + OCPF + lobbying PDFs)
└── transcripts/ (prior session transcripts)
```
