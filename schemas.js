const { z } = require('zod');

const userSchema = z.object({
  email: z.email({ required_error: "Email is required", message: "Invalid email format" }),
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
})

module.exports = {userSchema}