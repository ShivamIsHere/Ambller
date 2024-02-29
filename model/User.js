const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default:'user' },
  addresses: { type: [Schema.Types.Mixed] }, 
  // for addresses, we can make a separate Schema like orders. but in this case we are fine
  name: { type: String },
  salt: Buffer,
  resetPasswordToken: { type: String, default:'' },
  phoneNumber: { type: String, unique: true },
  otp:{
    type:String, required:true
  },// New field for phone number
createdAt:{
  type:Date,
  default:Date.now,
  expires:300 //otp expires after 5 minutes(300 seconds)
}
});

// Virtual field for ID
const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

// Transform JSON output
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('User', userSchema);
