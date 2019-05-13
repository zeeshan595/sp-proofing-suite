import * as React from "react";
import IDeployment from "../../Model/Deployment";
import { History } from "history";

export interface IHomepageProps {
  Deployments?: IDeployment[],
  fetchDeployments?: () => void,
  history?: History
}

export interface IHomepageState {
}

class Homepage extends React.Component<IHomepageProps, IHomepageState>
{
  componentDidMount() {
    this.props.fetchDeployments();
  }

  render() {
    let deployments: JSX.Element[] = [];
    if (this.props.Deployments) {
      deployments = this.props.Deployments.map((val, index) => (
        <div key={index} className="row" onClick={() => this.props.history.push("/deployment/" + val.Identifier)
        }>
          <div className="cell">{val.Name}</div>
          <div className="cell">{val.Identifier}</div>
          <div className="cell">{val.TotalRecords}</div>
        </div>
      ));
    }

    return (
      <div className="page">
        <button onClick={() => this.props.history.push("/new-deployment")} className="green">New Deployment</button>
        <button onClick={() => this.props.fetchDeployments()} className="blue">Refresh</button>
        <div className="seperator"></div>
        <div className="row-heading">
          <div className="cell">Name</div>
          <div className="cell">Identifier</div>
          <div className="cell">Total Records</div>
        </div>
        {deployments}
      </div>
    );
  }
}

export default Homepage;