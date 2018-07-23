export enum StatusCode {
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted"
}

export const fileInfoColumns = [
  "id", "name", "description",
  "fileName", "fileExtension",
  "createdAt", "createdBy",
  "updatedAt", "updatedBy",
  "status"
];

export interface IUpdateOptions {
  updatedBy: string;
  note?: string;
}

export interface IFileFilter {
  subjectId?: string;
  status?: StatusCode | StatusCode[];
}

export interface ICommonFileModel {
  subjectId: string;
  name: string;
  description?: string;
  fileName: string;
  fileExtension: string;

}

export interface IFileModelInput extends ICommonFileModel {
  fileData: string;
}

export interface IFileModel extends ICommonFileModel {

  id: string;
  fileData: ArrayBuffer;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  status: string;
}
