module.exports = {
  config: {
    name: "autoreact",
    version: "1.0",
    author: "Yuvi",
    countDown: 5,
    role: 0,
    category: "system"
  },
  onStart: async function() {},
  onEvent: async function({ api, event }) {
    // Isse engine ko file mil jayegi aur crash nahi hoga
    return; 
  }
};

