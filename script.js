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

// Debugging
console.log("Firebase Initialized:", firebase.apps.length > 0);

// Function to add a faculty vehicle
function addFaculty() {
    const name = document.getElementById("facultyName").value.trim();
    const plate = document.getElementById("facultyPlate").value.trim();
    
    if (!name || !plate) {
        alert("Please enter both faculty name and plate number!");
        return;
    }

    db.ref("faculty/" + plate).set({
        name: name
    }).then(() => {
        console.log("Faculty vehicle added:", name, plate);
        document.getElementById("facultyName").value = "";
        document.getElementById("facultyPlate").value = "";
    }).catch((error) => {
        console.error("Error adding faculty vehicle:", error);
    });
}

// Function to log outsider entry
function logEntry() {
    const plate = document.getElementById("entryPlate").value.trim();
    if (!plate) {
        alert("Enter a vehicle plate number!");
        return;
    }

    const entryTime = new Date().toISOString();
    db.ref("outsiders/" + plate).set({
        entry: entryTime,
        exit: null
    }).then(() => {
        console.log("Outsider entry logged:", plate, entryTime);
        document.getElementById("entryPlate").value = "";
    }).catch((error) => {
        console.error("Error logging entry:", error);
    });
}

// Function to log outsider exit
function logExit() {
    const plate = document.getElementById("exitPlate").value.trim();
    if (!plate) {
        alert("Enter a vehicle plate number!");
        return;
    }

    const exitTime = new Date().toISOString();
    db.ref("outsiders/" + plate + "/exit").set(exitTime)
    .then(() => {
        console.log("Exit time updated for:", plate);
        document.getElementById("exitPlate").value = "";
    })
    .catch((error) => {
        console.error("Error updating exit time:", error);
    });
}

// Function to load faculty list
function loadFaculty() {
    const list = document.getElementById("facultyList");
    list.innerHTML = "";

    db.ref("faculty").on("value", (snapshot) => {
        list.innerHTML = "";
        snapshot.forEach((child) => {
            const data = child.val();
            const li = document.createElement("li");
            li.textContent = `${data.name} - ${child.key}`;
            list.appendChild(li);
        });
    });
}

// Function to load outsiders list
function loadOutsiders() {
    const list = document.getElementById("outsidersList");
    list.innerHTML = "";

    db.ref("outsiders").on("value", (snapshot) => {
        list.innerHTML = "";
        snapshot.forEach((child) => {
            const data = child.val();
            const li = document.createElement("li");
            li.textContent = `${child.key} - Entry: ${data.entry} | Exit: ${data.exit || "N/A"}`;
            list.appendChild(li);
        });
    });
}

// Load data on page load
window.onload = function () {
    loadFaculty();
    loadOutsiders();
};
