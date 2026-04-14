# FRAUD DETECTION × MARKUP ANALYSIS — Cross-Reference

## The Same Structure That Creates the Markup Also Enables Fraud

The two-layer billing system — nonprofit ASAP → for-profit LLC → aide — isn't just expensive. It's the exact structural pattern that Medicaid fraud exploits. The fraud detection analysis (T-MSIS + NPPES, 491 targets, $15.6B) identified **49 elder/home care targets totaling $2.1 billion.**

---

## THE TWO CATEGORIES

### Category 1: ASAPs Themselves (the nonprofit middlemen)

These are the same entities from the markup analysis. They're flagged because one person controls multiple NPIs billing identical service codes — a pattern that's structural for ASAPs (multiple service lines) but also how fraud shells operate.

| Priority | ASAP | City | Total Medicaid | Controller | G0156 Billing |
|----------|------|------|---------------|-----------|--------------|
| **P1** | **Mystic Valley Elder Svc** | Malden | **$247,817,344** | Sean Hubacz | $84,095,464 |
| **P1** | **Central Boston Elder Svc** | Roxbury | **$207,251,049** | Evens Bontemps | TBD |
| **P1** | **Old Colony Elderly Svc** | Brockton | **$157,920,857** | Diana DiGiorgi | $26,323,889 |
| **P1** | **Somerville-Cambridge Elder** | Somerville | **$118,686,097** | John O'Neill | $36,465,250 |
| **P1** | **Coastline Elderly Svc** | New Bedford | **$87,349,662** | Charles Sisson | $21,014,618 |
| P2 | BayPath Elder Svc | Marlborough | $53,270,029 | Christine Alessandro | $13,460,915 |
| P2 | Elder Svc of Berkshire | Pittsfield | $36,647,961 | Christopher McLaughlin | TBD |
| P2 | Elder Svc of Worcester | Worcester | $11,766,195 | Mary Baltramaitis | TBD |
| P3 | Springwell | Watertown | $193,088,269 | Kara Donellon | TBD |
| P3 | Greater Springfield Senior | Springfield | $85,228,186 | Patricia Young | TBD |
| P4 | Elder Svc Merrimack Valley | Lawrence | $114,070,143 | Adele Hammersley | TBD |
| P4 | WestMass Eldercare | Holyoke | $78,806,646 | Joanne Borkowski | TBD |
| P4 | Lynn Community Elder Svc | Lynn | $50,650,938 | David Libby | TBD |
| P4 | North Shore Elder Svc | Danvers | $13,069,614 | Paul Brindamour | TBD |
| P4 | Arbour Elder Services | Norwell | $7,918,694 | John Fletcher | TBD |
| P5 | Southwest Boston Senior | Jamaica Plain | $74,893,651 | Dale Mitchell | TBD |
| | **ASAP SUBTOTAL** | | **$1,538,434,333** | | |

### Category 2: For-Profit Home Care LLCs (the subcontractor layer)

These are the companies the ASAPs pass 72% of their money to. They're flagged for the same structural patterns — same person controlling multiple entities, billing identical codes — but as for-profits, they're operating for private gain.

| Priority | LLC | City | Total Medicaid | Controller | Flag |
|----------|-----|------|---------------|-----------|------|
| **P1** | **BSD Home Care Management LLC** | Westborough | **$22,564,234** | Azriel Lieberman (845 = NY) | Same person, same codes |
| **P1** | **City Home Care LLC** | Worcester | **$15,976,635** | Boris Lipskiy | Bills G0156, same person |
| **P1** | **All Care Homecare LLC** | New Bedford | **$14,355,330** | Schree Pettigrew | Owner bills individually too |
| **P1** | **Salmon Home Care LLC** | Milford | **$12,273,869** | Gary Sacon | Same person, same codes |
| **P1** | **Excel Home Care Services** | Wilbraham | **$11,525,576** | Rebecca Paquette | Home care + nursing, same person |
| **P1** | **Community Nurse Home Care** | Fairhaven | **$2,276,308** | Lisa Parent | Same person, same codes |
| P2 | Montachusett Home Care | Leominster | $42,596,967 | Margaret Woovis | Same person, multiple entities |
| P2 | Multicultural Home Care | Lynn | $22,432,656 | Gregory George | Same person |
| P2 | Sully Home Care Services | Avon | $16,674,012 | Osman Sully | Home care + transport |
| P2 | A Quality Home Care | Lawrence | $13,878,893 | Elizabeth Kaara | 5 entities, one address |
| P2 | Peace & Harmony Home Care | Foxboro | $11,067,685 | Clara Eleonu | Same person |
| P4 | **Comfort Home Care LLC** | Methuen | **$105,319,411** | Brandon Howes | $100M+ from one address |
| P4 | **Maestro-Connections Health** | Lawrence | **$62,635,689** | George Kiongera | Multiple LLCs |
| P4 | **Associated Home Care** | Beverly | **$53,408,308** | Agnes Manumbu | 9 entities, one address |
| P4 | RMG Home Care | Southbridge | $45,010,148 | Grace Rodriguez | Home care + adult day health |
| P4 | Golden Years Home Care | E. Longmeadow | $35,810,236 | Cesar Ruiz | Home care + behavioral health |
| P4 | International Health Solutions | Lawrence | $35,756,138 | Christine Asack | 12 entities, one address |
| P4 | Alliance Home Care VNA | Woburn | $12,349,060 | Francoise Charles | Home care + VNA |
| P4 | A&B Home Services | Newton | $3,609,824 | Boris Khanataev | Multiple entities |
| P4 | Abbey Rd Home Care | Mattapan | $3,174,213 | Brenda Rogers | Home care + social solutions |
| P4 | Avenue Homecare Services | Dracut | $1,288,956 | Francis Ngigi | Home care + chiropractic |
| P4 | America Home Care Center | Woburn | $871,636 | Frances Igiebor | 5 entities, one address |
| | **LLC SUBTOTAL** | | **$586,157,611** | | |

---

## THE CONNECTION TO THE MARKUP

The markup analysis (MARKUP-MATH.md) proved:

```
State pays:     $40.72/hr (G0156)
ASAP keeps:     $11.24/hr (27.6%)
LLC receives:   $29.48/hr (72.4%)
Aide earns:     $18.50/hr (45.4%)
LLC keeps:      $10.98/hr (27.0%)
```

The fraud detection analysis shows **who** is on the receiving end of that LLC layer: for-profit companies where one person controls multiple NPIs, billing identical codes, often from a single address. Some highlights:

**BSD Home Care Management LLC** — $22.6M, P1-HIGHEST
- CEO: Azriel Lieberman
- Phone: (845) 544-4089 — **845 is a New York area code**
- 2 NPIs, same person, same codes (H0043)
- Running a $22M Massachusetts Medicaid operation from what appears to be a New York phone number

**Comfort Home Care LLC** — $105.3M, P4-MEDIUM
- Located at same address as Greater Lawrence Family Health Center
- $105 million billed from one address in Methuen

**Associated Home Care** — $53.4M, P4-MEDIUM
- **9 entities at one address** in Beverly
- Home care + staffing company

**International Health Solutions** — $35.8M, P4-MEDIUM
- **12 entities at one address** in Lawrence

---

## APPLYING THE MARKUP TO FRAUD TARGETS

If the MVES markup structure (45¢ to aide, 55¢ to overhead) is similar at these for-profit LLCs:

| Category | Total Medicaid | Est. Aide Wages (45%) | Est. Overhead (55%) |
|----------|---------------|----------------------|-------------------|
| ASAPs (16 entities) | $1,538,434,333 | $698,577,221 | $839,857,112 |
| For-profit LLCs (22 entities) | $586,157,611 | $266,095,607 | $320,062,004 |
| **Total elder/home care targets** | **$2,124,591,944** | **$964,672,828** | **$1,159,919,116** |

**Caveat:** The 45/55 split is proved only for MVES. Other entities may differ. But the structural incentive is the same everywhere: per-unit billing + two-layer pass-through + no published LLC cost data = invisible markup.

---

## THE STRUCTURAL PROBLEM

The fraud detection spreadsheet shows that the same two-layer billing system that creates the 120% markup also creates the conditions for fraud:

1. **Per-unit billing** (G0156 at $10.18/unit) rewards volume, not outcomes
2. **Multiple NPIs per controller** lets one person split billing across entities to avoid detection thresholds
3. **ASAP can't employ aides** (MGL c. 19A § 4B) so money MUST flow to a second entity
4. **LLC cost reports aren't published** (957 CMR 6.00 — requires PRR) so overhead is invisible
5. **No wage pass-through tracking** (Chapter 257 requires 75% but never verifies)

The 491 fraud targets are the symptom. The legal structure is the disease.

---

## DATA

- `data/fraud-detection/Fraud_Detection.xlsx` — Full 491-target spreadsheet
- `data/fraud-detection/priority-targets.csv` — All targets as CSV
- `data/fraud-detection/elder-homecare-targets.csv` — 49 elder/home care targets
- `analysis/MARKUP-MATH.md` — The billing markup proof
- `analysis/LEGAL-FRAMEWORK.md` — The six laws that enable this structure

---

## SUMMARY TABLE

| Measure | Amount | Source |
|---------|--------|--------|
| Total fraud detection targets | 491 | T-MSIS + NPPES |
| Total Medicaid $ flagged | $15,629,053,451 | Fraud_Detection.xlsx |
| P1-HIGHEST targets | 32 | $1,171,003,724 |
| Elder/home care targets | 49 | $2,124,591,944 |
| G0156 rate per hour | $40.72 | 101 CMR 350.04 |
| Aide wage per hour | $18.50 | BLS OES |
| Markup over aide wage | 120% | MATH |
| ASAP admin layer (proved) | 27.6% | 990 Part IX |
| MVES subcontracting rate | 72.4% | 990 Part IX Line 11g |

---

*Sources: HHS T-MSIS (data.medicaid.gov), NPPES, IRS 990, CTHRU, 101 CMR 350.04, BLS OES*
*Analysis date: 3/10/2026*
