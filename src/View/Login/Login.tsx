import * as React from "react";
import Loading from "../Loading";

export interface ILoginProps {
    Loading?: boolean;
    attemptLogin?: (email: string, password: string) => void;
    Errors?: string[];
}

export interface ILoginState {
    Email: string;
    Password: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {

    state = {
        Email: "",
        Password: ""
    };

    onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            Email: event.target.value
        });
    }

    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            Password: event.target.value
        });
    }

    onLoginClick = () => {
        this.props.attemptLogin(this.state.Email, this.state.Password);
    }

    render() {
        if (this.props.Loading) {
            return <Loading />;
        }

        return (
            <div className="page">
                {this.props.Errors.map((e, index) => (
                    <p key={index} className="red">
                        {e}
                    </p>
                ))}
                <h4>Please Login to continue</h4>
                <input type="email" placeholder="email" onChange={this.onEmailChange} />
                <input type="password" placeholder="password" onChange={this.onPasswordChange} />
                <div className="seperator"></div>
                <button className="blue" onClick={this.onLoginClick}>Login</button>
            </div>
        );
    }
}

export default Login;