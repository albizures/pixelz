import React from 'react';
import { getData } from '../../common/request';
import styles from './style.styl';

import Canvas from '../../components/canvas/canvas.jsx';
import Frames from '../../components/frames/frames.jsx';
import Sprite from '../../prototypes/Sprite.js';

export default class EditorPage extends React.Component {
  componentWillMount() {
    console.log("[EditorPage] will mount with server response: ", this.props);
    let sprite = Sprite();
    this.setState({
      sprite : sprite,
      mainFrame: sprite.frames[0]
    });
  }
  constructor(){
    super();
    this.state = {
      height: 0,
      width: 0
    };
  }
  componentDidMount(){
    window.addEventListener('resize',this.onResize.bind(this));
    this.onResize();
  }
  onResize(e){
    let that = this.refs.editor.getDOMNode();
    this.setState({height : that.clientHeight, width : that.clientWidth});
  }
  render() {
    return (
      <div ref="editor" className="editor" id="editor">
        <Canvas height={this.state.height} width={this.state.width}/>
        <Frames/>
			</div>
    );
  }

  static fetchData = function(params) {
    return getData("/landing");
  }
}
