const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      validate: {
        validator: function (v) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const phoneRegex = /^(\+254|0)\d{9}$/; // Updated for Kenyan numbers
          return emailRegex.test(v) || phoneRegex.test(v);
        },
        message: "Username must be either a valid email or phone number.",
      },
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple `null` values
      lowercase: true,
      validate: {
        validator: function (v) {
          return !v || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Invalid email format.",
      },
    },
    profileImage: {
      type: String,
      default: null, // Use null instead of empty string
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

// ✅ Auto-fill email if username is an email
UserSchema.pre("save", function (next) {
  if (!this.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.username)) {
    this.email = this.username;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
