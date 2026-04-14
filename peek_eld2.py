import csv
fname = r'C:\Users\dunca\Downloads\checkbook_data_2026-02-15 (5).csv'
with open(fname, 'r') as f:
    reader = csv.DictReader(f)
    print(reader.fieldnames)
    row = next(reader)
    for k, v in row.items():
        if 'year' in k.lower() or 'fiscal' in k.lower():
            print(k + ' = ' + v)
