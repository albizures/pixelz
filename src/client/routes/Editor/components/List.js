
const React = require('react');
const ReactDOM = require('react-dom');

const List = React.createClass({
  propTypes : {
    component : React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired
  },
  getInitialState() {
    return {
      size : 0
    };
  },
  componentDidMount() {
    this.setState({
      size : ReactDOM.findDOMNode(this).children[0].clientWidth
    });
  },
  getItems() {
    let Component = this.props.component;
    if (this.props.filter && this.props.filter.length) {
      return this.props.filter.map((item, index) => {
        return <li className={'preview-' + this.props.name  + (this.props.current == item? ' active' : '')} key={index}>
              <Component size={this.state.size} data={this.props.items[item]}/>
            </li>;
      });
    }
    return this.props.items.map((item, index) => {
      return <li className={'preview-' + this.props.name + (this.props.current == index? ' active' : '')} key={index}>
        <Component size={this.state.size} data={item}/>
      </li>;
    });
  },
  render(){
    return <div className='list-content'>
        <ul className={'list ' + this.props.name + '-list'}>
        {
          this.getItems()
        }
      </ul>
    </div>;
  }
});

module.exports = List;