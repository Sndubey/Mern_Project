const { z } = require('zod');

const signupSchema = z.object({   /* this schema is only used for validation */
    username: z
    .string({required_error: "name is required"})
    .trim()
    .min(3, {message: "name must be at least of 3 chars"})
    .max(255, {message: "name must not be more than 255 chars"}),
    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "email is not valid"})
    .min(3, {message: "email must be at least of 3 chars"})
    .max(255, {message:"email must not be more than 255 characters"}),
    phone: z
    .string({required_error: "phone is required"})
    .trim()
    .min(10, {message: "phone must be at least of 10 chars"})
    .max(20,{message: "phone must not be more than 20 chars"}),
    password: z
    .string({required_error: "password is required"})
    .min(7, {message: "password must be at least of 7 chars"})
    .max(1024, {message: "password must not be more than 1024 chars"})
});

const loginSchema = z.object({
    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "email is not valid"})
    .min(3, {message: "email must be at least of 3 chars"})
    .max(255, {message:"email must not be more than 255 characters"}),
    password: z
    .string({required_error: "password is required"})
    .min(7, {message: "password must be at least of 7 chars"})
    .max(1024, {message: "password must not be more than 1024 chars"})
});

const contactSchema = z.object ({
    username: z
    .string({required_error: "name is required"})
    .trim()
    .min(2, {message: "name must be at least of 3 chars"})
    .max(255, {message: "name must not be more than 255 chars"}),
    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "email is not valid"})
    .min(2, {message: "email must be at least of 3 chars"})
    .max(255, {message:"email must not be more than 255 characters"}),
    message: z
    .string({required_error: "message is required"})
    .trim()
    .min(2, {message: "message must be at least of 3 chars"})
    .max(1024, {message: "message must not be more than 1024 chars"})
});

// const contactSchema = z.object({
//     username: z.string()
//         .min(3, { message: "name must be at least 3 characters" })
//         .max(255, { message: "name must not be more than 255 characters" }),
//     email: z.string()
//         .email({ message: "email is not valid" })
//         .min(3, { message: "email must be at least 3 characters" })
//         .max(255, { message: "email must not be more than 255 characters" }),
//     message: z.string()
//         .min(3, { message: "message must be at least 3 characters" })
//         .max(1024, { message: "message must not be more than 1024 characters" }),
// });


module.exports = {signupSchema, loginSchema, contactSchema};