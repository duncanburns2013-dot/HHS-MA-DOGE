import csv

infile = r'C:\Users\dunca\Downloads\Medicaid Provider Spending\medicaid-provider-spending.csv'
npis = set()
count = 0
with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        npis.add(row['BILLING_PROVIDER_NPI_NUM'])
        count += 1
        if count % 10000000 == 0:
            print(f'  {count:,} rows... {len(npis):,} unique NPIs')

print(f'Total rows: {count:,}')
print(f'Unique billing NPIs: {len(npis):,}')
with open('all_npis.txt', 'w') as f:
    for npi in sorted(npis):
        f.write(npi + '\n')
print('Saved all_npis.txt')
