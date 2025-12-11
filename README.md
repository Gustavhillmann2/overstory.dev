# overstory.dev - eksamensprojekt

Applikationen er en webplatform bygget med Node.js og Express, designet til at håndtere brugerregistrering, login og tilmelding til forskellige events. Projektet lægger vægt på sikkerhed og integration af eksterne tjenester som SMS-notifikationer og billedhosting.

## Nøglefunktioner
* **Brugerautentifikation:** Sikker registrering og login med adgangskode-hashing ved brug af `bcrypt`.
* **Events:** Visning af kommende events med detaljer og mulighed for tilmelding.
* **Eventtilmelding:** Brugere kan tilmelde sig events, med unik registrering (en bruger pr. event).
* **SMS-notifikationer:** Automatisk afsendelse af SMS-bekræftelse ved succesfuld eventtilmelding via Twilio-integration.
* **Sikkerhed:** Implementerer en række sikkerhedsforanstaltninger:
    * **CSRF-beskyttelse** (`csurf`).
    * **Sikkerhedsheaders** (`helmet`) med konfigureret Content Security Policy (CSP).
    * **Rate Limiting** for generelle forespørgsler og specifik login-beskyttelse (`express-rate-limit`).
    * **Sikre sessionscookies** (`express-session`).
* **Billedhosting:** Events henter billeder fra Cloudinary.

## Teknologier
Projektet er bygget på følgende teknologier og biblioteker:

* **Backend:** Node.js, Express
* **Database:** SQLite3
* **Templating:** EJS (Embedded JavaScript)
* **Sikkerhed:** `bcrypt`, `csurf`, `helmet`, `express-rate-limit`
* **Ekstern Tjeneste (SMS):** Twilio
* **Ekstern Tjeneste (Billeder):** Cloudinary
* **Logging:** `morgan`

## Installation

For at køre projektet lokalt skal du følge disse trin:

### 1. Forudsætninger
Sikre dig at du har Node.js og npm installeret på din maskine.

### 2. Kloning af repositoriet

```bash
git clone [DIT-REPO-URL]
cd overstory.dev

npm install

# Porten applikationen skal køre på
PORT=3000

# Session Secret (VIGTIGT: Skal være stærk og unik i produktion)
SESSION_SECRET="din_super_hemmelige_session_secret"
SESSION_NAME="overstory.sid" # Session cookie navn

# Twilio API (til SMS-tjeneste)
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="dit_auth_token"
TWILIO_PHONE="+15017122661" # Dit Twilio telefonnummer

# Cloudinary (hvis events skal opdateres, men standard events virker uden)
CLOUDINARY_CLOUD_NAME="dit_cloud_navn"
CLOUDINARY_API_KEY="din_api_nøgle"
CLOUDINARY_API_SECRET="din_api_secret"

# CORS Origin
CORS_ORIGIN="http://localhost:3000" # Sæt til din frontend URL i produktion

npm start