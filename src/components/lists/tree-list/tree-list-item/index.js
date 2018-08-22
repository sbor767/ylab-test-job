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

/*
  handleClick = () => {
    this.setState({
      isOpen: this.props.disabled ? this.state.isOpen : !this.state.isOpen
    });
  };
*/

  render() {
    const {theme, title, id, level, path } = this.props;
    return (
      <li className={cn(`TreeListItem_${level}`, themes('TreeListItem', theme))}>
        {title} {level} {path}
      </li>
    );
  }

}
