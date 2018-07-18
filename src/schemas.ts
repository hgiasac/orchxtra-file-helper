import * as Joi from "joi";

export const FileInputSchema = Joi.object({
  subjectId: Joi.string().optional(),
  name: Joi.string()
    .optional().allow("").default(""),
  description: Joi.string()
    .optional().allow("").default(""),
  fileName: Joi.string().required(),
  fileData: Joi.string().required(),
  fileExtension: Joi.string().required(),
});
