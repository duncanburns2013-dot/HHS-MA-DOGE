import os
for n in ['18','19']:
    fname = r'C:\Users\dunca\Downloads\checkbook_data_2026-02-15 (' + n + r').csv'
    size = os.path.getsize(fname)
    print(n + ': ' + str(size) + ' bytes')
