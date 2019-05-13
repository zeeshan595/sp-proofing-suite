import * as React from "react";
import { History } from "history";

export interface INewDeploymentProps {
  history?: History,
  createDeployment?: (name: string, deployment: number) => void;
}

export interface INewDeploymentState {
  DeploymentName: string;
  DeploymentIdentifier: number;
}

class NewDeployment extends React.Component<INewDeploymentProps, INewDeploymentState>
{
  state: INewDeploymentState = {
    DeploymentIdentifier: 0,
    DeploymentName: ""
  };

  onDeploymentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      DeploymentName: event.target.value
    });
  }

  onDeploymentIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      DeploymentIdentifier: event.target.valueAsNumber
    });
  }

  render() {
    return (
      <div className="page">
        <h4>New Deployment</h4>
        <input type="text" placeholder="Deployment Name" onChange={this.onDeploymentNameChange} />
        <input type="number" placeholder="Deployment Identifier" onChange={this.onDeploymentIdentifierChange} />
        <hr />
        <button onClick={() => this.props.history.goBack()} className="red">Cancel</button>
        <button onClick={() => this.props.createDeployment(this.state.DeploymentName, this.state.DeploymentIdentifier)} className="green">
          Create
        </button>
      </div>
    );
  }
}

export default NewDeployment;