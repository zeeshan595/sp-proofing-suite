import * as React from "react";
import { History } from "history";

export interface IBuildPDFProps {
  history?: History;
  Progress?: number;
}

export interface IBuildPDFState {
  IncludeLandingPage: boolean;
}

class BuildPDF extends React.Component<IBuildPDFProps, IBuildPDFState> {

  state: IBuildPDFState = {
    IncludeLandingPage: false
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
        <button className="blue">
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