import { IFileModel } from "./types";
import { encodeBase64 } from "./util";

export interface IFileResponse {
  id: string;
  subjectId: string;
  name: string;
  description?: string;

  fileName: string;
  fileData: string;
  fileExtension: string;

  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export function serializeFile(input: IFileModel): IFileResponse {

  return {
    id: input.id,
    subjectId: input.subjectId,
    name: input.name,
    description: input.description,
    fileName: input.fileName,

    fileData: input.fileData ? encodeBase64(input.fileData, input.fileExtension) : null,
    fileExtension: input.fileExtension,

    createdBy: input.createdBy,
    updatedBy: input.updatedBy,
    createdAt: input.createdAt.toISOString(),
    updatedAt: input.updatedAt.toISOString(),
    status: input.status,
  };
}
