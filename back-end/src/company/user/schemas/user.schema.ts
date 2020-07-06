export const UserSchema = {
  id: String,
  email: String,
  creationDate: String,
  firstname: String,
  lastname: String,
  password: String,
  roles: [
    String
  ],
  companyPosition: String,
  forgottenToken: String,
  forgottenTokenTime: Number,
  workplace: String,
  department: String,
  points: Number,
  weeklyPoints: Number,
  photo: String,
  challenges: [
    {
      id: String,
      title: String,
      category: String,
      date: String,
      photo: String,
      points: Number
    }
  ],
  visits: [
    {
      id: String,
      name: String,
      category: String,
      description: String,
      number: Number
    }
  ]
};