const express = require("express");
const RPC = require("discord-rpc");

const client = new RPC.Client({ transport: "ipc" });

const clientId = "1005383853088722994";

let ready = false;

const app = express();

app.get("/", (request, response) => {
  const { artist, originalArtist, title, imageUrl } = request.query;

  if (
    title === undefined ||
    artist === undefined ||
    originalArtist === undefined ||
    imageUrl === undefined ||
    !ready
  ) {
    response.writeHead(400);
    return response.end("HEY MATE YOU SUSSY BAKA");
  }

  client.setActivity({
    details: title,
    state: artist,
    largeImageKey: imageUrl,
    largeImageText: originalArtist,
  });

  response.writeHead(200);
  response.end("OK");
});

app.get("/stop", (request, response) => {
  client.clearActivity();

  response.writeHead(200);
  response.end("OK");
});

client.on("ready", () => (ready = true));

client.login({ clientId });
app.listen(3001);
