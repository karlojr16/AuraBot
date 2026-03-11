require("dotenv").config();
const express = require("express");
const {setGlobalOptions} = require("firebase-functions/v2");
const {onRequest} = require("firebase-functions/v2/https");

setGlobalOptions({maxInstances: 10});

const app = express();

app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => 
    {res.send("AURABOT API FUNCIONANDO BIEN");});

// Endpoint principal del MVP
app.post("/chat", (req, res) => 
    {const {message} = req.body;

  console.log("Mensaje recibido:", message);

  res.json(
    {reply: "Este es un mensaje de prueba del MVP de AURABOT"});});

exports.api = onRequest(app);