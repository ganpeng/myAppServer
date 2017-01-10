import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    phone: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    hashPassword: {
      type: String
    },
    isRegist: {
      type: Boolean,
      default: false
    },
    vcode: {
      type: String,
      default: ''
    }
})


export default mongoose.model('User', UserSchema)
