const messageList = document.querySelector('.cs-message-list');
const input = document.querySelector('#user-input');
const sendButton = document.querySelector('#send-button');
const buttons = document.querySelectorAll('.box');

let responses = [
  "That's a great question, you're absolutely right to question that! There's a graph 5 pixels to the left, did you try using your eyes?",
  "Can definitely help with that! Amazing you've gone this far in your industry without understanding graphs!",
  "I know the answer obviously, but if this is how you handle data, I’m not sure how you’re handling your artists.",
  "Hmmm, shouldn't you understand how to read marketing data if it's your job?",
  "So, you work in marketing, eh?",
  "This really isn't as complicated as you're making it.",
  "Next time try reading what’s already there before spending GPU credits.",
  "You’ve managed to think of a question even you could probably answer.",
  "I apologize for the confusion that numbers have caused you!",
  "Reading charts is part of the job, right? Just checking."
];

let usedResponses = [];
let messageCount = 0;

function pickUniqueResponse() {
  if (usedResponses.length === responses.length) {
    usedResponses = [];
  }

  const available = responses.filter(r => !usedResponses.includes(r));
  const chosen = available[Math.floor(Math.random() * available.length)];
  usedResponses.push(chosen);
  return chosen;
}

function addMessage(content, isUser = false) {
  const block = document.createElement('div');
  block.classList.add('message-block');

  if (isUser) {
    const userBubble = document.createElement('div');
    userBubble.classList.add('message-user');
    userBubble.innerText = content;

    const reply = document.createElement('div');
    reply.classList.add('message-bot');
    reply.innerText = pickUniqueResponse();

    block.appendChild(userBubble);
    block.appendChild(reply);
  } else {
    const bot = document.createElement('div');
    bot.classList.add('message-bot');
    bot.innerText = content;
    block.appendChild(bot);
  }

  messageList.appendChild(block);
  messageList.scrollTop = messageList.scrollHeight;
}

function handleSend() {
  const value = input.value.trim();
  if (!value) return;

  messageCount++;

  if (messageCount > 5) {
    addMessage("Sorry, you have reached your credit limit! Subscribe to Wavo Plus if you are seeing this message too often.");
    input.value = '';
    return;
  }

  addMessage(value, true);
  input.value = '';
}

sendButton.addEventListener('click', handleSend);

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleSend();
  }
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    input.value = btn.innerText.trim();
    handleSend();
    // Hide all buttons after click
    buttons.forEach(b => b.style.display = 'none');
  });
});

// Replace placeholder with greeting
messageList.innerHTML = '';
addMessage("Hello, I'm your data assistant! Need help understanding your artist's data in the dashboard? Ask away!");
