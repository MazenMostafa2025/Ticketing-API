import mongoose from 'mongoose'
import {Password}  from '../services/password';
interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
}
)

userSchema.pre<mongoose.Document>('save', async function() {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    // console.log('hashing here');
    // console.log(hashed);
    this.set('password', hashed);
  }
})


userSchema.statics.build = (attrs: UserAttrs) => {
  // console.log('building');
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };
