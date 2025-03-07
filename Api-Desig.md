# **Husdjurs RESTful API**

Detta API är skapat för att hantera användare och deras husdjur.
  registrera sig, logga in och hantera sina husdjur. Dessutom kan användare registrera och hämta information om vaccinationer, veterinärbesök och medicinsk historik för sina djur. Poängen med denna API:et är för att underlätta hanteringen av husdjurets hälsa och vård genom en smidig och strukturerad datalagring.

---

### ***Funktioner***

- **Auth:** Registrera och logga in användare.
- **Husdjur:** Lägg till och hämta husdjursinformation.
- **Vaccinationer:** Lägg till och hämta vaccinationshistorik.
- **Veterinärbesök:** Hantera kommande veterinärbesök.
- **Medicinska journal:** Registrera och hämta medicinsk historik.

---
## **2. Model URls**

Här definieras API:ets endpoints som används för att hantera olika resurser. Varje endpoint representerar en specifik crud-operation, såsom att registrera en användare, hantera husdjur, registrera vaccinationer, boka veterinärbesök eller uppdatera medicinska journaler.

```json
//Auth
/user/register
/user/login

//Pets
/users/{userId}/pets
/users/{userId}/pets/{petId}
/users/{userId}/pets/{petId}/update
/users/{userId}/pets/{petId}/delete


//Vaccination
/pets/{petId}/vaccinations
/pets/{petId}/vaccinations/{vaccinationId}
/pets/{petId}/vaccinations/{vaccinationId}/update
/pets/{petId}/vaccinations/{vaccinationId}/delete

//Appontments
/pets/{petId}/appointments
/pets/{petId}/appointments/{appointmentId}
/pets/{petId}/appointments/{appointmentId}/update
/pets/{petId}/appointments/{appointmentId}/delete

//Journal
/pets/{petId}/journal
/pets/{petId}/journal/{journalId}
/pets/{petId}/journal/{journalId}/update
/pets/{petId}/journal/{journalId}/delete
```

---
## **3 Resource representation**

I denna del presenteras API:ets resurser i JSON-format för att demostrera hur data lagras och hanteras. Varje resurs representerar en specifik del av systemet, som användare, husdjur, vaccinationer, veterinärbesök och medicinska journaler. Det hjälper till att förstå strukturen på datan som skickas och tas emot vid anrop till API:et.

```json
//Användare
{
  "userID": 1234,
  "name": "Pedro",
  "email": "Pedro@me.com",
  "password": "twet45t45thuwhfge5u5wu45tb"//***Hashed***
},

//Registrera Husdjur
{
  "userID": 1234,
  "pets": [
    {
      "petID": 1,
      "name": "Balboa",
      "species": "Dog",
      "breed": "Dvärg-pincher",
      "age": 10
    },
    {
      "petID": 2,
      "name": "Bandida",
      "species": "Dog",
      "breed": "Staffordshire-bullterrier",
      "age": 10
    }
  ]
}

// Vaccination 
{
"petID": 1,
"vaccinations": [
    {
      "vaccinationID": 1,
      "name": "Rabies",
      "dateTaken": "2025-03-14",
      "description": "rabies contamination"
    },
    {
      "vaccinationID": 2,
      "name": "worm",
      "dateTaken": "2025-03-19",
      "description": "worms contamination"
    }
  ]
}

//Veterinärbesök
{
  "petID": 1,
  "appointments": [
    {
      "appointmentID": 1,
      "date": "2025-03-17",
      "time": "14:15",
      "description": "rabies contamination checkup"
    },
    {
      "appointmentID": 2,
      "date": "2025-05-17",
      "time": "17:45",
      "description": "worms contamination checkup"
    }
  ] 
}

// Journal
{
  "petID": 1,
  "journal": [
    {
      "description": "rabies contamination",
      "treatment": "rabies vaccin",
      "dateDiagnosis": "2025-05-17",
      "status": "Healed"
    },
    {
      "description": "worms contamination",
      "treatment": "worm drops",
      "dateDiagnosis": "2025-03-17",
      "status": "Healed"
    }
  ]
}

```
---
## **4 Assigning HTTP methods**

### ***API Endpoints***

Detta är en översikt över API-endpoints med JSON-representation:

#### **Användarhantering (Auth)**

Denna del av API:et hanterar användarregistrering och inloggning. Vid registrering kan en ny användare skapa ett konto genom att ange sitt namn, e-postadress och ett säkert lösenord. Efter att kontot har skapats kan användaren logga in genom att ange sin registrerade e-postadress och lösenord. Detta möjliggör autentisering och säker åtkomst till API:ets funktioner.
```json
{
    "auth": {
      "register": {
        "method": "POST",
        "path": "/api/v1/users/register"
      },
      "login": {
        "method": "POST",
        "path": "/api/v1/users/login"
      }
    }
}
```

#### **Husdjur**

Denna del av API:et möjliggör för en användare att registrera nya husdjur genom att fylla i namn, ålder och ras. Dessutom kan användaren hämta en lista över samtliga registrerade husdjur kopplade till sitt konto, vilket underlättar hanteringen av husdjuren. 
```json
{
  "pets": {
    "getAllPetsForUser": {
      "method": "GET",
      "path": "/api/v1/users/{Id}/pets"
    },
    "addPet": {
      "method": "POST",
      "path": "/api/v1/{userId}/pets"
    },
    "getPetById": {
      "method": "GET",
      "path": "/api/v1/{userId}/pets/pet:Id"
    },
     "UpdatePetById": {
      "method": "PUT",
      "path": "/api/v1/{userId}/pets/pet:Id/update"
    },
      "DeletePetById": {
      "method": "DELETE",
      "path": "/api/v1/{userId}/pets/pet:Id/delete"
    }
  }
}
```
#### **Vaccination**

Denna del av API:et möjligtgör för en användare att registrera nya vaccinationer för sina husdjur genom att skriva information som vaccinnamn och datum. Dessutom kan användaren hämta vaccinationshistorik för ett specifikt husdjur, vilket ger en tydlig översikt över tidigare och kommande vaccinationer.
```json
{
  "vaccinations": {
      "addVaccination": {
        "method": "POST",
        "path": "/api/v1/{userId}/pets/{petId}/vaccinations"
      },
      "getVaccinationHistory": {
        "method": "GET",
        "path": "/api/v1/{userId}/pets/{petId}/vaccinations"
      },
      "UpdateVaccination:Id": {
        "method": "PUT",
        "path": "/api/v1/{userId}/pets/{petId}/{vaccinationId}/update"
      },
      "DeleteVaccination:Id": {
        "method": "DELETE",
        "path": "/api/v1/{userId}/pets/{petId}/{vaccinationId}/delete"
      }
    }
}
```

#### **Besök**

Denna del av API:et gör det möjligt för användare att registrera kommande veterinärbesök för sina husdjur genom att skriva information som datum, tid och en kort beskrivning av besöket. Dessutom kan användaren hämta information om planerade veterinärbesök, inkl nästa inbokade besök är.
```json

{   
  "appointments": {
      "addAppointment": {
        "method": "POST",
        "path": "/api/v1/{userId}/pets/{petId}/appointments"
      },
      "getAppointments": {
        "method": "GET",
        "path": "/api/v1/{userId}/pets/{petId}/appointments"
      },
      "getAppointments:Id": {
        "method": "GET",
        "path": "/api/v1/{userId}/pets/{petId}/{appointmentId}/update"
      },
      "getAppointments:Id": {
        "method": "DELETE",
        "path": "/api/v1/{userId}/pets/{petId}/{appointmentId}/delete"
      }
    }
}
```

#### **Medicinsk journal**

Denna del av API:et möjliggör för en användare att registrera nya behandlingar och diagnoser för sina husdjur genom att skriva in detaljer som diagnos, vilken behandling djuret ska ha och datum för registreringen. Dessutom kan användaren hämta medicin historiken för ett specifikt husdjur, vilket ger en tydlig översikt över tidigare sjukdomar, behandlingar och medicinska åtgärder.

```json
{
    "medicalHistory": {
      "addMedicalRecord": {
        "method": "POST",
        "path": "/api/v1/{userId}/pets/{petId}/journal"
      },
      "getMedicalHistory": {
        "method": "GET",
        "path": "/api/v1/{userId}/pets/{petId}/journal"
      },
       "getMedicalHistory:Id": {
        "method": "PUT",
        "path": "/api/v1/{userId}/pets/{petId}/{journalId}/update"
      }, "getMedicalHistory:Id": {
        "method": "GET",
        "path": "/api/v1/{userId}/pets/{petId}/{journalId}/delete"
      }
    }
}
```