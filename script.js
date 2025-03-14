// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRbU-AP9bY9QX1IGjBv_K-PQ6c9KOPQ_E",
    authDomain: "anpr-bg.firebaseapp.com",
    databaseURL: "https://anpr-bg-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "anpr-bg",
    storageBucket: "anpr-bg.appspot.com",
    messagingSenderId: "1059960578017",
    appId: "1:1059960578017:web:cd2c0158052e4e1388bca0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to update vehicle entry
function addVehicleEntry(plateNumber, entryTime) {
    const ref = db.ref("outsiders/" + plateNumber);
    ref.set({
        entry: entryTime,
        exit: null
    }).then(() => {
        console.log("Vehicle entry added successfully!");
    }).catch((error) => {
        console.error("Error adding entry:", error);
    });
}

// Function to update vehicle exit time
function updateVehicleExit(plateNumber, exitTime) {
    const ref = db.ref("outsiders/" + plateNumber + "/exit");
    ref.set(exitTime).then(() => {
        console.log("Exit time updated successfully!");
    }).catch((error) => {
        console.error("Error updating exit time:", error);
    });
}

// Example Usage
document.getElementById("addEntryBtn").addEventListener("click", function() {
    const plateNumber = document.getElementById("plateNumberInput").value;
    const entryTime = new Date().toISOString();
    addVehicleEntry(plateNumber, entryTime);
});

document.getElementById("updateExitBtn").addEventListener("click", function() {
    const plateNumber = document.getElementById("plateNumberInput").value;
    const exitTime = new Date().toISOString();
    updateVehicleExit(plateNumber, exitTime);
});
