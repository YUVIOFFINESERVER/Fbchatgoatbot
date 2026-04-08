const { spawn } = require("child_process");
const log = require("./logger/log.js");
const express = require("express"); // Naya: Render ko signal dene ke liye
const app = express();
const port = process.env.PORT || 10000;

// Render ke liye "I am alive" signal
app.get('/', (req, res) => {
    res.send('Bot is Live and Running!');
});

app.listen(port, () => {
    log.info(`Server is running on port ${port}`);
});

function startProject() {
    // Goat.js ko start karta hai
    const child = spawn("node", ["Goat.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code == 2) {
            log.info("Restarting Project...");
            startProject();
        }
    });
}

startProject();
