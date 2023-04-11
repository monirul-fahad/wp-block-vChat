import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
export default function save({ attributes }) {
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
		iconTarget,
		imageUrl,
		timeZone,
		mondayStartTime,
		mondayEndTime,
		tuesdayStartTime,
		tuesdayEndTime,
		wednesdayStartTime,
		wednesdayEndTime,
		thursdayStartTime,
		thursdayEndTime,
		fridayStartTime,
		fridayEndTime,
		saturdayStartTime,
		saturdayEndTime,
		sundayStartTime,
		sundayEndTime,
	} = attributes;
	const viberLink = `https://viber://chat?number=${numberInput}`;
	const textClasses = classnames(`text-box-align-${textAlignment}`);
	const classes = classnames(`vChat-button-4 vc-btn-bg`);
	return (
		<>
			{buttonType === 'basic-button' ? (
				<div className={`button-wrapper ${textClasses}`}>
					<a
						{...useBlockProps.save({
							className: `${classes} ${buttonSize} ${borderRadius} ${visibility}`,
						})}
						href={`https://wa.me/${numberInput}`}
						rel="noopener noreferrer"
						target={buttonLinkTarget ? '_blank' : '_self'}
					>
						{iconTarget && (
							<span className="dashicons dashicons-share-alt"></span>
						)}
						<RichText.Content tagName="span" value={text} />
					</a>
				</div>
			) : (
				<div className={`button-wrapper ${textClasses}`}>
					<a
						{...useBlockProps.save({
							className: `vcButtons ${classes} ${buttonSize} ${borderRadius} ${visibility}`,
						})}
						href={`https://wa.me/${numberInput}`}
						rel="noopener noreferrer"
						target={buttonLinkTarget ? '_blank' : '_self'}
						data-timezone={timeZone}
						data-btnavailablety={`{ "monday":"${mondayStartTime}-${mondayEndTime}", "tuesday":"${tuesdayStartTime}-${tuesdayEndTime}", "wednesday":"${wednesdayStartTime}-${wednesdayEndTime}", "thursday":"${thursdayStartTime}-${thursdayEndTime}", "friday":"${fridayStartTime}-${fridayEndTime}", "saturday":"${saturdayStartTime}-${saturdayEndTime}", "sunday":"${sundayStartTime}-${sundayEndTime}" }`}
					>
						<img src={imageUrl} alt="agent" />
						<div className="info-wrapper">
							<RichText.Content
								value={info}
								tagName="p"
								className="info"
							/>
							<RichText.Content
								value={title}
								tagName="p"
								className="title"
							/>
							<RichText.Content
								value={online}
								tagName="p"
								className="online"
							/>
							<RichText.Content
								value={offline}
								tagName="p"
								className="offline"
							/>
						</div>
					</a>
				</div>
			)}
		</>
	);
}
