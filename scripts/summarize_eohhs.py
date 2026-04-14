import csv
import json

for year in ['2022','2023','2024','2025']:
    fname = f'eohhs_fy{year}.csv'
    print(f'\n=== EOHHS FY{year} ===')
    vendors = {}
    total = 0
    with open(fname, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                amt = float(row['amount'])
            except:
                continue
            v = row.get('vendor','')
            vendors[v] = vendors.get(v, 0) + amt
            total += amt
    
    print(f'Total:  | Vendors: {len(vendors):,}')
    print(f'Top 30:')
    top = sorted(vendors.items(), key=lambda x: -x[1])[:30]
    for i, (v, a) in enumerate(top, 1):
        print(f'  {i:>3}.   {v}')
    
    with open(f'eohhs_fy{year}_summary.csv', 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['vendor','amount','year'])
        for v, a in sorted(vendors.items(), key=lambda x: -x[1])[:200]:
            w.writerow([v, round(a, 2), year])

print('\nSaved summary CSVs (top 200 vendors per year)')
