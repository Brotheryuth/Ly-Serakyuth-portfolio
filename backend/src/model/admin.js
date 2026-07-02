const mongeese = require('mongoose');
const bcrypt = require('bcryptjs');
const adminSchema = new mongeese.Schema({
  email: { type: String, require: [true, 'Email require'], trim:true },
  name: { type: String, require: true },
  password: { type: String, require: [true, 'Passowrd is required'] }
})
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});
// helper method use to compare password during log in 
adminSchema.methods.comparePassword = async function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
}

const admin = mongeese.model('Admin',adminSchema);
module.exports = admin;