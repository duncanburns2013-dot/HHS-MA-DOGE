import csv
from collections import defaultdict

infile = r'C:\Users\dunca\Downloads\Contact person\ma_doge_provider_spending.csv'

providers = defaultdict(float)
codes = defaultdict(float)
total = 0
rows = 0

with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            paid = float(row['TOTAL_PAID'])
        except:
            continue
        npi = row['BILLING_PROVIDER_NPI_NUM']
        code = row['HCPCS_CODE']
        providers[npi] += paid
        codes[code] += paid
        total += paid
        rows += 1

tb = total / 1e9
print('MA DOGE DATA SUMMARY')
print('Total rows: ' + str(rows))
print('Total paid: ' + str(round(tb, 2)) + ' BILLION')
print('Unique providers: ' + str(len(providers)))
print('Unique procedure codes: ' + str(len(codes)))

print('\nTOP 30 PROVIDERS BY TOTAL PAID:')
for i, (npi, amt) in enumerate(sorted(providers.items(), key=lambda x: -x[1])[:30], 1):
    m = amt / 1e6
    print('  ' + str(i) + '. ' + str(round(m, 1)) + 'M - NPI ' + npi)

print('\nTOP 30 PROCEDURE CODES BY TOTAL PAID:')
for i, (code, amt) in enumerate(sorted(codes.items(), key=lambda x: -x[1])[:30], 1):
    m = amt / 1e6
    print('  ' + str(i) + '. ' + str(round(m, 1)) + 'M - ' + code)
