import csv, os

infile = r'C:\Users\dunca\Downloads\Medicaid Provider Spending\medicaid-provider-spending.csv'
outfile = r'C:\Users\dunca\Downloads\Contact person\ma_medicaid_provider_spending.csv'

print('Reading 10GB file... this will take 10-20 minutes')
count = 0
ma_count = 0
with open(infile, 'r', encoding='utf-8') as fin:
    reader = csv.DictReader(fin)
    print(f'Columns: {reader.fieldnames}')
    with open(outfile, 'w', newline='', encoding='utf-8') as fout:
        writer = csv.DictWriter(fout, fieldnames=reader.fieldnames)
        writer.writeheader()
        for row in reader:
            count += 1
            state = row.get('state', row.get('State', row.get('STATE', row.get('submitting_state', ''))))
            if state in ('MA', 'Massachusetts', '25'):
                writer.writerow(row)
                ma_count += 1
            if count % 5000000 == 0:
                print(f'  Processed {count:,} rows... MA rows so far: {ma_count:,}')

print(f'Done. Total rows: {count:,} | MA rows: {ma_count:,}')
print(f'Saved to {outfile}')
