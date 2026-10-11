
const mongoose = require("mongoose")

const movieSchems = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    genre: {
        type: String,
        enum: ["action", "comedy", "drama", "thriller", "other"],
        default: "other"
    },
    watched: {
        type:  Boolean,
        default: false
    },
    releaseDate: {
        type: Date,
        required: false
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    }},
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Movie Details:", movieSchems)
