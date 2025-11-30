import re
from pathlib import Path

locations_dir = Path("src/pages/locations")
replacement = "<!-- Removed quote_request tracking - only track on successful form submissions, not button clicks -->"

# Pattern to match the entire script block
script_pattern = re.compile(
    r'<script is:inline>\s*document\.getElementById\([^)]+\)\?\.addEventListener\([^}]+\}\s*\);\s*</script>',
    re.DOTALL
)

location_files = list(locations_dir.glob("*.astro"))
updated = 0

for file_path in location_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if "quote_request" in content:
            # Remove the script block
            new_content = script_pattern.sub(replacement, content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Updated: {file_path.name}")
                updated += 1
    except Exception as e:
        print(f"❌ Error: {file_path.name} - {e}")

print(f"\n✅ Updated {updated} files")





