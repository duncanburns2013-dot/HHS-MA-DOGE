# HHS-MA-DOGE

**Massachusetts Medicaid & Healthcare Political Influence Investigation**

Public records research into the intersection of Massachusetts healthcare/Medicaid spending, lobbying registrations, campaign finance (OCPF), and nonprofit executive compensation (IRS 990).

---

## What This Is

A systematic investigation tracing how Massachusetts healthcare entities — hospitals, insurers, behavioral health providers, unions, and trade associations — use lobbying, campaign donations, and PAC expenditures to influence the legislators and agencies that control their funding. All data from public sources.

## Chat Sessions

This investigation was conducted across multiple Claude AI chat sessions. Full transcripts are preserved in `transcripts/` for reproducibility and audit.

### Session 1: T-MSIS + CTHRU + Fraud Cases (Chat 03812535)
- T-MSIS Medicaid billing analysis ($31B dataset)
- CTHRU vendor payment analysis (DDS, DMH, EOHHS)
- Fraud case cross-references
- Investigation dashboards
- 990 executive compensation
- *Transcript: preserved in prior repo version*

### Session 2: OCPF + Lobbying + PAC Analysis (This repo's transcripts)
Entities analyzed:
1. **Riverside Community Care** — $34.6K OCPF, ~$127K lobbying, revolving door CEO
2. **Beth Israel Lahey Health (BILH)** — $52.5K OCPF, $1.92M lobbying
3. **Point32Health** — $63.3K OCPF, $2.43M lobbying, $1.54M unexplained operating expenses
4. **Fallon Health** — $431K OCPF (contaminated), $857K lobbying
5. **Stavros Center** — $693K OCPF (99% union PAC deductions from PCAs)
6. **1199SEIU** — $14.09M PAC expenditures, complete money circuit mapped
7. **Northeast Arc** — $6.8K OCPF, $733M T-MSIS billing, minimal political footprint
8. **MHA/MHAPAC** — $380K PAC pass-through from hospital executives to legislators

### Session 3: Eliot Community Human Services (Current)
9. **Eliot CHS** — $142K OCPF, $1.62M lobbying, $6.6M+ no-bid migrant shelter contracts, CEO donated to Governor while receiving contracts

## Data Sources

| Source | What | URL |
|---|---|---|
| MA OCPF | Campaign finance donations | ocpf.us |
| MA Secretary of State | Lobbyist registrations & disclosure | sec.state.ma.us/lobbyistpublicsearch |
| IRS Form 990 | Nonprofit financials & exec comp | projects.propublica.org/nonprofits |
| MA CTHRU | State vendor payments | cthru.data.socrata.com |
| CMS T-MSIS | Medicaid billing data | data.medicaid.gov |
| Boston Herald | No-bid contract reporting | bostonherald.com |
| Fall River Reporter | Migrant shelter investigation | fallriverreporter.com |

## Key Findings

### 1. Registered Lobbyists Donate to Their Own Targets
Multiple entities show registered lobbyists making personal campaign contributions to the same legislators they are paid to influence (Riverside, BILH, Point32Health, Eliot).

### 2. Union PAC Payroll Deduction Machine
SEIU Local 509 and 1199SEIU harvest hundreds of thousands in automatic payroll deductions from low-wage healthcare workers (PCAs, behavioral health specs) — $2-$18 per paycheck — funneling it into PACs that fund Democratic legislative infrastructure. Workers at Stavros ($693K), Eliot ($132K), and across the PCA workforce feed this system.

### 3. Hospital Industry Pass-Through PAC
Individual hospital executives donate to MHA (trade association), which operates MHAPAC, which distributes to ALL legislative leadership (bipartisan). The PAC launders individual hospital influence into industry-wide political spending.

### 4. No-Bid Contract → CEO Donation → Revenue Explosion
Eliot CHS CEO donated $1,000 to Governor Healey while operating three migrant shelter hotels under no-bid EOHHS contracts. Revenue jumped $100M in two years.

### 5. Revolving Door
Riverside CEO Vic DiGravio came from the ABH trade association (lobbying org) to run a provider. Eliot former CEO Kathleen Markarian transitioned to a $280K "External Affairs Liaison" role managing political relationships.

## Repository Structure

```
HHS-MA-DOGE/
├── README.md                     # This file
├── transcripts/                  # Full AI chat transcripts (reproducibility)
│   ├── journal.txt              # Index of all transcripts
│   └── *.txt                    # Individual session transcripts
└── entities/
    └── eliot/                   # Eliot Community Human Services
        ├── ELIOT-ANALYSIS.md    # Complete written analysis
        ├── lobbying-pdfs/       # 8 PDFs from MA SOS Lobbyist Search
        └── ocpf-data/           # Raw OCPF export (27,229 records)
```

## Status

🔴 **Active investigation** — Additional entities pending analysis. Dashboard consolidation planned.

## License

Public records analysis. All underlying data from government sources.
