// Component Registry - Defines all available components and their properties
const componentRegistry = {
  accordion: {
    name: 'Accordion',
    category: 'Data Display',
    description: 'Collapsible sections for organizing content and reducing visual clutter',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
    props: {
      multiple: {
        type: 'toggle',
        label: 'Allow Multiple Open',
        default: false,
        description: 'Allow multiple sections to be open at once'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['default', 'bordered', 'space'],
        default: 'default',
        description: 'Visual style variant'
      },
      section1Title: {
        type: 'text',
        label: 'Section 1 Title',
        default: 'Getting Started',
        description: 'Title for the first accordion section'
      },
      section1Content: {
        type: 'textarea',
        label: 'Section 1 Content',
        default: 'Learn how to get started with our component library and build amazing Salesforce experiences.',
        description: 'Content for the first accordion section'
      },
      section2Title: {
        type: 'text',
        label: 'Section 2 Title',
        default: 'Features',
        description: 'Title for the second accordion section'
      },
      section2Content: {
        type: 'textarea',
        label: 'Section 2 Content',
        default: 'Our components are built with SLDS compliance, accessibility in mind, and enterprise-grade quality.',
        description: 'Content for the second accordion section'
      }
    },
    events: [
      { name: 'sectiontoggle', description: 'Fired when a section is expanded or collapsed' }
    ],
    render: (props) => {
      const variantClass = props.variant !== 'default' ? `slds-accordion_${props.variant}` : '';
      return `
        <div class="slds-accordion ${variantClass}">
          <div class="slds-accordion__section slds-is-open">
            <button class="slds-accordion__summary-action" aria-controls="accordion-content-1" aria-expanded="true">
              <svg class="slds-accordion__summary-action-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use href="#slds-switch"></use>
              </svg>
              <span class="slds-accordion__summary-heading">${props.section1Title}</span>
            </button>
            <div class="slds-accordion__content" id="accordion-content-1">
              <p>${props.section1Content}</p>
            </div>
          </div>
          <div class="slds-accordion__section">
            <button class="slds-accordion__summary-action" aria-controls="accordion-content-2" aria-expanded="false">
              <svg class="slds-accordion__summary-action-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use href="#slds-switch"></use>
              </svg>
              <span class="slds-accordion__summary-heading">${props.section2Title}</span>
            </button>
            <div class="slds-accordion__content" id="accordion-content-2">
              <p>${props.section2Content}</p>
            </div>
          </div>
        </div>
      `;
    },
    generateCode: (props) => {
      return `<c-accordion
  multiple="${props.multiple}"
  variant="${props.variant}"
  section1-title="${props.section1Title}"
  section1-content="${props.section1Content}"
  section2-title="${props.section2Title}"
  section2-content="${props.section2Content}"
  onsectiontoggle={handleSectionToggle}
></c-accordion>`;
    }
  },

  button: {
    name: 'Button',
    category: 'Forms',
    description: 'Interactive button component with multiple variants and states',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="8" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    props: {
      label: {
        type: 'text',
        label: 'Label',
        default: 'Click Me',
        description: 'Button text label'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['neutral', 'brand', 'outline-brand', 'destructive', 'success', 'inverse'],
        default: 'neutral',
        description: 'Visual style variant'
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['small', 'medium', 'large'],
        default: 'medium',
        description: 'Button size'
      },
      disabled: {
        type: 'toggle',
        label: 'Disabled',
        default: false,
        description: 'Disable the button'
      },
      icon: {
        type: 'select',
        label: 'Icon',
        options: ['none', 'left', 'right'],
        default: 'none',
        description: 'Icon position'
      },
      iconName: {
        type: 'text',
        label: 'Icon Name',
        default: 'download',
        description: 'SLDS icon name (e.g., download, settings)'
      }
    },
    events: [
      { name: 'click', description: 'Fired when the button is clicked' }
    ],
    render: (props) => {
      const variantClass = props.variant !== 'neutral' ? `slds-button_${props.variant}` : '';
      const sizeClass = props.size !== 'medium' ? `slds-button_${props.size}` : '';
      const disabledAttr = props.disabled ? 'disabled' : '';
      
      let iconHtml = '';
      if (props.icon !== 'none') {
        const iconPosition = props.icon === 'left' ? 'slds-button__icon_left' : 'slds-button__icon_right';
        iconHtml = '<svg class="slds-button__icon ' + iconPosition + '" aria-hidden="true">' +
          '<use href="#slds-' + props.iconName + '"></use>' +
          '</svg>';
      }
      
      const leftIcon = props.icon === 'left' ? iconHtml : '';
      const rightIcon = props.icon === 'right' ? iconHtml : '';
      
      return '<button class="slds-button ' + variantClass + ' ' + sizeClass + '" ' + disabledAttr + '>' +
        leftIcon + props.label + rightIcon +
        '</button>';
    },
    generateCode: (props) => {
      return `<c-button
  label="${props.label}"
  variant="${props.variant}"
  size="${props.size}"
  disabled={${props.disabled}}
  icon="${props.icon}"
  icon-name="${props.iconName}"
  onclick={handleClick}
></c-button>`;
    }
  },

  card: {
    name: 'Card',
    category: 'Data Display',
    description: 'Container component for grouping related content',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>`,
    props: {
      title: {
        type: 'text',
        label: 'Title',
        default: 'Card Title',
        description: 'Card header title'
      },
      icon: {
        type: 'toggle',
        label: 'Show Icon',
        default: true,
        description: 'Display icon in header'
      },
      iconName: {
        type: 'text',
        label: 'Icon Name',
        default: 'analytics',
        description: 'SLDS icon name'
      },
      footer: {
        type: 'text',
        label: 'Footer Text',
        default: 'Last updated 2 days ago',
        description: 'Card footer content'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['default', 'compact', 'plain'],
        default: 'default',
        description: 'Card style variant'
      }
    },
    events: [],
    render: (props) => {
      const iconHtml = props.icon ? '<div class="slds-card__header-icon slds-icon_container slds-icon-standard-analytics">' +
        '<svg class="slds-icon slds-icon_small" aria-hidden="true">' +
          '<use href="#slds-analytics"></use>' +
        '</svg>' +
        '</div>' : '';
      
      return '<div class="slds-card">' +
        '<div class="slds-card__header slds-grid">' +
          '<header class="slds-media slds-media_center slds-has-flexi-truncate">' +
            iconHtml +
            '<div class="slds-media__body">' +
              '<h2 class="slds-card__header-title">' +
                '<span>' + props.title + '</span>' +
              '</h2>' +
            '</div>' +
          '</header>' +
        '</div>' +
        '<div class="slds-card__body slds-card__body_inner">' +
          '<p>This is the card body content. You can add any content here including text, images, or other components.</p>' +
          '<p style="margin-top: 12px;">The card component provides a flexible container for grouping related content with optional header and footer sections.</p>' +
        '</div>' +
        '<footer class="slds-card__footer">' + props.footer + '</footer>' +
        '</div>';
    },
    generateCode: (props) => {
      return `<c-card
  title="${props.title}"
  icon={${props.icon}}
  icon-name="${props.iconName}"
  footer="${props.footer}"
  variant="${props.variant}"
></c-card>`;
    }
  },

  input: {
    name: 'Input',
    category: 'Forms',
    description: 'Text input field with label, help text, and validation',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>`,
    props: {
      label: {
        type: 'text',
        label: 'Label',
        default: 'Input Label',
        description: 'Input field label'
      },
      placeholder: {
        type: 'text',
        label: 'Placeholder',
        default: 'Enter text...',
        description: 'Placeholder text'
      },
      value: {
        type: 'text',
        label: 'Value',
        default: '',
        description: 'Input value'
      },
      type: {
        type: 'select',
        label: 'Type',
        options: ['text', 'email', 'password', 'tel', 'url', 'number'],
        default: 'text',
        description: 'Input type'
      },
      required: {
        type: 'toggle',
        label: 'Required',
        default: false,
        description: 'Mark field as required'
      },
      disabled: {
        type: 'toggle',
        label: 'Disabled',
        default: false,
        description: 'Disable the input'
      },
      error: {
        type: 'text',
        label: 'Error Message',
        default: '',
        description: 'Validation error message'
      },
      helpText: {
        type: 'text',
        label: 'Help Text',
        default: 'This is help text for the input field.',
        description: 'Helper text below the input'
      }
    },
    events: [
      { name: 'change', description: 'Fired when input value changes' },
      { name: 'focus', description: 'Fired when input receives focus' },
      { name: 'blur', description: 'Fired when input loses focus' }
    ],
    render: (props) => {
      const errorClass = props.error ? 'slds-has-error' : '';
      const requiredAttr = props.required ? 'required' : '';
      const disabledAttr = props.disabled ? 'disabled' : '';
      
      return `
        <div class="slds-form-element ${errorClass}">
          <label class="slds-form-element__label">
            ${props.label}${props.required ? ' *' : ''}
          </label>
          <div class="slds-form-element__control slds-input_has_icon">
            <input 
              class="slds-input" 
              type="${props.type}" 
              placeholder="${props.placeholder}" 
              value="${props.value}"
              ${requiredAttr}
              ${disabledAttr}
            />
          </div>
          ${props.helpText ? `<div class="slds-form-element__help">${props.helpText}</div>` : ''}
          ${props.error ? `<div class="slds-form-element__help">${props.error}</div>` : ''}
        </div>
      `;
    },
    generateCode: (props) => {
      return `<c-input
  label="${props.label}"
  placeholder="${props.placeholder}"
  value={${props.value}}
  type="${props.type}"
  required={${props.required}}
  disabled={${props.disabled}}
  error-message="${props.error}"
  help-text="${props.helpText}"
  onchange={handleChange}
  onfocus={handleFocus}
  onblur={handleBlur}
></c-input>`;
    }
  },

  modal: {
    name: 'Modal',
    category: 'Advanced',
    description: 'Dialog window for important interactions',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`,
    props: {
      open: {
        type: 'toggle',
        label: 'Open',
        default: true,
        description: 'Show/hide the modal'
      },
      title: {
        type: 'text',
        label: 'Title',
        default: 'Modal Title',
        description: 'Modal header title'
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['small', 'medium', 'large', 'full'],
        default: 'medium',
        description: 'Modal width'
      },
      closeOnOverlay: {
        type: 'toggle',
        label: 'Close on Overlay Click',
        default: true,
        description: 'Close modal when clicking overlay'
      },
      showFooter: {
        type: 'toggle',
        label: 'Show Footer',
        default: true,
        description: 'Display modal footer with actions'
      }
    },
    events: [
      { name: 'close', description: 'Fired when modal is closed' },
      { name: 'confirm', description: 'Fired when confirm button is clicked' }
    ],
    render: (props) => {
      if (!props.open) return '<div style="display: none;"></div>';
      
      const sizeClass = props.size !== 'medium' ? 'slds-modal_' + props.size : '';
      
      let footerHtml = '';
      if (props.showFooter) {
        footerHtml = '<footer class="slds-modal__footer slds-modal__footer_directional">' +
          '<button class="slds-button slds-button_neutral">Cancel</button>' +
          '<button class="slds-button slds-button_brand">Confirm</button>' +
          '</footer>';
      }
      
      return '<div class="slds-modal slds-fade-in-open">' +
        '<div class="slds-modal__container ' + sizeClass + '">' +
          '<header class="slds-modal__header">' +
            '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">' +
              '<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                '<use href="#slds-close"></use>' +
              '</svg>' +
              '<span class="slds-assistive-text">Close</span>' +
            '</button>' +
            '<h2 class="slds-modal__title slds-hyphenate">' + props.title + '</h2>' +
          '</header>' +
          '<div class="slds-modal__content slds-p-around_medium">' +
            '<p>This is the modal content. You can add any content here including forms, text, or other components.</p>' +
            '<p style="margin-top: 12px;">Modals are used for important interactions that require user attention or input.</p>' +
          '</div>' +
          footerHtml +
        '</div>' +
        '</div>' +
        '<div class="slds-backdrop slds-backdrop_open"></div>';
    },
    generateCode: (props) => {
      return `<c-modal
  open={${props.open}}
  title="${props.title}"
  size="${props.size}"
  close-on-overlay-click={${props.closeOnOverlay}}
  show-footer={${props.showFooter}}
  onclose={handleClose}
  onconfirm={handleConfirm}
></c-modal>`;
    }
  },

  toast: {
    name: 'Toast Notification',
    category: 'Feedback',
    description: 'Notification messages for user feedback',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    props: {
      message: {
        type: 'text',
        label: 'Message',
        default: 'Operation completed successfully!',
        description: 'Toast message content'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['success', 'error', 'warning', 'info'],
        default: 'success',
        description: 'Toast type/severity'
      },
      duration: {
        type: 'select',
        label: 'Duration',
        options: ['short', 'medium', 'long', 'sticky'],
        default: 'medium',
        description: 'How long to show the toast'
      },
      dismissible: {
        type: 'toggle',
        label: 'Dismissible',
        default: true,
        description: 'Show close button'
      },
      icon: {
        type: 'toggle',
        label: 'Show Icon',
        default: true,
        description: 'Display variant icon'
      }
    },
    events: [
      { name: 'close', description: 'Fired when toast is closed' }
    ],
    render: (props) => {
      const iconMap = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info'
      };
      
      let iconHtml = '';
      if (props.icon) {
        iconHtml = '<div class="slds-notify__icon">' +
          '<svg class="slds-icon slds-icon_small" aria-hidden="true">' +
            '<use href="#slds-' + iconMap[props.variant] + '"></use>' +
          '</svg>' +
          '</div>';
      }
      
      let dismissBtn = '';
      if (props.dismissible) {
        dismissBtn = '<button class="slds-button slds-button_icon-inverse slds-notify__close" title="Close">' +
          '<svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">' +
            '<use href="#slds-close"></use>' +
          '</svg>' +
          '<span class="slds-assistive-text">Close</span>' +
          '</button>';
      }
      
      return '<div class="slds-notify slds-notify_toast slds-theme_' + props.variant + '" role="alert">' +
        iconHtml +
        '<div class="slds-notify__content">' +
          '<h2 class="slds-align-middle"> ' + props.message + '</h2>' +
        '</div>' +
        dismissBtn +
        '</div>';
    },
    generateCode: (props) => {
      return `<c-toast
  message="${props.message}"
  variant="${props.variant}"
  duration="${props.duration}"
  dismissible={${props.dismissible}}
  icon={${props.icon}}
  onclose={handleClose}
></c-toast>`;
    }
  },

  badge: {
    name: 'Badge',
    category: 'Data Display',
    description: 'Small status indicator or label',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
    props: {
      label: {
        type: 'text',
        label: 'Label',
        default: 'New',
        description: 'Badge text'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['default', 'success', 'warning', 'error', 'inverse'],
        default: 'default',
        description: 'Badge color variant'
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['small', 'medium', 'large'],
        default: 'medium',
        description: 'Badge size'
      }
    },
    events: [],
    render: (props) => {
      const variantClass = props.variant !== 'default' ? `slds-badge_${props.variant}` : '';
      const sizeClass = props.size !== 'medium' ? `slds-badge_${props.size}` : '';
      
      return `
        <span class="slds-badge ${variantClass} ${sizeClass}">
          ${props.label}
        </span>
      `;
    },
    generateCode: (props) => {
      return `<c-badge
  label="${props.label}"
  variant="${props.variant}"
  size="${props.size}"
></c-badge>`;
    }
  },

  avatar: {
    name: 'Avatar',
    category: 'Data Display',
    description: 'User or entity representation image',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
    props: {
      src: {
        type: 'text',
        label: 'Image URL',
        default: '',
        description: 'Avatar image source'
      },
      alternativeText: {
        type: 'text',
        label: 'Alt Text',
        default: 'User Avatar',
        description: 'Accessibility text'
      },
      fallback: {
        type: 'text',
        label: 'Fallback Initials',
        default: 'JD',
        description: 'Initials when no image'
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['small', 'medium', 'large', 'x-large'],
        default: 'medium',
        description: 'Avatar size'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['circle', 'square'],
        default: 'circle',
        description: 'Shape variant'
      }
    },
    events: [],
    render: (props) => {
      const sizeClass = `slds-avatar_${props.size}`;
      const variantClass = props.variant === 'circle' ? '' : '_square';
      
      if (props.src) {
        return `
          <div class="slds-avatar slds-avatar${variantClass} ${sizeClass}" title="${props.alternativeText}">
            <img src="${props.src}" alt="${props.alternativeText}" />
          </div>
        `;
      }
      
      return `
        <div class="slds-avatar slds-avatar${variantClass} ${sizeClass} slds-avatar_circle" title="${props.alternativeText}">
          <span class="slds-avatar__initials slds-avatar__initials_${props.size}">${props.fallback}</span>
        </div>
      `;
    },
    generateCode: (props) => {
      return `<c-avatar
  src="${props.src}"
  alternative-text="${props.alternativeText}"
  fallback="${props.fallback}"
  size="${props.variant}"
  variant="${props.variant}"
></c-avatar>`;
    }
  },

  tabs: {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed interface for organizing content',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/></svg>`,
    props: {
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['default', 'scoped', 'vertical'],
        default: 'default',
        description: 'Tabs style variant'
      },
      activeTab: {
        type: 'select',
        label: 'Active Tab',
        options: ['1', '2', '3'],
        default: '1',
        description: 'Initially active tab'
      },
      tab1Label: {
        type: 'text',
        label: 'Tab 1 Label',
        default: 'Item One',
        description: 'First tab label'
      },
      tab2Label: {
        type: 'text',
        label: 'Tab 2 Label',
        default: 'Item Two',
        description: 'Second tab label'
      },
      tab3Label: {
        type: 'text',
        label: 'Tab 3 Label',
        default: 'Item Three',
        description: 'Third tab label'
      }
    },
    events: [
      { name: 'tabchange', description: 'Fired when active tab changes' }
    ],
    render: (props) => {
      const variantClass = props.variant !== 'default' ? `slds-tabs_${props.variant}` : 'slds-tabs_default';
      
      return `
        <div class="${variantClass}">
          <ul class="slds-tabs__nav" role="tablist">
            <li class="slds-tabs__item ${props.activeTab === '1' ? 'slds-active' : ''}" role="presentation">
              <a class="slds-tabs__link" href="javascript:void(0);" role="tab" aria-selected="true" id="tab1">${props.tab1Label}</a>
            </li>
            <li class="slds-tabs__item ${props.activeTab === '2' ? 'slds-active' : ''}" role="presentation">
              <a class="slds-tabs__link" href="javascript:void(0);" role="tab" aria-selected="false" id="tab2">${props.tab2Label}</a>
            </li>
            <li class="slds-tabs__item ${props.activeTab === '3' ? 'slds-active' : ''}" role="presentation">
              <a class="slds-tabs__link" href="javascript:void(0);" role="tab" aria-selected="false" id="tab3">${props.tab3Label}</a>
            </li>
          </ul>
          <div class="slds-tabs__content slds-show" role="tabpanel" id="tabpanel1">
            <div class="slds-p-around_medium">
              <h3>${props.tab1Label} Content</h3>
              <p>This is the content for the first tab. You can add any content here.</p>
            </div>
          </div>
        </div>
      `;
    },
    generateCode: (props) => {
      return `<c-tabs
  variant="${props.variant}"
  active-tab="${props.activeTab}"
  tab1-label="${props.tab1Label}"
  tab2-label="${props.tab2Label}"
  tab3-label="${props.tab3Label}"
  ontabchange={handleTabChange}
></c-tabs>`;
    }
  },

  progress: {
    name: 'Progress',
    category: 'Feedback',
    description: 'Visual indicator of progress or completion',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="4"/><line x1="4" y1="20" x2="4" y2="12"/><line x1="20" y1="20" x2="20" y2="12"/></svg>`,
    props: {
      value: {
        type: 'number',
        label: 'Value',
        default: 50,
        min: 0,
        max: 100,
        description: 'Progress value (0-100)'
      },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['base', 'success', 'brand'],
        default: 'base',
        description: 'Progress bar color'
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['x-small', 'small', 'medium', 'large'],
        default: 'medium',
        description: 'Progress bar thickness'
      },
      label: {
        type: 'text',
        label: 'Label',
        default: 'Progress',
        description: 'Progress label text'
      },
      showPercentage: {
        type: 'toggle',
        label: 'Show Percentage',
        default: true,
        description: 'Display percentage value'
      }
    },
    events: [],
    render: (props) => {
      const sizeClass = props.size !== 'medium' ? `slds-progress-bar_${props.size}` : '';
      
      return `
        <div class="slds-progress-bar ${sizeClass}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${props.value}" aria-label="${props.label}">
          <span class="slds-progress-bar__value slds-progress-bar__value_${props.variant}" style="width: ${props.value}%">
            ${props.showPercentage ? `<span class="slds-assistive-text">${props.value}% Complete</span>` : ''}
          </span>
        </div>
        ${props.showPercentage ? `<p class="slds-m-top_small">${props.value}% Complete</p>` : ''}
      `;
    },
    generateCode: (props) => {
      return `<c-progress
  value={${props.value}}
  variant="${props.variant}"
  size="${props.size}"
  label="${props.label}"
  show-percentage={${props.showPercentage}}
></c-progress>`;
    }
  }
};

// Group components by category
const categories = {
  'Forms': ['button', 'input'],
  'Data Display': ['accordion', 'card', 'badge', 'avatar'],
  'Navigation': ['tabs'],
  'Feedback': ['toast', 'progress'],
  'Advanced': ['modal']
};

// State
let currentComponent = null;
let currentProps = {};
let activeTab = 'preview';
let activeSize = 'desktop';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderComponentList();
  setupEventListeners();
});

// Render component list in sidebar
function renderComponentList(filter = '') {
  const container = document.getElementById('componentList');
  container.innerHTML = '';
  
  const filteredCategories = {};
  
  Object.keys(categories).forEach(category => {
    const filteredComponents = categories[category].filter(id => {
      const comp = componentRegistry[id];
      return comp.name.toLowerCase().includes(filter.toLowerCase());
    });
    
    if (filteredComponents.length > 0) {
      filteredCategories[category] = filteredComponents;
    }
  });
  
  Object.keys(filteredCategories).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'component-category';
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'category-header';
    headerDiv.innerHTML = `
      <span class="category-title">${category}</span>
      <svg class="category-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    `;
    
    headerDiv.addEventListener('click', () => {
      headerDiv.classList.toggle('collapsed');
      itemsDiv.classList.toggle('collapsed');
    });
    
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'category-items';
    
    filteredCategories[category].forEach(compId => {
      const comp = componentRegistry[compId];
      const itemDiv = document.createElement('div');
      itemDiv.className = 'component-item';
      itemDiv.dataset.component = compId;
      itemDiv.innerHTML = `
        <span class="component-item-icon">${comp.icon}</span>
        <span class="component-item-name">${comp.name}</span>
      `;
      
      itemDiv.addEventListener('click', () => selectComponent(compId));
      
      itemsDiv.appendChild(itemDiv);
    });
    
    categoryDiv.appendChild(headerDiv);
    categoryDiv.appendChild(itemsDiv);
    container.appendChild(categoryDiv);
  });
}

// Select a component
function selectComponent(componentId) {
  // Update active state
  document.querySelectorAll('.component-item').forEach(item => {
    item.classList.toggle('active', item.dataset.component === componentId);
  });
  
  currentComponent = componentId;
  const comp = componentRegistry[componentId];
  
  // Update header
  document.getElementById('componentName').textContent = comp.name;
  document.getElementById('componentCategory').textContent = comp.category;
  
  // Initialize props
  currentProps = {};
  Object.keys(comp.props).forEach(prop => {
    currentProps[prop] = comp.props[prop].default;
  });
  
  // Hide empty state
  document.getElementById('emptyState').style.display = 'none';
  
  // Render controls
  renderControls(comp);
  
  // Render preview
  renderPreview();
  
  // Render code
  renderCode();
  
  // Render docs
  renderDocs(comp);
}

// Render controls panel
function renderControls(comp) {
  const container = document.getElementById('controlsContent');
  container.innerHTML = '';
  
  Object.keys(comp.props).forEach(propName => {
    const prop = comp.props[propName];
    const value = currentProps[propName];
    
    const groupDiv = document.createElement('div');
    groupDiv.className = 'control-group';
    
    let inputHtml = '';
    
    switch (prop.type) {
      case 'text':
      case 'number':
        inputHtml = `<input type="${prop.type}" class="control-input" data-prop="${propName}" value="${value}" ${prop.min ? 'min="' + prop.min + '"' : ''} ${prop.max ? 'max="' + prop.max + '"' : ''}>`;
        break;
        
      case 'textarea':
        inputHtml = `<textarea class="control-input" data-prop="${propName}" rows="3">${value}</textarea>`;
        break;
        
      case 'select':
        inputHtml = `<select class="control-select" data-prop="${propName}">
          ${prop.options.map(opt => `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>`;
        break;
        
      case 'toggle':
        inputHtml = `<div class="toggle-switch ${value ? 'active' : ''}" data-prop="${propName}"></div>`;
        break;
    }
    
    groupDiv.innerHTML = `
      <label class="control-label">${prop.label}</label>
      ${inputHtml}
    `;
    
    container.appendChild(groupDiv);
  });
  
  // Add reset button
  const resetBtn = document.createElement('button');
  resetBtn.className = 'reset-btn';
  resetBtn.textContent = 'Reset to Defaults';
  resetBtn.addEventListener('click', () => {
    Object.keys(comp.props).forEach(propName => {
      currentProps[propName] = comp.props[propName].default;
    });
    renderControls(comp);
    renderPreview();
    renderCode();
  });
  container.appendChild(resetBtn);
  
  // Add event listeners
  container.querySelectorAll('.control-input, .control-select').forEach(input => {
    input.addEventListener('input', (e) => {
      const propName = e.target.dataset.prop;
      currentProps[propName] = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
      renderPreview();
      renderCode();
    });
  });
  
  container.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const propName = e.target.dataset.prop;
      currentProps[propName] = !currentProps[propName];
      e.target.classList.toggle('active');
      renderPreview();
      renderCode();
    });
  });
}

// Render preview
function renderPreview() {
  if (!currentComponent) return;
  
  const comp = componentRegistry[currentComponent];
  const previewContainer = document.getElementById('componentPreview');
  previewContainer.innerHTML = comp.render(currentProps);
}

// Render code
function renderCode() {
  if (!currentComponent) return;
  
  const comp = componentRegistry[currentComponent];
  const code = comp.generateCode(currentProps);
  
  // Syntax highlighting
  const highlighted = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;)(\w+)/g, '$1<span class="tag">$2</span>')
    .replace(/(\s)(\w+)=/g, '$1<span class="attr">$2</span>=')
    .replace(/="([^"]*)"/g, '="<span class="string">$1</span>"');
  
  document.getElementById('codeContent').innerHTML = highlighted;
}

// Render documentation
function renderDocs(comp) {
  const container = document.getElementById('docsContent');
  
  // Build props table
  let propsRows = '';
  Object.keys(comp.props).forEach(propName => {
    const prop = comp.props[propName];
    propsRows += '<tr>' +
      '<td><span class="prop-name">' + propName + '</span></td>' +
      '<td><span class="prop-type">' + prop.type + '</span></td>' +
      '<td><span class="prop-default">' + prop.default + '</span></td>' +
      '<td>' + prop.description + '</td>' +
      '</tr>';
  });
  
  let propsHtml = '<table class="props-table">' +
    '<thead>' +
      '<tr>' +
        '<th>Property</th>' +
        '<th>Type</th>' +
        '<th>Default</th>' +
        '<th>Description</th>' +
      '</tr>' +
    '</thead>' +
    '<tbody>' + propsRows + '</tbody>' +
    '</table>';
  
  // Build events table
  let eventsHtml = '';
  if (comp.events && comp.events.length > 0) {
    let eventRows = '';
    comp.events.forEach(event => {
      eventRows += '<tr>' +
        '<td><span class="prop-name">' + event.name + '</span></td>' +
        '<td>' + event.description + '</td>' +
        '</tr>';
    });
    
    eventsHtml = '<div class="docs-section">' +
      '<h3 class="docs-section-title">Events</h3>' +
      '<table class="props-table">' +
        '<thead>' +
          '<tr>' +
            '<th>Event</th>' +
            '<th>Description</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' + eventRows + '</tbody>' +
      '</table>' +
      '</div>';
  }
  
  container.innerHTML = '<div class="docs-section">' +
    '<h3 class="docs-section-title">Description</h3>' +
    '<p>' + comp.description + '</p>' +
    '</div>' +
    '<div class="docs-section">' +
    '<h3 class="docs-section-title">Properties</h3>' +
    propsHtml + '</div>' + eventsHtml;
}

// Setup event listeners
function setupEventListeners() {
  // Search
  document.getElementById('componentSearch').addEventListener('input', (e) => {
    renderComponentList(e.target.value);
  });
  
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
  });
  
  // Responsive buttons
  document.querySelectorAll('.responsive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.responsive-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const size = e.target.dataset.size;
      const frame = document.getElementById('previewFrame');
      frame.className = 'preview-frame ' + size;
    });
  });
  
  // Preview tabs
  document.querySelectorAll('.preview-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      
      const tabName = e.target.dataset.tab;
      activeTab = tabName;
      
      const preview = document.getElementById('componentPreview');
      const codePanel = document.getElementById('codePanel');
      const docsPanel = document.getElementById('docsPanel');
      
      preview.style.display = tabName === 'preview' ? 'block' : 'none';
      codePanel.classList.toggle('active', tabName === 'code');
      docsPanel.classList.toggle('active', tabName === 'docs');
    });
  });
  
  // Copy button
  document.getElementById('copyBtn').addEventListener('click', () => {
    const comp = componentRegistry[currentComponent];
    const code = comp.generateCode(currentProps);
    
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.getElementById('copyBtn');
      btn.classList.add('copied');
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Copied!
      `;
      
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy
        `;
      }, 2000);
    });
  });
}