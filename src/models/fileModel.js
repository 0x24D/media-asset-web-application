import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FileSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a file name'
    },
    data: [{
        version: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            required: 'Enter a title'
        },
        author: {
            type: String,
            required: 'Enter an author'
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        tags: {
            type: Array
        }
    }],
    locked: {
        type: Boolean,
        default: false
    }
});
