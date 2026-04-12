const admin = require("firebase-admin");
const credentials = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  storageBucket: "aurabot-f57b2.appspot.com"
});

async function configureCors() {
  const bucket = admin.storage().bucket();
  
  const corsConfig = [
    {
      origin: ["*"],
      method: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
      responseHeader: ["*"],
      maxAgeSeconds: 3600
    }
  ];

  try {
    await bucket.setCorsConfiguration(corsConfig);
    console.log("✅ CORS configurado correctamente en Firebase Storage.");
  } catch (error) {
    console.error("❌ Error configurando CORS:", error.message);
    if(error.response) console.error(error.response.body);
  }
}

configureCors();
