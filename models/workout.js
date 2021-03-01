const mongoose = require("mongoose");

// Call in mongoose's schema to define the data within our database
const Schema = mongoose.Schema;

// Conceptual representation of all data saved in our Workout Database
// Utilizing seeders/seed.js, properties are defined & data types are inferred
const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Exercise Type"
        },
        name: {
          type: String,
          trim: true,
          required: "Name of Exercise"
        },
        duration: {
          type: Number,
          required: "Duration of Activity"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      // virtual properties set to true
      virtuals: true
    }
  }
);

// Dynamically created properties
workoutSchema.virtual("totalDuration").get(function() {
  // Method to create a "totalDuration" metric that accesses DB and reduces existing data down to their duration only & adds them up into a total
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
    }, 0);
  });

const Workout = mongoose.model("Workout", workoutSchema);

// export model
module.exports = Workout;
