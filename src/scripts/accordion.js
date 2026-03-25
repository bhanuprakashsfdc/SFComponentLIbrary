// Accordion JavaScript
// Handles accordion expand/collapse functionality

document.addEventListener('DOMContentLoaded', function() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const contentId = this.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      
      if (!content) return;
      
      // Toggle current item
      this.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
      
      // Optional: Close other items (accordion behavior - uncomment to enable)
      // accordionTriggers.forEach(otherTrigger => {
      //   if (otherTrigger !== this) {
      //     otherTrigger.setAttribute('aria-expanded', 'false');
      //     const otherContentId = otherTrigger.getAttribute('aria-controls');
      //     const otherContent = document.getElementById(otherContentId);
      //     if (otherContent) {
      //       otherContent.setAttribute('aria-hidden', 'true');
      //     }
      //   }
      // });
    });
  });
});