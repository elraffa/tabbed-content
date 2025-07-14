/**
 * This file contains the JavaScript code for the Tabbed Content block.
 * 
 * @package tabbed-content
 */

document.addEventListener('DOMContentLoaded', function () {
  const root = document.querySelectorAll('.proprietary-tools-block');

  root.forEach((block) => {
    // Desktop tab functionality
    const desktopButtons = block.querySelectorAll('.desktop-only .tab-button');
    const desktopPanels = block.querySelectorAll('.desktop-only .tab-panel');

    desktopButtons.forEach((button, index) => {
      button.addEventListener('mouseenter', () => {
        // Remove all active classes from desktop panels
        desktopPanels.forEach((p) => p.classList.remove('active'));
        // Add active to the hovered tab's panel
        if (desktopPanels[index]) {
          desktopPanels[index].classList.add('active');
        }
      });
    });

    // Mobile accordion functionality
    const mobileButtons = block.querySelectorAll('.mobile-only .accordion-title');
    const mobileContents = block.querySelectorAll('.mobile-only .accordion-content');

    // Ensure first mobile button and content have active class on load
    if (mobileButtons.length > 0 && mobileContents.length > 0) {
      mobileButtons[0].classList.add('active');
      mobileContents[0].classList.add('active');
    }

    mobileButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const isCurrentlyActive = button.classList.contains('active');
        
        // Remove all active classes from mobile content and buttons
        mobileButtons.forEach((btn) => btn.classList.remove('active'));
        mobileContents.forEach((content) => content.classList.remove('active'));
        
        // If the clicked button wasn't active, make it active
        if (!isCurrentlyActive) {
          button.classList.add('active');
          if (mobileContents[index]) {
            mobileContents[index].classList.add('active');
          }
          
          // Scroll the clicked accordion item to the top instantly
          button.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      });
    });
  });
});
