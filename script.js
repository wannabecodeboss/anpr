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

// Function to log vehicle entry
function logEntry(plateNumber) {
    const entryTime = new Date().toISOString();
    db.ref("outsiders/" + plateNumber).set({
        entry: entryTime,
        exit: null
    }).then(() => {
        console.log(`✅ Entry logged: ${plateNumber} at ${entryTime}`);
    }).catch(error => {
        console.error("❌ Error logging entry:", error);
    });
}

// Function to update vehicle exit
function logExit(plateNumber) {
    const exitTime = new Date().toISOString();
    db.ref("outsiders/" + plateNumber + "/exit").set(exitTime).then(() => {
        console.log(`✅ Exit updated: ${plateNumber} at ${exitTime}`);
    }).catch(error => {
        console.error("❌ Error updating exit:", error);
    });
}

// Function to retrieve vehicle entry and exit logs
function getVehicleLogs(plateNumber) {
    db.ref("outsiders/" + plateNumber).once("value").then(snapshot => {
        if (snapshot.exists()) {
            console.log(`📋 Vehicle: ${plateNumber}`, snapshot.val());
        } else {
            console.log("⚠️ No record found for:", plateNumber);
        }
    }).catch(error => {
        console.error("❌ Error fetching logs:", error);
    });
}

// Command Prompt UI
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Enter command (e.g., entry ABC123)");
    inputField.style.width = "100%";
    inputField.style.padding = "10px";
    inputField.style.marginTop = "10px";
    document.body.appendChild(inputField);

    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const command = inputField.value.trim().split(" ");
            inputField.value = ""; // Clear input after command execution

            if (command.length < 2) {
                console.log("⚠️ Invalid command. Use: entry <plate>, exit <plate>, or fetch <plate>");
                return;
            }

            const action = command[0].toLowerCase();
            const plateNumber = command[1];

            if (action === "entry") {
                logEntry(plateNumber);
            } else if (action === "exit") {
                logExit(plateNumber);
            } else if (action === "fetch") {
                getVehicleLogs(plateNumber);
            } else {
                console.log("⚠️ Unknown command. Use: entry <plate>, exit <plate>, fetch <plate>");
            }
        }
    });
});
