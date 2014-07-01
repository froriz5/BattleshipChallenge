'use strict';

var peoplecoChallengeNodejs = require('../lib/peopleco-challenge-nodejs.js'),
    _und = require("underscore");

var baseUrl = "student.people.co",
    yourUserHash = "07fcb7ae4522",
    yourBaseUrl = "/api/challenge/battleship/" + yourUserHash + "/boards/",
    topAxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    leftAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

peoplecoChallengeNodejs.retrieveBoards(baseUrl, yourBaseUrl, function(boards) {

    var boardsObjects = JSON.parse(boards);

    peoplecoChallengeNodejs.retrieveBoard(boardsObjects[4], baseUrl, yourBaseUrl, function(boardResult) {

        console.log("Board is: ", boardResult);


        for (var topAxi in topAxis) {

            for (var leftAxi in leftAxis) {

                var coordinate = topAxis[topAxi] + leftAxis[leftAxi];
                console.log("Coord: " + coordinate);
                peoplecoChallengeNodejs.makeMove(boardResult, coordinate, baseUrl, yourBaseUrl, function(moveResult) {
                    //handle result of move!
                    moveResult = JSON.parse("" + moveResult);
                    if (!moveResult.is_hit) {
                        peoplecoChallengeNodejs.makeMove(boardResult, coordinate, baseUrl, yourBaseUrl, function(result) {
                            console.log("" + result);
                        });
                    }
                });


            }


        }

    });

});