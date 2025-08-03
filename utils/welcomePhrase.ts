const chatbotPhrases = [
  "I’m here when you need me.",
  "Standing by for your next move.",
  "Just say the word.",
  "At your service.",
  "Good to go when you are.",
  "Let’s do this.",
  "Waiting on your cue.",
  "Ready whenever you are.",
  "Here and ready to help.",
  "All set on my end.",
  "Whenever you’re ready, I am too.",
  "On standby.",
  "We can start anytime you like.",
  "Ready to roll.",
  "Let me know when you’re set.",
];

function getRandomWelcomePhrase() {
  return chatbotPhrases[Math.floor(Math.random() * chatbotPhrases.length)];
}

export { getRandomWelcomePhrase };
