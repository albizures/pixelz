
const React = require('react');

const ListItem = require('./ListItem.js');
function List(props) {
  return <ul className={props.name + '-list list'}>
    {
      props.items.map((item, index) => {
        return <ListItem name={props.name} data={item} key={index}/>;
      })
    }
  </ul>;
}

const ContentList = React.createClass({
  getInitialState () {
    return {
      items : [],
      name : ''
    };
  },
  render () {
    return <div>
      <List items={this.state.items} name={this.state.name}/>
    </div>;
  }
});


module.exports = ContentList;