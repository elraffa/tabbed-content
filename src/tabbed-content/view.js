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

    // Ensure first mobile button has active class on load
    if (mobileButtons.length > 0) {
      mobileButtons[0].classList.add('active');
    }

    mobileButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove all active classes from mobile content
        mobileButtons.forEach((btn) => btn.classList.remove('active'));
        mobileContents.forEach((content) => content.classList.remove('active'));
        // Add active to the clicked accordion's content
        if (mobileButtons[index]) {
          mobileButtons[index].classList.add('active');
        }
        if (mobileContents[index]) {
          mobileContents[index].classList.add('active');
        }
      });
    });
  });
});
