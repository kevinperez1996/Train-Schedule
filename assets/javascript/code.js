
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBapUEDgkEs7Y0_fEW6aDS5fVBdYUVRAgc",
    authDomain: "train-schedule-8e0b9.firebaseapp.com",
    databaseURL: "https://train-schedule-8e0b9.firebaseio.com",
    projectId: "train-schedule-8e0b9",
    storageBucket: "",
    messagingSenderId: "740256144304",
    appId: "1:740256144304:web:770b4144d9d4416e38d475"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//When Sumbit is clicked
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();



    //Object to hold all values --- will be used to push and store data in database
    var addedTrain = {
        train: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };

    database.ref().push(addedTrain);

    // console.log(addedTrain.train);
    //console.log(addedTrain.destination);
    //console.log(addedTrain.time);
    // console.log(addedTrain.frequency);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (snapShot) {
    //console.log(snapShot.val());

    var trainName = snapShot.val().train;
    var trainDest = snapShot.val().destination;
    var trainTime = snapShot.val().time;
    var trainFreq = snapShot.val().frequency;

    console.log("Train Name: " + trainName);
    console.log("Train Destination: " + trainDest);
    console.log("First Train Time: " + trainTime);
    console.log("Train Frequency: " + trainFreq + " min");




    //get the current time
    var currentTime = moment().subtract(1, "years")
    
    
    //calculate the next arrival using the first train time and train frequency
    var nextArrival; // = moment(trainTime, "HH:mm").add(trainFreq, "minutes").format("HH:mm");
    console.log("Next Train: " + nextArrival);
    
    var firstTrain = moment(trainTime, "HH:mm").subtract(1, "years");

    
    
    //calculate dif between first train and now
    var minutesAway; // = moment().diff(moment(nextArrival, "HH:mm"), "minutes");
    console.log("Minutes Away: " + minutesAway);

    if ((currentTime - firstTrain) < 0){
        nextArrival = trainTime;
        minutesAway = moment().diff(moment(nextArrival, "HH:mm"), "minutes");
    }
    else {
        nextArrival = moment(trainTime, "HH:mm").add(trainFreq, "minutes").format("HH:mm");
        minutesAway = moment().diff(moment(nextArrival, "HH:mm"), "minutes");
    }

    var tableRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(moment(nextArrival, "HH:mm").format("hh:mm a")),
        $("<td>").text(minutesAway)
    );

    $("#train-table").append(tableRow);
});

