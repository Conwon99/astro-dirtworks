import pandas as pd
import numpy as np
from collections import Counter
import json

# Load the CSV file
df = pd.read_csv('internal_all.csv')

# Filter to only HTML pages (exclude images, CSS, etc.)
html_pages = df[df['Content Type'].str.contains('text/html', na=False)].copy()

print("=" * 80)
print("COMPREHENSIVE SEO AUDIT REPORT - DIRTWORKS LANDSCAPING")
print("=" * 80)
print(f"\nTotal URLs Crawled: {len(df)}")
print(f"HTML Pages Analyzed: {len(html_pages)}")
print(f"Analysis Date: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

# ============================================================================
# 1. THIN CONTENT DETECTION
# ============================================================================
print("\n" + "=" * 80)
print("1. THIN CONTENT DETECTION")
print("=" * 80)

# Pages with word count under 300
thin_content = html_pages[html_pages['Word Count'].fillna(0) < 300].copy()
thin_content = thin_content[thin_content['Status Code'] == 200]  # Only 200 OK pages

print(f"\n[STATS] Pages with Word Count < 300: {len(thin_content)}")
if len(thin_content) > 0:
    print("\nTop 10 Thin Content Pages:")
    thin_sorted = thin_content.nsmallest(10, 'Word Count')[['Address', 'Word Count', 'Title 1']]
    for idx, row in thin_sorted.iterrows():
        print(f"  • {row['Address']}")
        print(f"    Word Count: {int(row['Word Count'])}, Title: {row['Title 1'][:60] if pd.notna(row['Title 1']) else 'N/A'}")

# Low text ratio (content-to-code ratio)
low_text_ratio = html_pages[html_pages['Text Ratio'].fillna(0) < 5].copy()
low_text_ratio = low_text_ratio[low_text_ratio['Status Code'] == 200]

print(f"\n[STATS] Pages with Text Ratio < 5%: {len(low_text_ratio)}")
if len(low_text_ratio) > 0:
    print("\nTop 10 Low Text Ratio Pages:")
    ratio_sorted = low_text_ratio.nsmallest(10, 'Text Ratio')[['Address', 'Text Ratio', 'Word Count']]
    for idx, row in ratio_sorted.iterrows():
        print(f"  • {row['Address']}")
        print(f"    Text Ratio: {row['Text Ratio']:.2f}%, Word Count: {int(row['Word Count']) if pd.notna(row['Word Count']) else 0}")

# Missing or sparse H1/H2 tags
missing_h1 = html_pages[(html_pages['H1-1'].isna()) | (html_pages['H1-1 Length'].fillna(0) == 0)].copy()
missing_h1 = missing_h1[missing_h1['Status Code'] == 200]

print(f"\n[STATS] Pages Missing H1 Tags: {len(missing_h1)}")
if len(missing_h1) > 0:
    print("\nPages without H1:")
    for idx, row in missing_h1.head(10).iterrows():
        print(f"  • {row['Address']}")

missing_h2 = html_pages[(html_pages['H2-1'].isna()) | (html_pages['H2-1 Length'].fillna(0) == 0)].copy()
missing_h2 = missing_h2[missing_h2['Status Code'] == 200]

print(f"\n[STATS] Pages Missing H2 Tags: {len(missing_h2)}")
if len(missing_h2) > 0:
    print("\nTop 10 Pages without H2:")
    for idx, row in missing_h2.head(10).iterrows():
        print(f"  • {row['Address']}")

# Short meta descriptions
short_meta = html_pages[(html_pages['Meta Description 1 Length'].fillna(0) < 120) & 
                        (html_pages['Meta Description 1 Length'].fillna(0) > 0)].copy()
short_meta = short_meta[short_meta['Status Code'] == 200]

print(f"\n[STATS] Pages with Meta Descriptions < 120 characters: {len(short_meta)}")
if len(short_meta) > 0:
    print("\nTop 10 Short Meta Descriptions:")
    short_sorted = short_meta.nsmallest(10, 'Meta Description 1 Length')[['Address', 'Meta Description 1 Length', 'Meta Description 1']]
    for idx, row in short_sorted.iterrows():
        desc = row['Meta Description 1'][:80] if pd.notna(row['Meta Description 1']) else 'N/A'
        print(f"  • {row['Address']}")
        print(f"    Length: {int(row['Meta Description 1 Length'])}, Description: {desc}...")

# Short titles
short_titles = html_pages[(html_pages['Title 1 Length'].fillna(0) < 30) & 
                          (html_pages['Title 1 Length'].fillna(0) > 0)].copy()
short_titles = short_titles[short_titles['Status Code'] == 200]

print(f"\n[STATS] Pages with Titles < 30 characters: {len(short_titles)}")
if len(short_titles) > 0:
    print("\nPages with Short Titles:")
    for idx, row in short_titles.head(10).iterrows():
        title = row['Title 1'] if pd.notna(row['Title 1']) else 'N/A'
        print(f"  • {row['Address']}")
        print(f"    Title ({int(row['Title 1 Length'])} chars): {title}")

# ============================================================================
# 2. DUPLICATE CONTENT ISSUES
# ============================================================================
print("\n" + "=" * 80)
print("2. DUPLICATE CONTENT ISSUES")
print("=" * 80)

# Duplicate titles
title_counts = html_pages[html_pages['Status Code'] == 200]['Title 1'].value_counts()
duplicate_titles = title_counts[title_counts > 1]

print(f"\n[STATS] Duplicate Page Titles: {len(duplicate_titles)} unique titles appearing multiple times")
if len(duplicate_titles) > 0:
    print("\nTop 10 Most Duplicated Titles:")
    for title, count in duplicate_titles.head(10).items():
        if pd.notna(title) and title:
            print(f"  • '{title[:70]}' appears {count} times")
            # Show URLs with this title
            urls = html_pages[html_pages['Title 1'] == title]['Address'].head(3).tolist()
            for url in urls:
                print(f"    - {url}")

# Duplicate meta descriptions
meta_counts = html_pages[html_pages['Status Code'] == 200]['Meta Description 1'].value_counts()
duplicate_meta = meta_counts[meta_counts > 1]

print(f"\n[STATS] Duplicate Meta Descriptions: {len(duplicate_meta)} unique descriptions appearing multiple times")
if len(duplicate_meta) > 0:
    print("\nTop 10 Most Duplicated Meta Descriptions:")
    for desc, count in duplicate_meta.head(10).items():
        if pd.notna(desc) and desc:
            print(f"  • '{desc[:60]}...' appears {count} times")
            urls = html_pages[html_pages['Meta Description 1'] == desc]['Address'].head(2).tolist()
            for url in urls:
                print(f"    - {url}")

# Near duplicate content (using hash)
hash_counts = html_pages[html_pages['Status Code'] == 200]['Hash'].value_counts()
duplicate_hashes = hash_counts[hash_counts > 1]

print(f"\n[STATS] Pages with Identical Content (Hash): {len(duplicate_hashes)} unique hashes appearing multiple times")
if len(duplicate_hashes) > 0:
    print("\nDuplicate Content Groups:")
    for hash_val, count in duplicate_hashes.head(5).items():
        if pd.notna(hash_val) and hash_val:
            print(f"  • Hash appears {count} times:")
            urls = html_pages[html_pages['Hash'] == hash_val]['Address'].head(3).tolist()
            for url in urls:
                print(f"    - {url}")

# ============================================================================
# 3. INTERNAL LINK STRUCTURE ANALYSIS
# ============================================================================
print("\n" + "=" * 80)
print("3. INTERNAL LINK STRUCTURE ANALYSIS")
print("=" * 80)

# Pages with excessive outbound links
excessive_outlinks = html_pages[html_pages['Outlinks'].fillna(0) > 100].copy()
excessive_outlinks = excessive_outlinks[excessive_outlinks['Status Code'] == 200]

print(f"\n[STATS] Pages with > 100 Outbound Links: {len(excessive_outlinks)}")
if len(excessive_outlinks) > 0:
    print("\nTop 10 Pages with Most Outbound Links:")
    outlink_sorted = excessive_outlinks.nlargest(10, 'Outlinks')[['Address', 'Outlinks', 'Unique Outlinks']]
    for idx, row in outlink_sorted.iterrows():
        print(f"  • {row['Address']}")
        print(f"    Total Outlinks: {int(row['Outlinks'])}, Unique: {int(row['Unique Outlinks'])}")

# Orphaned pages (no inbound links)
orphaned = html_pages[(html_pages['Inlinks'].fillna(0) == 0) & 
                      (html_pages['Status Code'] == 200)].copy()

print(f"\n[STATS] Orphaned Pages (0 Inbound Links): {len(orphaned)}")
if len(orphaned) > 0:
    print("\nOrphaned Pages:")
    for idx, row in orphaned.head(15).iterrows():
        title = row['Title 1'][:50] if pd.notna(row['Title 1']) else 'N/A'
        print(f"  • {row['Address']} - {title}")

# Pages with very few inbound links
few_inlinks = html_pages[(html_pages['Inlinks'].fillna(0) < 3) & 
                         (html_pages['Inlinks'].fillna(0) > 0) &
                         (html_pages['Status Code'] == 200)].copy()

print(f"\n[STATS] Pages with < 3 Inbound Links: {len(few_inlinks)}")
if len(few_inlinks) > 0:
    print("\nTop 15 Pages with Few Inbound Links:")
    inlink_sorted = few_inlinks.nsmallest(15, 'Inlinks')[['Address', 'Inlinks', 'Title 1']]
    for idx, row in inlink_sorted.iterrows():
        title = row['Title 1'][:50] if pd.notna(row['Title 1']) else 'N/A'
        print(f"  • {row['Address']} ({int(row['Inlinks'])} inlinks) - {title}")

# Pages buried too deep (crawl depth > 3)
deep_pages = html_pages[html_pages['Crawl Depth'].fillna(0) > 3].copy()
deep_pages = deep_pages[deep_pages['Status Code'] == 200]

print(f"\n[STATS] Pages with Crawl Depth > 3: {len(deep_pages)}")
if len(deep_pages) > 0:
    print("\nDeep Pages (Crawl Depth > 3):")
    depth_sorted = deep_pages.nlargest(15, 'Crawl Depth')[['Address', 'Crawl Depth', 'Title 1']]
    for idx, row in depth_sorted.iterrows():
        title = row['Title 1'][:50] if pd.notna(row['Title 1']) else 'N/A'
        print(f"  • {row['Address']} (Depth: {int(row['Crawl Depth'])}) - {title}")

# ============================================================================
# 4. REDIRECT CHAIN PROBLEMS
# ============================================================================
print("\n" + "=" * 80)
print("4. REDIRECT CHAIN PROBLEMS")
print("=" * 80)

# Find redirects
redirects = html_pages[html_pages['Status Code'].isin([301, 302, 307, 308])].copy()

print(f"\n[STATS] Total Redirects Found: {len(redirects)}")
print(f"  • 301 (Permanent): {len(redirects[redirects['Status Code'] == 301])}")
print(f"  • 302 (Temporary): {len(redirects[redirects['Status Code'] == 302])}")
print(f"  • 307/308 (Other): {len(redirects[redirects['Status Code'].isin([307, 308])])}")

# Temporary redirects that should be permanent
temp_redirects = redirects[redirects['Status Code'] == 302]

print(f"\n[STATS] Temporary Redirects (302) - Should be 301: {len(temp_redirects)}")
if len(temp_redirects) > 0:
    print("\nTemporary Redirects:")
    for idx, row in temp_redirects.head(10).iterrows():
        redirect_url = row['Redirect URL'] if pd.notna(row['Redirect URL']) else 'N/A'
        print(f"  • {row['Address']} → {redirect_url}")

# Slow redirects (response time > 0.5s)
slow_redirects = redirects[redirects['Response Time'].fillna(0) > 0.5]

print(f"\n[STATS] Slow Redirects (> 0.5s): {len(slow_redirects)}")
if len(slow_redirects) > 0:
    print("\nSlow Redirects:")
    slow_sorted = slow_redirects.nlargest(10, 'Response Time')[['Address', 'Redirect URL', 'Response Time']]
    for idx, row in slow_sorted.iterrows():
        redirect_url = row['Redirect URL'] if pd.notna(row['Redirect URL']) else 'N/A'
        print(f"  • {row['Address']} → {redirect_url} ({row['Response Time']:.3f}s)")

# ============================================================================
# 5. 404 ERROR DETECTION
# ============================================================================
print("\n" + "=" * 80)
print("5. 404 ERROR DETECTION")
print("=" * 80)

# Find 404 pages
not_found = html_pages[html_pages['Status Code'] == 404].copy()

print(f"\n[STATS] Pages Returning 404: {len(not_found)}")
if len(not_found) > 0:
    print("\n404 Pages:")
    for idx, row in not_found.iterrows():
        print(f"  • {row['Address']}")

# Find pages linking to 404s (this would require analyzing outlinks, simplified here)
# Pages with high outlinks that might link to 404s
potential_broken_links = html_pages[html_pages['Outlinks'].fillna(0) > 0].copy()

print(f"\n[STATS] Note: To find internal links pointing to 404s, analyze the outlinks data")
print(f"   Pages with outbound links: {len(potential_broken_links)}")

# ============================================================================
# 6. MISSING META DESCRIPTION ISSUES
# ============================================================================
print("\n" + "=" * 80)
print("6. MISSING META DESCRIPTION ISSUES")
print("=" * 80)

# Pages without meta descriptions
no_meta = html_pages[(html_pages['Meta Description 1'].isna()) | 
                     (html_pages['Meta Description 1 Length'].fillna(0) == 0)].copy()
no_meta = no_meta[no_meta['Status Code'] == 200]

print(f"\n[STATS] Pages Without Meta Descriptions: {len(no_meta)}")
if len(no_meta) > 0:
    print("\nPages Missing Meta Descriptions:")
    for idx, row in no_meta.head(15).iterrows():
        title = row['Title 1'][:50] if pd.notna(row['Title 1']) else 'N/A'
        print(f"  • {row['Address']} - {title}")

# Meta descriptions too short
short_meta_desc = html_pages[(html_pages['Meta Description 1 Length'].fillna(0) < 120) & 
                             (html_pages['Meta Description 1 Length'].fillna(0) > 0)].copy()
short_meta_desc = short_meta_desc[short_meta_desc['Status Code'] == 200]

print(f"\n[STATS] Meta Descriptions < 120 characters: {len(short_meta_desc)}")
if len(short_meta_desc) > 0:
    print("\nTop 10 Shortest Meta Descriptions:")
    short_sorted = short_meta_desc.nsmallest(10, 'Meta Description 1 Length')[['Address', 'Meta Description 1 Length', 'Meta Description 1']]
    for idx, row in short_sorted.iterrows():
        desc = row['Meta Description 1'][:70] if pd.notna(row['Meta Description 1']) else 'N/A'
        print(f"  • {row['Address']}")
        print(f"    Length: {int(row['Meta Description 1 Length'])}, Description: {desc}...")

# Meta descriptions too long
long_meta_desc = html_pages[html_pages['Meta Description 1 Length'].fillna(0) > 160].copy()
long_meta_desc = long_meta_desc[long_meta_desc['Status Code'] == 200]

print(f"\n[STATS] Meta Descriptions > 160 characters: {len(long_meta_desc)}")
if len(long_meta_desc) > 0:
    print("\nTop 10 Longest Meta Descriptions:")
    long_sorted = long_meta_desc.nlargest(10, 'Meta Description 1 Length')[['Address', 'Meta Description 1 Length', 'Meta Description 1']]
    for idx, row in long_sorted.iterrows():
        desc = row['Meta Description 1'][:70] if pd.notna(row['Meta Description 1']) else 'N/A'
        print(f"  • {row['Address']}")
        print(f"    Length: {int(row['Meta Description 1 Length'])}, Description: {desc}...")

# ============================================================================
# EXECUTIVE SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("EXECUTIVE SUMMARY")
print("=" * 80)

summary = {
    'Total Pages': len(html_pages[html_pages['Status Code'] == 200]),
    'Thin Content (< 300 words)': len(thin_content),
    'Missing H1 Tags': len(missing_h1),
    'Missing H2 Tags': len(missing_h2),
    'Duplicate Titles': len(duplicate_titles),
    'Duplicate Meta Descriptions': len(duplicate_meta),
    'Orphaned Pages (0 inlinks)': len(orphaned),
    'Pages with < 3 Inlinks': len(few_inlinks),
    'Deep Pages (Depth > 3)': len(deep_pages),
    'Temporary Redirects (302)': len(temp_redirects),
    '404 Errors': len(not_found),
    'Missing Meta Descriptions': len(no_meta),
    'Short Meta Descriptions (< 120 chars)': len(short_meta_desc),
    'Long Meta Descriptions (> 160 chars)': len(long_meta_desc)
}

print("\n[STATS] Issue Summary:")
for issue, count in summary.items():
    print(f"  • {issue}: {count}")

# Priority Matrix
print("\n" + "=" * 80)
print("PRIORITY MATRIX")
print("=" * 80)

print("\n[HIGH] HIGH PRIORITY (High SEO Impact, Easy to Fix):")
print("  1. Missing Meta Descriptions - Add unique meta descriptions to all pages")
print("  2. Short Meta Descriptions - Expand to 120-160 characters")
print("  3. Duplicate Titles - Create unique, descriptive titles for each page")
print("  4. Missing H1 Tags - Add H1 tags to pages missing them")
print("  5. Temporary Redirects (302) - Convert to permanent 301 redirects")

print("\n[MEDIUM] MEDIUM PRIORITY (Moderate SEO Impact):")
print("  1. Thin Content Pages - Expand content to 300+ words")
print("  2. Orphaned Pages - Add internal links to these pages")
print("  3. Pages with Few Inlinks - Improve internal linking structure")
print("  4. Duplicate Meta Descriptions - Create unique descriptions")

print("\n[LOW] LOW PRIORITY (Lower Impact or Requires More Work):")
print("  1. Deep Pages (Crawl Depth > 3) - Consider flattening site structure")
print("  2. Pages with Excessive Outlinks - Review and reduce if necessary")
print("  3. Missing H2 Tags - Add H2 tags for better content structure")
print("  4. Long Meta Descriptions - Trim to optimal length (120-160 chars)")

print("\n" + "=" * 80)
print("ANALYSIS COMPLETE")
print("=" * 80)

