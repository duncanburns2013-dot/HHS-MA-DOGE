import csv

print('Loading MA NPI names...')
npi_names = {}
with open(r'C:\Users\dunca\Downloads\Contact person\ma_npis.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['name']:
            npi_names[row['npi']] = row['name']

top_npis = [
    '1376609297','1750504064','1518096411','1134250475','1518098359',
    '1124304621','1245354000','1346218294','1992920417','1245414721',
    '1275752065','1831151455','1073730347','1528281532','1023140498',
    '1942339825','1023049236','1982735643','1487655064','1093826596',
    '1487603585','1609099910','1114058872','1386773273','1710087127',
    '1295869428','1447382817','1245364595','1205965258','1851422661'
]

print('TOP 30 MA MEDICAID PROVIDERS - IDENTIFIED:')
for npi in top_npis:
    name = npi_names.get(npi, 'UNKNOWN - individual provider?')
    print('  NPI ' + npi + ' = ' + name)
