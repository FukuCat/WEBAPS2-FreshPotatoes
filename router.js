let express = require("express");
let auth = require("./auth.js");
let sessionCtrl = require("./server/controllers/session.server.controller.js");
let reviewCtrl = require("./server/controllers/review.server.controller.js");
let accountCtrl = require("./server/controllers/account.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);
router.post("/account/register", accountCtrl.register);

router.get("/review", auth.check, reviewCtrl.getAll);
router.get("/review/:reviewId", auth.check, reviewCtrl.getById);
router.post("/review", auth.check, reviewCtrl.create);
router.put("/review/:reviewId", auth.check, reviewCtrl.update);
router.delete("/review/:reviewId", auth.check, reviewCtrl.delete);

module.exports = router;
