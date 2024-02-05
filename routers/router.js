const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");
const loginController = require("../controllers/login")
const authMiddleware = require("../middleware/authVerification")
const {CreateWorkoutController, getWorkoutController, deleteWorkoutController} = require("../controllers/workout")

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/work/:userID", authMiddleware, getWorkoutController);

router.post("/work", authMiddleware, CreateWorkoutController)

router.delete("/work/:id", authMiddleware, deleteWorkoutController)

module.exports = router;