const router = require('express').Router();
const countryController = require('../controllers/countryController');
// const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/add",countryController.add);
router.get("/getById",countryController.getById);
router.get("/getAll",countryController.getAll);
router.patch("/update", countryController.update);
router.delete("/delete", countryController.delete);

module.exports = router;
