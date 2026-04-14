import csv
for n in ['21','22','23','24','25']:
    fname = r'C:\Users\dunca\Downloads\checkbook_data_2026-02-15 (' + n + r').csv'
    with open(fname, 'r') as f:
        reader = csv.DictReader(f)
        row = next(reader)
        print(n + ': FY' + row.get('Budget_Fiscal_Year','?') + ' - ' + row.get('Department','?'))
