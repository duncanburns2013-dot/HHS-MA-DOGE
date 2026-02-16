import csv

# Load MA NPIs
print('Loading MA NPIs...')
ma_npis = set()
with open(r'C:\Users\dunca\Downloads\Contact person\ma_npis.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        ma_npis.add(row[0])
print(f'  {len(ma_npis):,} MA NPIs loaded')

# Filter DOGE data
print('Filtering 227M rows to MA only...')
infile = r'C:\Users\dunca\Downloads\Medicaid Provider Spending\medicaid-provider-spending.csv'
outfile = r'C:\Users\dunca\Downloads\Contact person\HHS-MA-DOGE\ma_medicaid_provider_spending.csv'

count = 0
ma_count = 0
with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    with open(outfile, 'w', newline='', encoding='utf-8') as out:
        writer = csv.writer(out)
        writer.writerow(header)
        for row in reader:
            count += 1
            if row[0] in ma_npis or row[1] in ma_npis:
                writer.writerow(row)
                ma_count += 1
            if count % 10000000 == 0:
                print(f'  {count:,} rows... MA: {ma_count:,}')

print(f'Done. Total: {count:,} | MA rows: {ma_count:,}')
