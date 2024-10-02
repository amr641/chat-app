import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    max: 30,
    min: 3,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },

});

export const User = model("User", userSchema);
