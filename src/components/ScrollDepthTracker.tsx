import { useEffect } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

const ScrollDepthTracker = () => {
  useEffect(() => {
    let maxScrollDepth = 0;
    const scrollDepthMilestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
      }

      // Track milestone achievements
      scrollDepthMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 0) {
        // Track time milestones: 30s, 1min, 2min, 5min
        const timeMilestones = [30, 60, 120, 300];
        timeMilestones.forEach(milestone => {
          if (timeSpent >= milestone && timeSpent < milestone + 1) {
            trackScrollDepth(milestone); // Reusing scroll depth function for time tracking
          }
        });
      }
    };

    const timeInterval = setInterval(trackTimeOnPage, 1000);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  return null;
};

export default ScrollDepthTracker;
