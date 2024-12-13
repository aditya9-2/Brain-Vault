import mongoose from "mongoose"


const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    type: { type: String, required: true, enum: contentTypes },
    link: { type: String, required: true, },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model("COntent", contentSchema);
