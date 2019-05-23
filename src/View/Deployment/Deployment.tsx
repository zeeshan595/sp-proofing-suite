import * as React from "react";
import { History } from "history";
import IRecord from "../../Model/Record";
import { match } from "react-router";
import Loading from "../Loading";
import IRecordStats from "../../Model/RecordStatus";
import IDeployment from "../../Model/Deployment";

export interface IDeploymentProps {
    history?: History;
    Records: IRecord[];
    match?: match;
    Loading: boolean;
    Deployments: IDeployment[];
    fetchRecordList: (deployment: number) => void;
    removeDeployment: (deployment: number, callback: () => void) => Promise<void>;
}

export interface IDeploymentState {
    Deployment: number;
    TotalRecords: number;
    List: number;
}

class Deployment extends React.Component<IDeploymentProps, IDeploymentState> {

    state: IDeploymentState = {
        Deployment: -1,
        TotalRecords: 0,
        List: 0
    };

    componentWillMount() {
        const deployment = this.props.match.params["deployment"];
        const deploymentO = this.props.Deployments.find(val => {
            return val.Identifier == deployment;
        });
        this.setState({
            ...this.state,
            Deployment: deployment,
            TotalRecords: deploymentO.TotalRecords,
            List: deploymentO.List
        });
        this.props.fetchRecordList(deployment);
    }

    createTotalRecordsUi = (totalRecords: number, records: IRecord[]): JSX.Element[] => {
        const ui: JSX.Element[] = [];
        for (let i: number = 1; i < (parseInt(totalRecords.toString()) + 1); i++) {
            let recordFound: IRecord = null;
            for (let j: number = 0; j < records.length; j++) {
                if (records[j].Identifier == i) {
                    recordFound = records[j];
                }
            }
            let status = 0;
            let comment = "";
            if (recordFound) {
                status = recordFound.Status;
                comment = recordFound.Comment;
            }
            let classColor = '';
            if (status == IRecordStats.Approved) {
                classColor = ' row-green ';
            } else if (status == IRecordStats.Rejected) {
                classColor = ' row-red ';
            }
            ui.push(
                <div
                    key={i}
                    className={"row " + classColor}
                    onClick={() => this.props.history.push(
                        "/record/" +
                        this.state.Deployment +
                        "/" +
                        i
                    )}
                >
                    <div className="cell">{i}</div>
                    <div className="cell">{IRecordStats[status]}</div>
                    <div className="cell">{this.getLimitedRecordCommentSize(comment)}</div>
                </div>
            );
        }
        return ui;
    }

    getLimitedRecordCommentSize = (comment: string) => {
        if (!comment || comment.length < 12)
            return comment;

        return comment.substr(0, 15);
    }

    render() {
        if (this.props.Loading) {
            return <Loading />;
        }

        return (
            <div className="page">
                <button
                    onClick={() => this.props.history.goBack()}
                >
                    Back
                </button>
                <button
                    className="red"
                    onClick={
                        () => this.props.removeDeployment(
                            this.state.Deployment,
                            () => this.props.history.goBack()
                        )
                    }
                >
                    Remove Deployment
                </button>
                <button
                    onClick={() => this.props.fetchRecordList(this.state.Deployment)}
                    className="blue"
                >
                    Refresh
                </button>
                <button
                    className="yellow"
                    onClick={() => this.props.history.push("/pdf/" + this.state.Deployment)}
                >
                    Build PDF
                 </button>
                <div className="seperator"></div>
                <div className="row-heading">
                    <div className="cell">Deployment</div>
                    <div className="cell">List</div>
                    <div className="cell">Total Records</div>
                </div>
                <div className="row-static">
                    <div className="cell">{this.state.Deployment}</div>
                    <div className="cell">{this.state.List}</div>
                    <div className="cell">{this.state.TotalRecords}</div>
                </div>
                <div className="seperator"></div>
                <div className="row-heading">
                    <div className="cell">Record Number</div>
                    <div className="cell">Status</div>
                    <div className="cell">Comment</div>
                </div>
                {this.createTotalRecordsUi(this.state.TotalRecords, this.props.Records)}
            </div>
        );
    }
}

export default Deployment;