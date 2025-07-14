// src/save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

const Save = ({ attributes }) => {
  const { 
    blockTitle, 
    headingTag = 'h2', 
    headingFontSize, 
    tabs,
    blockPadding = { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    blockMargin = { top: "0px", right: "0px", bottom: "0px", left: "0px" }
  } = attributes;

  return (
    <div 
      {...useBlockProps.save()} 
      className="proprietary-tools-block"
      style={{
        padding: `${blockPadding.top || '0px'} ${blockPadding.right || '0px'} ${blockPadding.bottom || '0px'} ${blockPadding.left || '0px'}`,
        margin: `${blockMargin.top || '0px'} ${blockMargin.right || '0px'} ${blockMargin.bottom || '0px'} ${blockMargin.left || '0px'}`
      }}
    >
      {/* Block Title */}
      {createElement(
        headingTag,
        {
          className: 'block-title',
          style: { fontSize: headingFontSize ? `${headingFontSize}px` : undefined }
        },
        blockTitle
      )}

      {/* Desktop: Tab Headers */}
      <div className="tab-headings desktop-only" role="tablist" aria-label="Tab navigation">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className="tab-button"
            data-tab={index}
            role="tab"
            aria-selected={index === 0 ? 'true' : 'false'}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            tabIndex={index === 0 ? 0 : -1}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Desktop: Tab Content Panels */}
      <div className="tab-content-container desktop-only">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-panel ${index === 0 ? 'active' : ''}`}
            data-tab-index={index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            tabIndex="0"
          >
            <div className="tab-panel-content">
              <p>{tab.description}</p>
            </div>
            {tab.imageUrl && (
              <div className="tab-panel-image">
                <img 
                  src={tab.imageUrl} 
                  alt={tab.imageAlt || `Image for ${tab.title}`} 
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Accordion Style */}
      <div className="mobile-accordion mobile-only" role="region" aria-label="Tab content accordion">
        {tabs.map((tab, index) => (
          <div key={index} className="accordion-item">
            <button
              className={`accordion-title ${index === 0 ? 'active' : ''}`}
              data-tab={index}
              role="button"
              aria-expanded={index === 0 ? 'true' : 'false'}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-title-${index}`}
            >
              {tab.title}
            </button>
            <div 
              className={`accordion-content ${index === 0 ? 'active' : ''}`} 
              data-tab-index={index}
              role="region"
              id={`accordion-content-${index}`}
              aria-labelledby={`accordion-title-${index}`}
            >
              <div className="tab-panel-content">
                <p>{tab.description}</p>
              </div>
              {tab.imageUrl && (
                <div className="tab-panel-image">
                  <img 
                    src={tab.imageUrl} 
                    alt={tab.imageAlt || `Image for ${tab.title}`} 
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;