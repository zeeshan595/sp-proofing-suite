import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import NewDeployment, { INewDeploymentProps } from "./NewDeployment";
import { RootState } from "../../Controller/Root";
import { createDeployment } from "../../Controller/Deployment/Actions/CreateDeployment";

const mapStateToProps= (state: RootState) => ({
  isLoading: state.Deployment.Loading
}) as INewDeploymentProps;

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
) => ({
  createDeployment: async (name: string, deployment: number, callback: () => void) =>
    createDeployment(name, deployment)(dispatch).then(callback)
}) as INewDeploymentProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeployment);
