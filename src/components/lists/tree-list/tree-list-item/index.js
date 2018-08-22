import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.less';
import {themes} from '../../../../utils';

export default class TreeListItem extends Component {

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

  state = {
    selected: false
  };

  handleClick = () => {
    const { id, itemClick } = this.props;
    itemClick(id);
  };

  render() {
    const {theme, title, level, path, isActive } = this.props;
    return (
      <li
        className={cn(`TreeListItem_${level}`, themes('TreeListItem', theme), isActive && 'TreeListItem_active')}
        onClick={this.handleClick}
      >
        {title} {level} {path}
      </li>
    );
  }

}
