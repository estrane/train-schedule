  // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBkv6FmC-BKlN-pOt5T4yTjX5dzb45rqc0",
            authDomain: "groupfb120817.firebaseapp.com",
            databaseURL: "https://groudsfpfb120817.firebaseio.com",
            projectId: "groupfb120817",
            storageBucket: "",
            messagingSenderId: "284215947796"
        };
        firebase.initializeApp(config);

        var database = firebase.database();

        // Initial variables
        var name = "";
        var dest = "";
        var startTime = "";
        var freq = "";

        // Capture Button Click
        $("#add-train").on("click", function (event) {
            event.preventDefault();

            // Grabbed values from text-boxes
            name = $("#train-name").val().trim();
            dest = $("#destination").val().trim();
            startTime = $("#start-time").val().trim();
            freq = $("#frequency").val().trim();

            console.log(name, dest, startTime, freq);

            // Code for "Setting values in the database"
            database.ref().push({
                name: name,
                destination: dest,
                startTime: startTime,
                frequency: freq,

            });
        });
        // Add them to the HTML in our table

        database.ref().on("child_added", function (childSnapshot) {

            // Log everything that's coming out of snapshot
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().startTime);
            console.log(childSnapshot.val().frequency);

            // Change the HTML to reflect
            var newTr = $("<tr>")
            newTr.append("<td>" + childSnapshot.val().name + "</td>");
            newTr.append("<td>" + childSnapshot.val().destination + "</td>");
            newTr.append("<td>" + childSnapshot.val().frequency + "</td>");
            newTr.append("<td>" + trainTime(childSnapshot.val().startTime) + "</td>");
            newTr.append("<td>" + childSnapshot.val().monthlyRate + "</td>");
            $("tbody").append(newTr);

            // Below are both time calculating functions. Note that both must be inside the database.ref() for them to work. 

            // Minutes Away Function
            function trainTime(firstTime) {

                var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "days");
                var currentTime = moment();
                var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
                

                return trainTime;
            }



            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
