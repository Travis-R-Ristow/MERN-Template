import mongoose from 'mongoose';
const { Schema } = mongoose;

const JOKE = new Schema({
  author: {
    required: true,
    type: Schema.Types.ObjectId
  },
  displayName: {
    type: String
  },
  joke: {
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  punchline: {
    trim: true,
    type: String
  },
  tags: {
    lowercase: true,
    trim: true,
    type: [String]
  },
  upUsers: {
    required: true,
    type: [Schema.Types.ObjectId]
  },
  downUsers: {
    required: true,
    type: [Schema.Types.ObjectId]
  },
  timestamp: {
    default: Date.now,
    type: Date
  },
  isKidFriendly: {
    default: false,
    type: Boolean
  },
  reports: {
    default: [],
    type: [Schema.Types.ObjectId]
  }
});

export type Joke = {
  _id: string;
  author: string;
  displayName?: string;
  downUsers: string[];
  isKidFriendly: boolean;
  joke: string;
  punchline: string;
  reports: string[];
  tags: string[];
  timestamp: Date;
  upUsers: string[];
};

export default mongoose.model('joke', JOKE);
