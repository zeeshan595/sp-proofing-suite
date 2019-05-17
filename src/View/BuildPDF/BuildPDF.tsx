import * as React from "react";
import { History } from "history";

export interface IBuildPDFProps {
  history?: History;
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

  render() {
    const warnings: string[] = [];
    if (this.state.IncludeLandingPage) {
      warnings.push("Hitting the scottish power website too many times can cause it to block you from accessing it.")
    }

    return (
      <div className="page">
        <h4>PDF Builder</h4>
        {
          warnings.map((val, index) => (
            <p key={index} className="red">
              {val}
            </p>
          ))
        }
        <label className="switch">
          <input type="checkbox" onChange={this.onChangeIncludeLandingPage} />
          <span className="slider round"></span>
        </label>
        <div className="sliderText">
          Include Landing Page
        </div>
        <div className="seperator"></div>
        <button onClick={() => this.props.history.goBack()}>
          Back
        </button>
        <button className="blue">
          Build PDF
        </button>
      </div>
    );
  }
}

export default BuildPDF;