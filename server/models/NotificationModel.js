import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
    }
}, { timestamps: true });

const NotificationModel = mongoose.model('Notification', NotificationSchema);
export default NotificationModel;
