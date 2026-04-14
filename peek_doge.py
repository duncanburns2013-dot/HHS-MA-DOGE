import csv

infile = r'C:\Users\dunca\Downloads\Medicaid Provider Spending\medicaid-provider-spending.csv'
with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        print(row)
        if i >= 5:
            break
