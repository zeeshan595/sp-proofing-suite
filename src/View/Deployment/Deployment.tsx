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
    removeDeployment: (deployment: number) => void;
}

export interface IDeploymentState {
    Deployment: number;
    TotalRecords: number;
}

class Deployment extends React.Component<IDeploymentProps, IDeploymentState> {

    state: IDeploymentState = {
        Deployment: -1,
        TotalRecords: 0
    };

    componentWillMount() {
        const deployment = this.props.match.params["deployment"];
        this.setState({
            ...this.state,
            Deployment: deployment,
            TotalRecords: this.props.Deployments.find(val => {
                return val.Identifier == deployment;
            }).TotalRecords
        });
        this.props.fetchRecordList(deployment);
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
                >
                    Build PDF
                 </button>
                <div className="seperator"></div>
                <div className="row-heading">
                    <div className="cell">Record Number</div>
                    <div className="cell">Status</div>
                    <div className="cell">Comment</div>
                </div>
                {
                    this.props.Records.map((val, index) => (
                        <div key={index} className="row">
                            <div className="cell">{val.Identifier}</div>
                            <div className="cell">{IRecordStats[val.Status]}</div>
                            <div className="cell">{val.Comment.substr(0, 15)}</div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Deployment;