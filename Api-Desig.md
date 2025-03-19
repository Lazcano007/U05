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
/user/logout

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
    "name": "Pedro",
    "email": "Pedro@test.com",
    "password": "$2b$10$jjCX8rq8/DKMsI/91IozbeYwNpfOgBaNydqrOVzqB1OFkSi7py2i.",
    "_id": "67dadd502e084ecd23ee7167",
    "__v": 0
},

//Registrera Husdjur
{
  "pets": [
    {
      "owner": "67dadd502345344ecd23ee7167",
      "vaccinations": [],
      "name": "lilo",
      "species": "angora",
      "breed": "cat",
      "age": 1,
      "_id": "67dadd832e0834534d23ee716a",
      "__v": 0
    },
    {
      "owner": "67dadd502e0r34534wer23ee7167",
      "vaccinations": [],
      "name": "Peter",
      "species": "angora",
      "breed": "kängru",
      "age": 1,
      "_id": "67dadd832e0633453423ee716a",
      "__v": 0
    }
  ]
}

// Vaccination 
{
"petID": 1,
"vaccinations": [
   {
      "pet": "67dadd832e084ecd23ee716a",
      "name": "antibiotic shot",
      "date": "2025-03-16T00:00:00.000Z",
      "description": "infeccted nose ring",
      "_id": "67daded82e084ecd23ee7173",
      "__v": 0
    },
    {
      "pet": "67dadd832e084ecd23ee716a",
      "name": "antibiotic shot",
      "date": "2025-03-16T00:00:00.000Z",
      "description": "infeccted nose ring",
      "_id": "67daded82e084ecd23ee7173",
      "__v": 0
    }
  ]
}

//Veterinärbesök
{
  "petID": 1,
  "appointments": [
    {
      "petId": "67dadd832e084ecd23ee716a",
      "userId": "67dadd502e084ecd23ee7167",
      "date": "2025-03-19T00:00:00.000Z",
      "time": 1300,
      "description": "nose drop drop for nose-infecction",
      "_id": "67dae0be2e084ecd23ee7184",
      "__v": 0
    },
    {
      "petId": "67dadd832e084ecd23ee716a",
      "userId": "67dadd502e084ecd23ee7167",
      "date": "2025-03-19T00:00:00.000Z",
      "time": 1300,
      "description": "nose drop drop for nose-infecction",
      "_id": "67dae0be2e084ecd23ee7184",
      "__v": 0
    }
  ] 
}

// Journal
{
  "petID": 1,
  "journal": [
    {
      "petId": "67dadd832e084ecd23ee716a",
      "description": "nose infecction needs curing",
      "treatment": "nose-drops",
      "dateDiagnosis": "2025-01-18T00:00:00.000Z",
      "status": "ongoing",
      "_id": "67dae0072e084ecd23ee717b",
      "__v": 0
    },
    {
      "petId": "67dadd832e084ecd23ee716a",
      "description": "nose infecction needs curing",
      "treatment": "nose-drops",
      "dateDiagnosis": "2025-01-18T00:00:00.000Z",
      "status": "ongoing",
      "_id": "67dae0072e084ecd23ee717b",
      "__v": 0
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
      "createUser": {
        "method": "POST",
        "path": "/api/v1/Users/registration"
      },
      "loginUser": {
        "method": "POST",
        "path": "/api/v1/Users/login"
      },
      "getUsers": {
        "method": "GET",
        "path": "/api/v1/Users/"
      },
      "logoutUser": {
        "method": "POST",
        "path": "/api/v1/Users/logout"
      }
    }
}
```

#### **Husdjur**

Denna del av API:et möjliggör för en användare att registrera nya husdjur genom att fylla i namn, ålder och ras. Dessutom kan användaren hämta en lista över samtliga registrerade husdjur kopplade till sitt konto, vilket underlättar hanteringen av husdjuren. 
```json
{
  "pets": {
    "createPet": {
      "method": "POST",
      "path": "/api/v1/Pets/create"
    },
    "getUserPets": {
      "method": "GET",
      "path": "/api/v1/Pets/users/{petId}"
    },
    "getPetById": {
      "method": "GET",
      "path": "/api/v1/Pets/update/{petId}"
    },
     "updatePet": {
      "method": "PUT",
      "path": "/api/v1/Pets/update/{petId}"
    },
      "deletePet": {
      "method": "DELETE",
      "path": "/api/v1/Pets/delete/{petId}"
    }
  }
}
```
#### **Vaccination**

Denna del av API:et möjligtgör för en användare att registrera nya vaccinationer för sina husdjur genom att skriva information som vaccinnamn och datum. Dessutom kan användaren hämta vaccinationshistorik för ett specifikt husdjur, vilket ger en tydlig översikt över tidigare och kommande vaccinationer.
```json
{
  "vaccinations": {
      "createVaccin": {
        "method": "POST",
        "path": "/api/v1/Vaccins/create/"
      },
      "getVaccinsForPet": {
        "method": "GET",
        "path": "/api/v1/Vaccins/pet/{petId}"
      },
      "getVaccinById": {
        "method": "GET",
        "path": "/api/v1/Vaccins/{vaccinId}"
      },
      "updateVaccinForPet": {
        "method": "PUT",
        "path": "/api/v1/Vaccins/pets/{petId}/vaccins/{vaccinId}"
      },
      "deleteVaccinFromJournal": {
        "method": "DELETE",
        "path": "/api/v1/Vaccins/pets/{petId}/vaccins/{vaccinId}"
      }
    }
}
```

#### **Besök**

Denna del av API:et gör det möjligt för användare att registrera kommande veterinärbesök för sina husdjur genom att skriva information som datum, tid och en kort beskrivning av besöket. Dessutom kan användaren hämta information om planerade veterinärbesök, inkl nästa inbokade besök är.
```json

{   
  "appointments": {
      "createAppointment": {
        "method": "POST",
        "path": "/api/v1/Appointments/create"
      },
      "getAppointments": {
        "method": "GET",
        "path": "/api/v1/Appointments/pet/{petId}"
      },
      "updateAppointment": {
        "method": "GET",
        "path": "/api/v1/Appointments/update/{appointmentId}"
      },
      "deleteAppointment": {
        "method": "DELETE",
        "path": "/api/v1/Appointments/delete/{appointmentId}"
      }
    }
}
```

#### **Medicinsk journal**

Denna del av API:et möjliggör för en användare att registrera nya behandlingar och diagnoser för sina husdjur genom att skriva in detaljer som diagnos, vilken behandling djuret ska ha och datum för registreringen. Dessutom kan användaren hämta medicin historiken för ett specifikt husdjur, vilket ger en tydlig översikt över tidigare sjukdomar, behandlingar och medicinska åtgärder.

```json
{
    "Journal": {
      "createJournal": {
        "method": "POST",
        "path": "/api/v1/Journals/create"
      },
      "getJournalsForPet": {
        "method": "GET",
        "path": "/api/v1/Journals/pet/{petId}"
      },
      "updateJournal": {
        "method": "PUT",
        "path": "/api/v1/Journals/update/{journalId}"
      }, 
      "deleteJournal": {
        "method": "DELETE",
        "path": "/api/v1/Journals/delete/{journalId}"
      }
    }
}
```