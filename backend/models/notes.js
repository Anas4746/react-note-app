
import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date, default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
