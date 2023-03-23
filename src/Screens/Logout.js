import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LayoutSplashScreen } from "../core/MetronicSplashScreen";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { hasAuthToken } = this.props;
    return hasAuthToken ? <LayoutSplashScreen /> : <Link to="/auth/login" />;
  }
}

export default Logout;
