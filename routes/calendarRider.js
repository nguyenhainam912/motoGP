const router = require('express').Router();
const calendarRiderController = require('../controllers/calendarRiderController');
// const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/add",calendarRiderController.add);
router.get("/getByCalendarCategorySession",calendarRiderController.getByCalendarCategorySession);
router.patch("/update", calendarRiderController.update);
router.delete("/delete", calendarRiderController.delete);



module.exports = router;
