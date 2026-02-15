import csv
from collections import defaultdict

npi_names = {}
with open(r'C:\Users\dunca\Downloads\Contact person\ma_npis.csv', 'r') as f:
    for row in csv.DictReader(f):
        if row['name']:
            npi_names[row['npi']] = row['name']

infile = r'C:\Users\dunca\Downloads\Contact person\ma_doge_provider_spending.csv'
providers = defaultdict(lambda: {'total': 0, 'codes': defaultdict(float), 'claims': 0, 'benes': 0})

with open(infile, 'r') as f:
    for row in csv.DictReader(f):
        try:
            paid = float(row['TOTAL_PAID'])
            claims = int(row['TOTAL_CLAIMS'])
            benes = int(row['TOTAL_UNIQUE_BENEFICIARIES'])
        except:
            continue
        npi = row['BILLING_PROVIDER_NPI_NUM']
        code = row['HCPCS_CODE']
        providers[npi]['total'] += paid
        providers[npi]['codes'][code] += paid
        providers[npi]['claims'] += claims
        providers[npi]['benes'] = max(providers[npi]['benes'], benes)

with open(r'C:\Users\dunca\Downloads\Contact person\HHS-MA-DOGE\data\ma_doge_top200.csv', 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['rank','npi','name','total_paid','total_claims','max_beneficiaries','top_code','top_code_paid'])
    for i, (npi, d) in enumerate(sorted(providers.items(), key=lambda x: -x[1]['total'])[:200], 1):
        name = npi_names.get(npi, 'INDIVIDUAL/UNKNOWN')
        top_code = max(d['codes'].items(), key=lambda x: x[1])
        w.writerow([i, npi, name, round(d['total'],2), d['claims'], d['benes'], top_code[0], round(top_code[1],2)])

print('Saved top 200 MA providers to ma_doge_top200.csv')
print('Top 10:')
for i, (npi, d) in enumerate(sorted(providers.items(), key=lambda x: -x[1]['total'])[:10], 1):
    name = npi_names.get(npi, 'UNKNOWN')
    m = d['total'] / 1e6
    top_code = max(d['codes'].items(), key=lambda x: x[1])
    print('  ' + str(i) + '. ' + str(round(m,0)) + 'M - ' + name + ' (top code: ' + top_code[0] + ')')
