export const UserSchema = {
  id: String,
  email: String,
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
  photo: String,
  challenges: [
    {
      id: String,
      title: String,
      category: String,
      date: String,
      photo: String
    }
  ],
  visits: [
    {
      id: String,
      name: String,
      category: String,
      number: Number
    }
  ]
};