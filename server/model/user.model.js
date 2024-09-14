import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Cleo",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
