import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { combineCssClasses } from '../../helpers/styleHelper';
import './Tooltip.css';

const Tooltip = ({
	className,
	content,
	iconId,
	color: backgroundColor,
	show,
}) => (
	<span
		className={combineCssClasses({
			[className]: className,
			tooltip: true,
			'tooltip--noIcon': !iconId,
			'tooltip--visible': show,
		})}
		style={{ backgroundColor }}
	>
		{content}
		{iconId ? (
			<span
				className={combineCssClasses({
					[`${className}_icon`]: className,
					tooltip_icon: true,
				})}
			>
				<Icon iconId={iconId} />
			</span>
		) : null}
		<span
			className={combineCssClasses({
				[`${className}_arrow`]: className,
				tooltip_arrow: true,
			})}
			style={{ backgroundColor }}
		/>
	</span>
);

Tooltip.defaultProps = {
	show: false,
	className: '',
};

Tooltip.propTypes = {
	content: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	show: PropTypes.bool,
	iconId: PropTypes.oneOf([
		'audio',
		'event',
		'image',
		'person',
		'quote',
		'social',
		'terminology',
		'text',
		'video',
		'web',
	]),
};

export default Tooltip;
