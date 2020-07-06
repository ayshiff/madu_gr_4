# Se connecter

## get company data from domain name `GET /companies/domain/hetic.net`

### Response
```
{
    "workplaces": [
        "Montreuil"
    ],
    "name": "hetic",
    "domainName": "hetic.net",
    "departments": [
        {
            "name": "Web",
            "points": 0
        },
        {
            "name": "H",
            "points": 0
        }
    ],
    "id": "4f9fabe3-5b40-4cec-96f5-2842421aa9d3"
}
```

## register `POST /companies/4f9fabe3-5b40-4cec-96f5-2842421aa9d3/users`

### Request - row json
```
{
	"email": "corentin.croizat2@hetic.net",
	"firstname": "corentin",
	"lastname": "croizat",
  "workplace": "Montreuil",
  "department": "Web",
  "companyPosition": "Etudiant",
  "password": "password"
}
```

### Response
```
{
    "roles": [
        "user"
    ],
    "email": "corentin.croizat2@hetic.net",
    "firstname": "corentin",
    "lastname": "croizat",
    "workplace": "Montreuil",
    "department": "Web",
    "companyPosition": "Responsable Marketing",
    "challenges": [],
    "visits": [],
    "id": "40925c79-49e4-4fdc-9c61-cfa9be0a782a",
    "points": 0,
    "company_id": "4f9fabe3-5b40-4cec-96f5-2842421aa9d3"
}
```


## log in `POST /auth/login`

### Request - row json
```
{"email": "corentin.croizat2@hetic.net", "password": "password"}
```

### Response
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlYnAyMDIwQGhldGljLm5ldCIsInN1YiI6IjZlZjNmOGQ0LTI0Y2UtNDBiMy1hZWQ2LTAwNmM3NDI1MTViZCIsImlhdCI6MTU5Mzk3OTMwMCwiZXhwIjoxNTk0MDY1NzAwfQ.rypo7Ea7Sz1gBiryb1Cs9Qnf3aLjKs083xToi2ZKzhw"
}
```

## get profile `GET /users/profile`

### Response
```
{
    "roles": [
        "user",
        "manager",
        "admin"
    ],
    "challenges": [
        {
            "id": "56a65419-6be1-451c-8897-90e20a960b40",
            "title": "Lundi c'est veggie !",
            "category": "Alimentation",
            "date": "2020-07-06T10:27:18.030Z",
            "photo": "string",
            "points": 120
        }
    ],
    "visits": [
        {
            "id": "3faa69b5-b7cc-4b85-9b5f-c813ee635299",
            "name": "Granny Alice",
            "category": "restoration",
            "description": "Restauration rapide",
            "number": 2
        }
    ],
    "email": "webp2020@hetic.net",
    "firstname": "Eric",
    "lastname": "Priou",
    "workplace": "Montreuil",
    "department": "Web",
    "companyPosition": "Intervenant",
    "id": "6ef3f8d4-24ce-40b3-aed6-006c742515bd",
    "points": 0,
    "photo": "6693a60d-3e17-487a-b24e-86eff10b5c99"
    "company": {
        "address": {
            "value": "24 rue du progres Montreuil",
            "lat": 2.412336,
            "lng": 48.643817
        },
        "workplaces": [
            "Montreuil"
        ],
        "name": "madu",
        "domainName": "madu.net",
        "employees": "1 - 5",
        "departments": [
            {
                "name": "Web",
                "points": 0
            }
        ],
        "id": "40925c79-49e4-4fdc-9c61-cfa9be0a782a",
        "status": "not_enough_poi"
    }
}
```

## add picture to profile `POST /users/image`

### Request - form-data
```
{"image": img.jpg}
```

### Response
```
{
    "roles": [
        "user",
        "manager",
        "admin"
    ],
    "challenges": [],
    "visits": [],
    "email": "webp2020@hetic.net",
    "firstname": "Eric",
    "lastname": "Priou",
    "workplace": "Montreuil",
    "department": "Web",
    "companyPosition": "Intervenant",
    "id": "6ef3f8d4-24ce-40b3-aed6-006c742515bd",
    "points": 80,
    "photo": "6693a60d-3e17-487a-b24e-86eff10b5c99"
}
```

## get image `GET /images/6693a60d-3e17-487a-b24e-86eff10b5c99`
get image is used for all images in the app (not juste for profile)

### Response
img.jpg


# Se rendre dans un poi

## get poi `GET /poi`

### Response
```
[
    {
        "address": {
            "value": "65 bis Rue Marceau, 93100 Montreuil",
            "lat": 2.424812,
            "lng": 48.8526647
        },
        "openingTime": {
            "monday": [
                {
                    "from": "11:30",
                    "to": "15:00"
                }
            ],
            "tuesday": [
                {
                    "from": "11:30",
                    "to": "15:00"
                }
            ],
            "wednesday": [
                {
                    "from": "11:30",
                    "to": "15:00"
                }
            ],
            "thursday": [
                {
                    "from": "11:30",
                    "to": "15:00"
                }
            ],
            "friday": [
                {
                    "from": "11:30",
                    "to": "15:00"
                }
            ],
            "saturday": [],
            "sunday": []
        },
        "poiType": [
            "restauration"
        ],
        "images": [
            "4e3969df-012d-42b4-a17b-58d291c86406"
        ],
        "name": "Granny Alice",
        "phone": "0141699379",
        "priceRange": "€",
        "description": "Restauration rapide",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "website": "https://github.com/ayshiff",
        "email": "string@hetic.net",
        "siret": "string",
        "category": "restoration",
        "socialNetwork": "https://github.com/ayshiff",
        "id": "3faa69b5-b7cc-4b85-9b5f-c813ee635299",
        "visits": 0,
        "likes": [],
        "status": "canvassing"
    }
]
```

## like poi `POST /poi/3faa69b5-b7cc-4b85-9b5f-c813ee635299/like`

### Response
```
[
    {
        "address": {},
        "openingTime": {},
        "poiType": [
            "restauration"
        ],
        "images": [],
        "name": "Granny Alice",
        "phone": "0141699379",
        "priceRange": "€",
        "description": "Restauration rapide",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "website": "https://github.com/ayshiff",
        "email": "string@hetic.net",
        "siret": "string",
        "category": "restoration",
        "socialNetwork": "https://github.com/ayshiff",
        "id": "3faa69b5-b7cc-4b85-9b5f-c813ee635299",
        "visits": 0,
        "likes": [
            "782e6463-675b-4d44-9faf-06663260b204"
        ],
        "status": "canvassing"
    }
]
```

## like poi `POST /poi/3faa69b5-b7cc-4b85-9b5f-c813ee635299/visited`
This api call also modify the user's profile

### Response
```
[
    {
        "address": {},
        "openingTime": {},
        "poiType": [
            "restauration"
        ],
        "images": [],
        "name": "Granny Alice",
        "phone": "0141699379",
        "priceRange": "€",
        "description": "Restauration rapide",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "website": "https://github.com/ayshiff",
        "email": "string@hetic.net",
        "siret": "string",
        "category": "restoration",
        "socialNetwork": "https://github.com/ayshiff",
        "id": "3faa69b5-b7cc-4b85-9b5f-c813ee635299",
        "visits": 1,
        "likes": [
            "782e6463-675b-4d44-9faf-06663260b204"
        ],
        "status": "canvassing"
    }
]
```

# Réaliser un défi

## get challenges `GET /challenges`

### Response
```
[
    {
        "startDate": "2020-07-06T00:00:00.000",
        "title": "Lundi c'est veggie !",
        "description": "Chaque français consomme 87kg de viande par an ...",
        "content": "string",
        "category": "Alimentation",
        "points": 110,
        "photo": "string",
        "participants": [],
        "id": "56a65419-6be1-451c-8897-90e20a960b40"
    }
]
```

## validate challenge `POST /challenges/56a65419-6be1-451c-8897-90e20a960b40/validate`
This api call also modify the user's profile

### Request - form-data
```
{"image": img.jpg}
```

### Response
```
[
    {
        "startDate": "2020-07-06T00:00:00.000",
        "title": "Lundi c'est veggie !",
        "description": "Chaque français consomme 87kg de viande par an ...",
        "content": "string",
        "category": "Alimentation",
        "points": 110,
        "photo": "string",
        "participants": [
            {
                "id": "782e6463-675b-4d44-9faf-06663260b204",
                "firstname": "corentin",
                "lastname": "croizat",
                "companyPosition": "Etudiant",
                "profilePhoto": null,
                "challengePhoto": "0ec58f13-a441-4ee9-ae99-0642815f8fd5"
            }
        ],
        "id": "56a65419-6be1-451c-8897-90e20a960b40"
    }
]
```