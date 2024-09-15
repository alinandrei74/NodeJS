const { EventEmitter } = require("node:events");

function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter;
}

const newsFeed = createNewsFeed();

// Agregar los event listeners
newsFeed.on("newsEvent", (data) => {
  console.log("Evento de noticias:", data);
});

newsFeed.on("breakingNews", (data) => {
  console.log("Noticias de última hora:", data);
});

newsFeed.on("error", (error) => {
  console.error("Error en el feed de noticias:", error.message);
});