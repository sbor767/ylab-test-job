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
  };

  static defaultProps = {
    disabled: false,
    theme: 'default'
  };

  render() {
    const {theme, title, itemsObj, order, children, itemClick, itemSubmit } = this.props;
    return (
      <ul className={cn(`TreeList`, themes('TreeList', theme))}>
        {order.map(id => (
          <TreeListItem
            key={id}
            id={id}
            title={itemsObj[id].title}
            path={itemsObj[id].path}
            level={itemsObj[id].level}
            itemClick={itemClick}
            isActive={itemsObj[id].active}
            onSubmit={itemSubmit}
          />
        ))}
      </ul>
    );
  }

}