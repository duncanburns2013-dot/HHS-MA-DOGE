import csv

print('Loading MA NPIs...')
ma_npis = set()
with open(r'C:\Users\dunca\Downloads\Contact person\ma_npis.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        ma_npis.add(row['npi'])
print('Loaded ' + str(len(ma_npis)) + ' MA NPIs')

infile = r'C:\Users\dunca\Downloads\Medicaid Provider Spending\medicaid-provider-spending.csv'
outfile = r'C:\Users\dunca\Downloads\Contact person\ma_doge_provider_spending.csv'

print('Scanning 227M rows...')
count = 0
ma_count = 0
with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    with open(outfile, 'w', newline='', encoding='utf-8') as out:
        writer = csv.DictWriter(out, fieldnames=reader.fieldnames)
        writer.writeheader()
        for row in reader:
            count += 1
            if row['BILLING_PROVIDER_NPI_NUM'] in ma_npis:
                writer.writerow(row)
                ma_count += 1
            if count % 10000000 == 0:
                print('  ' + str(count) + ' rows... MA: ' + str(ma_count))

print('Done. Total: ' + str(count) + ' | MA rows: ' + str(ma_count))
print('Saved ma_doge_provider_spending.csv')
