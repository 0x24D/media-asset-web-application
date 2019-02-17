import mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // TODO: implement
  // type: {
  //   type: String,
  //   required: 'Enter a password',
  // },
  data: [
    {
      version: {
        type: Number,
        required: true,
        default: 1,
      },
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      created_date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      tags: {
        type: Array,
      },
    },
  ],
  locked: {
    type: Boolean,
    required: true,
    default: false,
  },
});
