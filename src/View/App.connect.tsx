import { connect } from "react-redux";
import { RootState } from "../Controller/Root";
import App, { IAppProps } from "./App";
import { Dispatch } from "react";
import { AnyAction } from "redux";

const mapStateToProps: (state: RootState) => IAppProps = (state: RootState) => ({
  Navigation: state.Navigation.Navigation
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  props: IAppProps
) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);