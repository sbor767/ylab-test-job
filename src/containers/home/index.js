import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import * as actions from "../../store/actions";
import TreeList from "../../components/lists/tree-list";
import Button from "../../components/elements/button";
import LayoutPage from "../../components/layouts/layout-page";
import LayoutContent from "../../components/layouts/layout-content";
import HeaderContainer from "../header-container";
import items from '../../api/items';

class Home extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  showInfo = () => {
    this.props.dispatch(actions.modal.open('info')).then(result => {
      console.log(result);
    });
  };

  state = {
    itemsObj: {},
    order: []
  };

  componentDidMount() {
    items.get().then(res => {
      /**
       * Recurrent function to evaluate tree position.
       * @param val - tree item
       * @returns {*} - {level, path} - tree position
       */
      function getPosition(val) {
        let level = undefined;
        let path = undefined;
        if (!val.parent) {
          level = 0;
          path = '' + val._id;
          return {level, path}
        }
        let parentPosition = getPosition(res.filter(e => e._id === val.parent)[0]);
        level = parentPosition.level + 1;
        path = `${parentPosition.path}/${val._id}`;
        return {level, path};
      }

      let items = res.map(item => {
        let newItem = item;
        newItem['active'] = false;
        newItem['level'] = getPosition(item).level;
        newItem['path'] = getPosition(item).path;
        return newItem;
      });

      items.sort((a, b) => {
        if (a.path > b.path) return 1;
        if (a.path < b.path) return -1;
        return 0;
      });

      // Make object to fast access it keys.
      let itemsObj = items.reduce((acc, cur, i) => {
        acc[cur._id] = cur;
        return acc;
      }, {});

      let order = items.map(item => item._id);

      this.setState({ itemsObj, order })
    })
  }

  handleSetItemActive = (id, activeState = true) => {
    let itemsObj = this.state.itemsObj;
    Object.keys(itemsObj).forEach(i => itemsObj[i].active = false );
    itemsObj[id].active = activeState;
    this.setState({ itemsObj })
  };

  handleItemSubmit = (id, newTitle) => {
    let itemsObj = this.state.itemsObj;
    itemsObj[id].title = newTitle;
    itemsObj[id].active = false;
    this.setState({ itemsObj })
  };

  render() {
    return (
      <LayoutPage header={<HeaderContainer/>}>
        <LayoutContent>
          <h1>Главная страница</h1>
          <p>
            <Link to="/main">Раздел для авторизованных</Link>
          </p>
          <p>
            <Button onClick={this.showInfo}>Показать модалку</Button>
          </p>

          <TreeList
            title={"Заголовок"}
            itemsObj={this.state.itemsObj}
            order={this.state.order}
            itemClick={this.handleSetItemActive}
            itemSubmit={this.handleItemSubmit}
            itemSetPassive={this.handleSetItemPassive}
          />
        </LayoutContent>
      </LayoutPage>
    );
  }
}

export default withRouter(
  connect(state => ({}))(Home)
);
