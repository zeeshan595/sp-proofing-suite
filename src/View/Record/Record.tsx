import * as React from "react";
import IRecord from "../../Model/Record";
import { History } from "history";
import { match } from "react-router";
import Loading from "../Loading";
import IDeployment from "../../Model/Deployment";
import RecordStatus from "../../Model/RecordStatus";

export interface IRecordProps {
  history?: History;
  Records?: IRecord[];
  Deployments?: IDeployment[];
  match?: match;
  PreviewKey?: string;
  Loading?: boolean;
  generatePreviewKey?: (deployment: number, record: number, list: number) => Promise<void>;
  updateRecordStatus?: (deployment: number, record: number, status: RecordStatus) => Promise<void>;
  updateRecordComment?: (deployment: number, record: number, comment: string) => Promise<void>;
}

export interface IRecordState {
  Record: IRecord;
  Deployment: IDeployment;
}

class Record extends React.Component<IRecordProps, IRecordState> {

  state = {
    Record: null
  } as IRecordState

  componentWillMount() {
    const deployment: number = this.props.match.params["deployment"];
    const record: number = this.props.match.params["record"];
    let recordO: IRecord = this.props.Records.find((val) => val.Identifier == record);
    let deploymentO: IDeployment = this.props.Deployments.find((val) => val.Identifier == deployment);

    if (!recordO) {
      recordO = {
        Identifier: record,
        Comment: "",
        Status: RecordStatus.Pending
      };
    }

    this.setState({
      Record: recordO,
      Deployment: deploymentO
    });
    this.props.generatePreviewKey(
      deployment,
      record,
      deploymentO.List
    );
  }

  onRecordStatusChange = async (status: RecordStatus) => {
    await this.props.updateRecordStatus(
      this.state.Deployment.Identifier,
      this.state.Record.Identifier,
      status
    );
    this.setState({
      ...this.state,
      Record: {
        ...this.state.Record,
        Status: status
      }
    });
  }

  onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const data = event.target.value;
    this.setState({
      ...this.state,
      Record: {
        ...this.state.Record,
        Comment: data
      }
    });
  }

  onBackClick = async () => {
    await this.props.updateRecordComment(
      this.state.Deployment.Identifier,
      this.state.Record.Identifier,
      this.state.Record.Comment
    );
    this.props.history.goBack();
  }

  render() {
    if (this.props.Loading) {
      return <Loading />;
    }

    if (this.state.Record == null) {
      return (
        <div className="page">
          <p className="red">There was an issue loading this record :c</p>
        </div>
      );
    }

    return (
      <div className="page">
        <button onClick={this.onBackClick}>Back</button>
        <button
          onClick={() => {
            window.open(
              "https://images.scottishpower.co.uk?" +
              this.props.PreviewKey,
              "_blank"
            );
          }}
          className="blue"
        >View Email</button>
        <span className="badge">{RecordStatus[this.state.Record.Status]}</span>
        <div className="seperator"></div>
        <div className="row-heading">
          <div className="cell">Deployment</div>
          <div className="cell">List</div>
          <div className="cell">Total Records</div>
        </div>
        <div className="row-static">
          <div className="cell">{this.state.Deployment.Identifier}</div>
          <div className="cell">{this.state.Deployment.List}</div>
          <div className="cell">{this.state.Deployment.TotalRecords}</div>
        </div>
        <div className="seperator"></div>
        <button
          className="green"
          onClick={() => this.onRecordStatusChange(RecordStatus.Approved)}
        >
          Approve
        </button>
        <button
          className="yellow"
          onClick={() => this.onRecordStatusChange(RecordStatus.Pending)}
        >
          Pending
        </button>
        <button
          className="red"
          onClick={() => this.onRecordStatusChange(RecordStatus.Rejected)}
        >
          Reject
        </button>
        <textarea
          value={this.state.Record.Comment}
          placeholder="Comment..."
          onChange={this.onCommentChange}
        ></textarea>
      </div>
    );
  }
}

export default Record;