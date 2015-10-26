import React from 'react';


export default class Panel extends React.Component {
	render() {
		//console.log(this.props);
		var {...other} = this.props;
		return (
			<div className={'panel ' + this.props.name}>{this.props.children}</div>
		)
	}
}
