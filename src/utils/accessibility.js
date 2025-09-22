// Accessibility utility functions and hooks

import { useEffect } from 'react';

// Focus management utilities
export const focusUtils = {
  // Trap focus within a container (useful for modals)
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTabKey);
  },

  // Restore focus to previous element
  restoreFocus: (element) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }
};

// Keyboard navigation utilities
export const keyboardUtils = {
  // Handle arrow key navigation for lists/grids
  handleArrowNavigation: (e, elements, currentIndex, onIndexChange) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        break;
      case 'ArrowDown':
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = elements.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    onIndexChange(newIndex);
    elements[newIndex]?.focus();
  }
};

// ARIA utilities
export const ariaUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix = 'aria') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Create ARIA live region announcements
  announce: (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

// Hook for keyboard navigation
export const useKeyboardNavigation = (items, onAction) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        const index = items.findIndex(item => 
          activeElement === item || activeElement.closest('[data-index]')?.dataset.index === items.indexOf(item)
        );
        
        if (index !== -1) {
          e.preventDefault();
          onAction(index);
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [items, onAction]);
};

// Hook for focus management
export const useFocusManagement = (isOpen, containerRef) => {
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const previousFocus = document.activeElement;
      const cleanup = focusUtils.trapFocus(containerRef.current);
      
      return () => {
        cleanup();
        focusUtils.restoreFocus(previousFocus);
      };
    }
  }, [isOpen, containerRef]);
};

// Screen reader utilities
export const screenReaderUtils = {
  // Create screen reader only text
  createSROnlyText: (text) => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  },

  // Update page title for SPA navigation
  updatePageTitle: (title) => {
    document.title = `${title} | Amr Eslim - Portfolio`;
    ariaUtils.announce(`Navigated to ${title}`, 'assertive');
  }
};

// Color contrast utilities
export const contrastUtils = {
  // Check if color contrast meets WCAG standards
  checkContrast: (foreground, background) => {
    // This is a simplified contrast check
    // In production, you'd use a proper color contrast library
    const getLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;
      
      const [r, g, b] = rgb.map(x => {
        x = parseInt(x) / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio,
      aa: ratio >= 4.5,
      aaa: ratio >= 7
    };
  }
};

const accessibilityUtils = {
  focusUtils,
  keyboardUtils,
  ariaUtils,
  useKeyboardNavigation,
  useFocusManagement,
  screenReaderUtils,
  contrastUtils
};

export default accessibilityUtils;