const admin = require("firebase-admin");

// Load credentials from environment variables
const credentials = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

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
