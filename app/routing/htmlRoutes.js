// path is a Node module used by express as well in order to tell the computer to use the given file paths and serve them when a client is request is made to the corresponding URL I think?
const path = require("path");

// exporting the express routes so that they can be required by other files
module.exports = function (app) {

    // Basic route that sends the user first to the AJAX Page
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    // this is the route to the masterList of friends 
    app.get("/api/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../data/friends.js"));
    });

    // If no matching route is found default to home
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

};

