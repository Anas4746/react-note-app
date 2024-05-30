
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

const User = mongoose.model('User', userSchema);

export default User;