import mongoose from "./index.js";

const topsSchema = new mongoose.Schema({
    dressName: {
        type: String,
        required: [true, "Dress Name is required"]
    },
    dressType: {
        type: String,
        required: [true, "Dress Type is required"]
    },
    color: {
        type: String,
        required: [true, "Color is required"]
    },
    season: {
        type: String,
        required: [true, "Season is required"]
    },
    description: {
        type: String,
        default: ""
    },
    lastWornDate: {
        type: Date,
        default: Date.now
    },
    imageFile: {
        type: String,
    }
}, {
    collection: "tops",
    versionKey: false
});

const topsModel = mongoose.model("Tops", topsSchema);

export default topsModel;