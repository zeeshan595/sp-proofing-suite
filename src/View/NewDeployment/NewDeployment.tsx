import * as React from "react";
import { History } from "history";
import Loading from "../Loading";

export interface INewDeploymentProps {
  history?: History;
  createDeployment?: (name: string, deployment: number, callback: () => void) => void;
  isLoading?: boolean;
}

export interface INewDeploymentState {
  DeploymentName: string;
  DeploymentIdentifier: number;
  ForumErrors: string[];
}

class NewDeployment extends React.Component<INewDeploymentProps, INewDeploymentState>
{
  state: INewDeploymentState = {
    DeploymentIdentifier: 0,
    DeploymentName: "",
    ForumErrors: []
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

  onCreateDeploymentClick = () => {
    const forumErrors: string[] = [];

    const namePattern = /^[a-zA-Z0-9\ ]{3,50}$/g
    const identifierPattern = /^[0-9]{1,10}$/g
    if (namePattern.test(this.state.DeploymentName) == false) {
      forumErrors.push("The deployment name must contain at least 3 characters and can only include a-z, 0-9 and spaces.")
    }
    if (identifierPattern.test(this.state.DeploymentIdentifier.toString()) == false) {
      forumErrors.push("The identifier can only include numbers.")
    }

    if (forumErrors.length > 0) {
      this.setState({
        ...this.state,
        ForumErrors: forumErrors
      });
      return;
    }

    this.props.createDeployment(
      this.state.DeploymentName,
      this.state.DeploymentIdentifier,
      () => this.props.history.push("/")
    )
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <div className="page">
        <h4>New Deployment</h4>
        {this.state.ForumErrors.map((val, index) => <p key={index} className="red">{val}</p>)}
        <input type="text" placeholder="Deployment Name" onChange={this.onDeploymentNameChange} />
        <input type="number" placeholder="Deployment Identifier" onChange={this.onDeploymentIdentifierChange} />
        <hr />
        <button
          onClick={() => this.props.history.goBack()}
          className="red">
          Cancel
        </button>
        <button
          onClick={this.onCreateDeploymentClick}
          className="green">
          Create
        </button>
      </div>
    );
  }
}

export default NewDeployment;