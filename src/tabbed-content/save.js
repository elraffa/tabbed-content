// src/save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { blockTitle, tabs } = attributes;

  return (
    <div {...useBlockProps.save()} className="proprietary-tools-block">
      {/* Block Title */}
      <RichText.Content tagName="h2" value={blockTitle} className="block-title" />

      {/* Tab Headers */}
      <div className="tab-headings">
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

      {/* Tab Content Panels */}
      <div className="tab-content-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-panel ${index === 0 ? 'active' : ''}`} // default to show first tab
            data-tab-index={index}
          >
            <p>{tab.description}</p>
            {tab.imageUrl && (
              <img src={tab.imageUrl} alt={tab.imageAlt || ''} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;