const React = require('react');
const { Tooltipy } = require('../../../../components/Tooltipy.js');
const obj = {};

obj.displayName = 'Name';

obj.onSubmit = function (evt) {
  evt.preventDefault();
  this.props.onSubmit(this.state.name);
};
obj.shouldComponentUpdate = function (nextProps, nextState) {
  return nextProps.name !== this.props.name || nextState.name !== this.state.name; 
};

obj.getInitialState = function () {
  return {
    name : this.props.name
  };
};

obj.componentWillReceiveProps = function (nextProps) {
  if (this.props.name !== nextProps.name) {
    this.setState({
      name: nextProps.name
    });
  }
};

obj.onChange = function (evt) {
  this.setState({
    name: evt.target.value
  });
};

obj.render = function () {
  return <form onSubmit={this.onSubmit} className="name-form">
    <Tooltipy text="blyat?" mode="bottom">
      <input className='name-sprite' onChange={this.onChange} value={this.state.name}/>
    </Tooltipy>
    <button type="submit">submit</button>
  </form>;
};

const Name = React.createClass(obj);

module.exports = Name;
