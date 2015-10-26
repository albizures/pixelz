import React from 'react';
import Panel from '../panel/panel.jsx';


export default class Frames extends React.Component {
	render() {
		//console.log(this.props);
		var {...other} = this.props;
		return (
			<Panel name="frames">
				frames
			</Panel>
		)
	}
}
