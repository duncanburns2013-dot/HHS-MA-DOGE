import json
import urllib.request
import csv

def fetch(url):
    req = urllib.request.urlopen(url)
    return json.loads(req.read())

base = 'https://cthru.data.socrata.com/resource/pegc-naaa.json'

for year in ['2022','2023','2024','2025']:
    print(f'\n=== EOHHS FY{year} ===')
    offset = 0
    all_rows = []
    while True:
        url = f"{base}?%24limit=50000&%24offset={offset}&%24where=department_code%3D'EHS'%20AND%20budget_fiscal_year%3D'{year}'"
        data = fetch(url)
        if not data:
            break
        all_rows.extend(data)
        print(f'  Fetched {len(data)} rows (total: {len(all_rows)})')
        if len(data) < 50000:
            break
        offset += 50000

    vendors = {}
    total = 0
    for row in all_rows:
        try:
            amt = float(row['amount'])
        except:
            continue
        v = row.get('vendor','')
        vendors[v] = vendors.get(v, 0) + amt
        total += amt

    print(f'  Total:  | Rows: {len(all_rows):,} | Vendors: {len(vendors):,}')
    print(f'  Top 20:')
    for i, (v, a) in enumerate(sorted(vendors.items(), key=lambda x: -x[1])[:20], 1):
        print(f'    {i:>3}.   {v}')

    fname = f'eohhs_fy{year}.csv'
    with open(fname, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=all_rows[0].keys())
        w.writeheader()
        w.writerows(all_rows)
    print(f'  Saved {fname}')
