import React from 'react';


export default class Canvas extends React.Component {
	render() {
		//console.log(this.props);
		var {...other} = this.props;
		return (
			<canvas {...other}></canvas>
		)
	}
}
