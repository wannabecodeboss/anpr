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

// Function to add Faculty Vehicle
function addFaculty() {
    const name = document.getElementById("facultyName").value.trim();
    const plate = document.getElementById("facultyPlate").value.trim();

    if (name === "" || plate === "") {
        alert("Please enter both name and number plate.");
        return;
    }

    db.ref("faculty/" + plate).set({
        name: name
    }).then(() => {
        console.log("Faculty vehicle added successfully!");
        document.getElementById("facultyName").value = "";
        document.getElementById("facultyPlate").value = "";
        loadFacultyVehicles();
    }).catch((error) => {
        console.error("Error adding faculty vehicle:", error);
    });
}

// Function to add Outsider Vehicle Entry
function addVehicleEntry() {
    const plateNumber = document.getElementById("plateNumberInput").value.trim();
    if (plateNumber === "") {
        alert("Enter a valid number plate.");
        return;
    }

    const entryTime = new Date().toISOString();
    db.ref("outsiders/" + plateNumber).set({
        entry: entryTime,
        exit: null
    }).then(() => {
        console.log("Vehicle entry added successfully!");
        document.getElementById("plateNumberInput").value = "";
        loadOutsiderVehicles();
    }).catch((error) => {
        console.error("Error adding entry:", error);
    });
}

// Function to update vehicle exit
function updateVehicleExit() {
    const plateNumber = document.getElementById("plateNumberInput").value.trim();
    if (plateNumber === "") {
        alert("Enter a valid number plate.");
        return;
    }

    const exitTime = new Date().toISOString();
    db.ref("outsiders/" + plateNumber + "/exit").set(exitTime).then(() => {
        console.log("Exit time updated successfully!");
        document.getElementById("plateNumberInput").value = "";
        loadOutsiderVehicles();
    }).catch((error) => {
        console.error("Error updating exit time:", error);
    });
}

// Function to load Faculty Vehicles
function loadFacultyVehicles() {
    db.ref("faculty").once("value", (snapshot) => {
        const list = document.getElementById("facultyList");
        list.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const plate = childSnapshot.key;
            const name = childSnapshot.val().name;
            const li = document.createElement("li");
            li.textContent = `${name} - ${plate}`;
            list.appendChild(li);
        });
    });
}

// Function to load Outsider Vehicles
function loadOutsiderVehicles() {
    db.ref("outsiders").once("value", (snapshot) => {
        const list = document.getElementById("outsidersList");
        list.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const plate = childSnapshot.key;
            const data = childSnapshot.val();
            const li = document.createElement("li");
            li.textContent = `${plate}: Entry - ${data.entry}, Exit - ${data.exit || "Pending"}`;
            list.appendChild(li);
        });
    });
}

// Event Listeners
document.getElementById("addFacultyBtn").addEventListener("click", addFaculty);
document.getElementById("addEntryBtn").addEventListener("click", addVehicleEntry);
document.getElementById("updateExitBtn").addEventListener("click", updateVehicleExit);

// Load existing data
loadFacultyVehicles();
loadOutsiderVehicles();
