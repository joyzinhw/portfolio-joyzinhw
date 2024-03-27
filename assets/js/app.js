//contatos

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  const messageList = document.getElementById("messageList");
  const clearMessagesButton = document.getElementById("clearMessages");

  contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const formData = new FormData(contactForm);
      const messageObject = {};
      formData.forEach(function(value, key){
          messageObject[key] = value;
      });

      let messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.push(messageObject);
      localStorage.setItem("messages", JSON.stringify(messages));

      displayMessages();
      contactForm.reset();
  });

  clearMessagesButton.addEventListener("click", function() {
      localStorage.removeItem("messages");
      messageList.innerHTML = "";
  });

  function displayMessages() {
    messageList.innerHTML = "";

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(function(message) {

        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-item");
        
        const namePara = document.createElement("p");
        namePara.textContent = `Nome: ${message.name}`;
        messageContainer.appendChild(namePara);
        
        const emailPara = document.createElement("p");
        emailPara.textContent = `Email: ${message.email}`;
        messageContainer.appendChild(emailPara);
        
        const phonePara = document.createElement("p");
        phonePara.textContent = `Telefone: ${message.phone}`;
        messageContainer.appendChild(phonePara);
        
        const messagePara = document.createElement("p");
        messagePara.textContent = `Mensagem: ${message.message}`;
        messageContainer.appendChild(messagePara);
        
        messageList.appendChild(messageContainer);
    });
}
  
  displayMessages();
})