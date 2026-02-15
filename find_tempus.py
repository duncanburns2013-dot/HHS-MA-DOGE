import csv

known_ma = {
    '1376609297': 'TEMPUS UNLIMITED',
}

infile = r'C:\Users\dunca\Downloads\Medicaid Provider Spending\medicaid-provider-spending.csv'
outfile = r'C:\Users\dunca\Downloads\Contact person\tempus_doge.csv'

count = 0
found = 0
with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    with open(outfile, 'w', newline='', encoding='utf-8') as out:
        writer = csv.DictWriter(out, fieldnames=reader.fieldnames)
        writer.writeheader()
        for row in reader:
            if row['BILLING_PROVIDER_NPI_NUM'] == '1376609297':
                writer.writerow(row)
                found += 1
            count += 1
            if count % 50000000 == 0:
                print(f'  {count:,} rows... found {found} Tempus rows')

print(f'Done. Tempus rows: {found}')
