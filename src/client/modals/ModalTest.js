const { Modal, register} = require('../components/Modal');
const React = require('react');

const obj = {};

obj.displayName = 'ModalTest'; 

obj.render = function () {
  return <Modal {...this.props} width={300}><input/></Modal>;
};

const ModalTest = React.createClass(obj);


register(ModalTest);




