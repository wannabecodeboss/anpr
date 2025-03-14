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

// Add faculty vehicle
document.getElementById("addFacultyBtn").addEventListener("click", function() {
    const facultyName = document.getElementById("facultyName").value;
    const facultyPlate = document.getElementById("facultyPlate").value;
    
    if (facultyName && facultyPlate) {
        db.ref("faculty/" + facultyPlate).set({
            name: facultyName
        }).then(() => {
            alert("Faculty vehicle added!");
            document.getElementById("facultyName").value = "";
            document.getElementById("facultyPlate").value = "";
        }).catch(error => console.error("Error:", error));
    } else {
        alert("Please enter both name and number plate!");
    }
});

// Load faculty vehicles
function loadFacultyVehicles() {
    db.ref("faculty").on("value", (snapshot) => {
        const list = document.getElementById("facultyList");
        list.innerHTML = "";
        snapshot.forEach((child) => {
            const item = document.createElement("li");
            item.textContent = `${child.val().name} - ${child.key}`;
            list.appendChild(item);
        });
    });
}

// Load outsider vehicles
function loadOutsiderVehicles() {
    db.ref("outsiders").on("value", (snapshot) => {
        const list = document.getElementById("outsidersList");
        list.innerHTML = "";
        snapshot.forEach((child) => {
            const entry = child.val();
            const item = document.createElement("li");
            item.textContent = `${child.key}: Entry - ${entry.entry}, Exit - ${entry.exit || "Pending"}`;
            list.appendChild(item);
        });
    });
}

// Load data on start
loadFacultyVehicles();
loadOutsiderVehicles();
