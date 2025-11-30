import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { trackQuoteRequest, trackFormInteraction } from "@/utils/analytics";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mgvnlora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          _subject: 'Contact Form Submission from Website'
        }),
      });

      // Parse response to check actual Formspree status
      const data = await response.json();
      
      // Check both HTTP status AND Formspree response body
      const isSuccess = response.ok && (data.ok === true || data.success === true || (!data.error && !data.errors));
      
      if (isSuccess) {
        // Track successful form submission
        trackQuoteRequest('contact_page', []);
        trackFormInteraction('contact_form', { status: 'submit_success' });
        
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          message: ''
        });
      } else {
        // Formspree rejected the submission
        const errorMessage = data.error || data.errors?.[0]?.message || 'Failed to send message';
        throw new Error(errorMessage);
      }
    } catch (error) {
      trackFormInteraction('contact_form', { status: 'submit_error' });
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-semibold">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 text-lg"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-lg font-semibold">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 text-lg"
            placeholder="Your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-lg font-semibold">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 text-lg min-h-[150px]"
            placeholder="Tell us about your project or inquiry..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white px-8 py-6 rounded-lg font-semibold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden border border-white/20 text-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></span>
          <span className="relative z-10">
            {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

