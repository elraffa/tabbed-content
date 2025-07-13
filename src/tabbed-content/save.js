// src/save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

const Save = ({ attributes }) => {
  const { blockTitle, headingTag = 'h2', headingFontSize, tabs } = attributes;

  return (
    <div {...useBlockProps.save()} className="proprietary-tools-block">
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
      <div className="tab-headings desktop-only">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className="tab-button"
            data-tab={index}
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
          >
            <div className="tab-panel-content">
              <p>{tab.description}</p>
            </div>
            {tab.imageUrl && (
              <div className="tab-panel-image">
                <img src={tab.imageUrl} alt={tab.imageAlt || ''} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Accordion Style */}
      <div className="mobile-accordion mobile-only">
        {tabs.map((tab, index) => (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              data-tab={index}
            >
              {tab.title}
            </button>
            <div className={`accordion-content ${index === 0 ? 'active' : ''}`} data-tab-index={index}>
              <div className="tab-panel-content">
                <p>{tab.description}</p>
              </div>
              {tab.imageUrl && (
                <div className="tab-panel-image">
                  <img src={tab.imageUrl} alt={tab.imageAlt || ''} />
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