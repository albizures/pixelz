import React from 'react';

const obj = {};

obj.displayName = 'AsyncComponent';

obj.getInitialState = function () {
  return {};
};

obj.componentDidMount = function () {
  this.props.loader((component, props) => {
    this.setState({
      component,
      props
    });
  });
};

obj.renderPlaceholder = function () {
  return <div>Loading</div>;
};

obj.render = function () {
  if (this.state.component) {
    console.info(this.state.component);
    return <this.state.component {...this.props} {...this.state.props}/>;
  }
  console.info(this.props.renderPlaceholder, this.renderPlaceholder, (this.props.renderPlaceholder || this.renderPlaceholder)());
  return (this.props.renderPlaceholder || this.renderPlaceholder)();
};

obj.propTypes = {
  loader: React.PropTypes.func.isRequired,
  renderPlaceholder: React.PropTypes.func
};

const AsyncComponent = React.createClass(obj);

export default AsyncComponent;
