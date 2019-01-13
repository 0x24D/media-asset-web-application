import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MetadataSchema = new Schema({
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
    locations: {
        type: Array
    },
    version: {
        type: Number
    }
});
