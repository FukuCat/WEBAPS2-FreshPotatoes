const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let reviewSchema = new Schema({
    user: { type: String, required: true },
    title: String,
    description: String,
    comment: String,
    createdOn: { type: Date, default: Date.now }
});

reviewSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, reviews) => {
                if(!err) {
                    resolve(reviews);
                } else {
                    reject(err);
                }
            });
        });
    }
};

var Review = mongoose.model("Movie", reviewSchema);

module.exports = Review;
