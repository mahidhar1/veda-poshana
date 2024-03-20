//var mongoose = require("mongoose");
// Define mongoose schemas
import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  email: { type: String, required: true },
  password: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
