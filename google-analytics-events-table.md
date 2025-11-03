# Google Analytics Events Table

## Complete Event Tracking Overview

| Event Name | Parameters | Triggered From | Sources/Values | Description |
|------------|-----------|----------------|----------------|-------------|
| **page_view** | `page_path`, `page_title` | Automatic on navigation | All pages | Tracks page views across the site |
| **phone_call** | `source` | Phone number clicks | `hero_section`, `contact_section`, `service_areas`, `navigation`, `faq_section`, `stirling_hero`, `stirling_cta`, `edinburgh_hero`, `edinburgh_cta`, `glasgow_page`, `ayrshire_page`, `garden_maintenance_page`, `building_services_page`, `pressure_washing_page`, `patios_fencing_decking_page`, `landscaping_groundworks_page` | Tracks when users click phone number links |
| **whatsapp_click** | `source` | WhatsApp button clicks | `whatsapp_click_hero`, `whatsapp_click_contact`, `whatsapp_click_service_areas`, `whatsapp_click_about`, `whatsapp_click_stirling_hero`, `whatsapp_click_stirling_cta`, `whatsapp_click_edinburgh_hero`, `whatsapp_click_edinburgh_cta` | Tracks WhatsApp button clicks across different sections |
| **email_click** | `source` | Email link clicks | `contact_section`, `glasgow_page`, `ayrshire_page`, `garden_maintenance_page`, `building_services_page`, `pressure_washing_page`, `patios_fencing_decking_page`, `landscaping_groundworks_page` | Tracks when users click email addresses |
| **quote_request** | `source`, `services` | Quote request buttons | `contact_form`, `services_grid`, `navigation_button`, `faq_section`, `reviews_section`, `glasgow_page`, `ayrshire_page`, `garden_maintenance_page`, `building_services_page`, `pressure_washing_page`, `patios_fencing_decking_page`, `landscaping_groundworks_page` | Tracks quote request submissions with service types |
| **form_interaction** | `action`, `form_data` | Contact form interactions | `quote_form` with actions: `submit_success`, `submit_error` | Tracks form submissions and errors |
| **navigation_click** | `section_id` | Navigation menu clicks | Various section IDs from navigation | Tracks navigation menu usage |
| **service_click** | `service_title`, `source` | Service card clicks | `services_grid` with various service titles | Tracks clicks on service offerings |
| **gallery_interaction** | `action`, `image_index` | Gallery interactions | Actions: `image_open`, `lightbox_close`, `image_next`, `image_prev` | Tracks gallery image viewing behavior |
| **external_link_click** | `link_url`, `link_text` | External link clicks | Facebook profile link, other external links | Tracks clicks to external websites |
| **scroll_depth** | `depth` | Scroll milestones | Values: `25`, `50`, `75`, `100` (percentage) | Tracks how far users scroll down pages |
| **button_click** | `button_text`, `button_location`, `action` | Generic button clicks | Various buttons (currently defined but not actively used) | General purpose button tracking |
| **messenger_click** | `source` | Messenger button clicks | (Legacy - replaced by whatsapp_click) | Old tracking method for messenger buttons |
| **time_on_page** | `time_seconds` | Time-based tracking | Tracked via ScrollDepthTracker component | Tracks time spent on pages |

---

## Event Details by Category

### 📞 Contact Events
- **phone_call**: 21 different sources across all pages and sections
- **whatsapp_click**: 8 specific sources for WhatsApp buttons
- **email_click**: 8 sources for email link clicks

### 📝 Form & Quote Events
- **quote_request**: 13 different sources tracking quote requests
- **form_interaction**: Contact form submissions (success/error tracking)

### 🖱️ User Interaction Events
- **navigation_click**: Navigation menu usage
- **service_click**: Service card interactions
- **gallery_interaction**: 4 different gallery actions
- **external_link_click**: External website navigation
- **button_click**: Generic button tracking

### 📊 Engagement Metrics
- **scroll_depth**: Tracks 25%, 50%, 75%, 100% scroll milestones
- **time_on_page**: Tracks time spent on pages
- **page_view**: Automatic page view tracking

---

## Most Active Tracking Sources

### Hero Section
- `whatsapp_click_hero`
- `hero_section` (phone calls)
- `contact_form` (quote requests)

### Contact Section
- `whatsapp_click_contact`
- `contact_section` (phone & email)
- `contact_form` (quote requests)

### Service Pages
- `glasgow_page`
- `ayrshire_page`
- `garden_maintenance_page`
- `building_services_page`
- `pressure_washing_page`
- `patios_fencing_decking_page`
- `landscaping_groundworks_page`

### Location Pages
- `stirling_hero` / `stirling_cta`
- `edinburgh_hero` / `edinburgh_cta`

---

## Implementation Status

✅ **Fully Implemented Events:**
- Page View Tracking
- Phone Call Tracking
- WhatsApp Click Tracking
- Email Click Tracking
- Quote Request Tracking
- Form Interaction Tracking
- Navigation Tracking
- Service Click Tracking
- Gallery Interaction Tracking
- External Link Tracking
- Scroll Depth Tracking

⚠️ **Defined but Not Used:**
- `button_click`: Function exists but no active implementations
- `messenger_click`: Legacy function, replaced by `whatsapp_click`
- `time_on_page`: Defined but using scroll_depth function instead

---

## Conversion Funnel Events

1. **Awareness**: `page_view`, `scroll_depth`
2. **Interest**: `service_click`, `navigation_click`, `gallery_interaction`
3. **Consideration**: `quote_request`, `external_link_click`
4. **Action**: `phone_call`, `whatsapp_click`, `email_click`, `form_interaction`

---

## Google Analytics 4 Configuration

All events are sent to:
- **Google Analytics 4** via `gtag()` function
- **Google Tag Manager** via `dataLayer.push()` (fallback)

**Measurement ID**: (Check your index.html for the GA4 ID)

---

## Recommendations for Analytics Dashboard

### Key Metrics to Monitor:
1. **Conversion Events**: `phone_call`, `whatsapp_click`, `quote_request`
2. **Engagement**: `scroll_depth`, `time_on_page`, `gallery_interaction`
3. **Traffic Quality**: `page_view`, `navigation_click`, `service_click`

### Custom Reports to Create:
1. **Contact Source Analysis**: Compare phone vs WhatsApp vs email by source
2. **Service Performance**: Track which services get the most clicks and quotes
3. **Page-Specific Conversions**: Compare conversion rates across location pages
4. **User Journey**: Track navigation patterns and engagement depth

---

*Last Updated: After WhatsApp tracking implementation*

