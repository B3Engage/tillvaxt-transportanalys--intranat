const sass = require("sass");
const browserSync = require("browser-sync").create();
const server = require("http").createServer();
const fs = require("fs");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const chokidar = require("chokidar");

const SOCKET_PORT = 3001;
const BROWSER_SYNC_PORT = 3000;

// Define paths to files
const scssFilePath = "../webapps/styling-module/src/components/App/Styles";
const cssFilePath = "dist/main.css";

// Create a function to compile Sass to CSS
async function compileSass() {
  try {
    const result = await sass.compileAsync(`${scssFilePath}/App.scss`);

    fs.writeFile(cssFilePath, result.css, (err) => {
      if (err) {
        console.error("Write error:", err);
      } else {
        console.log("Sass compiled to CSS");
        io.emit("css-update");
        browserSync.reload();
      }
    });
  } catch (err) {
    console.error("Sass error:", err);
  }
}

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Initialize chokidar watcher
const watcher = chokidar.watch(`${scssFilePath}/**/*.scss`, {
  persistent: true,
});

// Watch for changes
watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);
  compileSass();
});

// Start the server that hosts the css files
async function startBrowserSync() {
  browserSync.init({
    server: "./dist",
    files: [cssFilePath],
    port: BROWSER_SYNC_PORT,
  });
}

server.once("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${SOCKET_PORT} is already in use. Stop the other process using this port`);
    process.exit(1);
  }

  console.error("Socket.io server failed to start:", err);
  process.exit(1);
});

server.listen(SOCKET_PORT, async () => {
  console.log(`Socket.io server listening on port ${SOCKET_PORT}`);

  await compileSass();
  startBrowserSync();
});
