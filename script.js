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
    firebase.database().ref("outsiders/" + plateNumber).set({
        entry: entryTime,
        exit: null
    }).then(() => {
        console.log("✅ Vehicle entry added successfully!");
    }).catch((error) => {
        console.error("❌ Error adding entry:", error);
    });
}

// Function to update vehicle exit time
function updateVehicleExit(plateNumber, exitTime) {
    firebase.database().ref("outsiders/" + plateNumber + "/exit").set(exitTime)
    .then(() => {
        console.log("✅ Exit time updated successfully!");
    }).catch((error) => {
        console.error("❌ Error updating exit time:", error);
    });
}

// Attach event listeners only if elements exist
document.addEventListener("DOMContentLoaded", function() {
    const entryBtn = document.getElementById("addEntryBtn");
    const exitBtn = document.getElementById("updateExitBtn");

    if (entryBtn && exitBtn) {
        entryBtn.addEventListener("click", function() {
            const plateNumber = document.getElementById("plateNumberInput").value.trim();
            if (plateNumber) {
                addVehicleEntry(plateNumber, new Date().toISOString());
            } else {
                console.error("❌ Please enter a valid plate number.");
            }
        });

        exitBtn.addEventListener("click", function() {
            const plateNumber = document.getElementById("plateNumberInput").value.trim();
            if (plateNumber) {
                updateVehicleExit(plateNumber, new Date().toISOString());
            } else {
                console.error("❌ Please enter a valid plate number.");
            }
        });
    } else {
        console.error("❌ Buttons not found in the HTML!");
    }
});
