# THE MARKUP MATH — Step by Step

## Five Public Documents, Simple Arithmetic

Every number below comes from a government document anyone can look up.
No estimates. No models. Just division.

---

## DOCUMENT 1: The Price

**Source:** 101 CMR 350.04 — EOHHS Fee Schedule
**URL:** mass.gov/regulations/101-CMR-350.00

| Code | Rate | Unit | Service |
|------|------|------|---------|
| G0156 | $10.18 | Per 15 minutes | Home health aide services |

```
$10.18 × 4 units  = $40.72 per hour
$10.18 × 32 units = $325.76 per 8-hour day
$10.18 × 160 units = $1,628.80 per 5-day week
```

**Context:** This is Massachusetts Medicaid (MassHealth) per-unit billing. Federal Medicare pays differently — a bundled ~$2,050 for a 30-day episode regardless of hours. Under MassHealth's system, more hours billed = more revenue.

**Key regulatory language:** "The allowable fees are full compensation for the home health services rendered including, but not limited to, administrative or supervisory duties and costs." (101 CMR 350.01(3))

---

## DOCUMENT 2: The Volume

**Source:** CMS T-MSIS TAF Other Services — data.medicaid.gov
**Entity:** Mystic Valley Elder Services Inc. | NPI: 1578683694

| Measure | Value |
|---------|-------|
| Total Medicaid payments | $222,949,564 |
| G0156 payments alone | $84,095,464 |
| G0156 as % of total | 37.7% |

```
$84,095,464 ÷ $10.18/unit = 8,260,851 units of G0156
8,260,851 units ÷ 4 per hour = 2,065,213 aide-hours purchased
```

**Two million hours** of aide time billed to Medicaid by a single agency.

---

## DOCUMENT 3: The Total

**Source:** CTHRU — Massachusetts Comptroller
**URL:** cthru.data.socrata.com
**Vendor:** MYSTIC VALLEY ELDER SERVICES INC | Dept: ELDER AFFAIRS

| Fiscal Year | Payments | Total |
|-------------|----------|-------|
| FY2021 | 265 | $65,148,684 |
| FY2022 | 306 | $76,457,417 |
| FY2023 | 308 | $83,530,130 |
| FY2024 | 301 | $95,417,899 |
| FY2025 | 291 | $102,077,567 |
| **5-Year Total** | **1,471** | **$422,641,410** |

Growth: +57% in 5 years. MVES is the #1 Elder Affairs vendor statewide.

---

## DOCUMENT 4: Where It Went

**Source:** IRS Form 990, Part IX — Statement of Functional Expenses
**Filing:** EIN 04-2562646 | Tax year 7/1/2023 – 6/30/2024
**URL:** projects.propublica.org/nonprofits/organizations/42562646

| 990 Line | Category | Amount | % of Total |
|----------|----------|--------|-----------|
| Line 5 | Executive compensation | $765,990 | 0.6% |
| Line 7 | Other salaries and wages | $18,757,020 | 15.6% |
| Lines 8-10 | Benefits & payroll taxes | $4,532,592 | 3.8% |
| **Line 11g** | **Subcontracted services** | **$87,092,793** | **72.4%** |
| Lines 12-24 | Other overhead | $9,226,740 | 7.7% |
| **Line 25** | **Total functional expenses** | **$120,375,135** | **100%** |

### Top subcontractors (990 Part VII-B):

| Company | Type | Service | Amount |
|---------|------|---------|--------|
| Greater Boston Patient Care LLC | For-profit | Homemaking/Personal Care | $3,030,643 |
| Connected Home Care LLC | For-profit | Homemaking/Personal Care | $2,132,658 |
| Global Healthcare Services | For-profit | Homemaking/Personal Care | $1,972,421 |
| The Scrubbing Board | — | Laundry Services | $867,593 |
| Natale Company & Safetcare | — | Adaptive Housing | $863,180 |

8 total independent contractors received >$100K.

### Executive compensation (Schedule J):

| Name | Title | Total Comp |
|------|-------|-----------|
| Lisa Gurgone | CEO | $299,064 |
| Sean Hubacz | CFO | $250,325 |
| Joanne Solazzo | Dir. Client Services | $218,372 |
| Alex Jurkevich | IT Manager | $162,768 |
| Brian McDonald | Protective Services Mgr | $153,581 |
| Jennifer Vanasse | Development Director | $150,338 |
| **Top 6 Total** | | **$1,234,448** |

13 employees earned >$100,000.

---

## DOCUMENT 5: What the Aide Earns

**Source:** U.S. Bureau of Labor Statistics, Occupational Employment & Wage Statistics
**URL:** bls.gov/oes
**Occupation:** SOC 31-1120 — Home Health and Personal Care Aides
**State:** Massachusetts — May 2024

| Measure | Value |
|---------|-------|
| Mean hourly wage | $18.50 |
| Median hourly wage | $17.71 |
| Annual mean wage | $38,490 |

---

## THE MATH

### Per Hour of Aide Time

Start with the state rate and subtract each layer using 990 percentages:

```
State pays (101 CMR 350.04):                          $40.72   (100%)
                                                       ──────
MVES LAYER (27.6% — from 990 Part IX):
  Staff salaries (15.6%):                             −$6.35
  Benefits & payroll tax (3.8%):                      −$1.55
  Other overhead — rent, meals, IT, transport (7.7%): −$3.14
  Executive compensation (0.6%):                      −$0.26
                                                       ──────
Remaining to for-profit LLC (72.4%):                   $29.48
                                                       ──────
LLC LAYER:
  Aide wage (BLS):                                   −$18.50
                                                       ──────
LLC overhead & profit:                                 $10.98
```

### Per Dollar

| Destination | Amount | Cents per $1 |
|------------|--------|-------------|
| **Aide wage** | **$18.50** | **45¢** |
| LLC overhead & profit | $10.98 | 27¢ |
| MVES staff salaries | $6.35 | 16¢ |
| MVES other overhead | $3.14 | 8¢ |
| MVES benefits/payroll | $1.55 | 4¢ |
| MVES executive comp | $0.26 | 1¢ |
| **Total** | **$40.72** | **$1.00** |

### The Markup

```
Aide wage:                    $18.50/hr
State pays:                   $40.72/hr
Premium over wage:            $22.22/hr
Markup percentage:            $22.22 ÷ $18.50 = 120%
```

### Annualized (per aide FTE)

```
State pays for one aide-year:  $40.72 × 2,080 hours = $84,698
Aide receives:                 $18.50 × 2,080 hours = $38,480
Annual spread per aide:        $84,698 − $38,480 = $46,218
```

### Applied to MVES G0156 Volume

```
MVES G0156 billing (T-MSIS):               $84,095,464
MVES admin layer (27.6%):                  −$23,210,348
To LLCs (72.4%):                            $60,885,116
Estimated aide wages ($18.50 × 2.07M hrs): −$38,206,441
LLC overhead/profit:                         $22,678,675
```

---

## SCALE: ALL 28 ASAPS

MVES is one agency. From T-MSIS, the top G0156 billers:

| Agency | G0156 Billing |
|--------|--------------|
| Mystic Valley Elder Services | $84,095,464 |
| Elder Services of Cape Cod | $54,977,151 |
| AgeSpan Inc | $51,656,887 |
| Somerville-Cambridge Elder | $36,465,250 |
| Maestro-Connections Health | $27,061,030 |
| Old Colony Elderly Services | $26,323,889 |
| Minuteman Senior Services | $25,944,514 |
| Coastline Elderly Services | $21,014,618 |
| BayPath Elder Services | $13,460,915 |

CTHRU total across all Elder Affairs vendors (FY2021-2025): **~$3.4 billion**

---

## WHAT IS PROVED vs. WHAT IS ESTIMATED

| Claim | Status | Source |
|-------|--------|--------|
| State pays $40.72/hr for G0156 | **PROVED** | 101 CMR 350.04 |
| MVES billed $84M in G0156 | **PROVED** | CMS T-MSIS |
| State paid MVES $422.6M over 5 yrs | **PROVED** | CTHRU |
| 72.4% goes to subcontractors | **PROVED** | 990 Part IX Line 11g |
| Subcontractors are for-profit LLCs | **PROVED** | 990 Part VII-B |
| CEO earns $299K, 13 staff >$100K | **PROVED** | 990 Schedule J |
| Aides earn ~$18.50/hr statewide | **PROVED** | BLS OES |
| LLC overhead rate | **ESTIMATED** | Industry standard 40-60%; exact rate available via CHIA PRR (957 CMR 6.00) |
| Aide sees 45¢ of every $1 | **ESTIMATED** | Depends on LLC layer; MVES layer (28¢) is proved |

---

## HOW TO VERIFY EVERY NUMBER

| Claim | Go To | Search For |
|-------|-------|-----------|
| G0156 rate | mass.gov → Regulations → 101 CMR 350.00 | "350.04" rate table |
| MVES Medicaid billing | data.medicaid.gov | NPI 1578683694 |
| State payments | cthru.data.socrata.com | Vendor: "Mystic Valley Elder" |
| 990 expenses | projects.propublica.org/nonprofits | EIN 04-2562646 |
| Exec compensation | Same 990 → Schedule J | Part II |
| Aide wages | bls.gov/oes | SOC 31-1120 → Massachusetts |
| LLC cost reports | chiamass.gov → Public Records | Request NSR for the LLCs |
| ASAP legal structure | malegislature.gov | MGL c. 19A § 4B |
| Rate-setting authority | malegislature.gov | Acts of 2008, Chapter 257 |

---

*All figures from public government documents. Analysis date: 3/10/2026.*
*Repository: github.com/duncanburns2013-dot/HHS-MA-DOGE*
