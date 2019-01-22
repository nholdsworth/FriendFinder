// require the npm packages that will make writing this code possible or "easier"...
const express = require("express");
// const path = require("path");

// initialize express
const app = express();
const PORT = process.env.PORT || 3333;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Starts the server listening
app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
});

