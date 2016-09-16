const React = require('react');
const { Link } = require('react-router');

const obj = {};

obj.displayName = 'Narbar';

obj.render = function () {
  return <nav className='navbar'>
    <div className='navbar-header'>
      <a className='navbar-brand'><h2>Pixore</h2></a>
    </div>
    <div className='navbar-right'>
      <Link className='nav-item btn' to='/editor'>Start drawing</Link>
      <a className='nav-item' href='/api/auth/twitter'>Login / Sign in</a>
    </div>
  </nav>;
    // <div className='navbar-collapse collapse'>
    //   <ul>
    //     <li></li>
    //     <li></li>
    //   </ul>
    // </div>
};

const Narbar = React.createClass(obj);

module.exports = Narbar;