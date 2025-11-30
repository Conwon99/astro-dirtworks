# Google Analytics Events - Complete Reference Guide

## Overview

This document provides a comprehensive explanation of every Google Analytics event tracked on the Dirtworks Landscaping website.

---

## Event Categories

- **Automatic Events** - Tracked automatically by GA4 (no code required)
- **Custom Events** - Tracked via custom code in the website
- **Conversion Events** - Key business actions (phone calls, form submissions, etc.)

---

## Complete Events Table

| # | Event Name | Type | Description | When It Fires | Parameters | Example Values |
|---|------------|------|-------------|---------------|------------|----------------|
| 1 | **page_view** | Automatic | Tracks when a user views a page | Automatically on every page load/navigation | `page_path`, `page_title` | `page_path: "/services"`, `page_title: "Services - Dirtworks"` |
| 2 | **phone_click** | Custom | Tracks when user clicks a phone number link | User clicks `tel:` link | `event_category: "engagement"`, `source` | `source: "hero_section"`, `source: "navigation"` |
| 3 | **whatsapp_click** | Custom | Tracks when user clicks WhatsApp button | User clicks WhatsApp button/link | `event_category: "engagement"`, `source` | `source: "whatsapp_click_hero"`, `source: "whatsapp_click_contact"` |
| 4 | **email_click** | Custom | Tracks when user clicks an email address link | User clicks `mailto:` link | `source` | `source: "contact_section"`, `source: "garden_maintenance_page"` |
| 5 | **quote_request** | Custom | Tracks successful quote form submissions | Form successfully submits to Formspree | `event_category: "engagement"`, `source`, `services` | `source: "contact_form"`, `services: ["Garden Maintenance"]` |
| 6 | **quote_button_click** | Custom | Tracks when user clicks "Get Quote" button | User clicks any quote button (not form submission) | `event_category: "engagement"`, `source`, `services` | `source: "services_grid"`, `services: ["Landscaping"]` |
| 7 | **form_interaction** | Custom | Tracks form submission attempts | Form submit button clicked (success or error) | `action`, `form_data` | `action: "quote_form"`, `form_data: {status: "submit_success"}` |
| 8 | **form_start** | Automatic | Tracks when user starts interacting with form | GA4 automatically detects form field interaction | (Automatic - no parameters) | (GA4 handles automatically) |
| 9 | **facebook_page_click** | Custom | Tracks clicks to Facebook page | User clicks Facebook page link | `event_category: "engagement"`, `source` | `source: "footer"`, `source: "gallery"` |
| 10 | **facebook_messenger_click** | Custom | Tracks clicks to Facebook Messenger | User clicks Facebook Messenger link | `event_category: "engagement"`, `source` | `source: "contact_section"` |
| 11 | **navigation_click** | Custom | Tracks navigation menu clicks | User clicks navigation menu item | `section_id` | `section_id: "hero"`, `section_id: "services"` |
| 12 | **service_click** | Custom | Tracks clicks on service cards/links | User clicks "Learn More" on service card | `service_title`, `source` | `service_title: "Garden Maintenance"`, `source: "services_grid"` |
| 13 | **gallery_interaction** | Custom | Tracks gallery image interactions | User opens/closes/navigates gallery | `action`, `image_index` | `action: "image_open"`, `image_index: 3` |
| 14 | **external_link_click** | Custom | Tracks clicks to external websites | User clicks link to external site | `link_url`, `link_text` | `link_url: "https://instagram.com"`, `link_text: "Instagram"` |
| 15 | **scroll_depth** | Custom | Tracks how far user scrolls | User reaches scroll milestones | `depth` | `depth: 25`, `depth: 50`, `depth: 75`, `depth: 100` |
| 16 | **time_on_page** | Custom | Tracks time spent on page | Time-based milestones reached | `time_seconds` | `time_seconds: 30`, `time_seconds: 60` |
| 17 | **button_click** | Custom | Generic button click tracking | User clicks tracked button | `button_text`, `button_location`, `action` | (Currently defined but not actively used) |
| 18 | **exception** | Custom | Tracks JavaScript errors | Error occurs on 404 page | `description`, `fatal` | `description: "Page not found"`, `fatal: false` |

---

## Detailed Event Explanations

### 1. page_view
**Type:** Automatic (GA4)  
**Purpose:** Track page views across the website  
**Fires:** Automatically on every page load and navigation  
**Parameters:**
- `page_path` - The URL path (e.g., "/services", "/locations/ayr")
- `page_title` - The page title (e.g., "Services - Dirtworks Landscaping")

**Where Used:** All pages automatically  
**Code Location:** `src/layouts/Layout.astro` (line 454)

---

### 2. phone_click
**Type:** Custom  
**Purpose:** Track phone number clicks (conversion event)  
**Fires:** When user clicks a `tel:+447403725998` link  
**Parameters:**
- `event_category: "engagement"`
- `source` - Location where phone was clicked

**Source Values:**
- `"hero_section"` - Hero section phone button
- `"contact_section"` - Contact section phone link
- `"navigation"` - Navigation bar phone button
- `"service_areas"` - Service areas section
- `"faq_section"` - FAQ section
- `"footer"` - Footer phone link
- `"stirling_hero"`, `"stirling_cta"` - Stirling page
- `"edinburgh_hero"`, `"edinburgh_cta"` - Edinburgh page
- Service pages: `"garden_maintenance_page"`, `"building_services_page"`, etc.
- Location pages: Various location-specific sources

**Where Used:** 21+ locations across the website  
**Code Location:** `src/utils/analytics.ts` (line 40), used in multiple components

---

### 3. whatsapp_click
**Type:** Custom  
**Purpose:** Track WhatsApp button clicks (conversion event)  
**Fires:** When user clicks WhatsApp button/link  
**Parameters:**
- `event_category: "engagement"`
- `source` - Location where WhatsApp was clicked

**Source Values:**
- `"whatsapp_click_hero"` - Hero section
- `"whatsapp_click_contact"` - Contact section
- `"whatsapp_click_service_areas"` - Service areas section
- `"whatsapp_click_about"` - About Us section
- `"whatsapp_click_stirling_hero"`, `"whatsapp_click_stirling_cta"` - Stirling page
- `"whatsapp_click_edinburgh_hero"`, `"whatsapp_click_edinburgh_cta"` - Edinburgh page

**Where Used:** 8+ locations  
**Code Location:** `src/utils/analytics.ts` (line 252)

---

### 4. email_click
**Type:** Custom  
**Purpose:** Track email address clicks  
**Fires:** When user clicks a `mailto:` link  
**Parameters:**
- `source` - Location where email was clicked

**Source Values:**
- `"contact_section"` - Contact section
- Service pages: `"garden_maintenance_page"`, `"building_services_page"`, etc.

**Where Used:** Contact section and service pages  
**Code Location:** `src/utils/analytics.ts` (line 231)

---

### 5. quote_request
**Type:** Custom  
**Purpose:** Track successful quote form submissions (conversion event)  
**Fires:** When form successfully submits to Formspree (`response.ok === true`)  
**Parameters:**
- `event_category: "engagement"`
- `source` - Where the form submission originated
- `services` - Array of selected services

**Source Values:**
- `"contact_form"` - Hero or Contact section form submission
- `"services_grid"` - (Currently also fires on button click - needs fixing)
- `"navigation_button"` - (Currently also fires on button click - needs fixing)
- `"faq_section"` - (Currently also fires on button click - needs fixing)
- `"reviews_section"` - (Currently also fires on button click - needs fixing)
- Location pages: Various location CTAs (Currently also fires on button click - needs fixing)

**⚠️ IMPORTANT:** Currently fires on both button clicks AND form submissions. Should only fire on successful form submissions.

**Where Used:** Form submission handlers in `Hero.tsx` and `ContactSection.tsx`  
**Code Location:** `src/utils/analytics.ts` (line 84)

---

### 6. quote_button_click
**Type:** Custom  
**Purpose:** Track quote button clicks (user intent, not conversion)  
**Fires:** When user clicks "Get Quote" button (before form submission)  
**Parameters:**
- `event_category: "engagement"`
- `source` - Location of button
- `services` - Array of services (if applicable)

**Status:** Function exists but not currently used (should replace button click tracking for `quote_request`)  
**Code Location:** `src/utils/analytics.ts` (line 363)

---

### 7. form_interaction
**Type:** Custom  
**Purpose:** Track form submission attempts (success and errors)  
**Fires:** When form submit button is clicked (regardless of success)  
**Parameters:**
- `action` - Form identifier (e.g., `"quote_form"`)
- `form_data` - Additional form data (e.g., `{status: "submit_success"}` or `{status: "submit_error"}`)

**Action Values:**
- `"quote_form"` - Quote request form

**Form Data Values:**
- `{status: "submit_success"}` - Form submitted successfully
- `{status: "submit_error"}` - Form submission failed

**Where Used:** `Hero.tsx` and `ContactSection.tsx` form handlers  
**Code Location:** `src/utils/analytics.ts` (line 137)

---

### 8. form_start
**Type:** Automatic (GA4)  
**Purpose:** Track when users start interacting with forms  
**Fires:** Automatically when GA4 detects form field interaction (click, focus, or typing)  
**Parameters:** None (handled automatically by GA4)

**Note:** This is an automatic GA4 event. You don't need to code it.

---

### 9. facebook_page_click
**Type:** Custom  
**Purpose:** Track clicks to Facebook page  
**Fires:** When user clicks link to Facebook page  
**Parameters:**
- `event_category: "engagement"`
- `source` - Location where Facebook link was clicked

**Source Values:**
- `"footer"` - Footer Facebook link
- `"gallery"` - Gallery "View more on Facebook" button
- `"about_us"` - About Us section

**Where Used:** Footer, Gallery, About Us  
**Code Location:** `src/utils/analytics.ts` (line 340)

---

### 10. facebook_messenger_click
**Type:** Custom  
**Purpose:** Track clicks to Facebook Messenger  
**Fires:** When user clicks Facebook Messenger link  
**Parameters:**
- `event_category: "engagement"`
- `source` - Location where Messenger link was clicked

**Status:** Function exists but may not be actively used  
**Code Location:** `src/utils/analytics.ts` (line 109)

---

### 11. navigation_click
**Type:** Custom  
**Purpose:** Track navigation menu usage  
**Fires:** When user clicks navigation menu item  
**Parameters:**
- `section_id` - The section ID being navigated to

**Section ID Values:**
- `"hero"` - Home section
- `"services"` - Services section
- `"gallery"` - Gallery section
- `"faq"` - FAQ section
- `"contact-form"` - Contact form section

**Where Used:** Navigation component  
**Code Location:** `src/utils/analytics.ts` (line 63)

---

### 12. service_click
**Type:** Custom  
**Purpose:** Track clicks on service cards/links  
**Fires:** When user clicks "Learn More" on a service card  
**Parameters:**
- `service_title` - Name of the service
- `source` - Where the service was clicked

**Service Title Values:**
- `"Garden Maintenance"`
- `"Landscaping & Groundworks"`
- `"Patios, Fencing & Decking"`
- `"Pressure Washing"`
- `"Building Services"`

**Source Values:**
- `"services_grid"` - Services grid on homepage

**Where Used:** ServicesGrid component  
**Code Location:** `src/utils/analytics.ts` (line 160)

---

### 13. gallery_interaction
**Type:** Custom  
**Purpose:** Track gallery image viewing behavior  
**Fires:** When user interacts with gallery (opens, closes, navigates)  
**Parameters:**
- `action` - Type of interaction
- `image_index` - Index of image (optional)

**Action Values:**
- `"image_open"` - User opens an image
- `"lightbox_close"` - User closes the lightbox
- `"image_next"` - User navigates to next image
- `"image_prev"` - User navigates to previous image

**Where Used:** Gallery component  
**Code Location:** `src/utils/analytics.ts` (line 275)

---

### 14. external_link_click
**Type:** Custom  
**Purpose:** Track clicks to external websites  
**Fires:** When user clicks link to external site  
**Parameters:**
- `link_url` - URL of external link
- `link_text` - Text of the link

**Where Used:** Footer (Instagram, LinkedIn links)  
**Code Location:** `src/utils/analytics.ts` (line 183)

---

### 15. scroll_depth
**Type:** Custom  
**Purpose:** Track how far users scroll down pages  
**Fires:** When user reaches scroll milestones  
**Parameters:**
- `depth` - Scroll percentage reached

**Depth Values:**
- `25` - 25% scrolled
- `50` - 50% scrolled
- `75` - 75% scrolled
- `100` - 100% scrolled (bottom of page)

**Where Used:** ScrollDepthTracker component (on all pages)  
**Code Location:** `src/utils/analytics.ts` (line 298), `src/components/ScrollDepthTracker.tsx`

---

### 16. time_on_page
**Type:** Custom  
**Purpose:** Track time spent on pages  
**Fires:** When user reaches time milestones  
**Parameters:**
- `time_seconds` - Time in seconds

**Time Values:**
- `30` - 30 seconds
- `60` - 1 minute
- `120` - 2 minutes
- `300` - 5 minutes

**Status:** Function exists but may use `scroll_depth` instead  
**Code Location:** `src/utils/analytics.ts` (line 319)

---

### 17. button_click
**Type:** Custom  
**Purpose:** Generic button click tracking  
**Fires:** When user clicks tracked button  
**Parameters:**
- `button_text` - Text on the button
- `button_location` - Where the button is located
- `action` - Optional action identifier

**Status:** Function defined but not actively used  
**Code Location:** `src/utils/analytics.ts` (line 206)

---

### 18. exception
**Type:** Custom  
**Purpose:** Track JavaScript errors  
**Fires:** When error occurs (e.g., 404 page)  
**Parameters:**
- `description` - Error description
- `fatal` - Whether error is fatal

**Where Used:** 404 error page  
**Code Location:** `src/pages/404.astro` (line 42)

---

## Conversion Events (Key Business Actions)

These are the most important events for measuring business success:

1. **phone_click** - User wants to call
2. **whatsapp_click** - User wants to message
3. **quote_request** - User successfully submitted quote form
4. **email_click** - User wants to email

---

## Event Funnel

### Awareness Stage
- `page_view` - User visits page
- `scroll_depth` - User engages with content

### Interest Stage
- `service_click` - User interested in specific service
- `navigation_click` - User exploring site
- `gallery_interaction` - User viewing work

### Consideration Stage
- `quote_button_click` - User clicks quote button (intent)
- `form_start` - User starts filling form
- `form_interaction` - User attempts submission

### Action Stage (Conversions)
- `quote_request` - User successfully submits form ✅
- `phone_click` - User calls ✅
- `whatsapp_click` - User messages ✅
- `email_click` - User emails ✅

---

## Common Issues & Notes

### ⚠️ Issue: quote_request Firing on Button Clicks
**Problem:** `quote_request` currently fires when users click "Get Quote" buttons, not just when they submit forms.  
**Impact:** GA4 shows 6 quote requests, but Formspree shows 0 submissions.  
**Solution:** Remove `trackQuoteRequest()` from button click handlers. Keep it only in form submission success handlers.

### ✅ Automatic Events
- `page_view` - Automatically tracked by GA4
- `form_start` - Automatically tracked by GA4 when users interact with form fields

### 📊 Recommended GA4 Conversions
Mark these as conversions in GA4:
1. `phone_click`
2. `whatsapp_click`
3. `quote_request`
4. `email_click`

---

## Event Tracking Summary

| Category | Event Count | Key Events |
|----------|-------------|------------|
| **Automatic** | 2 | `page_view`, `form_start` |
| **Custom** | 16 | All others |
| **Conversions** | 4 | `phone_click`, `whatsapp_click`, `quote_request`, `email_click` |
| **Total** | 18 | All events combined |

---

## Quick Reference: Where Events Are Used

### Homepage
- `phone_click` (hero, navigation, contact, FAQ, footer)
- `whatsapp_click` (hero, contact, service areas, about)
- `quote_request` (form submissions, button clicks)
- `form_interaction` (form submissions)
- `service_click` (services grid)
- `navigation_click` (navigation menu)
- `gallery_interaction` (gallery)
- `scroll_depth` (all pages)
- `facebook_page_click` (footer, gallery, about)

### Service Pages
- `phone_click`
- `email_click`
- `quote_request` (button clicks - needs fixing)

### Location Pages (26 pages)
- `quote_request` (button clicks - needs fixing)

### Services Page
- `quote_request` (button click - needs fixing)

---

## Implementation Files

- **Analytics Functions:** `src/utils/analytics.ts`
- **Components Using Analytics:** All components in `src/components/`
- **Pages Using Analytics:** All pages in `src/pages/`
- **GA4 Configuration:** `src/layouts/Layout.astro`

---

*Last Updated: Based on current codebase analysis*





