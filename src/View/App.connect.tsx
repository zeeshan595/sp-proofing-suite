import { connect } from "react-redux";
import { RootState } from "../Controller/Root";
import App, { IAppProps } from "./App";
import { Dispatch } from "react";
import { AnyAction } from "redux";

const mapStateToProps = (state: RootState) => ({
  Navigation: state.Navigation.Navigation,
  Authenticated: state.Authentication.User != null
}) as IAppProps;

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
) => ({

}) as IAppProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);