# Husdjur API

Detta är mitt Husdjurs-API, byggt för att hantera användare, djur, vaccinationer, bokningar och journaler. Projektet är byggt med **Node.js**, **TypeScript**, **Express** och **MongoDB Atlas**.  
För autentisering används **JWT (JSON Web Token)**

API:et testades med **Insomnia** för att kontrollera att alla HTTP förfrågningar fungerade korrekt.

## API-endpoints

För fullständig lista på alla endpoints, HTTP-metoder och exempeldatan i JSON-format:  
[API-dokumentation](./API-Desig.md)

## Funktionalitet

- Registrera och loggain användare
- Skapa,uppdatera och ta bort husdjur
- Hantera vaccinationer, bokningar, och journaler
- Säker åtkomst via autentisering med JWT

## Förutsättningar

Innan du börjar, se till att du har:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) konto (eller använd lokal databas om du vill)
- [Insomnia](https://insomnia.rest/) för att testa API:et
- `.env`-fil skapad med följande:

```
# Porten din server kör på
PORT=3100

# MongoDB-anslutningssträng från MongoDB Atlas
MONGO_URI=din_mongodb_atlas_url_här

# Hemlig nyckel för att signera JWT-tokens
ACCESS_TOKEN_SECRET=valfri_hemlig_nyckel
```

## Steg 1 – Klona projektet

#### Klona denna projekt:

- [GitHub-U05](https://github.com/Lazcano007/U05.git)

- cd U05

## Steg 2 Installera beroenden

#### Kör detta kommando i din terminal:

```
 npm install
```

## Steg 3 – Skapa .env-fil

#### Skapa en .env fil där du har detta nedan:

```
PORT=3100
MONGO_URI=din_mongodb_url
ACCESS_TOKEN_SECRET=s3cr3tjwtkeysuperhemligt2025
```

## Steg 4 - Starta servern

#### Kör detta kommando i din terminal:

```
npm run dev
```

## Steg 5 - Testa med insomnia

#### Nu kan du testa göra ett anrop via **Insomnia** för att testa:

```
POST: api/v1/Users/create
```

## Steg 6 - cURL kommandon

#### Detta är ett cURL kommando för att registrera en användare:

```
curl -X POST http://localhost:3100/api/v1/Users/registration   -H "Content-Type: application/json"   -d '{"name": "Dylan", "password": "Skolan24", "email": "dylan@me.com"}'
```

#### Detta är ett cURL kommando för att logga in en användare:

```
curl -X POST http://localhost:3100/api/v1/Users/login \
  -H "Content-Type: application/json" \
  -d '{"name": "Dylan", "password": "Skolan24"}'
```

#### Detta är ett kommandot är för att hämta alla användare som är registrerade:

```
curl -X GET http://localhost:3100/api/v1/Users
```

#### Detta är ett kommandot är för att registrera ett djur på en specifik användare:

```
curl -X POST http://localhost:3100/api/v1/Pets/create   -H "Content-Type: application/json"   -d '{"name": "Bella", "species": "Dog", "breed":"pincher", "age": 3, "owner": "67e185f2c284e360b6981e24"}'
```

## Deployad version

#### Det finns även en deployad version av API:et som körs på Render.

- https://u05.onrender.com