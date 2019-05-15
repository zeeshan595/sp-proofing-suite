import * as React from "react";
import { History } from "history";

export interface IDeploymentProps {
    history?: History
}

export interface IDeploymentState {

}

class Deployment extends React.Component<IDeploymentProps, IDeploymentState> {

    state: IDeploymentState = {

    };

    render() {
        return (
            <div className="page">
                <button onClick={() => this.props.history.goBack()}>Back</button>
                <button className="red">Remove Deployment</button>
                <button className="blue">Refresh</button>
                <button className="blue">Build PDF</button>
                <div className="seperator"></div>
                <div className="row-heading">
                    <div className="cell">Record Number</div>
                    <div className="cell">Status</div>
                    <div className="cell">Comment</div>
                </div>
            </div>
        );
    }
}

export default Deployment;