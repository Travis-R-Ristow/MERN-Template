import mongoose from 'mongoose';

const { Schema } = mongoose;

const USER = new Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/
  },
  psw: {
    type: String,
    required: true
  }
});

export type User = {
  _id: string;
  displayName: string;
  email: string;
  psw: string;
};

export default mongoose.model('user', USER);
