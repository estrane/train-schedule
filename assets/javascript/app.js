

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDbhy-qp3UJZ37NMbg353Epu-YxvKtSD58",
    authDomain: "train-scheduler-8451f.firebaseapp.com",
    databaseURL: "https://train-scheduler-8451f.firebaseio.com",
    projectId: "train-scheduler-8451f",
    storageBucket: "train-scheduler-8451f.appspot.com",
    messagingSenderId: "49115059517"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial variables
var name = "";
var dest = "";
var start = "";
var freq = "";

// Capture Button Click
$("#addtrain").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#train-name").val().trim();
    dest = $("#destination").val().trim();
    start = $("#starttime").val().trim();
    freq = $("#frequency").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: dest,
        startTime: start,
        frequency: freq
    });
});

//clear input field on click
$("input").focus(function () {
    if ($(this).val() !== '') {
        $(this).val('');
    }
});

// Add them to the HTML in our table

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().startTime);
    console.log(childSnapshot.val().frequency);

    // New Calculated Variables
    var minutesAway = minTillTrain(childSnapshot.val().frequency, childSnapshot.val().startTime);
    var nextArrival = nextTrain(minutesAway);

    // Change the HTML to reflect
    var newTr = $("<tr>")
    newTr.append("<td>" + childSnapshot.val().name + "</td>");
    newTr.append("<td>" + childSnapshot.val().destination + "</td>");
    newTr.append("<td>" + childSnapshot.val().frequency + "</td>");
    newTr.append("<td>" + nextArrival + "</td>");
    newTr.append("<td>" + minutesAway + "</td>");
    $("tbody").append(newTr);

    function minTillTrain(tFrequency, start) {

        var firstTimeConverted = moment(start, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        return tMinutesTillTrain;
    }

    // Next Arrival Function
    function nextTrain(tMinutesTillTrain) {
        var nextTrain = moment().add(tMinutesTillTrain, "minutes")
        return moment(nextTrain).format("hh:mm");
    }



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
