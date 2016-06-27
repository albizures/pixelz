

const React = require('react');

const BackgroundContext = require('./BackgroundContext.js');
const MainContext = require('./MainContext.js');
const PreviewContext = require('./PreviewContext.js');
const MaskContext = require('./MaskContext.js');

const Canvas = React.createClass({
  getInitialState() {
    return {};
  },
  componentDidMount() {
    this.setState({
      width : window.innerWidth,
      height : window.innerHeight
    });
  },
  render() {
    return <div className='content-canvas'>
      <BackgroundContext width={this.state.width} height={this.state.height} />
      <MainContext width={this.state.width} height={this.state.height} />
      <PreviewContext width={this.state.width} height={this.state.height} />
      <MaskContext width={this.state.width} height={this.state.height} />
    </div>;
  }
});

module.exports = Canvas;