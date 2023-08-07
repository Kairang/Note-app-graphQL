import mongoose from "mongoose";

const authoeSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true, });

const AuthorModel = mongoose.model('Author', authoeSchema);
export default AuthorModel;
