const socket = io("http://localhost:3000");
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");

  // Mock of sending and receiving messages (for now, you'll replace this with real backend logic)
  function appendMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
  }

  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      appendMessage(message, "sent");
      messageInput.value = "";

      // Here you would send the message to your backend via WebSockets (Socket.IO)
      // Example:
      socket.emit("sendMessage", message);
    }
  });

  messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendButton.click();
    }
  });

  socket.on("reply", (message) => {
    appendMessage(message, "received");
  });
});
