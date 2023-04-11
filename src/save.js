
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
export default function save( { attributes } ) {
	const {
		buttonSize,
		borderRadius,
		buttonType,
		text,
		info,
		title,
		online,
		offline,
		textAlignment,
		buttonLinkTarget,
		numberInput,
		visibility,
		border,
		buttonTextColor,
		buttonBackgroundColor,
		iconTarget,
		imageUrl,
		timeZone
	} = attributes;
	const textClasses = classnames(
		`text-box-align-${ textAlignment }`
	);
	const classes = classnames( `vcButtons vChat-button-4 vc-btn-bg` );
	return (
		<>
			{buttonType === "basic-button" ? 
				<div className={`button-wrapper ${textClasses}`}>
					<a 
						{ ...useBlockProps.save( {
							className: `${ classes } ${ buttonSize } ${ borderRadius } ${visibility} ${border}`,
						} ) } href={`viber://chat?number=${numberInput}`} rel="noopener noreferrer" target={ buttonLinkTarget ? '_blank' : '_self' } > 
						{iconTarget && <span className="dashicons dashicons-share-alt"></span>}
						<RichText.Content
							tagName="span"
							value={ text }
						/>
					</a>
				</div>
			: 
				<div className={`button-wrapper ${textClasses}`}>
					<a 
						{ ...useBlockProps.save( {
							className: `avatar-active ${classes} ${buttonSize} ${borderRadius} ${visibility} ${border}`
						})} data-timezone={timeZone} href={`viber://chat?number=${numberInput}`} rel="noopener noreferrer" target={ buttonLinkTarget ? '_blank' : '_self' }>
						 <img src={imageUrl} alt="agent" />
						<div className="info-wrapper">
							<RichText.Content
								value={ info }
								tagName="p"
								className="info"
							/>
							<RichText.Content
								value={ title }
								tagName="p"
								className="title"
							/>
							<RichText.Content
							style= {
								{
									backgroundColor:buttonBackgroundColor,
									color:buttonTextColor
								}
							}
								value={ online }
								tagName="p"
								className="online"
							/>
							<RichText.Content
							style= {
								{
									backgroundColor:buttonBackgroundColor,
									color:buttonTextColor
								}
							}
								value={ offline }
								tagName="p"
								className="offline"
							/>
						</div>
					</a>
				</div>
			}
		</>
	);
}