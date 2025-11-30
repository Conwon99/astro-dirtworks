import csv
import json
from collections import defaultdict, Counter
from urllib.parse import urlparse
import re

# Read the CSV file
csv_file = r"C:\Users\conno\Documents\AAA- AstroWebsites\Dirtworks\internal_all_dworks.csv"

# Data structures
pages = []
html_pages = []
redirects = []
images = []
css_js = []

# Read and parse CSV
with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        pages.append(row)
        content_type = row.get('Content Type', '')
        status_code = row.get('Status Code', '')
        
        # Filter HTML pages (excluding images, CSS, JS)
        if 'text/html' in content_type:
            html_pages.append(row)
        elif status_code == '301' or status_code == '302':
            redirects.append(row)
        elif 'image' in content_type:
            images.append(row)
        elif 'css' in content_type or 'javascript' in content_type:
            css_js.append(row)

print(f"Total URLs: {len(pages)}")
print(f"HTML Pages: {len(html_pages)}")
print(f"Redirects: {len(redirects)}")
print(f"Images: {len(images)}")
print(f"CSS/JS: {len(css_js)}")

# Analysis functions
def analyze_thin_content():
    thin_pages = []
    for page in html_pages:
        word_count = int(page.get('Word Count', 0) or 0)
        text_ratio = float(page.get('Text Ratio', 0) or 0)
        h1 = page.get('H1-1', '')
        h2_1 = page.get('H2-1', '')
        h2_2 = page.get('H2-2', '')
        meta_desc = page.get('Meta Description 1', '')
        meta_desc_len = int(page.get('Meta Description 1 Length', 0) or 0)
        title = page.get('Title 1', '')
        title_len = int(page.get('Title 1 Length', 0) or 0)
        
        issues = []
        if word_count < 300:
            issues.append(f"Low word count: {word_count}")
        if text_ratio < 5:
            issues.append(f"Low text ratio: {text_ratio}%")
        if not h1:
            issues.append("Missing H1")
        if not h2_1 and not h2_2:
            issues.append("Missing H2 tags")
        if meta_desc_len < 120:
            issues.append(f"Short meta description: {meta_desc_len} chars")
        if meta_desc_len > 160:
            issues.append(f"Long meta description: {meta_desc_len} chars")
        if title_len < 30:
            issues.append(f"Short title: {title_len} chars")
        if title_len > 60:
            issues.append(f"Long title: {title_len} chars")
        
        if issues:
            thin_pages.append({
                'url': page.get('Address', ''),
                'word_count': word_count,
                'text_ratio': text_ratio,
                'h1': h1,
                'h2_count': (1 if h2_1 else 0) + (1 if h2_2 else 0),
                'meta_desc_len': meta_desc_len,
                'title_len': title_len,
                'issues': issues
            })
    
    return thin_pages

def analyze_duplicate_content():
    # Duplicate titles
    title_counter = Counter()
    title_to_urls = defaultdict(list)
    
    for page in html_pages:
        title = page.get('Title 1', '').strip()
        if title:
            title_counter[title] += 1
            title_to_urls[title].append(page.get('Address', ''))
    
    duplicate_titles = {title: urls for title, count in title_counter.items() 
                       if count > 1 for urls in [title_to_urls[title]]}
    
    # Duplicate meta descriptions
    meta_counter = Counter()
    meta_to_urls = defaultdict(list)
    
    for page in html_pages:
        meta = page.get('Meta Description 1', '').strip()
        if meta:
            meta_counter[meta] += 1
            meta_to_urls[meta].append(page.get('Address', ''))
    
    duplicate_metas = {meta: urls for meta, count in meta_counter.items() 
                      if count > 1 for urls in [meta_to_urls[meta]]}
    
    # Canonical issues
    canonical_issues = []
    for page in html_pages:
        canonical = page.get('Canonical Link Element 1', '').strip()
        url = page.get('Address', '').strip()
        if canonical and canonical != url:
            # Check if canonical points to a different URL
            canonical_issues.append({
                'url': url,
                'canonical': canonical,
                'status': 'Different canonical'
            })
    
    return {
        'duplicate_titles': duplicate_titles,
        'duplicate_metas': duplicate_metas,
        'canonical_issues': canonical_issues
    }

def analyze_internal_links():
    link_analysis = []
    inlink_count = defaultdict(int)
    
    for page in html_pages:
        outlinks = int(page.get('Outlinks', 0) or 0)
        unique_outlinks = int(page.get('Unique Outlinks', 0) or 0)
        inlinks = int(page.get('Inlinks', 0) or 0)
        unique_inlinks = int(page.get('Unique Inlinks', 0) or 0)
        crawl_depth = int(page.get('Crawl Depth', 0) or 0)
        url = page.get('Address', '')
        
        issues = []
        if outlinks > 100:
            issues.append(f"Excessive outlinks: {outlinks}")
        if inlinks == 0:
            issues.append("Orphaned page (no inlinks)")
        if inlinks < 3:
            issues.append(f"Very few inlinks: {inlinks}")
        if crawl_depth > 3:
            issues.append(f"Deep crawl depth: {crawl_depth}")
        
        if issues:
            link_analysis.append({
                'url': url,
                'outlinks': outlinks,
                'unique_outlinks': unique_outlinks,
                'inlinks': inlinks,
                'unique_inlinks': unique_inlinks,
                'crawl_depth': crawl_depth,
                'issues': issues
            })
        
        # Count inlinks for orphan detection
        inlink_count[url] = inlinks
    
    orphaned = [url for url, count in inlink_count.items() if count == 0]
    
    return {
        'link_issues': link_analysis,
        'orphaned_pages': orphaned
    }

def analyze_redirects():
    redirect_chains = []
    redirect_loops = []
    temp_redirects = []
    slow_redirects = []
    
    redirect_map = {}
    for redirect in redirects:
        url = redirect.get('Address', '')
        redirect_url = redirect.get('Redirect URL', '')
        redirect_type = redirect.get('Redirect Type', '')
        status_code = redirect.get('Status Code', '')
        response_time = float(redirect.get('Response Time', 0) or 0)
        
        redirect_map[url] = redirect_url
        
        if status_code == '302':
            temp_redirects.append({
                'url': url,
                'redirect_to': redirect_url,
                'type': redirect_type
            })
        
        if response_time > 1.0:
            slow_redirects.append({
                'url': url,
                'redirect_to': redirect_url,
                'response_time': response_time
            })
    
    # Check for chains (simplified - would need full crawl to detect all chains)
    for url, redirect_url in redirect_map.items():
        chain = [url]
        current = redirect_url
        hops = 1
        while current in redirect_map and hops < 10:
            chain.append(current)
            current = redirect_map[current]
            hops += 1
            if current in chain:  # Loop detected
                redirect_loops.append({
                    'url': url,
                    'chain': chain + [current]
                })
                break
        
        if hops > 3:
            redirect_chains.append({
                'url': url,
                'hops': hops,
                'chain': chain
            })
    
    return {
        'redirect_chains': redirect_chains,
        'redirect_loops': redirect_loops,
        'temp_redirects': temp_redirects,
        'slow_redirects': slow_redirects
    }

def analyze_404s():
    four_oh_fours = []
    for page in pages:
        status_code = page.get('Status Code', '')
        if status_code == '404':
            four_oh_fours.append({
                'url': page.get('Address', ''),
                'status': page.get('Status', '')
            })
    return four_oh_fours

def analyze_meta_descriptions():
    missing_meta = []
    short_meta = []
    long_meta = []
    
    for page in html_pages:
        meta = page.get('Meta Description 1', '').strip()
        meta_len = int(page.get('Meta Description 1 Length', 0) or 0)
        url = page.get('Address', '')
        
        if not meta or meta_len == 0:
            missing_meta.append(url)
        elif meta_len < 120:
            short_meta.append({
                'url': url,
                'length': meta_len,
                'meta': meta[:100] + '...' if len(meta) > 100 else meta
            })
        elif meta_len > 160:
            long_meta.append({
                'url': url,
                'length': meta_len,
                'meta': meta[:100] + '...' if len(meta) > 100 else meta
            })
    
    return {
        'missing': missing_meta,
        'short': short_meta,
        'long': long_meta
    }

# Run all analyses
print("\n=== Running SEO Analysis ===\n")

thin_content = analyze_thin_content()
duplicates = analyze_duplicate_content()
links = analyze_internal_links()
redirect_analysis = analyze_redirects()
four_oh_fours = analyze_404s()
meta_analysis = analyze_meta_descriptions()

# Generate report
report = {
    'executive_summary': {
        'total_pages': len(html_pages),
        'thin_content_pages': len(thin_content),
        'duplicate_titles': len(duplicates['duplicate_titles']),
        'duplicate_metas': len(duplicates['duplicate_metas']),
        'link_issues': len(links['link_issues']),
        'orphaned_pages': len(links['orphaned_pages']),
        'redirect_chains': len(redirect_analysis['redirect_chains']),
        'redirect_loops': len(redirect_analysis['redirect_loops']),
        'temp_redirects': len(redirect_analysis['temp_redirects']),
        '404_errors': len(four_oh_fours),
        'missing_meta': len(meta_analysis['missing']),
        'short_meta': len(meta_analysis['short']),
        'long_meta': len(meta_analysis['long'])
    },
    'thin_content': thin_content,
    'duplicates': duplicates,
    'links': links,
    'redirects': redirect_analysis,
    '404s': four_oh_fours,
    'meta_descriptions': meta_analysis
}

# Save report
with open('seo_audit_report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

print("Analysis complete! Report saved to seo_audit_report.json")

# Print summary
print("\n=== EXECUTIVE SUMMARY ===")
print(f"Total HTML Pages Analyzed: {report['executive_summary']['total_pages']}")
print(f"\nCritical Issues Found:")
print(f"  - Thin Content Pages: {report['executive_summary']['thin_content_pages']}")
print(f"  - Duplicate Titles: {report['executive_summary']['duplicate_titles']}")
print(f"  - Duplicate Meta Descriptions: {report['executive_summary']['duplicate_metas']}")
print(f"  - Link Structure Issues: {report['executive_summary']['link_issues']}")
print(f"  - Orphaned Pages: {report['executive_summary']['orphaned_pages']}")
print(f"  - Redirect Chains (>3 hops): {report['executive_summary']['redirect_chains']}")
print(f"  - Redirect Loops: {report['executive_summary']['redirect_loops']}")
print(f"  - Temporary Redirects (302): {report['executive_summary']['temp_redirects']}")
print(f"  - 404 Errors: {report['executive_summary']['404_errors']}")
print(f"  - Missing Meta Descriptions: {report['executive_summary']['missing_meta']}")
print(f"  - Short Meta Descriptions (<120): {report['executive_summary']['short_meta']}")
print(f"  - Long Meta Descriptions (>160): {report['executive_summary']['long_meta']}")






