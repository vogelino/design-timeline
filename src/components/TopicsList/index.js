import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopicDescription from './TopicDescription';
import { combineCssClasses } from '../../helpers/styleHelper';
import './TopicsList.css';

export class TopicsListComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { hoveredTopic: false };
	}
	onMouseEnter(slug) {
		this.setState({ hoveredTopic: slug });
	}
	onMouseLeave() {
		this.setState({ hoveredTopic: false });
	}
	render() {
		const { categories } = this.props;
		return (
			<ul className="topicsList">
				{categories.map(({ title, description, slug, color }) => (
					<li
						key={slug}
						className={combineCssClasses({
							topicsList_item: true,
							'topicsList_item--hovered': slug === this.state.hoveredTopic,
						})}
						style={slug === this.state.hoveredTopic ?
							{ backgroundColor: color } : { color }
						}
						onMouseEnter={() => this.onMouseEnter(slug)}
						onMouseLeave={() => this.onMouseLeave()}
					>
						<span>{title}</span>
						<TopicDescription
							title={title}
							color={color}
							description={description}
							show={slug === this.state.hoveredTopic}
						/>
					</li>
				))}
			</ul>
		);
	}
}

TopicsListComponent.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
	})).isRequired,
};

const mapStateToProps = ({ categories }) => ({ categories });
export default connect(mapStateToProps)(TopicsListComponent);
