// Initialize Firebase
const firebaseConfig = {
    databaseURL: "https://anpr-bg-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fetch and display faculty vehicles
function loadFaculty() {
    db.ref("faculty").on("value", (snapshot) => {
        let facultyList = document.getElementById("facultyList");
        facultyList.innerHTML = ""; // Clear previous list

        snapshot.forEach((child) => {
            let listItem = document.createElement("li");
            listItem.textContent = `${child.key}: ${child.val()}`;
            facultyList.appendChild(listItem);
        });
    });
}

// Fetch and display outsider vehicle logs
function loadOutsiders() {
    db.ref("outsiders").on("value", (snapshot) => {
        let outsidersList = document.getElementById("outsidersList");
        outsidersList.innerHTML = ""; // Clear previous list

        snapshot.forEach((child) => {
            let data = child.val();
            let listItem = document.createElement("li");
            listItem.textContent = `${child.key}: Entry - ${data.entry}, Exit - ${data.exit || "Pending"}`;
            outsidersList.appendChild(listItem);
        });
    });
}

// Add a new faculty vehicle
function addFaculty() {
    let name = document.getElementById("facultyName").value;
    let plate = document.getElementById("facultyPlate").value;

    if (name && plate) {
        db.ref(`faculty/${name}`).set(plate);
        document.getElementById("facultyName").value = "";
        document.getElementById("facultyPlate").value = "";
    }
}

// Load data on page load
loadFaculty();
loadOutsiders();
