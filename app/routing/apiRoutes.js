// using module.exports in the friends.js file which means it can be required here so that each new survey can have logic done to it and then be stored on the route /api/friends 
let friendsData = require("../data/friends");
// checking to make sure that the friendsData is what I expect it to be
console.log(friendsData);

// exporting this logic so that the server can require it so that the server knows what to do with the client GET request I think?
module.exports = function (app) {

    // Displays all possible friends
    app.get("/api/friends", function (req, res) {
        return res.json(friendsData);
    });

    // Create newFriend Object (survey number array) - takes in JSON input
    app.post("/api/friends", function (req, res) {
        // req.body is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newFriend = req.body;

        // checking to see if the newFriend object matches the most recent survey post
        console.log(newFriend);

        // This is the logic to compare the survey answers and match it to the existsing survey with the least amount of difference.  Alicia wrote this part and it was really helpful becuase I did not even know where I should put this logic or how to write it.

        //this is an array to hold the total differences between the new survey answers and all the existing survey answers
        const arrTotalDiff = [];
        // looping through the list of user names, photos and survey answers held on the api/friends/ URL
        for (let i = 0; i < friendsData.length; i++) {
            // initializing a variable for the total difference of each set of survey answers with a value of zero
            let totalDiff = 0;
            // looping through the survey answers of the current user
            for (let j = 0; j < newFriend.surveyAnswers.length; j++) {

                // setting a variable to hold the survey answers of the current user
                const newFriendScore = parseInt(newFriend.surveyAnswers[j]);
                // setting a variable to hold the survey answers of the current user
                const friendListScore = parseInt(friendsData[i].surveyAnswers[j])


                totalDiff = totalDiff + Math.abs(newFriendScore - friendListScore);
                console.log('totalDiff', totalDiff);

            }
            // pushing the results of all the survey answer comparisons of the newFriend to all the existing friends 
            arrTotalDiff.push(totalDiff);

            let currentFriend = 0;
            let currentFriendName = " ";
            let currentFriendPhoto = " ";
            for (let k = 0; k < arrTotalDiff.length; k++) {
                // let currentFriend = 0;
                if (currentFriend < arrTotalDiff[k]) {
                    currentFriend = arrTotalDiff[k];
                    currentFriendName = friendsData[i].name;
                    currentFriendPhoto = friendsData[i].photo;

                };
            };

            console.log(currentFriendName);
            console.log(currentFriend);
            // res.json(currentFriendName);

            res.json({
                name: currentFriendName,
                photo: currentFriendPhoto
            });

            // take this array and find the lowest number and its index and take the index and search the friendsData
            console.log('arrTotalDiff', arrTotalDiff)

            friendsData.push(newFriend);
        };
    });
};