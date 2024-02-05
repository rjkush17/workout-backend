const mongoose = require("mongoose");
const { z } = require("zod");

// Define Zod validation schema
const zodValidation = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(4, { message: "Name should be at least 4 letters long" })
    .max(20, { message: "Name should not exceed 20 letters" }),
  email: z
    .string({ required_error: "email should required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password should have at least 4 characters" }),
});

// Create a Mongoose schema without Zod validation
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a pre-save hook to validate using Zod before saving to MongoDB
registerSchema.pre("save", async function (next) {
  try {
    await zodValidation.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

// Create a Mongoose model using the schema
const User = mongoose.model("User", registerSchema);

module.exports = User;

