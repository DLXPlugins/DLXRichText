import { __ } from '@wordpress/i18n';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	store
} from '@wordpress/block-editor';

import { useDispatch } from '@wordpress/data';

import { rawHandler } from '@wordpress/blocks';

import { useRef, useEffect } from '@wordpress/element';

const DLXRichText = ( props ) => {

	const innerBlocksRef = useRef( null );

	const { replaceInnerBlocks } = useDispatch( store );

	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'has-click-to-share-text has-click-to-share__share-text',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: [ 'core/paragraph' ],
			template: [ [ 'core/paragraph', { placeholder: '' } ] ],
		}
	);

	// Shortcuts.
	const { attributes, setAttributes, clientId } = props;

	const {
		textContent,
	} = attributes;

	/**
	 * Migrate RichText to InnerBlocks.
	 */
	useEffect( () => {
		// Port shareText attribute to use innerBlocks instead.
		if ( textContent !== '' && null !== innerBlocksRef.current ) {
			// Convert text over to blocks.
			const richTextConvertedToBlocks = rawHandler( { HTML: textContent } );
			replaceInnerBlocks( clientId, richTextConvertedToBlocks );
			setAttributes( { textContent: '' } );
		}
	}, [ innerBlocksRef ] );

	const block = (
		<div className="dlx-text-wrapper">
			<RichText
				tagName="div"
				multiline="p"
				placeholder={ __( 'Enter some text', 'quotes-dlx' ) }
				value={ textContent }
				className="dlx-text-content"
				allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
				onChange={ ( value ) => {
					setAttributes( { textContent: value } );
				} }
			/>
			<div { ...innerBlockProps } />
		</div>
	);

	const blockProps = useBlockProps( {
		className: "dlx-rich-text",
	} );

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default DLXRichText;
