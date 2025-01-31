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

// Define paths to files
const scssFilePath = "../sv-modules/styling-module/src/components/App/Styles";
const cssFilePath = "dist/main.css";

// Create a function to compile Sass to CSS
function compileSass() {
    sass.render(
        {
            file: `${scssFilePath}/App.scss`,
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile(
                    cssFilePath,
                    result.css.toString(),
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Sass compiled to CSS");
                            io.emit("css-update");
                            browserSync.reload();
                        }
                    }
                );
            }
        }
    );
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

// const watcher = chokidar.watch(`${scssFilePath}/App.scss`, { persistent: true });
// Watch for changes
watcher.on("change", (path) => {
    console.log(`File ${path} has been changed`);
    compileSass();
});

// Start the server that runs the sockets.io section
server.listen(3001, () => {
    console.log("Socket.io server listening on port 3001");
});

// Start the server that hosts the css files
browserSync.init({
    server: "./dist",
    files: [cssFilePath],
    port: 3000,
});

// Compile Sass to CSS for the initial load
compileSass();

// const sass = require('sass');
// const browserSync = require('browser-sync').create();
// const server = require('http').createServer();
// const fs = require('fs');
// const io = require('socket.io')(server, {
//     cors: {
//         origin: '*',
//     },
// });

// // Define paths to files
// const scssFilePath = '../sv-modules/styling-module/src/components/App/Styles';
// const cssFilePath = 'dist/main.css';

// // Create a function to compile Sass to CSS
// function compileSass() {
//     sass.render({
//         file: scssFilePath + '/App.scss'
//     }, function (err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             fs.writeFile(cssFilePath, result.css.toString(), function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('Sass compiled to CSS');
//                 }
//             });
//         }
//     });
// }

// io.on('connection', (socket) => {
//     console.log('Client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// // Watch for changes to the Sass file
// fs.watch(scssFilePath, function (eventType, filename) {
//     if (filename.endsWith('.scss')) {
//         console.log(`File ${filename} changed`);
//         compileSass();
//         io.emit('css-update');
//     }
// });

// // // Start the server that runs the sockets.io section
// server.listen(3001, () => {
//     console.log('Server listening on port 3001');
//   });

// // // Start the server that hosts the css files
// browserSync.init({
//   server: './dist',
//   files: [cssFilePath],
//   port: 3000,
// });

// // Compile Sass to CSS for the initial load
// compileSass();
