// Call Path to correct path for HTML routes
const path = require("path");

module.exports = function(app) {
    // Route for "Continue Workout" / "New Workout" HREF in Index.html
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
    // Route for Displaying Graphs of Database Workouts etc
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
}