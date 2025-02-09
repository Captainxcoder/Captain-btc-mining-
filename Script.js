// Firebase Config (yahan apni Firebase details dalni hai)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password).then((user) => {
        let uid = user.user.uid;
        db.ref("users/" + uid).set({
            email: email,
            regDate: new Date().toLocaleString(),
            deposit: 0,
            pending: 0,
            withdrawals: 0,
            earnings: 0
        });
        alert("Registration Successful! Please login.");
    }).catch(error => alert(error.message));
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password).then((user) => {
        let uid = user.user.uid;
        db.ref("users/" + uid).once("value").then(snapshot => {
            let data = snapshot.val();
            document.getElementById("username").innerText = data.email;
            document.getElementById("regDate").innerText = data.regDate;
            document.getElementById("deposit").innerText = data.deposit;
            document.getElementById("pending").innerText = data.pending;
            document.getElementById("withdrawals").innerText = data.withdrawals;
            document.getElementById("earnings").innerText = data.earnings;
            document.getElementById("auth-section").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
        });
    }).catch(error => alert(error.message));
}

function deposit() {
    let amount = parseInt(document.getElementById("amount").value);
    let uid = auth.currentUser.uid;
    db.ref("users/" + uid).update({ deposit: amount });
    alert("Deposit Successful!");
}

function withdraw() {
    let amount = parseInt(document.getElementById("amount").value);
    let uid = auth.currentUser.uid;
    db.ref("users/" + uid).update({ withdrawals: amount });
    alert("Withdrawal Requested!");
}

function logout() {
    auth.signOut().then(() => {
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("auth-section").style.display = "block";
    });
}
