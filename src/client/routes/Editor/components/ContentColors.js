
const React = require('react');

const Color = require('./DragColor.js');
const obj = {};

obj.displayName = 'ContentColors';

obj.propTypes = {
  colors: React.PropTypes.array,
};

obj.getDefaultProps = function () {
  return {
    size : 15
  };
};

obj.onSelectColor = function (color, primary) {
  console.log(color, primary);
  primary? this.props.setPrimaryColor(color) : this.props.setSecondaryColor(color);
};

obj.getColors = function () {
  let colors = [];
  if (!this.props.colors) {
    return <span>It's empty</span>;
  }
  for (let i = 0; i < this.props.colors.length; i++) {
    let element = this.props.colors[i];
    colors.push(
      <Color {...element} onSelectColor={this.onSelectColor}  size={this.props.size} key={i} index={i}/>
    );
  }
  if (colors.length === 0) {
    colors = <span>It's empty</span>;
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
