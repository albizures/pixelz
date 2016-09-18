const React = require('react');
const { Modal, ModalManager, Effect } = require('react-dynamic-modal');

const LoginButton = require('../components/LoginButton.js')
const obj = {};

obj.displayName = 'Login';

obj.getDefaultProps = function () {
  return {
    onLogin : () => {}
  }
};

const style = {
  content: {
    margin: '100px auto',
    borderRadius: 3,
    background: '#494949',
    border: '1px solid #272727',
    width: 200,
    overflow: 'hidden'
  }
};

obj.onLogin = function () {
  ModalManager.close();
  this.props.onLogin();
};

obj.render = function () {
  const { text, onRequestClose } = this.props;
  return <Modal
    style={style}
    onRequestClose={onRequestClose}
    effect={Effect.SlideFromBottom}
    >
      <div className='modal-login'>
        <div className='modal-header'>
          <span className='title'>Login / Sign up</span>
          <button className='close' onClick={ModalManager.close}>&times;</button>
        </div>
        <div className='modal-body'>
          <p>
            By connecting you agree to our terms of use.
          </p>
          <br/>
          <LoginButton twitter onLogin={this.onLogin}/>
        </div>
      </div>
  </Modal>;
};

const Login = React.createClass(obj);

module.exports = Login;