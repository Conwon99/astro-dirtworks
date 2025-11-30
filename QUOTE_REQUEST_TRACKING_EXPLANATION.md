# Quote Request Google Analytics Event - Complete Explanation

## Event Overview

**Event Name:** `quote_request`  
**Event Category:** `engagement`  
**Purpose:** Track when users successfully submit a quote request form

---

## Current Implementation Status ⚠️

**IMPORTANT:** The `quote_request` event is currently being fired in **TWO different scenarios**:

1. ✅ **On successful form submissions** (CORRECT - should track this)
2. ❌ **On button clicks** (INCORRECT - should NOT track this)

This is why you're seeing **6 quote requests in GA** but **0 Formspree submissions**.

---

## Where `quote_request` is Currently Fired

### ✅ CORRECT: Form Submissions (2 locations)

These fire `quote_request` **only when the form is successfully submitted** to Formspree:

#### 1. Hero Section Form (`src/components/Hero.tsx`)
- **Line 54:** `trackQuoteRequest('contact_form', [formData.service])`
- **Trigger:** When form submission to Formspree returns `response.ok`
- **Parameters:**
  - `source`: `'contact_form'`
  - `services`: Array with selected service (e.g., `['Garden Maintenance']`)

#### 2. Contact Section Form (`src/components/ContactSection.tsx`)
- **Line 49:** `trackQuoteRequest('contact_form', [formData.service])`
- **Trigger:** When form submission to Formspree returns `response.ok`
- **Parameters:**
  - `source`: `'contact_form'`
  - `services`: Array with selected service (e.g., `['Landscaping & Groundworks']`)

---

### ❌ INCORRECT: Button Clicks (Multiple locations)

These fire `quote_request` **when users click buttons** (not when they submit forms):

#### 3. Navigation Bar (`src/components/Navigation.tsx`)
- **Line 44:** `trackQuoteRequest('navigation_button', [])`
- **Trigger:** When user clicks "Free Quote" button in navigation
- **Action:** Scrolls to contact form (doesn't submit)
- **Parameters:**
  - `source`: `'navigation_button'`
  - `services`: `[]` (empty array)

#### 4. FAQ Section (`src/components/FAQ.tsx`)
- **Line 106:** `trackQuoteRequest('faq_section', [])`
- **Trigger:** When user clicks "Get Free Quote" button
- **Action:** Scrolls to contact form (doesn't submit)
- **Parameters:**
  - `source`: `'faq_section'`
  - `services`: `[]` (empty array)

#### 5. Reviews Section (`src/components/Reviews.tsx`)
- **Line 63:** `trackQuoteRequest('reviews_section', [])`
- **Trigger:** When user clicks "Contact Us Now" button
- **Action:** Scrolls to contact form (doesn't submit)
- **Parameters:**
  - `source`: `'reviews_section'`
  - `services`: `[]` (empty array)

#### 6. Services Grid (`src/components/ServicesGrid.tsx`)
- **Line 53:** `trackQuoteRequest('services_grid', [serviceTitle])`
- **Trigger:** When user clicks "Get Quote" button on a service card
- **Action:** Scrolls to contact form (doesn't submit)
- **Parameters:**
  - `source`: `'services_grid'`
  - `services`: Array with service name (e.g., `['Garden Maintenance']`)

#### 7. Service Page Button (`src/components/ServicePageButton.tsx`)
- **Line 13:** `trackQuoteRequest(pageName, serviceName ? [serviceName] : [])`
- **Trigger:** When user clicks quote button on service pages
- **Action:** Navigates to contact form (doesn't submit)
- **Parameters:**
  - `source`: Varies by page (e.g., `'garden_maintenance_page'`)
  - `services`: Array with service name or empty array

#### 8. Services Page CTA (`src/pages/services.astro`)
- **Lines 217-220:** Inline script fires `quote_request`
- **Trigger:** When user clicks "Get a Free Quote" button
- **Action:** Links to `/#contact-form` (doesn't submit)
- **Parameters:**
  - `source`: `'services_page_cta'`
  - `services`: Not included

#### 9. All Location Pages (26 pages)
- **Example:** `src/pages/locations/ayr.astro` (lines 227-230)
- **Trigger:** When user clicks "Get a Free Quote" button
- **Action:** Links to `/#contact-form` (doesn't submit)
- **Parameters:**
  - `source`: Varies by location (e.g., `'location_ayr_cta'`)
  - `services`: Not included

**Location pages with inline scripts:**
- ayr.astro
- kilmarnock.astro
- glasgow-city-center.astro
- irvine.astro
- troon.astro
- prestwick.astro
- ardrossan.astro
- saltcoats.astro
- largs.astro
- girvan.astro
- beith.astro
- dalry.astro
- kilwinning.astro
- cumnock.astro
- maybole.astro
- stewarton.astro
- stevenston.astro
- milngavie.astro
- bearsden.astro
- bishopbriggs.astro
- kirkintilloch.astro
- west-kilbride.astro
- north-glasgow.astro
- south-glasgow.astro
- east-glasgow.astro
- west-glasgow.astro

---

## Event Parameters

### Function Definition (`src/utils/analytics.ts`)

```typescript
export function trackQuoteRequest(source: string, services: string[]): void {
  window.gtag("event", "quote_request", {
    event_category: "engagement",
    source: source,
    services: services,
  });
}
```

### Parameters Sent to GA4:

| Parameter | Type | Description | Example Values |
|-----------|------|-------------|----------------|
| `event_category` | string | Always `"engagement"` | `"engagement"` |
| `source` | string | Where the event was triggered | `"contact_form"`, `"navigation_button"`, `"faq_section"`, etc. |
| `services` | string[] | Array of service names selected | `["Garden Maintenance"]`, `[]`, `["Landscaping & Groundworks"]` |

---

## The Problem

### Current Behavior:
```
User clicks "Get Quote" button
    ↓
quote_request event fires immediately ❌
    ↓
User navigates to form
    ↓
User may or may not fill out form
    ↓
User may or may not submit form
```

### What You're Seeing:
- **GA4:** 6 `quote_request` events
- **Formspree:** 0 submissions
- **Explanation:** 6 people clicked quote buttons, but none actually submitted the form

---

## What Should Happen

### Correct Behavior:
```
User clicks "Get Quote" button
    ↓
NO event fires (or different event like quote_button_click)
    ↓
User navigates to form
    ↓
User fills out form
    ↓
User clicks "Submit"
    ↓
Form sends to Formspree
    ↓
IF Formspree returns success:
    ↓
quote_request event fires ✅
```

### Expected Results:
- **GA4:** `quote_request` events = Number of successful Formspree submissions
- **Formspree:** Submissions = Number of `quote_request` events

---

## How to Fix

You have two options:

### Option 1: Only Track Form Submissions (Recommended)
- Remove all `trackQuoteRequest()` calls from button click handlers
- Keep `trackQuoteRequest()` only in form submission success handlers
- Result: `quote_request` = actual form submissions only

### Option 2: Track Both Separately
- Keep `trackQuoteRequest()` for form submissions
- Use `trackQuoteButtonClick()` for button clicks (already exists in `analytics.ts`)
- Result: Two separate events:
  - `quote_button_click` = button clicks (intent)
  - `quote_request` = form submissions (conversions)

---

## Current Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    quote_request Events                      │
└─────────────────────────────────────────────────────────────┘

Button Clicks (INCORRECT):
├─ Navigation "Free Quote" button
├─ FAQ "Get Free Quote" button
├─ Reviews "Contact Us Now" button
├─ Services Grid "Get Quote" buttons
├─ Service Page quote buttons
├─ Services Page CTA button
└─ All 26 Location Page CTA buttons

Form Submissions (CORRECT):
├─ Hero Section form (on success)
└─ Contact Section form (on success)
```

---

## Summary

| Metric | Current Count | What It Means |
|--------|---------------|---------------|
| **GA4 `quote_request` events** | 6 | 6 button clicks OR form submissions |
| **Formspree submissions** | 0 | 0 actual form submissions |
| **Conclusion** | ❌ Mismatch | Events are firing on button clicks, not form submissions |

**The `quote_request` event should ONLY fire when:**
1. User fills out the contact form
2. User clicks "Submit"
3. Form successfully sends to Formspree (`response.ok === true`)

**Currently, it's also firing when users:**
- Click any "Get Quote" button
- Navigate to the form
- But don't actually submit

---

## Next Steps

Would you like me to:
1. **Remove button click tracking** - So `quote_request` only fires on form submissions?
2. **Separate the events** - Use `quote_button_click` for buttons and `quote_request` for submissions?
3. **Keep as-is** - But understand that the numbers won't match Formspree?





