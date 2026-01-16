import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent body style changes that cause layout shifts
const preventBodyStyleChanges = () => {
  // Store original computed styles
  const originalOverflow = window.getComputedStyle(document.body).overflow;
  const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
  
  // Use requestAnimationFrame for continuous monitoring
  let rafId: number;
  const checkAndReset = () => {
    // Force reset any problematic styles
    if (document.body.style.paddingRight && document.body.style.paddingRight !== '0px') {
      document.body.style.setProperty('padding-right', '0', 'important');
    }
    if (document.body.style.marginRight && document.body.style.marginRight !== '0px') {
      document.body.style.setProperty('margin-right', '0', 'important');
    }
    // Only reset overflow if it's been changed to hidden
    const currentOverflow = document.body.style.overflow;
    if (currentOverflow === 'hidden') {
      document.body.style.setProperty('overflow', '', 'important');
    }
    rafId = requestAnimationFrame(checkAndReset);
  };
  
  // Start the loop
  rafId = requestAnimationFrame(checkAndReset);
  
  // Also use MutationObserver for immediate response
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      // Immediately reset on any style change
      document.body.style.setProperty('padding-right', '0', 'important');
      document.body.style.setProperty('margin-right', '0', 'important');
      if (document.body.style.overflow === 'hidden') {
        document.body.style.setProperty('overflow', '', 'important');
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: false
  });

  // Cleanup function (though we don't really need to clean up)
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    observer.disconnect();
  };
};

// Initialize observer after DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preventBodyStyleChanges();
    });
  } else {
    preventBodyStyleChanges();
  }
}

createRoot(document.getElementById("root")!).render(<App />);
