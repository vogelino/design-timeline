import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as introScreenActions from '../../redux/actions/introScreenActions';
import './Header.css';

export const HeaderComponent = ({ showIntroScreen }) => (
	<div className="header">
		<h1 className="header_title">Getting a Design Job in 2030</h1>
		<a
			className="header_infolink"
			href="#show-explanation"
			title="Show the explanation text"
			onClick={showIntroScreen}
		>
			Was ist das?
		</a>
		<ul className="header_legend">
			<li className="header_legenditem">
				<i className="header_legenditemsymbol header_legenditemsymbol--event" />
				Ereignis
			</li>
			<li className="header_legenditem">
				<i className="header_legenditemsymbol header_legenditemsymbol--extreme" />
				Extremszenario
			</li>
			<li className="header_legenditem">
				<i className="header_legenditemsymbol header_legenditemsymbol--trend" />
				Trendszenario
			</li>
		</ul>
	</div>
);

HeaderComponent.defaultProps = {
	showIntroScreen: (x) => x,
};

HeaderComponent.propTypes = {
	showIntroScreen: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(introScreenActions, dispatch);
export default connect(null, mapDispatchToProps)(HeaderComponent);
