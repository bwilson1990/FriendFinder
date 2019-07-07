// Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friendsData = require("./../data/friends");

module.exports = function(app) {
    // API GET Requests
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    app.post("/api/friends", function (req, res) {
        var addFriend = req.body
        var friendScores = addFriend.scores;

        var friendMatch = {
            name: "",
            photo: "",
            score: 1000
        };

        friendsData.forEach(function (currentValue) {
            var scoresDifference = [];
            for (var i = 0; i < currentValue.scores.length; i++) {
                var totalDifference = 0;
                eachDifference = 0;

                eachDifference = Math.abs(parseInt(friendScores[i]) - parseInt(currentValue.scores[i]));
                scoresDifference.push(eachDifference);

                totalDifference = scoresDifference.reduce((a, b) => a + b, 0);

                if (totalDifference <= friendMatch.score) {
                    friendMatch.name = currentValue.name;
                    friendMatch.photo = currentValue.photo;
                    friendMatch.score = totalDifference;
                };
            };
        });

        friendsData.push(addFriend);
        res.json(friendMatch);
    });
};