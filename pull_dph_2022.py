import urllib.request, json, csv, time

base = 'https://cthru.data.socrata.com/resource/pegc-naaa.json'
offset = 0
all_rows = []
while True:
    url = base + '?%24limit=50000&%24offset=' + str(offset) + "&%24where=department_code%3D'DPH'%20AND%20budget_fiscal_year%3D'2022'"
    data = json.loads(urllib.request.urlopen(url).read())
    if not data:
        break
    all_rows.extend(data)
    offset += 50000
    print('Fetched ' + str(len(data)) + ' rows (total: ' + str(len(all_rows)) + ')')
    time.sleep(1)

with open('data/cthru/dph/dph_fy2022.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=all_rows[0].keys())
    w.writeheader()
    w.writerows(all_rows)
print('Saved dph_fy2022.csv (' + str(len(all_rows)) + ' rows)')
