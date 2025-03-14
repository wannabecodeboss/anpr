// Firebase Configuration
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

// Function to Add Faculty Vehicle
function addFaculty() {
    const name = document.getElementById("facultyName").value.trim();
    const plate = document.getElementById("facultyPlate").value.trim();
    
    if (!name || !plate) {
        alert("Please enter both name and number plate!");
        return;
    }

    db.ref("faculty/" + plate).set({
        name: name
    }).then(() => {
        console.log("Faculty vehicle added!");
        document.getElementById("facultyName").value = "";
        document.getElementById("facultyPlate").value = "";
    }).catch((error) => {
        console.error("Error adding faculty vehicle:", error);
    });
}

// Display Faculty Vehicles
function displayFacultyVehicles() {
    const facultyList = document.getElementById("facultyList");
    facultyList.innerHTML = "";

    db.ref("faculty").on("value", (snapshot) => {
        facultyList.innerHTML = ""; // Clear list before updating
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const listItem = document.createElement("li");
            listItem.textContent = `${data.name} - ${childSnapshot.key}`;
            facultyList.appendChild(listItem);
        });
    });
}

// Display Outsider Vehicle Logs
function displayOutsiderVehicles() {
    const outsidersList = document.getElementById("outsidersList");
    outsidersList.innerHTML = "";

    db.ref("outsiders").on("value", (snapshot) => {
        outsidersList.innerHTML = ""; // Clear list before updating
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const listItem = document.createElement("li");
            listItem.textContent = `Plate: ${childSnapshot.key}, Entry: ${data.entry}, Exit: ${data.exit || "Not exited yet"}`;
            outsidersList.appendChild(listItem);
        });
    });
}

// Attach event listener for adding faculty
document.getElementById("addFacultyBtn").addEventListener("click", addFaculty);

// Load faculty and outsider vehicle data
displayFacultyVehicles();
displayOutsiderVehicles();
