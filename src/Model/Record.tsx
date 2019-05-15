import IRecordStats from "./RecordStatus";

export default interface IRecord {
    Identifier: number;
    Status: IRecordStats;
    Comment: string;
}