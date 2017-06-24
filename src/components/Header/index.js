import React from 'react';
import './Header.css';

export const HeaderComponent = () => (
	<div className="header">
		<h1 className="header_title">Getting a Design Job in 2030</h1>
		<a
			className="header_infolink"
			href="#show-explanation"
			title="Show the explanation text"
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

export default HeaderComponent;
