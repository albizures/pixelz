
const React = require('react');

const Color = require('./DragColor.js');
const obj = {};

obj.displayName = 'ContentColors';

obj.propTypes = {
  palette : React.PropTypes.shape({
    colors: React.PropTypes.array,
    name: React.PropTypes.string
  }).isRequired
};

obj.getDefaultProps = function () {
  return {
    size : 20
  };
};

obj.getColors = function () {
  let colors = [];
  for (let i = 0; i < this.props.palette.colors.length; i++) {
    let element = this.props.palette.colors[i];
    colors.push(
      <Color {...element} size={this.props.size} key={i} index={i}/>
    );
  }
  return colors;
};

obj.render = function () {
  return <div className='content-colors'>
    {this.getColors()}
  </div>;
};

const ContentColors = React.createClass(obj);

module.exports = ContentColors;
