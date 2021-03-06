import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.less';
import {themes} from '../../../../utils';
import Input from '../../../elements/input'

const MAX_INPUT_LENGTH = 255;

export default class TreeListItem extends Component {

  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    itemClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  static defaultProps = {
    theme: 'default'
  };

  state = {
    id: undefined,
    title: '',
    isActive: false,
    error: ''
  };

  componentWillReceiveProps(nextProps) {
    const { id, title, isActive } = nextProps;
    let error = this.error(title);
    this.setState({ id, title, isActive, error });
  }

  error = (val) => !val.length || val.length > MAX_INPUT_LENGTH ? `Input length must be in 1..${MAX_INPUT_LENGTH} range!` : '';

  handleInputChange = val => {
    let error = this.error(val);
    this.setState({ title: val, error });
  };

  handleSubmit = () => {
    if (this.state.error) return;
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
        className={cn(
          `TreeListItem_${level}`,
          themes('TreeListItem', theme),
          isActive && 'TreeListItem_active',
        )}
        onClick={this.handleClick}
      >
        {!isActive ? (
          <div>{title}</div>
        ) : (
          <div>
            {this.state.error && <div className="TreeListItem__ErrorBox">Error {this.state.error}</div>}
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
