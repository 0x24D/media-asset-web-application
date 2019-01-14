import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MetadataSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a file name'
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
    },
    version: {
        type: Number,
        default: 1
    },
    locked: {
        type: Boolean,
        default: false
    }
});
