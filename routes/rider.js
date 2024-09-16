const router = require('express').Router();
const riderController = require('../controllers/riderController');
// const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/add",riderController.add);
router.get("/getById",riderController.getById);
router.get("/getByCategory",riderController.getByCategory);
router.get("/getAll",riderController.getAll);
router.patch("/update", riderController.update);
router.delete("/delete", riderController.delete);



module.exports = router;
