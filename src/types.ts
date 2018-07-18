export interface IFileModelInput {
  subjectId: string;
  name: string;
  description?: string;
  fileName: string;
  fileData: string;
  fileExtension: string;
}

export interface IFileModel extends IFileModelInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}