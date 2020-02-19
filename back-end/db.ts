const POI = {
  _id: <ObjectID>,
  id: "string",
  name: "string",
  poiType: "string",
  category: "string",
  address: {
    value: "string",
    lat: 0,
    lng: 0
  },
  phone: "string",
  email: "string",
  siret: "string",
  openingTime: {
    monday: [
      {
        from: "00:00",
        to: "00:00"
      }
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
  priceRange: "string",
  description: "string",
  website: "string",
  socialNetwork: "string",
  greenscore: 0,
  foodPreference: "string",
  takeAway: true,
  wheelchair: true,
  token: "string",
  status: "string",
  images: [
    "string"
  ]
}

const user = {
  _id: <ObjectID>,
  id: "string",
  email: "string",
  firstname: "string",
  lastname: "string",
  password: "string",
  roles: [
    "string"
  ],
  company_id: <ObjectID>,
  forgottenToken: "string",
  forgottenTokenTime: 0,
}

const company = {
  _id: <ObjectID>,
  id: "string",
  name: "string",
  domainName: "string",
  address: {
    value: "string",
    lat: 0,
    lng: 0
  },
  status: "string"
}