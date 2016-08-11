const React = require('react');
const AsyncComponent = require('../../components/AsyncComponent.js');
const { scheduleLoad } = require('utils/components');

const loader = (cb) => {
  require.ensure([], (require) => {
    cb(require('./Editor.js'));
  });
};

scheduleLoad(loader);

module.exports = (props) => <AsyncComponent {...props} loader={loader}/>; 