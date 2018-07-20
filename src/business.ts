import * as Knex from "knex";
import {
  IFileFilter, IFileModel, IFileModelInput, IUpdateOptions, StatusCode
} from "./types";
import { decodeBase64, parseArrayQuery } from "./util";

export function createFile<
  I extends IFileModelInput = IFileModelInput,
  M extends IFileModel = IFileModel>(
  queryBuilder: Knex.QueryBuilder,
  input: I,
  updateOptions: IUpdateOptions
): Promise<M> {

  const avatarFile = decodeBase64(input.fileData);

  const form = {
    status: StatusCode.Active,
    ...<object> input,
    fileData: avatarFile.data,
    fileExtension: avatarFile.extension || input.fileExtension,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: updateOptions.updatedBy,
    updatedBy: updateOptions.updatedBy
  };

  return <any> queryBuilder
    .insert(form).returning("*")
    .then(([m]) => m);

}

export function updateFile<
  I extends IFileModelInput = IFileModelInput,
  M extends IFileModel = IFileModel
>(
  queryBuilder: Knex.QueryBuilder,
  model: M,
  input: I,
  updateOptions: IUpdateOptions
): Promise<M> {

  const avatarFile = decodeBase64(input.fileData);

  return <any> queryBuilder
    .where("id", model.id)
    .update({
      ...<object> input,
      fileData: avatarFile.data,
      fileExtension: avatarFile.extension || input.fileExtension,
      updatedAt: new Date(),
      updatedBy: updateOptions.updatedBy
    }, "*")
    .then(([m]) => m);
}

export function deleteFile<M extends IFileModel = IFileModel>(
  queryBuilder: Knex.QueryBuilder,
  model: M,
  updateOptions: IUpdateOptions): Promise<M> {

  return updateFile(queryBuilder, model, <any> {
    status: StatusCode.Deleted,
  }, updateOptions);
}

export function fileFilterQuery(
  query: Knex.QueryBuilder, params?: IFileFilter): Knex.QueryBuilder {

  if (!params || Object.keys(params).length === 0) {
    return query;
  }

  const subjectId = parseArrayQuery(params.subjectId);

  if (subjectId && subjectId.length) {
    query = query.whereIn("subjectId", subjectId);
  }

  const status = parseArrayQuery(params.status);

  if (status && status.length) {
    query = query.whereIn("status", status);
  }

  return query;
}

export async function findFileById(
  queryBuilder: Knex.QueryBuilder,
  id: string,
  subjectId: string,
  required = false
): Promise<IFileModel> {

  const models = await queryBuilder
    .select("*")
    .where("id", id)
    .limit(1);

  if (!models || !models.length) {
    if (!required) {
      return null;
    }

    return Promise.reject({
      status: 400,
      code: "not_found",
      message: `Can not find File by ID: ${id}`
    });
  }

  const model = models[0];

  if (model.subjectId !== subjectId) {
    return Promise.reject({
      status: 403,
      code: "permission_denied",
      message: `Permission denied`
    });
  }

  return model;
}
