const Meeting = require("../models/meeting.server.model.js");

exports.getAll = function(req, res) {

    Meeting.findAll()
        .then((meetings) => {
            return res.status(200).json(meetings);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send();
        });
}

exports.getById = function(req, res) {

    Meeting.findById(req.params.meetingId, function(err, meeting) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send(meeting);
        }
    });
}

exports.create = function(req, res) {
    let meeting = new Meeting(req.body);

    meeting.save((err, meeting) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(204).send();
        }
    });
}

exports.delete = function(req, res) {
    console.log(req.params.meetingId);

    Meeting.findByIdAndRemove(req.params.meetingId, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    });
}

exports.update = function(req, res) {
    console.log(req.params.meetingId);
    let meeting = {
        yesterday: req.body.yesterday,
        today: req.body.today,
        impediment: req.body.impediment
    }

    Meeting.findByIdAndUpdate(req.params.meetingId, meeting, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    })
}
