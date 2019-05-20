import { RootState } from "../../Controller/Root";
import BuildPDF, { IBuildPDFProps } from "./BuildPDF";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";


const mapStateToProps = (state: RootState) => ({
  Progress: state.BuildPDF.Progress
}) as IBuildPDFProps

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({

}) as IBuildPDFProps

export default connect(mapStateToProps, mapDispatchToProps)(BuildPDF);