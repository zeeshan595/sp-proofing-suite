import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import Homepage, { IHomepageProps } from "./Homepage";
import { RootState } from "../../Controller/Root";
import { fetchDeploymentList } from "../../Controller/Deployment/Actions/FetchDeploymentList";

const mapStateToProps = (state: RootState) => ({
  Deployments: state.Deployment.Deployments,
  Loading: state.Deployment.Loading
}) as IHomepageProps;

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
) => ({
  fetchDeployments: () => fetchDeploymentList()(dispatch)
}) as IHomepageProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
