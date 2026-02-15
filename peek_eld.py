import csv
for n in ['5','6','7','8','9']:
    fname = r'C:\Users\dunca\Downloads\checkbook_data_2026-02-15 (' + n + r').csv'
    with open(fname, 'r') as f:
        reader = csv.DictReader(f)
        row = next(reader)
        year = row.get('Budget Fiscal Year', row.get('Fiscal Year', 'unknown'))
        dept = row.get('Department', 'unknown')
        print(n + ': FY' + str(year) + ' - ' + dept)
