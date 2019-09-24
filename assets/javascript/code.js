
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
  $("#add-train-btn").on("click", function (event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    //Object to hold all values --- will be used to push and store data in database
    var addedTrain = {
        train: trainName,
        destination : trainDest, 
        time: trainTime,
        frequency: trainFreq
    };

    database.ref().push(addedTrain); 

    console.log(addedTrain.train);
    console.log(addedTrain.destination);
    console.log(addedTrain.time);
    console.log(addedTrain.frequency);





  });