import { connect } from "react-redux";
import Deployment, { IDeploymentProps } from "./Deployment";
import { RootState } from "../../Controller/Root";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { fetchRecordList } from "../../Controller/Record/Actions/FetchRecordList";
import { removeDeployment } from "../../Controller/Deployment/Actions/RemoveDeployment";

const mapStateToProps = (state: RootState) => ({
    Records: state.Record.Records,
    Loading: state.Record.Loading || state.Deployment.Loading,
    Deployments: state.Deployment.Deployments
}) as IDeploymentProps;

const mapDispatchToProps = (
    dispatch: Dispatch<AnyAction>
) => ({
    fetchRecordList: (deployment: number) => {
        fetchRecordList(deployment)(dispatch)
    },
    removeDeployment: async (deployment: number, callback: () => void) => {
        await removeDeployment(deployment)(dispatch)
        callback();
    }
}) as IDeploymentProps;

export default connect(mapStateToProps, mapDispatchToProps)(Deployment);