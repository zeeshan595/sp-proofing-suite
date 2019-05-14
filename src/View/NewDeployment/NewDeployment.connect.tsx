import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import NewDeployment, { INewDeploymentProps } from "./NewDeployment";
import { RootState } from "../../Controller/Root";
import { createDeployment } from "../../Controller/Deployment/Actions/CreateDeployment";

const mapStateToProps: (state: RootState) => INewDeploymentProps = (state: RootState) => ({
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  props: INewDeploymentProps
) => ({
  createDeployment: (name: string, deployment: number) => createDeployment(name, deployment)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeployment);
