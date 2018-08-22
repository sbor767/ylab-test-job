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
    listItems: []
  };

  componentDidMount() {
    items.get().then(res => {
      let items = res.map(item => {
        item['active'] = false;
        return item;
      });
      this.setState({ listItems: items })
    })
  }

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
            items={this.state.listItems}
          />
        </LayoutContent>
      </LayoutPage>
    );
  }
}

export default withRouter(
  connect(state => ({}))(Home)
);
