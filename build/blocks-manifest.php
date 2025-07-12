<?php
// This file is generated. Do not modify it manually.
return array(
	'tabbed-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'real-blocks/tabbed-content',
		'version' => '0.1.0',
		'title' => 'Tabbed Content',
		'category' => 'layout',
		'icon' => 'grid-view',
		'description' => 'A custom block for displaying tabbed content.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'tabbed-content',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'blockTitle' => array(
				'type' => 'string',
				'default' => 'Tabbed Content'
			),
			'headingTag' => array(
				'type' => 'string',
				'default' => 'h2'
			),
			'headingFontSize' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'tabs' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => 'Leo',
						'description' => 'This is the content for Leo tab.',
						'imageUrl' => '',
						'imageAlt' => 'Leo image'
					)
				)
			),
			'activeTab' => array(
				'type' => 'number',
				'default' => 0
			)
		)
	)
);
