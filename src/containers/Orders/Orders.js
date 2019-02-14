import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Orders.css";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  deleteOrderHandler(orderId) {
    this.props.onDeleteOrder(this.props.token, this.props.userId, orderId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          sideDish={order.sideDish}
          price={order.price}
          orderDeleted={() => this.deleteOrderHandler(order.id)}
        />
      ));
    }

    return (
      <div>
        <div className={classes.Background}></div>
        <div className={classes.Orders}>{orders}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (token, userId, orderId) =>
      dispatch(actions.deleteOrder(token, userId, orderId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));