import csv

infile = r'C:\Users\dunca\Downloads\NPPES\npidata_pfile_20050523-20260208.csv'
outfile = r'C:\Users\dunca\Downloads\Contact person\ma_npis.csv'

print('Extracting MA NPIs...')
count = 0
ma_count = 0
with open(infile, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    print('Columns: ' + str(len(header)))
    state_idx = None
    npi_idx = 0
    name_idx = None
    for i, col in enumerate(header):
        if 'state' in col.lower():
            print('  Col ' + str(i) + ': ' + col)
        if col == 'Provider Business Practice Location Address State Name':
            state_idx = i
        if col == 'NPI':
            npi_idx = i
        if 'Provider Organization Name' in col:
            name_idx = i
    print('NPI col: ' + str(npi_idx) + ' State col: ' + str(state_idx) + ' Name col: ' + str(name_idx))
    
    with open(outfile, 'w', newline='', encoding='utf-8') as out:
        out.write('npi,name\n')
        for row in reader:
            count += 1
            if state_idx and row[state_idx] == 'MA':
                npi = row[npi_idx]
                name = row[name_idx] if name_idx else ''
                out.write(npi + ',"' + name.replace('"','') + '"\n')
                ma_count += 1
            if count % 2000000 == 0:
                print('  ' + str(count) + ' rows... MA: ' + str(ma_count))

print('Done. Total: ' + str(count) + ' | MA NPIs: ' + str(ma_count))
