const workmodel = require("../models/workout-model");
const mongoose = require("mongoose")

// create a new workout
const CreateWorkoutController = async (req, res) => {
  try {
    const work = req.body;
    await workmodel.create(work);
    res.status(201).json({ messsage: "workout added" });
  } catch (error) {
    console.log("error while create workout", error);

    res.status(401).json({ error_message: error });
  }
};

// get workout
const getWorkoutController = async (req, res) => {
  try {

    const userid = req.params.userID;
    const workout_data = await workmodel.find({userID:userid});
    // if there is no workout in database
    if (workout_data.length === 0) {
      return res.status(400).json({ message: "There is not task available" });
    }
    res.status(200).json({ workoutData: workout_data });
  } catch (error) {
    console.log("error while get workout", error);
    res.status(400).json({ error_message: error });
  }
};

//delete workout
const deleteWorkoutController = async (req, res) => {
  try {

    const {id} = req.params;

    const deleted = await workmodel.findOneAndDelete({ _id: id });
    
    if (!deleted) {
        return res.status(404).json({ message: "Workout not found" });
      }

      res.status(200).json({ message: "Workout deleted successfully" });

  } catch (error) {
    console.log("error while deleting workout", error);
    res.status(400).json({ error_message: error });
  }
};

module.exports = {CreateWorkoutController, getWorkoutController, deleteWorkoutController}
