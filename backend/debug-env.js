require("dotenv").config();
const uri = process.env.MONGO_URI;
console.log("URI found in .env:", uri ? "Yes" : "No");
if (uri) {
  // Hide password for safety
  const maskedUri = uri.replace(/:([^@]+)@/, ":****@");
  console.log("Masked URI:", maskedUri);
}
console.log("PORT:", process.env.PORT);
