import * as React from "react";
import { History } from "history";
import IDeployment from "../../Model/Deployment";
import { match } from "react-router";

export interface IBuildPDFProps {
  match?: match;
  history?: History;
  Progress?: number;
  Deployments?: IDeployment[];
  buildPdf?: (deployment: number, list: number, totalRecords: number) => Promise<void>;
}

export interface IBuildPDFState {
  IncludeLandingPage: boolean;
  Deployment: IDeployment;
}

class BuildPDF extends React.Component<IBuildPDFProps, IBuildPDFState> {

  state: IBuildPDFState = {
    IncludeLandingPage: false,
    Deployment: null,
  }

  componentWillMount() {
    const deployment = this.props.match.params["deployment"];
    this.setState({
      ...this.state,
      Deployment: this.props.Deployments.find(val => val.Identifier == deployment)
    });
  }

  onChangeIncludeLandingPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      IncludeLandingPage: event.target.checked
    });
  }

  buildPdfSettingsUi = () => {
    const warnings: string[] = [];
    let landingPageOptions;
    if (this.state.IncludeLandingPage) {
      warnings.push("Hitting the scottish power website too many times can cause it to block you from accessing it.")
      landingPageOptions = (
        <React.Fragment>
          <input type="number" placeholder="Landing page screenshot delay (mili-seconds)" />
          <input type="text" placeholder="Landing page URL Pattern" />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h4>PDF Builder</h4>
        <p className="red">This is under development and not finished. Please avoid using this.</p>
        <div className="seperator"></div>
        <label className="switch">
          <input type="checkbox" onChange={this.onChangeIncludeLandingPage} />
          <span className="slider round"></span>
        </label>
        <div className="sliderText">
          Include Landing Page
        </div>
        {
          warnings.map((val, index) => (
            <p key={index} className="red">
              {val}
            </p>
          ))
        }
        {landingPageOptions}
        <div className="seperator"></div>
        <button onClick={() => this.props.history.goBack()}>
          Back
        </button>
        <button
          className="blue"
          onClick={() => this.props.buildPdf(
            this.state.Deployment.Identifier,
            this.state.Deployment.List,
            this.state.Deployment.TotalRecords
          )}
        >
          Build PDF
        </button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="page">
        {this.buildPdfSettingsUi()}
      </div>
    );
  }
}

export default BuildPDF;