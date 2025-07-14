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
  TextareaControl,
  Button,
  PanelRow,
  SelectControl,
  FontSizePicker,
  RangeControl,
  TabPanel,
  BoxControl
} from '@wordpress/components';
import { useState, createElement } from '@wordpress/element';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
  const { 
    blockTitle, 
    headingTag = "h2", 
    tabs = [], 
    headingFontSize = 'default',
    blockPadding = { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    blockMargin = { top: "0px", right: "0px", bottom: "0px", left: "0px" }
  } = attributes;
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
        <TabPanel
          className="wp-block-tabbed-content-inspector"
          activeClass="active-tab"
          tabs={[
            {
              name: 'content',
              title: 'Content',
              className: 'content-tab',
            },
            {
              name: 'styles',
              title: 'Styles',
              className: 'styles-tab',
            },
          ]}
        >
          {(tab) => (
            <div>
              {tab.name === 'content' && (
                <>
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
                      help="Choose the HTML element for SEO and semantic structure."
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
                      help="Set the font size for the block title."
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
                    {/* Tab Navigation */}
                    {tabs.length > 1 && (
                      <div style={{ 
                        marginBottom: '16px', 
                        padding: '12px', 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: '4px' 
                      }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px', 
                          fontWeight: '500',
                          fontSize: '13px'
                        }}>
                          Edit Tab ({currentTab + 1} of {tabs.length})
                        </label>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {tabs.map((tab, index) => (
                            <Button
                              key={index}
                              variant={index === currentTab ? 'primary' : 'secondary'}
                              size="small"
                              onClick={() => setCurrentTab(index)}
                              style={{ minWidth: '30px' }}
                            >
                              {index + 1}
                            </Button>
                          ))}
                        </div>
                        <div style={{ 
                          marginTop: '8px', 
                          fontSize: '12px', 
                          color: '#666',
                          fontStyle: 'italic' 
                        }}>
                          Currently editing: "{tabs[currentTab]?.title || 'Untitled'}"
                        </div>
                      </div>
                    )}

                    <PanelRow>
                      <TextControl
                        label="Tab Title"
                        value={tabs[currentTab]?.title}
                        onChange={(val) => updateTab(currentTab, 'title', val)}
                      />
                    </PanelRow>

                    <PanelRow>
                      <TextareaControl
                        label="Tab Description"
                        value={tabs[currentTab]?.description}
                        onChange={(val) => updateTab(currentTab, 'description', val)}
                      />
                    </PanelRow>

                    <PanelRow>
                      <div style={{ width: '100%' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                          Tab Image
                        </label>
                        
                        {tabs[currentTab]?.imageUrl ? (
                          <div style={{ marginBottom: '10px' }}>
                            <img 
                              src={tabs[currentTab].imageUrl} 
                              alt={tabs[currentTab].imageAlt || 'Tab image preview'} 
                              style={{ 
                                width: '100%', 
                                maxWidth: '200px', 
                                height: 'auto', 
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                              }} 
                            />
                            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                              <MediaUpload
                                onSelect={(media) => {
                                  updateTab(currentTab, 'imageUrl', media.url);
                                  updateTab(currentTab, 'imageAlt', media.alt);
                                }}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                  <Button onClick={open} variant="secondary" size="small">
                                    Change Image
                                  </Button>
                                )}
                              />
                              <Button 
                                onClick={() => {
                                  updateTab(currentTab, 'imageUrl', '');
                                  updateTab(currentTab, 'imageAlt', '');
                                }}
                                variant="secondary" 
                                size="small"
                                isDestructive
                              >
                                Remove Image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <MediaUpload
                            onSelect={(media) => {
                              updateTab(currentTab, 'imageUrl', media.url);
                              updateTab(currentTab, 'imageAlt', media.alt);
                            }}
                            allowedTypes={['image']}
                            render={({ open }) => (
                              <Button onClick={open} variant="secondary">
                                Upload Image
                              </Button>
                            )}
                          />
                        )}
                      </div>
                    </PanelRow>

                    {tabs.length > 1 && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button
                          isDestructive
                          onClick={() => removeTab(currentTab)}
                          disabled={tabs.length === 1}
                        >
                          Remove Tab
                        </Button>
                        <Button
                          variant="primary"
                          onClick={addTab}
                        >
                          Add New Tab
                        </Button>
                      </div>
                    )}
                  </PanelBody>
                </>
              )}

              {tab.name === 'styles' && (
                <>
                  <PanelBody title="Block Spacing" initialOpen={true}>
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Padding</h4>
                      <BoxControl
                        label="Padding"
                        values={blockPadding}
                        onChange={(value) => setAttributes({ blockPadding: value })}
                        units={[
                          { value: 'px', label: 'px', default: 0 },
                          { value: 'em', label: 'em', default: 0 },
                          { value: 'rem', label: 'rem', default: 0 },
                        ]}
                        allowReset={true}
                      />
                    </div>

                    <div>
                      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Margin</h4>
                      <BoxControl
                        label="Margin"
                        values={blockMargin}
                        onChange={(value) => setAttributes({ blockMargin: value })}
                        units={[
                          { value: 'px', label: 'px', default: 0 },
                          { value: 'em', label: 'em', default: 0 },
                          { value: 'rem', label: 'rem', default: 0 },
                        ]}
                        allowReset={true}
                      />
                    </div>
                  </PanelBody>
                </>
              )}
            </div>
          )}
        </TabPanel>
      </InspectorControls>

      {/* Visual Preview in Canvas */}
      <div 
        {...useBlockProps()} 
        className="proprietary-tools-block"
        style={{
          padding: `${blockPadding.top || '0px'} ${blockPadding.right || '0px'} ${blockPadding.bottom || '0px'} ${blockPadding.left || '0px'}`,
          margin: `${blockMargin.top || '0px'} ${blockMargin.right || '0px'} ${blockMargin.bottom || '0px'} ${blockMargin.left || '0px'}`
        }}
      >
		
		<RichText
			tagName={TagName}
			className="block-title"
			style={{ fontSize: headingFontSize ? `${headingFontSize}px` : undefined }}
			value={blockTitle}
			onChange={(content) => setAttributes({ blockTitle: content })}
			placeholder="Enter block title..."
		/>

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
          <div className="tab-panel">
            <RichText
              tagName="p"
              className="tab-panel-content"
              value={tabs[currentTab].description}
              onChange={(content) => updateTab(currentTab, 'description', content)}
              placeholder="Enter tab content..."
            />
            {tabs[currentTab].imageUrl && (
              <img
				className="tab-panel-image"
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