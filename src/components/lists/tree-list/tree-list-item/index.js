import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.less';
import {themes} from '../../../../utils';
import Input from '../../../elements/input'
import Error from "../../../elements/error";

export default class TreeListItem extends Component {

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    title: PropTypes.node,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  static defaultProps = {
    theme: 'default'
  };

  state = {
    id: undefined,
    title: '',
    isActive: false,
    isTouched: false,
    error: ''
  };

  componentWillReceiveProps(nextProps) {
    const { id, title, isActive } = nextProps;
    this.setState({ id, title, isActive });
  }

  handleInputChange = val => {
    if (val.length > 10) {
      let err = new Error('')
    }
    this.setState({ title: val, isTouched: true });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.id, this.state.title);
  };

  handleBodyKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  };

  handleClick = () => {
    const { id, itemClick } = this.props;
    itemClick(id);
  };

  render() {
    const {theme, title, level, isActive } = this.props;
    return (
      <li
        className={cn(`TreeListItem_${level}`, themes('TreeListItem', theme), isActive && 'TreeListItem_active')}
        onClick={this.handleClick}
      >
        {!isActive ? (
          <div>{title}</div>
        ) : (
          <div>
          <Input
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
            focused={true}
            tabIndex={0}
            onBlur={this.handleSubmit}
            onKeyDown={this.handleBodyKeyDown}
          />
          </div>
        )}
      </li>
    );
  }

}
