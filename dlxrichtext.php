<?php
/**
 * Plugin Name:       DLX RichText
 * Plugin URI:        https://dlxplugins.com/plugins/
 * Description:       Demonstrates how to convert RichText to InnerBlocks
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dlxrichtext
 *
 * @package DLXRichText
 */

namespace DLXPlugins\DLXRichText;

/**
 * Register the block and set server-side remder.
 */
function register_block() {
	register_block_type(
		plugin_dir_path( __FILE__ ) . 'build/blocks/dlxrichtext/block.json',
		array(
			'render_callback' => __NAMESPACE__ . '\frontend_block_output',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Output block to frontend.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    InnerBlocks content.
 */
function frontend_block_output( $attributes, $content ) {
	return sprintf(
		'<div class="dlxrichtext-frontend">%s</div>',
		wp_kses_post( $content )
	);
}

/**
 * Enqueue block editor assets.
 */
function enqueue_block_editor_assets() {
	wp_register_script(
		'dlx-richtext-editor-script',
		plugins_url( 'build/index.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );
