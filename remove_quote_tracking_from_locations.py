#!/usr/bin/env python3
"""
Remove quote_request tracking from all location pages.
Only track on successful form submissions, not button clicks.
"""

import os
import re
from pathlib import Path

# Location pages directory
locations_dir = Path("src/pages/locations")

# Pattern to match the inline script that tracks quote_request
script_pattern = re.compile(
    r'<script is:inline>.*?window\.gtag\('event', 'quote_request'.*?</script>',
    re.DOTALL
)

# Replacement comment
replacement = "<!-- Removed quote_request tracking - only track on successful form submissions, not button clicks -->"

# Get all location .astro files
location_files = list(locations_dir.glob("*.astro"))

print(f"Found {len(location_files)} location files")

for file_path in location_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if the file contains the tracking script
        if "quote_request" in content:
            # Remove the script
            new_content = script_pattern.sub(replacement, content)
            
            # Only write if content changed
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Updated: {file_path.name}")
            else:
                print(f"⚠️  No changes needed: {file_path.name}")
        else:
            print(f"ℹ️  No tracking found: {file_path.name}")
            
    except Exception as e:
        print(f"❌ Error processing {file_path.name}: {e}")

print("\n✅ Done!")





