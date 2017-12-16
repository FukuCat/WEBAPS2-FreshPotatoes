const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let meetingSchema = new Schema({
    name: { type: String, required: true },
    project: { type: String, required: true },
    yesterday: String,
    today: String,
    impediment: String,
    createdOn: { type: Date, default: Date.now }
});

meetingSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, meetings) => {
                if(!err) {
                    resolve(meetings);
                } else {
                    reject(err);
                }
            });
        });
    }
};

var Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
