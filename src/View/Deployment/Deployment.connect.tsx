import { connect } from "react-redux";
import Deployment, { IDeploymentProps } from "./Deployment";
import { RootState } from "../../Controller/Root";
import { Dispatch } from "react";
import { AnyAction } from "redux";

const mapStateToProps: (state: RootState) => IDeploymentProps = (state: RootState) => ({

});

const mapDispatchToProps = (
    dispatch: Dispatch<AnyAction>,
    props: IDeploymentProps
) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Deployment);