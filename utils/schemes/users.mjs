import joi from "joi";

const userIdSchema = joi.number().max(11);
const userNameSchema = joi.string().max(150);
const userLastnameSchema = joi.string().max(150);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().min(4);
const userMoviesSchema = joi.array().min(1).max(2);

export const createUserSchema = joi.object({
    name: userNameSchema.required(),
    lastname: userLastnameSchema,
    email:  userEmailSchema.required(),
    password: userPasswordSchema.required(),
    movies: userMoviesSchema.required()
})

// export const updateUserSchema = joi.object({
//     name: userNameSchema,
//     lastname: userLastnameSchema,
//     email:  userEmailSchema,
//     password: userPasswordSchema
// })

// export const loginUserSchema = joi.object({
//     email:  userEmailSchema.required(),
//     password: userPasswordSchema.required()
// })