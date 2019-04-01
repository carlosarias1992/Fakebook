# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

birth_date = Date.new(1992,1,10)

User.create({
  username: "test", 
  password: "starwars",
  first_name: "Ariel", 
  last_name: "Walker", 
  birth_date: birth_date,
  gender: "F"
})