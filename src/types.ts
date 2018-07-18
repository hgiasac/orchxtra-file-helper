
interface ICommonFileModel {
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
