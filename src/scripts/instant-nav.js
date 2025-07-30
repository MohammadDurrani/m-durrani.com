// Add this script to a new file: public/instant-nav.js
// Or include it in your MainLayout.astro

(function() {
  'use strict';
  
  let isNavigating = false;
  const prefetchedPages = new Set();
  
  // Preload critical resources
  function preloadPage(url) {
    if (prefetchedPages.has(url)) return;
    prefetchedPages.add(url);
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
  
  // Instant visual feedback
  function addInstantFeedback() {
    const style = document.createElement('style');
    style.textContent = `
      .nav-loading {
        opacity: 0.7 !important;
        transform: scale(0.98) !important;
        transition: all 0.1s ease !important;
      }
      
      .page-transitioning {
        pointer-events: none;
        cursor: wait;
      }
      
      .page-transitioning * {
        cursor: wait !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize
  function init() {
    addInstantFeedback();
    
    // Preload critical pages immediately
    const criticalPaths = ['/', '/dev', '/writing'];
    criticalPaths.forEach(path => {
      if (path !== window.location.pathname) {
        preloadPage(path);
      }
    });
    
    // Preload on hover
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href]');
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          preloadPage(url.pathname);
        }
      }
    });
    
    // Instant feedback on click
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (link && link.href && !link.href.startsWith('#')) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          if (!isNavigating) {
            isNavigating = true;
            
            // Add loading state immediately
            link.classList.add('nav-loading');
            document.body.classList.add('page-transitioning');
            
            // Clean up after navigation
            setTimeout(() => {
              link.classList.remove('nav-loading');
              document.body.classList.remove('page-transitioning');
              isNavigating = false;
            }, 2000); // Fallback cleanup
          }
        }
      }
    });
    
    // Clean up on Astro navigation events
    document.addEventListener('astro:after-swap', () => {
      document.body.classList.remove('page-transitioning');
      document.querySelectorAll('.nav-loading').forEach(el => {
        el.classList.remove('nav-loading');
      });
      isNavigating = false;
    });
    
    // Optimize images loading
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0 && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Re-initialize on Astro page transitions
  document.addEventListener('astro:after-swap', init);
})();