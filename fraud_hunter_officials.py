"""
MA MEDICAID FRAUD HUNTER -- Shared Authorized Official Detection
================================================================
Finds cases where the SAME person is the authorized official
for MULTIPLE NPIs -- especially at different addresses.

This is how Brooklyn's T1019 fraud network was mapped.
Same name, same person, different shell companies, billions in billing.

USAGE:
  cd C:/Users/dunca/Downloads/Contact person/HHS-MA-DOGE
  python fraud_hunter_officials.py

REQUIRES: Run fraud_hunter_addresses.py first (creates ma_npis_with_addresses.csv)
"""

import csv
import os
from collections import defaultdict

MA_NPI_EXTRACT = r"C:\Users\dunca\Downloads\Contact person\ma_npis_with_addresses.csv"
MA_SPENDING_FILE = r"C:\Users\dunca\Downloads\Contact person\HHS-MA-DOGE\ma_medicaid_provider_spending.csv"
OUTPUT_DIR = r"C:\Users\dunca\Downloads\Contact person\HHS-MA-DOGE"


def main():
    print("=" * 60)
    print("  MA-DOGE FRAUD HUNTER -- Shared Authorized Officials")
    print("=" * 60)
    
    if not os.path.exists(MA_NPI_EXTRACT):
        print(f"[X] Run fraud_hunter_addresses.py first to create {MA_NPI_EXTRACT}")
        return
    
    # Load spending
    print("\n[1] Loading MA Medicaid spending...")
    npi_spending = {}
    with open(MA_SPENDING_FILE, 'r', encoding='utf-8') as f:
        for row in csv.DictReader(f):
            npi = row.get('BILLING_PROVIDER_NPI_NUM', '').strip()
            try:
                paid = float(row.get('TOTAL_PAID', 0))
            except:
                continue
            npi_spending[npi] = npi_spending.get(npi, 0) + paid
    print(f"   {len(npi_spending):,} billing NPIs loaded")
    
    # Load NPI info
    print("\n[2] Loading MA NPI registry...")
    npi_info = {}
    with open(MA_NPI_EXTRACT, 'r', encoding='utf-8') as f:
        for row in csv.DictReader(f):
            npi_info[row['npi']] = row
    print(f"   {len(npi_info):,} MA NPIs loaded")
    
    # Group by authorized official
    print("\n[3] Mapping authorized officials to NPIs...")
    official_to_npis = defaultdict(list)
    
    for npi, info in npi_info.items():
        auth_last = (info.get('auth_official_last', '') or '').strip().upper()
        auth_first = (info.get('auth_official_first', '') or '').strip().upper()
        if not auth_last:
            continue
        
        # Only include NPIs that are billing Medicaid
        spending = npi_spending.get(npi, 0)
        if spending <= 0:
            continue
        
        official_key = f"{auth_last}, {auth_first}"
        official_to_npis[official_key].append({
            'npi': npi,
            'org_name': info.get('org_name', ''),
            'dba': info.get('dba_name', ''),
            'address': info.get('address1', ''),
            'city': info.get('city', ''),
            'zip': info.get('zip', ''),
            'auth_title': info.get('auth_official_title', ''),
            'spending': spending,
        })
    
    # Filter to officials with 2+ NPIs
    multi = {k: v for k, v in official_to_npis.items() if len(v) >= 2}
    
    # Sort by total spending under their control
    ranked = sorted(multi.items(), key=lambda x: -sum(e['spending'] for e in x[1]))
    
    print(f"   {len(official_to_npis):,} unique authorized officials billing Medicaid")
    print(f"   {len(multi):,} officials controlling 2+ NPIs")
    
    total_controlled = sum(sum(e['spending'] for e in v) for _, v in ranked)
    print(f"   ${total_controlled:,.0f} total under multi-NPI officials")
    
    # Check for officials with NPIs at DIFFERENT addresses (strongest flag)
    diff_addr_officials = []
    for official, npis in ranked:
        addrs = set()
        for n in npis:
            addr_norm = f"{n['address'].upper().strip()[:30]}|{n['city'].upper().strip()}"
            addrs.add(addr_norm)
        if len(addrs) > 1:
            diff_addr_officials.append((official, npis, len(addrs)))
    
    print(f"   {len(diff_addr_officials):,} officials with NPIs at DIFFERENT addresses <- STRONGEST FLAG")
    
    # Print ALL officials
    print(f"\n{'='*60}")
    print(f"  ALL {len(ranked):,} AUTHORIZED OFFICIALS BY TOTAL MEDICAID CONTROL")
    print(f"{'='*60}")
    
    for i, (official, npis, *_) in enumerate(ranked, 1):
        total = sum(e['spending'] for e in npis)
        addrs = set(f"{n['address']}, {n['city']}" for n in npis)
        multi_addr = " [!] MULTIPLE ADDRESSES" if len(addrs) > 1 else ""
        
        print(f"\n  #{i}: {official} -- {len(npis)} NPIs -- ${total:,.0f}{multi_addr}")
        for n in sorted(npis, key=lambda x: -x['spending']):
            dba = f" dba {n['dba']}" if n['dba'] else ""
            print(f"       NPI {n['npi']}: {n['org_name']}{dba}")
            print(f"         ${n['spending']:,.0f} | {n['address']}, {n['city']} {n['zip']}")
    
    # Write CSV
    outfile = os.path.join(OUTPUT_DIR, "fraud_flags_shared_officials.csv")
    with open(outfile, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'rank', 'authorized_official', 'num_npis', 'total_spending',
            'num_unique_addresses', 'different_addresses_flag',
            'npi', 'org_name', 'dba', 'npi_spending',
            'address', 'city', 'zip', 'auth_title'
        ])
        for rank, (official, npis) in enumerate(ranked, 1):
            addrs = set(f"{n['address']}|{n['city']}" for n in npis)
            total = sum(e['spending'] for e in npis)
            for n in sorted(npis, key=lambda x: -x['spending']):
                writer.writerow([
                    rank, official, len(npis), f"{total:.2f}",
                    len(addrs), 'YES' if len(addrs) > 1 else '',
                    n['npi'], n['org_name'], n['dba'], f"{n['spending']:.2f}",
                    n['address'], n['city'], n['zip'], n['auth_title']
                ])
    
    print(f"\n[OK] Saved: {outfile}")
    
    # Write different-address report
    diff_file = os.path.join(OUTPUT_DIR, "fraud_flags_different_addresses.txt")
    with open(diff_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("STRONGEST FLAG: Same Official, Different Addresses, Multiple NPIs\n")
        f.write(f"Total flagged: {len(diff_addr_officials):,}\n")
        f.write("=" * 80 + "\n\n")
        
        for i, (official, npis, num_addrs) in enumerate(diff_addr_officials, 1):
            total = sum(e['spending'] for e in npis)
            f.write(f"#{i}: {official} -- {len(npis)} NPIs at {num_addrs} addresses -- ${total:,.0f}\n")
            for n in sorted(npis, key=lambda x: -x['spending']):
                dba = f" dba {n['dba']}" if n['dba'] else ""
                f.write(f"    NPI {n['npi']}: {n['org_name']}{dba}\n")
                f.write(f"      ${n['spending']:,.0f} | {n['address']}, {n['city']} {n['zip']}\n")
            f.write("\n")
    
    print(f"[OK] Saved: {diff_file}")
    print(f"\n   fraud_flags_shared_officials.csv     -- all multi-NPI officials")
    print(f"   fraud_flags_different_addresses.txt  -- STRONGEST: same person, different locations")
    print(f"\n   Hand these to your fraud hunters. The different-address file is where you start.")


if __name__ == '__main__':
    main()
