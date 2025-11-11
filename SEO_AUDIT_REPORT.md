# Comprehensive SEO Audit Report
## Dirtworks Landscaping Website

**Analysis Date:** November 11, 2025  
**Total URLs Crawled:** 89  
**HTML Pages Analyzed:** 74  
**Indexable Pages:** 40

---

## Executive Summary

This comprehensive SEO audit identified several critical issues that could impact search engine rankings and user experience. The site shows good foundational SEO practices (all pages have H1/H2 tags, meta descriptions present), but there are significant opportunities for improvement in content depth, internal linking, and meta description optimization.

### Key Findings at a Glance

| Issue Category | Count | Priority |
|---------------|-------|----------|
| Thin Content Pages (< 300 words) | 26 | Medium |
| Orphaned Pages (0 inbound links) | 39 | High |
| Long Meta Descriptions (> 160 chars) | 26 | Medium |
| Duplicate Titles | 1 | High |
| Duplicate Meta Descriptions | 1 | High |
| Deep Pages (Crawl Depth > 3) | 28 | Low |
| 404 Errors | 0 | ✅ Good |
| Missing Meta Descriptions | 0 | ✅ Good |
| Missing H1/H2 Tags | 0 | ✅ Good |

---

## 1. Thin Content Detection

### Issue: 26 Pages with Word Count Under 300

**Impact:** Search engines may view these pages as low-value content, potentially affecting rankings.

**Affected Pages:**
- All location pages (26 pages) have exactly 243 words
- Examples:
  - `/locations/bishopbriggs/`
  - `/locations/girvan/`
  - `/locations/prestwick/`
  - `/locations/troon/`
  - `/locations/maybole/`
  - `/locations/stewarton/`
  - `/locations/bearsden/`
  - `/locations/milngavie/`
  - `/locations/stevenston/`
  - `/locations/beith/`

**Recommendations:**
1. **Expand location page content** to 400-600 words by adding:
   - Local area information and landmarks
   - Specific service examples for that location
   - Customer testimonials from that area
   - Local business hours or service availability
   - Why choose Dirtworks for that specific location

2. **Add unique content sections:**
   - "Why [Location Name] Homeowners Choose Us"
   - "Common Landscaping Projects in [Location]"
   - "Local Service Areas We Cover"
   - FAQ section specific to that location

3. **Content-to-Code Ratio:** ✅ Good (all pages > 5%)

---

## 2. Duplicate Content Issues

### Issue 1: Duplicate Page Titles

**Found:** 1 duplicate title appearing 6 times
- Title: "Dirtworks Landscaping | Landscaping & Building Services"
- Affected URLs:
  - `https://dirtworkslandscaping.co.uk/`
  - `https://dirtworkslandscaping.co.uk/locations/west-kilbride`
  - `https://dirtworkslandscaping.co.uk/locations/west-glasgow`
  - And 3 more location pages

**Impact:** Search engines may struggle to determine which page to rank for specific queries, diluting SEO value.

**Recommendation:**
- Create unique, location-specific titles for each location page
- Format: `[Service] in [Location] [Region] | [Company Name]`
- Example: "Landscaping Services in West Kilbride Ayrshire | Dirtworks Landscaping"

### Issue 2: Duplicate Meta Descriptions

**Found:** 1 duplicate meta description appearing 6 times
- Description: "Professional landscaping & building services in Ayrshire and..."
- Same URLs as duplicate titles

**Recommendation:**
- Create unique meta descriptions for each location page
- Include location name and primary services
- Keep between 120-160 characters
- Include a call-to-action

### Issue 3: Identical Content (Hash Duplicates)

**Found:** 6 pages with identical content hash
- Indicates these pages have exactly the same HTML content
- Same URLs as above

**Critical Action Required:**
- These pages need unique content immediately
- Currently, they're likely being treated as duplicate content by search engines
- This is a high-priority fix

---

## 3. Internal Link Structure Analysis

### Issue 1: Orphaned Pages (39 pages with 0 inbound links)

**Critical Finding:** 39 out of 40 pages have no internal links pointing to them!

**Affected Pages Include:**
- All main service pages:
  - `/pressure-washing/`
  - `/building-services/`
  - `/garden-maintenance/`
  - `/patios-fencing-decking/`
  - `/landscaping-groundworks/`
- All location pages:
  - `/locations/glasgow-city-center/`
  - `/locations/kilmarnock/`
  - `/locations/ayr/`
  - `/locations/` (main locations page)
- Regional pages:
  - `/ayrshire/`
  - `/glasgow/`

**Impact:** 
- Search engines may not discover these pages easily
- No link equity being passed to these pages
- Poor user navigation experience
- Reduced crawlability

**Recommendations:**
1. **Add internal links from homepage:**
   - Link to all main service pages in navigation or footer
   - Add a "Services" section with links to each service page
   - Link to main locations page prominently

2. **Create a sitemap page** with links to all important pages

3. **Add contextual internal links:**
   - From service pages, link to relevant location pages
   - From location pages, link to relevant service pages
   - Add "Related Services" or "Other Locations" sections

4. **Footer links:**
   - Add all main service pages to footer
   - Add popular location pages to footer

5. **Breadcrumb navigation:**
   - Implement breadcrumbs on all pages
   - This provides both user navigation and internal linking

### Issue 2: Deep Pages (28 pages with Crawl Depth > 3)

**Found:** 28 pages buried 4-5 levels deep in site structure

**Examples:**
- `/locations/west-kilbride` (Depth: 5)
- `/locations/west-glasgow` (Depth: 5)
- `/locations/north-glasgow` (Depth: 5)
- `/locations/south-glasgow` (Depth: 5)
- `/locations/east-glasgow` (Depth: 5)
- Multiple location pages at Depth: 4

**Impact:** 
- Search engines may assign less importance to deeply nested pages
- Harder for users to navigate
- More clicks required to reach content

**Recommendations:**
1. **Flatten site structure:**
   - Consider moving location pages to root level: `/west-kilbride/` instead of `/locations/west-kilbride/`
   - Or create a better hierarchy: `/locations/ayrshire/west-kilbride/`

2. **Add direct links from homepage:**
   - Create a "Popular Locations" section on homepage
   - Link directly to top 10-15 location pages

3. **Improve navigation:**
   - Add location dropdown in main navigation
   - Create location index pages by region

### Issue 3: Excessive Outbound Links

**Status:** ✅ Good - No pages exceed 100 outbound links

---

## 4. Redirect Chain Problems

### Status: ✅ Excellent

- **Total Redirects:** 34
- **301 (Permanent):** 34 ✅ All correct
- **302 (Temporary):** 0 ✅ None found
- **Slow Redirects (> 0.5s):** 0 ✅ All fast

**Note:** All redirects are properly configured as 301 permanent redirects, which is correct for SEO. These are likely trailing slash redirects (e.g., `/locations/ayr` → `/locations/ayr/`), which is a best practice.

---

## 5. 404 Error Detection

### Status: ✅ Excellent

- **404 Errors Found:** 0
- **Broken Internal Links:** None detected in crawl

**Recommendation:** Continue monitoring for 404s, especially as the site grows.

---

## 6. Missing Meta Description Issues

### Status: ✅ Good Foundation, ⚠️ Optimization Needed

**Positive Findings:**
- ✅ All pages have meta descriptions (0 missing)
- ✅ No meta descriptions under 120 characters

**Issue: Long Meta Descriptions**

**Found:** 26 pages with meta descriptions exceeding 160 characters

**Optimal Length:** 120-160 characters (Google typically truncates after 155-160)

**Affected Pages:**
- All location pages have meta descriptions between 194-202 characters
- Examples:
  - `/locations/glasgow-city-center/` - 202 chars
  - `/locations/west-kilbride/` - 197 chars
  - `/locations/north-glasgow/` - 196 chars
  - `/locations/kirkintilloch/` - 196 chars
  - `/locations/south-glasgow/` - 196 chars

**Impact:**
- Google will truncate these descriptions in search results
- May cut off important information or call-to-action
- Less control over what users see in SERPs

**Recommendations:**
1. **Trim all meta descriptions to 120-160 characters**
2. **Prioritize key information:**
   - Location name
   - Primary services
   - Call-to-action (e.g., "Free quotes available")
3. **Test truncation:** Use Google's SERP preview tools to see how descriptions appear

**Example Fix:**
- **Current (202 chars):** "Professional landscaping and building services in Glasgow City Center, Glasgow. Garden maintenance, landscaping, patios, fencing, decking, pressure washing, and building services. Free quotes available."
- **Optimized (158 chars):** "Professional landscaping & building services in Glasgow City Center. Garden maintenance, patios, fencing, decking & pressure washing. Free quotes."

---

## Priority Action Plan

### 🔴 HIGH PRIORITY (Fix Immediately)

1. **Fix Duplicate Content (6 pages)**
   - **Impact:** High - These pages are likely being penalized as duplicates
   - **Effort:** Medium
   - **Action:** Create unique content, titles, and meta descriptions for:
     - `/locations/west-kilbride`
     - `/locations/west-glasgow`
     - `/locations/north-glasgow`
     - `/locations/south-glasgow`
     - `/locations/east-glasgow`
     - And 1 more page

2. **Fix Orphaned Pages (39 pages)**
   - **Impact:** High - Pages not being discovered or receiving link equity
   - **Effort:** Medium
   - **Action:** Add internal links from:
     - Homepage navigation
     - Footer
     - Related pages
     - Sitemap

3. **Optimize Meta Descriptions (26 pages)**
   - **Impact:** Medium-High - Better SERP appearance
   - **Effort:** Low
   - **Action:** Trim all location page meta descriptions to 120-160 characters

### 🟡 MEDIUM PRIORITY (Fix Within 2 Weeks)

4. **Expand Thin Content (26 pages)**
   - **Impact:** Medium - Better rankings for location-based searches
   - **Effort:** High
   - **Action:** Add 200-300 more words to each location page with unique, valuable content

5. **Improve Site Structure (28 deep pages)**
   - **Impact:** Medium - Better crawlability and user experience
   - **Effort:** Medium
   - **Action:** Flatten structure or add direct links from homepage

### 🟢 LOW PRIORITY (Ongoing Improvement)

6. **Monitor and Maintain**
   - Regular Screaming Frog crawls (monthly)
   - Monitor for new 404s
   - Track rankings for target keywords
   - Review and update content quarterly

---

## Detailed Recommendations by Page Type

### Location Pages (26 pages)

**Current Issues:**
- All have 243 words (thin content)
- All have meta descriptions > 160 characters
- Most are orphaned (no inbound links)
- 6 pages have duplicate content

**Action Plan:**
1. Expand each page to 400-600 words with unique content
2. Trim meta descriptions to 120-160 characters
3. Add unique titles (currently some are duplicates)
4. Add internal links from:
   - Main locations page
   - Related service pages
   - Footer
   - Homepage "Popular Locations" section

### Service Pages (5 pages)

**Current Issues:**
- All are orphaned (no inbound links)

**Action Plan:**
1. Add to main navigation menu
2. Add to footer
3. Link from homepage "Services" section
4. Add cross-links between related services

### Regional Pages (2 pages)

**Current Issues:**
- Both are orphaned

**Action Plan:**
1. Add prominent links from homepage
2. Add to navigation or footer
3. Link from service pages

---

## Implementation Checklist

### Week 1: Critical Fixes
- [ ] Fix duplicate content on 6 location pages
- [ ] Add internal links to all service pages from homepage
- [ ] Add service pages to footer
- [ ] Optimize all meta descriptions to 120-160 characters
- [ ] Fix duplicate titles

### Week 2: Internal Linking
- [ ] Add locations page to navigation
- [ ] Create sitemap page with all important links
- [ ] Add contextual links between related pages
- [ ] Add breadcrumb navigation
- [ ] Link location pages from main locations page

### Week 3-4: Content Expansion
- [ ] Expand content on all 26 location pages to 400-600 words
- [ ] Add unique sections to each location page
- [ ] Add local testimonials or case studies
- [ ] Create location-specific FAQs

### Ongoing: Monitoring
- [ ] Set up monthly Screaming Frog crawls
- [ ] Monitor Google Search Console for issues
- [ ] Track keyword rankings
- [ ] Review and update content quarterly

---

## Expected Impact

### Short-term (1-2 months)
- Improved crawlability (all pages discoverable)
- Better SERP appearance (optimized meta descriptions)
- Elimination of duplicate content penalties
- Improved user navigation

### Long-term (3-6 months)
- Better rankings for location-based searches
- Increased organic traffic
- Higher engagement rates
- Improved conversion rates

---

## Tools for Ongoing Monitoring

1. **Screaming Frog SEO Spider** - Monthly crawls
2. **Google Search Console** - Monitor indexing and performance
3. **Google Analytics** - Track traffic and user behavior
4. **Ahrefs/SEMrush** - Track keyword rankings
5. **PageSpeed Insights** - Monitor page speed

---

## Conclusion

The Dirtworks Landscaping website has a solid SEO foundation with no critical technical issues (no 404s, all pages have H1/H2 tags and meta descriptions). However, there are significant opportunities for improvement:

1. **Immediate Action Required:** Fix duplicate content and orphaned pages
2. **Quick Wins:** Optimize meta descriptions and add internal links
3. **Long-term Strategy:** Expand content depth and improve site structure

By addressing these issues systematically, the site should see improved search engine visibility, better user experience, and increased organic traffic over the next 3-6 months.

---

**Report Generated:** November 11, 2025  
**Next Review Recommended:** December 11, 2025
