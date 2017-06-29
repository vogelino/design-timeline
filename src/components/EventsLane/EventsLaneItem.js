import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { combineCssClasses } from '../../helpers/styleHelper';
import Tooltip from '../Tooltip';

class EventsLaneItem extends Component {
	shouldComponentUpdate(nextProps) {
		const { selected, hovered, position } = this.props;
		return selected !== nextProps.selected ||
			hovered !== nextProps.hovered ||
			position !== nextProps.position;
	}
	render() {
		const {
			id,
			title,
			type,
			future,
			selected,
			hovered,
			onClick,
			onMouseEnter,
			onMouseLeave,
			position: left,
			color,
			className,
			classNamePrefix,
		} = this.props;
		return (
			<button
				className={combineCssClasses({
					[className]: className,
					'events-lane_item': true,
					'events-lane_item--hovered': hovered,
					'events-lane_item--selected': selected,
					[`events-lane_item--${future}`]: future,
					[`${classNamePrefix}_events-lane_item`]: true,
					[`${classNamePrefix}_events-lane_item--hovered`]: hovered,
					[`${classNamePrefix}_events-lane_item--selected`]: selected,
					[`${classNamePrefix}_events-lane_item--${future}`]: future && className,
				})}
				id={id}
				style={{ left, color }}
				title={title}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<span
					className={combineCssClasses({
						'events-lane_itemsymbol': true,
						'events-lane_itemsymbol--hovered': hovered,
						'events-lane_itemsymbol--selected': selected,
						[`events-lane_itemsymbol--${future}`]: future,
						[`${classNamePrefix}_events-lane_itemsymbol`]: true,
						[`${classNamePrefix}_events-lane_itemsymbol--hovered`]: hovered,
						[`${classNamePrefix}_events-lane_itemsymbol--selected`]: selected,
						[`${classNamePrefix}_events-lane_itemsymbol--${future}`]: future && className,
					})}
				/>
				<Tooltip
					content={title}
					iconId={type}
					show={hovered}
					color={color}
				/>
			</button>
		);
	}
}

const placeholderFunc = (x) => x;
EventsLaneItem.defaultProps = {
	className: '',
	classNamePrefix: '',
	title: '',
	type: 'text',
	future: undefined,
	selected: false,
	hovered: false,
	position: 0,
	color: '#BADA55',
	onClick: placeholderFunc,
	onMouseEnter: placeholderFunc,
	onMouseLeave: placeholderFunc,
};

EventsLaneItem.propTypes = {
	className: PropTypes.string,
	classNamePrefix: PropTypes.string,
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	type: PropTypes.string,
	future: PropTypes.oneOf(['trend', 'extreme']),
	selected: PropTypes.bool,
	hovered: PropTypes.bool,
	position: PropTypes.number,
	color: PropTypes.string,
	onClick: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
};

export default EventsLaneItem;
