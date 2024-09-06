const router = require('express').Router();
const calendarController = require('../controllers/calendarController');
// const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/add",calendarController.add);
router.get("/getById",calendarController.getById);
router.get("/getAll",calendarController.getAll);
router.patch("/update", calendarController.update);
router.delete("/delete", calendarController.delete);

module.exports = router;
