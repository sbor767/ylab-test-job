import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.less';
import {themes} from '../../../utils';
import TreeListItem from "./tree-list-item";

export default class TreeList extends Component {

  static propTypes = {
    itemsObj: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    itemClick: PropTypes.func.isRequired,
    itemSubmit: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  static defaultProps = {
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