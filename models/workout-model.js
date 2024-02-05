const { z } = require("zod");
const mongoose = require("mongoose")


const zodValidation2 = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(4, { message: "title should be at least 4 letters long" })
    .max(20, { message: "title should be at most 20 letters long" }),
  load: z
    .number({ required_error: "load required" }),
  reps: z
    .number({ required_error: "Reps required" }),
  userID: z
  .string({required_error:"user Id required"})
});

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  userID: {
    type:String,
    required:true
  }
});

workSchema.pre('save', async function(next) {
  try {
    await zodValidation2.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

const workmodel = new mongoose.model("Workout",workSchema)

module.exports = workmodel