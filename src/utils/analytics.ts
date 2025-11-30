type GaLike = (
  command: string,
  eventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GaLike;
    dataLayer?: unknown[];
  }
}

export function trackPageView(pathname: string, title?: string): void {
  try {
    if (typeof window === "undefined") return;

    // Google Analytics 4 via gtag.js
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: title ?? document.title,
      });
      return;
    }

    // Fallback: push to dataLayer for GTM if present
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
        page_title: title ?? document.title,
      });
    }
  } catch {
    // Swallow errors to avoid breaking navigation
  }
}

export function trackPhoneCall(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "phone_click", {
        event_category: "engagement",
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "phone_click",
        event_category: "engagement",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackNavigation(sectionId: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "navigation_click", {
        section_id: sectionId,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "navigation_click",
        section_id: sectionId,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackQuoteRequest(source: string, services: string[]): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "form_submission", {
        event_category: "engagement",
        source: source,
        services: services,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "form_submission",
        event_category: "engagement",
        source: source,
        services: services,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFacebookMessengerClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "facebook_messenger_click", {
        event_category: "engagement",
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "facebook_messenger_click",
        event_category: "engagement",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

// Legacy function name for backwards compatibility
export function trackMessenger(source: string): void {
  trackFacebookMessengerClick(source);
}

export function trackFormInteraction(action: string, formData?: Record<string, unknown>): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "form_interaction", {
        action: action,
        form_data: formData,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "form_interaction",
        action: action,
        form_data: formData,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackServiceClick(serviceTitle: string, source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "service_click", {
        service_title: serviceTitle,
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "service_click",
        service_title: serviceTitle,
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackExternalLink(url: string, linkText: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "external_link_click", {
        link_url: url,
        link_text: linkText,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "external_link_click",
        link_url: url,
        link_text: linkText,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackButtonClick(buttonText: string, location: string, action?: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "button_click", {
        button_text: buttonText,
        button_location: location,
        action: action,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "button_click",
        button_text: buttonText,
        button_location: location,
        action: action,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackEmailClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "email_click", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "email_click",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackWhatsAppClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "engagement",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackGalleryInteraction(action: string, imageIndex?: number): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "gallery_interaction", {
        action: action,
        image_index: imageIndex,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "gallery_interaction",
        action: action,
        image_index: imageIndex,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackScrollDepth(depth: number): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "scroll_depth", {
        depth: depth,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "scroll_depth",
        depth: depth,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackTimeOnPage(timeInSeconds: number): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "time_on_page", {
        time_seconds: timeInSeconds,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "time_on_page",
        time_seconds: timeInSeconds,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFacebookPageClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "facebook_page_click", {
        event_category: "engagement",
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "facebook_page_click",
        event_category: "engagement",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackQuoteButtonClick(source: string, services: string[] = []): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "quote_button_click", {
        event_category: "engagement",
        source: source,
        services: services,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "quote_button_click",
        event_category: "engagement",
        source: source,
        services: services,
      });
    }
  } catch {
    // Swallow errors
  }
}

