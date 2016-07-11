
const React = require('react');
const ReactDOM = require('react-dom');

const obj = {};

obj.displayName = 'List';

obj.propTypes =  {
  component : React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired
};
obj.getInitialState = function() {
  return {
    size : 0
  };
};
obj.componentDidMount = function() {
  this.setState({
    size : ReactDOM.findDOMNode(this).children[0].clientWidth
  });
};
obj.getItems = function() {
  if (this.state.size === 0) {
    return <li></li>;
  }
  let Component = this.props.component;
  if (this.props.filter && this.props.filter.length) {
    return this.props.filter.map((item, index) => {
      return <li className={'preview-' + this.props.name  + (this.props.current == item? ' active' : '')} key={index}>
        <Component size={this.state.size} data={this.props.items[item]}/>
      </li>;
    });
  }
  return this.props.items.map((item, index) => {
    return <li className={'preview-' + this.props.name + (this.props.current == index? ' active' : '')} key={index}>
      <Component size={this.state.size} data={item}/>
    </li>;
  });
};
obj.render = function(){
  return <div className='list-content'>
      <ul className={'list ' + this.props.name + '-list'}>
      {
        this.getItems()
      }
    </ul>
  </div>;
};

const List = React.createClass(obj);
module.exports = List;