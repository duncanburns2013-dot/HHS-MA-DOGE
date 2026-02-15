import csv, os

for year in ['2022','2023','2024','2025']:
    fname = f'eohhs_fy{year}.csv'
    if not os.path.exists(fname):
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        part = 1
        rows = []
        for i, row in enumerate(reader, 1):
            rows.append(row)
            if i % 300000 == 0:
                outname = f'eohhs_fy{year}_part{part}.csv'
                with open(outname, 'w', newline='', encoding='utf-8') as out:
                    w = csv.writer(out)
                    w.writerow(header)
                    w.writerows(rows)
                print(f'Saved {outname} ({len(rows)} rows)')
                rows = []
                part += 1
        if rows:
            outname = f'eohhs_fy{year}_part{part}.csv'
            with open(outname, 'w', newline='', encoding='utf-8') as out:
                w = csv.writer(out)
                w.writerow(header)
                w.writerows(rows)
            print(f'Saved {outname} ({len(rows)} rows)')
