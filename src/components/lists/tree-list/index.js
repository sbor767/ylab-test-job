import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.less';
import {themes} from '../../../utils';
import TreeListItem from "./tree-list-item";

export default class TreeList extends Component {

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    title: PropTypes.node,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    // disabled: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    theme: 'default'
  };

/*
  handleClick = () => {
    this.setState({
      isOpen: this.props.disabled ? this.state.isOpen : !this.state.isOpen
    });
  };
*/

  getOrdered(arr = []) {
    function getPosition(val) {
      let level = undefined;
      let path = undefined;
      if (!val.parent) {
        level = 0;
        path = '' + val._id;
        return {level, path}
      }
      let parentPosition = getPosition(arr.filter(e => e._id === val.parent)[0]);
      level = parentPosition.level + 1;
      path = `${parentPosition.path}/${val._id}`;
      return {level, path};
    }
    let newArr = arr.map(val => {
      let newVal = val;
      newVal['level'] = getPosition(val).level;
      newVal['path'] = getPosition(val).path;
      return newVal;
    });
    newArr.sort((a, b) => {
      if (a.path > b.path) return 1;
      if (a.path < b.path) return -1;
      return 0;
    });
    return newArr;
  }

  render() {
    const {theme, title, items, children } = this.props;
    let newArr = this.getOrdered(items);
    return (
      <ul className={cn(`TreeList`, themes('TreeList', theme))}>
        {newArr.map(item => (
          <TreeListItem
            key={item._id}
            title={item.title}
            path={item.path}
            level={item.level}
          />
        ))}
      </ul>
    );
  }

}