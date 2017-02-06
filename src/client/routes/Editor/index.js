import React from 'react';
import AsyncComponent from '../../components/AsyncComponent';

import loader from './loader';


export default (props) => {
  console.log(props);
  return <AsyncComponent {...props} loader={loader}/>;
};