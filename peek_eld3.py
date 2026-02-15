import csv
for n in ['5','6','7','8','9']:
    fname = r'C:\Users\dunca\Downloads\checkbook_data_2026-02-15 (' + n + r').csv'
    with open(fname, 'r') as f:
        reader = csv.DictReader(f)
        row = next(reader)
        print(n + ': FY' + row['Budget_Fiscal_Year'])
