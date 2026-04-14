import csv
fname = r'C:\Users\dunca\Downloads\checkbook_data_2026-02-15 (19).csv'
with open(fname, 'r') as f:
    reader = csv.DictReader(f)
    row = next(reader)
    print('FY' + row.get('Budget_Fiscal_Year','?') + ' - ' + row.get('Department','?'))
