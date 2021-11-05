const joi = require("joi");


const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(80);
const userExperienceSchema = joi.string().max(300);
const userGithubSchema = joi.string().uri();
const userDescriptionSchema = joi.string().max(300);

const createUserSchema = {
  name: userNameSchema.required(),
  experience: userExperienceSchema.required(),
  link_github: userGithubSchema.required(),
  description: userDescriptionSchema.required(),
}
const updateUserSchema = {

  name: userNameSchema,
  experience: userExperienceSchema,
  link_github: userGithubSchema,
  description: userDescriptionSchema,
}

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
}
