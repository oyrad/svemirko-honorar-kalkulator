import mongoose, { Model, Schema } from 'mongoose';

interface IUser {
  user: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  user: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
