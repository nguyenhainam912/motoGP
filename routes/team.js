const router = require('express').Router();
const teamController = require('../controllers/teamController');
// const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/add",teamController.add);
router.get("/getById",teamController.getById);
router.get("/getAll",teamController.getAll);
router.patch("/update", teamController.update);
router.delete("/delete", teamController.delete);



module.exports = router;
