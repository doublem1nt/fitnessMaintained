const db = require("../models");

module.exports = function(app) {

    // Used by api.js to get last workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    }); 

    // POST METHOD for new workout in workout db
    app.post("/api/workouts", async (req, res)=> {
        try{
            const response = await db.Workout.create({type: "workout"})
            res.json(response);
        }
        catch(err){
            console.log("error occurred creating a workout: ", err)
        }
    });

    app.put("/api/workouts/:id", ({body, params}, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedWorkouts = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {

                savedWorkouts = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                
                let totalExercises = [...savedWorkouts, body]
                // console.log(totalExercises)
                updateWorkout(totalExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(activity){
            db.Workout.findByIdAndUpdate(workoutId, {exercises: activity}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
            
    })
};