const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

mongoose.Promise = global.Promise;

let userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});

userSchema.pre("save", function(next) {
    bcrypt
        .hash(this.password, 10)
        .then((hash) => {
            this.password = hash
            next();
        });
});

userSchema.statics = {
    findPasswordHash(name) {
        userid = name;

        return new Promise((resolve, reject) => {
            this.findOne({ name: userid }, (err, user) => {
                if(!err) {
                    if(user) {
                        resolve(user.password);
                    } else {
                        reject("User not found.");
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}

var User = mongoose.model("User", userSchema);

module.exports = User;
