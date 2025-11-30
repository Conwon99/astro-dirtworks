import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { trackPhoneCall, trackEmailClick } from "@/utils/analytics";

interface QuoteButtonProps {
  pageName: string;
  serviceName?: string;
  className?: string;
}

export const QuoteButton = ({ pageName, serviceName, className }: QuoteButtonProps) => {
  const handleQuoteClick = () => {
    // Removed trackQuoteRequest - only track on successful form submissions, not button clicks
    window.location.href = "/contact";
  };

  return (
    <Button 
      onClick={handleQuoteClick}
      className={className || "bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full"}
    >
      Get Free Quote
    </Button>
  );
};

export const CallButton = ({ pageName, className }: { pageName: string; className?: string }) => {
  const handleCallClick = () => {
    trackPhoneCall(pageName);
    window.location.href = "tel:+447403725998";
  };

  return (
    <Button 
      onClick={handleCallClick}
      variant="outline"
      className={className || "border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full"}
    >
      <Phone className="w-5 h-5 mr-2" />
      Call 07403 725998
    </Button>
  );
};

export const EmailLink = ({ pageName, email, className }: { pageName: string; email: string; className?: string }) => {
  const handleEmailClick = () => {
    trackEmailClick(pageName);
  };

  return (
    <a 
      href={`mailto:${email}`}
      onClick={handleEmailClick}
      className={className || "text-green-600 hover:text-green-700"}
    >
      {email}
    </a>
  );
};

export const PhoneLink = ({ pageName, phone, className }: { pageName: string; phone: string; className?: string }) => {
  const handleCallClick = () => {
    trackPhoneCall(pageName);
  };

  return (
    <a 
      href={`tel:${phone}`}
      onClick={handleCallClick}
      className={className || "text-green-600 hover:text-green-700"}
    >
      {phone}
    </a>
  );
};

