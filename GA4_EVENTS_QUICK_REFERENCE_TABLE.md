# Google Analytics Events - Quick Reference Table

## All Events at a Glance

| Event Name | Type | What It Tracks | When It Fires | Key Parameters |
|------------|------|----------------|---------------|----------------|
| **page_view** | Auto | Page views | Every page load | `page_path`, `page_title` |
| **phone_click** | Custom | Phone number clicks | User clicks `tel:` link | `source` (21+ locations) |
| **whatsapp_click** | Custom | WhatsApp button clicks | User clicks WhatsApp | `source` (8+ locations) |
| **email_click** | Custom | Email link clicks | User clicks `mailto:` | `source` |
| **form_submission** | Custom | Form submissions | Form submits successfully | `source`, `services[]` |
| **quote_button_click** | Custom | Quote button clicks | User clicks "Get Quote" | `source`, `services[]` |
| **form_interaction** | Custom | Form attempts | Form submit clicked | `action`, `form_data` |
| **form_start** | Auto | Form field interaction | User clicks/focuses field | (automatic) |
| **facebook_page_click** | Custom | Facebook page clicks | User clicks FB link | `source` |
| **facebook_messenger_click** | Custom | Messenger clicks | User clicks Messenger | `source` |
| **navigation_click** | Custom | Menu navigation | User clicks nav item | `section_id` |
| **service_click** | Custom | Service card clicks | User clicks service | `service_title`, `source` |
| **gallery_interaction** | Custom | Gallery actions | User opens/navigates | `action`, `image_index` |
| **external_link_click** | Custom | External link clicks | User clicks external link | `link_url`, `link_text` |
| **scroll_depth** | Custom | Scroll percentage | User reaches milestone | `depth` (25/50/75/100) |
| **time_on_page** | Custom | Time on page | Time milestone reached | `time_seconds` |
| **button_click** | Custom | Generic button clicks | User clicks button | `button_text`, `location` |
| **exception** | Custom | JavaScript errors | Error occurs | `description`, `fatal` |

---

## Conversion Events (Most Important)

| Event | Description | Where It's Used |
|-------|-------------|-----------------|
| **phone_click** | User clicks phone number | Hero, Navigation, Contact, FAQ, Footer, Service pages, Location pages |
| **whatsapp_click** | User clicks WhatsApp | Hero, Contact, Service Areas, About, Location pages |
| **form_submission** | User submits quote form | Form submission success (Hero & Contact forms) |
| **email_click** | User clicks email | Contact section, Service pages |

---

## Event Parameters Explained

### phone_click
**Parameters:**
- `event_category: "engagement"`
- `source` - Examples: `"hero_section"`, `"navigation"`, `"contact_section"`, `"footer"`

### whatsapp_click
**Parameters:**
- `event_category: "engagement"`
- `source` - Examples: `"whatsapp_click_hero"`, `"whatsapp_click_contact"`

### form_submission
**Parameters:**
- `event_category: "engagement"`
- `source` - Examples: `"contact_form"` (form submissions only)
- `services` - Array: `["Garden Maintenance"]` or `[]`

### form_interaction
**Parameters:**
- `action` - Example: `"quote_form"`
- `form_data` - Example: `{status: "submit_success"}` or `{status: "submit_error"}`

### gallery_interaction
**Parameters:**
- `action` - Values: `"image_open"`, `"lightbox_close"`, `"image_next"`, `"image_prev"`
- `image_index` - Number (optional)

### scroll_depth
**Parameters:**
- `depth` - Values: `25`, `50`, `75`, `100` (percentage)

---

## Event Usage by Page Type

### Homepage
- `page_view` ✅
- `phone_click` ✅ (multiple locations)
- `whatsapp_click` ✅ (multiple locations)
- `form_submission` ✅ (form submissions)
- `form_interaction` ✅ (form attempts)
- `service_click` ✅ (services grid)
- `navigation_click` ✅ (menu)
- `gallery_interaction` ✅ (gallery)
- `scroll_depth` ✅ (all pages)
- `facebook_page_click` ✅ (footer, gallery)

### Service Pages
- `page_view` ✅
- `phone_click` ✅
- `email_click` ✅

### Location Pages (26 pages)
- `page_view` ✅

### Services Page
- `page_view` ✅

---

## Automatic vs Custom Events

### Automatic (GA4 Handles)
- ✅ `page_view` - Every page load
- ✅ `form_start` - Form field interaction

### Custom (Your Code)
- ✅ All other 16 events

---

## Common Source Values

### Phone Click Sources
`"hero_section"`, `"contact_section"`, `"navigation"`, `"service_areas"`, `"faq_section"`, `"footer"`, `"stirling_hero"`, `"edinburgh_hero"`, service pages, location pages

### WhatsApp Click Sources
`"whatsapp_click_hero"`, `"whatsapp_click_contact"`, `"whatsapp_click_service_areas"`, `"whatsapp_click_about"`, `"whatsapp_click_stirling_hero"`, `"whatsapp_click_edinburgh_hero"`

### Form Submission Sources
`"contact_form"` (form submission only - Hero & Contact forms)

---

## ⚠️ Known Issues

### ✅ Fixed: form_submission Only Fires on Successful Submissions
**Current Behavior:** `form_submission` fires only when Formspree confirms successful form submission  
**Implementation:** Verifies both HTTP status and Formspree response body before tracking  
**Result:** GA4 events match Formspree submissions accurately

---

## Quick Stats

- **Total Events:** 18
- **Automatic Events:** 2
- **Custom Events:** 16
- **Conversion Events:** 4
- **Events with Issues:** 0 (all fixed ✅)

---

*For detailed explanations, see `GOOGLE_ANALYTICS_EVENTS_COMPLETE_REFERENCE.md`*

