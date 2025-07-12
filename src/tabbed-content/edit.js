// src/edit.js
import {
  InspectorControls,
  MediaUpload,
  useBlockProps,
  RichText
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  Button,
  PanelRow,
  SelectControl,
  FontSizePicker
} from '@wordpress/components';
import { useState, createElement } from '@wordpress/element';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
  const { blockTitle, headingTag = "h2", tabs = [], headingFontSize = 'default' } = attributes;
  const [currentTab, setCurrentTab] = useState(0);

  // Update a field inside a tab
  const updateTab = (index, field, value) => {
    const updated = [...tabs];
    updated[index][field] = value;
    setAttributes({ tabs: updated });
  };

  const addTab = () => {
    setAttributes({
      tabs: [...tabs, { title: 'New Tab', description: '', imageUrl: '', imageAlt: '' }]
    });
  };

  const removeTab = (index) => {
    const updated = tabs.filter((_, i) => i !== index);
    setAttributes({ tabs: updated });
    if (currentTab === index) setCurrentTab(0);
  };

  const TagName = headingTag || 'h2';

  return (
    <>
      {/* Inspector Sidebar */}
      <InspectorControls>
        <PanelBody title="Block Title">
          <TextControl
            label="Main Heading"
            value={blockTitle}
            onChange={(val) => setAttributes({ blockTitle: val })}
          />
        </PanelBody>
		<PanelBody title="Heading Settings" initialOpen={false}>
		<SelectControl
			label="Heading Tag"
			value={headingTag}
			options={[
			{ label: 'H1', value: 'h1' },
			{ label: 'H2', value: 'h2' },
			{ label: 'H3', value: 'h3' },
			{ label: 'H4', value: 'h4' },
			{ label: 'H5', value: 'h5' },
			{ label: 'H6', value: 'h6' }
			]}
			onChange={(val) => setAttributes({ headingTag: val })}
		/>

		<FontSizePicker
			label="Font Size"
			value={headingFontSize}
			onChange={(val) => setAttributes({ headingFontSize: val })}
			fontSizes={[
				{ name: 'Small', slug: 'small', size: 14 },
				{ name: 'Medium', slug: 'medium', size: 18 },
				{ name: 'Large', slug: 'large', size: 24 },
				{ name: 'Extra Large', slug: 'x-large', size: 32 }
			]}
			withSlider
		/>
		</PanelBody>

        <PanelBody title="Tabs" initialOpen={true}>
          <PanelRow>
            <TextControl
              label="Tab Title"
              value={tabs[currentTab]?.title}
              onChange={(val) => updateTab(currentTab, 'title', val)}
            />
          </PanelRow>

          <PanelRow>
            <TextControl
              label="Tab Description"
              value={tabs[currentTab]?.description}
              onChange={(val) => updateTab(currentTab, 'description', val)}
            />
          </PanelRow>

          <PanelRow>
            <MediaUpload
              onSelect={(media) => {
                updateTab(currentTab, 'imageUrl', media.url);
                updateTab(currentTab, 'imageAlt', media.alt);
              }}
              allowedTypes={['image']}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {tabs[currentTab]?.imageUrl ? 'Change Image' : 'Upload Image'}
                </Button>
              )}
            />
          </PanelRow>

          {tabs.length > 1 && (
            <Button
              isDestructive
              onClick={() => removeTab(currentTab)}
              style={{ marginTop: '10px' }}
            >
              Remove Tab
            </Button>
          )}

          <Button
            variant="primary"
            onClick={addTab}
            style={{ marginTop: '10px' }}
          >
            Add New Tab
          </Button>
        </PanelBody>
      </InspectorControls>

      {/* Visual Preview in Canvas */}
      <div {...useBlockProps()} className="proprietary-tools-block">
		
		{createElement(
			TagName,
			{
				className: `block-title`,
				style: { fontSize: headingFontSize ? `${headingFontSize}px` : undefined }
			},
			blockTitle
		)}

        {/* Tab headers (hover to preview) */}
        <div className="tab-headings">
          {tabs && tabs.length > 0 && tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${index === currentTab ? 'active' : ''}`}
              onMouseEnter={() => setCurrentTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content Preview */}
        {tabs && tabs[currentTab] && (
          <div className="tab-panel-preview">
            <p>{tabs[currentTab].description}</p>
            {tabs[currentTab].imageUrl && (
              <img
                src={tabs[currentTab].imageUrl}
                alt={tabs[currentTab].imageAlt || ''}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Edit;