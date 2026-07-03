const mongeese = require("mongoose");
const bcrypt = require("bcryptjs");
const adminSchema = new mongeese.Schema({
  email: { type: String, require: [true, "Email require"], trim: true },
  name: { type: String, require: true },
  password: { type: String, require: [true, "Passowrd is required"] },
});

//hash before saving to db
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (e) {
    throw e; // Mongoose will catch this throw and pass it to the controller
  }
});
// helper method use to compare password during log in
/**
 * compare plaint text password with hashing password
 * @param {string} givenPassword
 * @returns {Promise<boolean>}
 */
adminSchema.methods.comparePassword = async function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

const admin = mongeese.model("Admin", adminSchema);
module.exports = admin;
