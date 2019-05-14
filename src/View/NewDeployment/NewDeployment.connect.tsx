import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import NewDeployment, { INewDeploymentProps } from "./NewDeployment";
import { RootState } from "../../Controller/Root";
import { createDeployment } from "../../Controller/Deployment/Actions/CreateDeployment";

const mapStateToProps: (state: RootState) => INewDeploymentProps = (state: RootState) => ({
  isLoading: state.Deployment.Loading
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  props: INewDeploymentProps
) => ({
  createDeployment: async (name: string, deployment: number, callback: () => void) =>
    createDeployment(name, deployment)(dispatch).then(callback)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeployment);
