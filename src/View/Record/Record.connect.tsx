import { connect } from "react-redux";
import Record from "./Record";
import { RootState } from "../../Controller/Root";
import { IRecordProps } from "./Record";
import { Dispatch, AnyAction } from "redux";
import { getPreviewCode } from "../../Controller/Record/Actions/GetPreviewCode";
import RecordStatus from "../../Model/RecordStatus";
import { updateRecordComment } from "../../Controller/Record/Actions/updateRecordComment";
import { updateRecordStatus } from "../../Controller/Record/Actions/updateRecordStatus";

const mapStateToProps = (state: RootState) => ({
  Records: state.Record.Records,
  Deployments: state.Deployment.Deployments,
  PreviewKey: state.Record.PreviewKey,
  Loading: state.Record.Loading
}) as IRecordProps;

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
) => ({
  generatePreviewKey: async (deployment: number, record: number, list: number) => {
    await getPreviewCode(deployment, record, list)(dispatch);
  },
  updateRecordComment: async (deployment: number, record: number, comment: string) => {
    await updateRecordComment(deployment, record, comment)(dispatch);
  },
  updateRecordStatus: async (deployment: number, record: number, status: RecordStatus) => {
    await updateRecordStatus(deployment, record, status)(dispatch);
  }
}) as IRecordProps;

export default connect(mapStateToProps, mapDispatchToProps)(Record);