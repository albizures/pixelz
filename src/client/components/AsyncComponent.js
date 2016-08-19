const React = require('react');

const obj = {};

obj.displayName = 'AsyncComponent';

obj.getInitialState = function () {
  return {};
};

obj.componentDidMount = function () {
  this.props.loader(componentModule => {
    this.setState({
      component: componentModule
    });
  });
};

obj.renderPlaceholder = function () {
  return <div>Loading</div>;
};

obj.render = function () {
  if (this.state.component) {
    return <this.state.component {...this.props}/>;
  }
  return (this.props.renderPlaceholder || this.renderPlaceholder)();
};

obj.propTypes = {
  loader: React.PropTypes.func.isRequired,
  renderPlaceholder: React.PropTypes.func
};

const AsyncComponent = React.createClass(obj);

module.exports = AsyncComponent;
