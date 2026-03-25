// SLDS Accordion JavaScript
// Handles SLDS accordion expand/collapse functionality

document.addEventListener('DOMContentLoaded', function() {
  const accordionSections = document.querySelectorAll('.slds-accordion__section');
  
  accordionSections.forEach(section => {
    const trigger = section.querySelector('.slds-accordion__summary-action');
    const content = section.querySelector('.slds-accordion__content');
    
    if (trigger && content) {
      // Set initial state
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        content.style.display = 'block';
      }
      
      trigger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle current section
        this.setAttribute('aria-expanded', !isExpanded);
        content.style.display = isExpanded ? 'none' : 'block';
        
        // Toggle open class for icon rotation
        if (!isExpanded) {
          section.classList.add('slds-is-open');
        } else {
          section.classList.remove('slds-is-open');
        }
      });
    }
  });
});