"""
MA MEDICAID FRAUD HUNTER -- Shared Address Detection
=====================================================
Cross-references NPPES provider addresses against HHS Medicaid billing data
to find multiple NPIs billing from the same address.

WHY THIS MATTERS:
- Multiple NPIs at the same address = possible entity proliferation
- Shell companies often share an address with a parent org
- Same authorized official + same address + different NPIs = red flag
- Brooklyn's T1019 fraud was caught exactly this way

WHAT YOU NEED (already on your machine):
1. NPPES bulk file: npidata_pfile_20050523-20260208.csv (10.9 GB)
2. MA Medicaid spending: ma_medicaid_provider_spending.csv (from DOGE data)

USAGE:
  cd C:/Users/dunca/Downloads/Contact person/HHS-MA-DOGE
  python fraud_hunter_addresses.py

OUTPUT:
  - fraud_flags_shared_addresses.csv  (all flagged addresses)
  - fraud_flags_summary.csv           (sorted by total $ at each address)
  - fraud_flags_top50.txt             (human-readable top 50 report)

Author: Duncan Burns / Haverhill, MA
Project: github.com/duncanburns2013-dot/HHS-MA-DOGE
"""

import csv
import os
import sys
from collections import defaultdict

# ============================================================
# CONFIG -- Update these paths if your files are elsewhere
# ============================================================
NPPES_FILE = r"C:\Users\dunca\Downloads\NPPES\npidata_pfile_20050523-20260208.csv"
MA_SPENDING_FILE = r"C:\Users\dunca\Downloads\Contact person\HHS-MA-DOGE\ma_medicaid_provider_spending.csv"
# If you already extracted MA NPIs to a separate file with addresses, set this:
MA_NPI_EXTRACT = r"C:\Users\dunca\Downloads\Contact person\ma_npis_with_addresses.csv"

OUTPUT_DIR = r"C:\Users\dunca\Downloads\Contact person\HHS-MA-DOGE"

# ============================================================
# STEP 1: Extract MA NPIs with FULL address info from NPPES
# ============================================================
def extract_ma_npis_with_addresses():
    """Pull NPI, name, address, city, state, zip, authorized official from NPPES."""
    outfile = MA_NPI_EXTRACT
    
    if os.path.exists(outfile):
        print(f"[STEP 1] MA NPI extract already exists: {outfile}")
        count = sum(1 for _ in open(outfile, encoding='utf-8')) - 1
        print(f"         {count:,} MA NPIs with addresses on file.")
        return outfile
    
    print(f"[STEP 1] Extracting MA NPIs with addresses from NPPES...")
    print(f"         Source: {NPPES_FILE}")
    print(f"         This reads 10.9 GB -- may take 5-10 minutes...")
    
    # NPPES column indices we need (from the 330-column file):
    # Col 0:  NPI
    # Col 4:  Provider Organization Name (Legal Business Name)
    # Col 5:  Provider Last Name (if individual)
    # Col 6:  Provider First Name (if individual)
    # Col 8:  Provider Name Prefix Text
    # Col 10: Provider Other Organization Name (DBA)
    # Col 15: Provider Other Last Name (if individual)
    # Col 20: Entity Type Code (1=Individual, 2=Organization)
    # Col 28: Provider Business Practice Location Address Line 1
    # Col 29: Provider Business Practice Location Address Line 2
    # Col 30: Provider Business Practice Location City
    # Col 31: Provider Business Practice Location State
    # Col 32: Provider Business Practice Location Zip Code
    # Col 33: Provider Business Practice Location Country Code
    # Col 34: Provider Business Practice Location Telephone Number
    # Col 307: Authorized Official Last Name
    # Col 308: Authorized Official First Name
    # Col 309: Authorized Official Middle Name
    # Col 310: Authorized Official Title
    # Col 311: Authorized Official Telephone Number
    
    COL_NPI = 0
    COL_ORG_NAME = 4
    COL_LAST = 5
    COL_FIRST = 6
    COL_DBA = 10
    COL_ENTITY_TYPE = 15
    COL_ADDR1 = 28
    COL_ADDR2 = 29
    COL_CITY = 30
    COL_STATE = 31
    COL_ZIP = 32
    COL_PHONE = 34
    COL_AUTH_LAST = 307
    COL_AUTH_FIRST = 308
    COL_AUTH_TITLE = 310
    
    count = 0
    ma_count = 0
    
    with open(NPPES_FILE, 'r', encoding='utf-8', errors='replace') as f:
        reader = csv.reader(f)
        header = next(reader)
        
        # Verify columns
        print(f"         Columns in file: {len(header)}")
        
        # Auto-detect column indices by name (safer than hardcoded)
        col_map = {}
        for i, h in enumerate(header):
            col_map[h] = i
        
        idx_npi = col_map.get('NPI', COL_NPI)
        idx_org = col_map.get('Provider Organization Name (Legal Business Name)', COL_ORG_NAME)
        idx_last = col_map.get('Provider Last Name (Legal Name)', COL_LAST)
        idx_first = col_map.get('Provider First Name', COL_FIRST)
        idx_dba = col_map.get('Provider Other Organization Name', COL_DBA)
        idx_entity = col_map.get('Entity Type Code', COL_ENTITY_TYPE)
        idx_addr1 = col_map.get('Provider First Line Business Practice Location Address', COL_ADDR1)
        idx_addr2 = col_map.get('Provider Second Line Business Practice Location Address', COL_ADDR2)
        idx_city = col_map.get('Provider Business Practice Location Address City Name', COL_CITY)
        idx_state = col_map.get('Provider Business Practice Location Address State Name', COL_STATE)
        idx_zip = col_map.get('Provider Business Practice Location Address Postal Code', COL_ZIP)
        idx_phone = col_map.get('Provider Business Practice Location Address Telephone Number', COL_PHONE)
        
        # Authorized official columns
        idx_auth_last = col_map.get('Authorized Official Last Name', COL_AUTH_LAST)
        idx_auth_first = col_map.get('Authorized Official First Name', COL_AUTH_FIRST)
        idx_auth_title = col_map.get('Authorized Official Title or Position', COL_AUTH_TITLE)
        
        with open(outfile, 'w', newline='', encoding='utf-8') as out:
            writer = csv.writer(out)
            writer.writerow([
                'npi', 'org_name', 'dba_name', 'last_name', 'first_name',
                'entity_type', 'address1', 'address2', 'city', 'state', 'zip',
                'phone', 'auth_official_last', 'auth_official_first', 'auth_official_title'
            ])
            
            for row in reader:
                count += 1
                if count % 2000000 == 0:
                    print(f"         {count:,} rows scanned... MA: {ma_count:,}")
                
                try:
                    if row[idx_state] == 'MA':
                        writer.writerow([
                            row[idx_npi],
                            row[idx_org],
                            row[idx_dba] if idx_dba < len(row) else '',
                            row[idx_last],
                            row[idx_first],
                            row[idx_entity],
                            row[idx_addr1] if idx_addr1 < len(row) else '',
                            row[idx_addr2] if idx_addr2 < len(row) else '',
                            row[idx_city] if idx_city < len(row) else '',
                            row[idx_state],
                            row[idx_zip] if idx_zip < len(row) else '',
                            row[idx_phone] if idx_phone < len(row) else '',
                            row[idx_auth_last] if idx_auth_last < len(row) else '',
                            row[idx_auth_first] if idx_auth_first < len(row) else '',
                            row[idx_auth_title] if idx_auth_title < len(row) else '',
                        ])
                        ma_count += 1
                except (IndexError, KeyError):
                    continue
    
    print(f"         DONE. Total scanned: {count:,} | MA NPIs extracted: {ma_count:,}")
    print(f"         Saved to: {outfile}")
    return outfile


# ============================================================
# STEP 2: Load MA Medicaid spending by NPI
# ============================================================
def load_ma_spending():
    """Load the DOGE Medicaid spending data filtered to MA."""
    print(f"\n[STEP 2] Loading MA Medicaid spending data...")
    print(f"         Source: {MA_SPENDING_FILE}")
    
    # Aggregate by billing NPI: total claims, total paid, codes used
    npi_spending = defaultdict(lambda: {'total_paid': 0, 'total_claims': 0, 
                                         'total_beneficiaries': 0, 'codes': set(),
                                         'months': set()})
    count = 0
    with open(MA_SPENDING_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            count += 1
            npi = row.get('BILLING_PROVIDER_NPI_NUM', '').strip()
            if not npi:
                continue
            try:
                paid = float(row.get('TOTAL_PAID', 0))
                claims = int(row.get('TOTAL_CLAIMS', 0))
                benes = int(row.get('TOTAL_UNIQUE_BENEFICIARIES', 0))
                code = row.get('HCPCS_CODE', '')
                month = row.get('CLAIM_FROM_MONTH', '')
            except (ValueError, TypeError):
                continue
            
            npi_spending[npi]['total_paid'] += paid
            npi_spending[npi]['total_claims'] += claims
            npi_spending[npi]['total_beneficiaries'] = max(npi_spending[npi]['total_beneficiaries'], benes)
            npi_spending[npi]['codes'].add(code)
            npi_spending[npi]['months'].add(month)
    
    print(f"         Loaded {count:,} rows -> {len(npi_spending):,} unique billing NPIs")
    
    # Top 10 by spending
    top = sorted(npi_spending.items(), key=lambda x: -x[1]['total_paid'])[:10]
    print(f"         Top 10 billers:")
    for npi, data in top:
        print(f"           NPI {npi}: ${data['total_paid']:,.0f} ({len(data['codes'])} codes)")
    
    return npi_spending


# ============================================================
# STEP 3: Cross-reference addresses -> find shared locations
# ============================================================
def find_shared_addresses(npi_extract_file, npi_spending):
    """Find addresses with multiple NPIs that are billing Medicaid."""
    print(f"\n[STEP 3] Cross-referencing addresses against Medicaid billing...")
    
    # Load NPI address data
    npi_info = {}
    with open(npi_extract_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            npi = row['npi']
            npi_info[npi] = row
    
    print(f"         {len(npi_info):,} MA NPIs with address data")
    
    # Normalize addresses for matching
    def normalize_addr(addr1, city, zip5):
        """Normalize address for comparison."""
        addr = (addr1 or '').upper().strip()
        # Standardize common abbreviations
        for old, new in [('STREET', 'ST'), ('AVENUE', 'AVE'), ('BOULEVARD', 'BLVD'),
                          ('DRIVE', 'DR'), ('ROAD', 'RD'), ('LANE', 'LN'),
                          ('SUITE', 'STE'), ('FLOOR', 'FL'), ('APARTMENT', 'APT'),
                          ('.', ''), (',', ''), ('  ', ' ')]:
            addr = addr.replace(old, new)
        city = (city or '').upper().strip()
        z = (zip5 or '')[:5]
        return f"{addr}|{city}|{z}"
    
    # Group NPIs by normalized address
    addr_to_npis = defaultdict(list)
    billing_npis = set(npi_spending.keys())
    
    matched = 0
    for npi, info in npi_info.items():
        if npi in billing_npis:
            matched += 1
            addr_key = normalize_addr(info.get('address1', ''), 
                                       info.get('city', ''), 
                                       info.get('zip', ''))
            if addr_key and addr_key != '||':
                addr_to_npis[addr_key].append(npi)
    
    print(f"         {matched:,} MA NPIs found in both NPPES and Medicaid billing")
    
    # Filter to addresses with multiple billing NPIs
    shared = {addr: npis for addr, npis in addr_to_npis.items() if len(npis) >= 2}
    print(f"         {len(shared):,} addresses with 2+ Medicaid-billing NPIs")
    
    # Calculate total spending per shared address
    flagged = []
    for addr_key, npis in shared.items():
        total_paid = sum(npi_spending[n]['total_paid'] for n in npis)
        total_claims = sum(npi_spending[n]['total_claims'] for n in npis)
        all_codes = set()
        for n in npis:
            all_codes.update(npi_spending[n]['codes'])
        
        # Get address details from first NPI
        sample_info = npi_info.get(npis[0], {})
        
        entities = []
        auth_officials = set()
        for n in npis:
            info = npi_info.get(n, {})
            name = info.get('org_name', '') or f"{info.get('first_name', '')} {info.get('last_name', '')}"
            dba = info.get('dba_name', '')
            auth = f"{info.get('auth_official_first', '')} {info.get('auth_official_last', '')}".strip()
            spending = npi_spending[n]['total_paid']
            entities.append({
                'npi': n,
                'name': name.strip(),
                'dba': dba.strip(),
                'spending': spending,
                'codes': ', '.join(sorted(npi_spending[n]['codes'])),
                'auth_official': auth,
                'auth_title': info.get('auth_official_title', ''),
                'phone': info.get('phone', ''),
            })
            if auth:
                auth_officials.add(auth)
        
        flagged.append({
            'address': sample_info.get('address1', ''),
            'city': sample_info.get('city', ''),
            'zip': sample_info.get('zip', ''),
            'addr_key': addr_key,
            'num_npis': len(npis),
            'total_paid': total_paid,
            'total_claims': total_claims,
            'num_codes': len(all_codes),
            'num_auth_officials': len(auth_officials),
            'same_auth_official': len(auth_officials) == 1 and len(npis) > 1,
            'entities': entities,
            'auth_officials': auth_officials,
        })
    
    # Sort by total spending (biggest $ first)
    flagged.sort(key=lambda x: -x['total_paid'])
    
    print(f"\n         === TOP 20 SHARED ADDRESSES BY TOTAL MEDICAID BILLING ===")
    for i, f in enumerate(flagged[:20], 1):
        auth_flag = " [!] SAME AUTH OFFICIAL" if f['same_auth_official'] else ""
        print(f"\n         #{i}: {f['address']}, {f['city']} {f['zip']}")
        print(f"             {f['num_npis']} NPIs | ${f['total_paid']:,.0f} total | {f['num_codes']} codes{auth_flag}")
        for e in f['entities']:
            auth_str = f" [Auth: {e['auth_official']}]" if e['auth_official'] else ""
            dba_str = f" (dba {e['dba']})" if e['dba'] else ""
            print(f"               NPI {e['npi']}: {e['name']}{dba_str} -- ${e['spending']:,.0f}{auth_str}")
    
    return flagged


# ============================================================
# STEP 4: Generate fraud flag reports
# ============================================================
def generate_reports(flagged, npi_info_file):
    """Write CSV and human-readable reports."""
    print(f"\n[STEP 4] Generating reports...")
    
    # --- CSV: All flagged addresses (one row per NPI at a shared address) ---
    detail_file = os.path.join(OUTPUT_DIR, "fraud_flags_shared_addresses.csv")
    with open(detail_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'rank', 'address', 'city', 'zip',
            'npis_at_address', 'total_paid_at_address', 'same_auth_official_flag',
            'npi', 'entity_name', 'dba_name', 'entity_spending',
            'codes_billed', 'auth_official', 'auth_title', 'phone'
        ])
        for rank, f_item in enumerate(flagged, 1):
            for e in f_item['entities']:
                writer.writerow([
                    rank, f_item['address'], f_item['city'], f_item['zip'],
                    f_item['num_npis'], f"{f_item['total_paid']:.2f}",
                    'YES' if f_item['same_auth_official'] else '',
                    e['npi'], e['name'], e['dba'], f"{e['spending']:.2f}",
                    e['codes'], e['auth_official'], e['auth_title'], e['phone']
                ])
    print(f"         Detailed CSV: {detail_file}")
    
    # --- CSV: Summary (one row per address, sorted by $) ---
    summary_file = os.path.join(OUTPUT_DIR, "fraud_flags_summary.csv")
    with open(summary_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'rank', 'address', 'city', 'zip',
            'num_npis', 'total_paid', 'total_claims',
            'num_unique_codes', 'num_auth_officials', 'same_auth_flag',
            'entity_names', 'auth_officials'
        ])
        for rank, f_item in enumerate(flagged, 1):
            names = ' | '.join(e['name'] + (f" dba {e['dba']}" if e['dba'] else '') for e in f_item['entities'])
            auths = ' | '.join(f_item['auth_officials'])
            writer.writerow([
                rank, f_item['address'], f_item['city'], f_item['zip'],
                f_item['num_npis'], f"{f_item['total_paid']:.2f}", f_item['total_claims'],
                f_item['num_codes'], f_item['num_auth_officials'],
                'YES' if f_item['same_auth_official'] else '',
                names, auths
            ])
    print(f"         Summary CSV:  {summary_file}")
    
    # --- Human-readable Top 50 ---
    report_file = os.path.join(OUTPUT_DIR, "fraud_flags_top50.txt")
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("MA MEDICAID -- SHARED ADDRESS FRAUD FLAGS\n")
        f.write(f"Top 50 addresses by total Medicaid billing\n")
        f.write(f"Total flagged addresses: {len(flagged):,}\n")
        f.write("=" * 80 + "\n\n")
        
        total_flagged_dollars = sum(fl['total_paid'] for fl in flagged)
        f.write(f"TOTAL DOLLARS AT FLAGGED ADDRESSES: ${total_flagged_dollars:,.0f}\n")
        f.write(f"Addresses with SAME authorized official: {sum(1 for fl in flagged if fl['same_auth_official']):,}\n\n")
        
        f.write("RED FLAG KEY:\n")
        f.write("  [SAME AUTH]  = All NPIs at this address share one authorized official\n")
        f.write("  [HIGH $]     = Over $100M total billing at one address\n")
        f.write("  [MANY NPIs]  = 5+ NPIs at one address\n")
        f.write("  [SAME CODES] = Multiple NPIs billing the same procedure codes\n")
        f.write("-" * 80 + "\n\n")
        
        for rank, fl in enumerate(flagged[:50], 1):
            flags = []
            if fl['same_auth_official']:
                flags.append("[SAME AUTH]")
            if fl['total_paid'] > 100_000_000:
                flags.append("[HIGH $]")
            if fl['num_npis'] >= 5:
                flags.append("[MANY NPIs]")
            
            # Check for overlapping codes
            code_sets = [set(e['codes'].split(', ')) for e in fl['entities']]
            if len(code_sets) >= 2:
                overlap = code_sets[0]
                for cs in code_sets[1:]:
                    overlap = overlap & cs
                if overlap - {''}:
                    flags.append(f"[SAME CODES: {', '.join(sorted(overlap))}]")
            
            flag_str = " ".join(flags) if flags else ""
            
            f.write(f"#{rank}: {fl['address']}, {fl['city']} {fl['zip']}\n")
            f.write(f"    {fl['num_npis']} NPIs | ${fl['total_paid']:,.0f} total | {fl['num_codes']} codes {flag_str}\n")
            for e in fl['entities']:
                auth_str = f" [Auth: {e['auth_official']}, {e['auth_title']}]" if e['auth_official'] else ""
                dba_str = f" (dba {e['dba']})" if e['dba'] else ""
                f.write(f"      NPI {e['npi']}: {e['name']}{dba_str}\n")
                f.write(f"        ${e['spending']:,.0f} | Codes: {e['codes']}{auth_str}\n")
            f.write("\n")
        
        f.write("-" * 80 + "\n")
        f.write(f"\nTotal flagged addresses: {len(flagged):,}\n")
        f.write(f"Total $ at flagged addresses: ${total_flagged_dollars:,.0f}\n")
        f.write(f"\nGenerated by MA-DOGE Fraud Hunter\n")
        f.write(f"github.com/duncanburns2013-dot/HHS-MA-DOGE\n")
    
    print(f"         Report:       {report_file}")
    
    # Stats
    same_auth = sum(1 for fl in flagged if fl['same_auth_official'])
    high_dollar = sum(1 for fl in flagged if fl['total_paid'] > 100_000_000)
    many_npis = sum(1 for fl in flagged if fl['num_npis'] >= 5)
    
    print(f"\n" + "=" * 60)
    print(f"  FRAUD HUNTER RESULTS")
    print(f"  Total flagged addresses:           {len(flagged):,}")
    print(f"  Total $ at flagged addresses:      ${total_flagged_dollars:,.0f}")
    print(f"  Addresses w/ SAME auth official:   {same_auth:,}")
    print(f"  Addresses w/ $100M+ billing:       {high_dollar:,}")
    print(f"  Addresses w/ 5+ NPIs:              {many_npis:,}")
    print(f"=" * 60)


# ============================================================
# MAIN
# ============================================================
if __name__ == '__main__':
    print("=" * 60)
    print("  MA-DOGE FRAUD HUNTER -- Shared Address Detection")
    print("  Cross-referencing NPPES addresses ? Medicaid billing")
    print("=" * 60)
    
    # Check files exist
    if not os.path.exists(MA_SPENDING_FILE):
        print(f"\n[X] Cannot find MA spending file: {MA_SPENDING_FILE}")
        print("   Run the DOGE data filter script first.")
        sys.exit(1)
    
    if not os.path.exists(NPPES_FILE) and not os.path.exists(MA_NPI_EXTRACT):
        print(f"\n[X] Cannot find NPPES file: {NPPES_FILE}")
        print(f"   Or MA NPI extract: {MA_NPI_EXTRACT}")
        print("   Download NPPES from: https://download.cms.gov/nppes/NPI_Files.html")
        sys.exit(1)
    
    # Step 1: Extract MA NPIs with addresses
    npi_file = extract_ma_npis_with_addresses()
    
    # Step 2: Load MA Medicaid spending
    npi_spending = load_ma_spending()
    
    # Step 3: Cross-reference
    flagged = find_shared_addresses(npi_file, npi_spending)
    
    # Step 4: Reports
    generate_reports(flagged, npi_file)
    
    print(f"\n[OK] Done. Give the CSVs to your fraud hunters.")
    print(f"   fraud_flags_shared_addresses.csv -- every NPI at every flagged address")
    print(f"   fraud_flags_summary.csv -- one row per address, sorted by $")
    print(f"   fraud_flags_top50.txt -- human-readable report, print and hand out")
