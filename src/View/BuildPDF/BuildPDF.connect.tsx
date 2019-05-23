import { RootState } from "../../Controller/Root";
import BuildPDF, { IBuildPDFProps } from "./BuildPDF";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { buildPdf } from "../../Controller/BuildPDF/Actions/buildPDF";


const mapStateToProps = (state: RootState) => ({
  Progress: state.BuildPDF.Progress,
  Deployments: state.Deployment.Deployments
}) as IBuildPDFProps

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  buildPdf: async (deployment: number, list: number, totalRecords: number) => {
    await buildPdf(deployment, list, totalRecords)(dispatch);
  }
}) as IBuildPDFProps

export default connect(mapStateToProps, mapDispatchToProps)(BuildPDF);