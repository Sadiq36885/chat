// Firebase konfigürasyonu
const firebaseConfig = {
    apiKey: "AIzaSyAijQ77DW8S7fNPr8qnsjA-sdgVAmmYY9M",
    authDomain: "chat-a4874.firebaseapp.com",
    databaseURL: "https://chat-a4874-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-a4874",
    storageBucket: "chat-a4874.firebasestorage.app",
    messagingSenderId: "591932296637",
    appId: "1:591932296637:web:e9b62273fe3998e1b516d4",
    measurementId: "G-52MXVN6BK5"
};

// Firebase'i başlat
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// HTML elemanları
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const messagesDiv = document.getElementById("messages");

// Mesaj gönderme işlevi
sendBtn.addEventListener("click", function() {
    const message = messageInput.value.trim();
    if (message) {
        // Mesajı Firebase Realtime Database'e gönder
        database.ref('messages').push({
            text: message,
            timestamp: Date.now()
        });

        // Mesaj kutusunu temizle
        messageInput.value = '';
    }
});

// Firebase veritabanından mesajları dinle ve göster
database.ref('messages').on('child_added', function(snapshot) {
    const messageData = snapshot.val();
    const messageElement = document.createElement("div");
    messageElement.textContent = messageData.text;
    messagesDiv.appendChild(messageElement);

    // En son mesaja kaydır
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
