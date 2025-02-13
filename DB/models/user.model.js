import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/diercfqyc/image/upload/v1722820582/E-commerce/users/defaults/profile/default-profile-account_coekpm.jpg",
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
