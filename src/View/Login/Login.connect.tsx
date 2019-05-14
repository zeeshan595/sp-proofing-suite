import { connect } from "react-redux";
import { RootState } from "../../Controller/Root";
import Login, { ILoginProps } from "./Login";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { attemptLogin } from "../../Controller/Authentication/Actions/Login";

const mapStateToProps = (state: RootState) => ({
    Loading: state.Authentication.Loading
}) as ILoginProps;

const mapDispatchToProps = (
    dispatch: Dispatch<AnyAction>
) => ({
    attemptLogin: (email: string, password: string) => attemptLogin(email, password)(dispatch)
}) as ILoginProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);