<?php
/**
 * Plugin Name:       Viber chat - Chat and support floating layouts and buttons for viber
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.5
 * Author:            Fahad
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ta-vchat
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_vChat_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_vChat_block_init' );


add_theme_support("editor-styles");
add_editor_style("style-editor.css");

add_theme_support("responsive-embeds");

add_theme_support("align-wide");

add_theme_support( "editor-color-palette", array(
	array(
		'name' => esc_attr__( 'button magenta', 'call-to-action'), 'slug' => 'button-magenta', 'color' => '#a156b4'
	),
	array(
		'name' => esc_attr__( 'button blue', 'call-to-action'), 'slug' => 'button-blue', 'color' => '#3182ce'
	),
	array(
		'name' => esc_attr__( 'button pink', 'call-to-action'), 'slug' => 'button-pink', 'color' => '#d53f8c'
	),
	array(
		'name' => esc_attr__( 'button gray', 'call-to-action'), 'slug' => 'button-gray', 'color' => '#1a202c'
	),
	array(
		'name' => esc_attr__( 'button orange', 'call-to-action'), 'slug' => 'button-orange', 'color' => '#ed8936'
	),
	array(
		'name' => esc_attr__( 'button white', 'call-to-action'), 'slug' => 'button-white', 'color' => '#fff'
	),
));


// add_theme_support( "disable-custom-colors" );

add_theme_support( "editor-gradient-presets", array(
	array(
		'name' => esc_attr__( 'Red to Blue', 'call-to-action'),
		'gradient' => 'linear-gradient(135deg, #e4064d 0%, #2c59ee 100%)', 'slug' => 'red-to-blue'
	),
	array(
		'name' => esc_attr__( 'Green to Yellow', 'call-to-action'),
		'gradient' => 'linear-gradient(135deg, #3ce406 0%, #d6e029 100%)', 'slug' => 'green-to-yellow'
	),
	array(
		'name' => esc_attr__( 'Green to Blue', 'call-to-action'),
		'gradient' => 'linear-gradient(135deg, #3ce406 0%, #3182ce 100%)', 'slug' => 'green-to-blue'
	),
	array(
		'name' => esc_attr__( 'Orange to Pink', 'call-to-action'),
		'gradient' => 'linear-gradient(135deg, #ed8936 0%, #d53f8c 100%)', 'slug' => 'orange-to-pink'
	),
));


add_theme_support('editor-font-sizes', array(
	array(
		'name' => esc_attr__('Small', 'call-to-action'),
		'size' => 12,
		'slug' => 'small '
	),
	array(
		'name' => esc_attr__('Regular', 'call-to-action'),
		'size' => 16,
		'slug' => 'regular'
	),
	array(
		'name' => esc_attr__('Large', 'call-to-action'),
		'size' => 36,
		'slug' => 'large'
	),
));

add_theme_support('custom-font-sizes');

add_theme_support('custom-line-height');

add_theme_support('custom-spacing');

add_theme_support('custom-units', 'px', 'rem', 'em');


