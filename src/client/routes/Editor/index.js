const React = require('react');
const AsyncComponent = require('../../components/AsyncComponent.js');

const loader = require('./loader.js');

module.exports = (props) => <AsyncComponent {...props} loader={loader}/>;