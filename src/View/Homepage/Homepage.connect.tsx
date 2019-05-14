import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import Homepage, { IHomepageProps } from "./Homepage";
import { RootState } from "../../Controller/Root";
import { fetchDeploymentList } from "../../Controller/Deployment/Actions/FetchDeploymentList";

const mapStateToProps: (state: RootState) => IHomepageProps = (state: RootState) => ({
  Deployments: state.Deployment.Deployments
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  props: IHomepageProps
) => ({
  fetchDeployments: () => fetchDeploymentList()(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
