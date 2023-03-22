import { __ } from '@wordpress/i18n';

import {
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

const DLXRichText = ( props ) => {

	// Shortcuts.
	const { attributes, setAttributes } = props;

	const {
		textContent,
	} = attributes;

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
