# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

demo_user_birth_date = Date.new(1992,1,10)

User.create({
  username: "test", 
  password: "starwars",
  first_name: "Ariel", 
  last_name: "Walker", 
  birth_date: demo_user_birth_date,
  gender: "F"
})

demo_user = User.find_by(username: "test")

Post.create({
  author_id: demo_user.id,
  content: "Born on January 9, 1992",
  event_date: demo_user_birth_date, 
  event_category: "birthday", 
  life_event: true
})

27.times do 
  male_first_name = Faker::Name.male_first_name
  male_birth_date = Faker::Date.birthday(18, 65)
  male_birthday_string = "#{Date::MONTHNAMES[male_birth_date.month]} #{male_birth_date.day}, #{male_birth_date.year}"
  
  male_user = User.new({
    username: male_first_name.downcase, 
    password: "starwars",
    first_name: male_first_name, 
    last_name: Faker::Name.last_name, 
    birth_date: male_birth_date,
    gender: "M"
  })

  if male_user.save
    Post.create({
      author_id: User.find_by(username: male_first_name.downcase).id,
      content: "Born on #{male_birthday_string}",
      event_date: male_birth_date, 
      event_category: "birthday", 
      life_event: true
    })
  end

  female_first_name = Faker::Name.female_first_name
  female_birth_date = Faker::Date.birthday(18, 65)
  female_birthday_string = "#{Date::MONTHNAMES[female_birth_date.month]} #{female_birth_date.day}, #{female_birth_date.year}"

  female_user = User.create({
    username: female_first_name.downcase, 
    password: "starwars",
    first_name: female_first_name, 
    last_name: Faker::Name.last_name, 
    birth_date: female_birth_date,
    gender: "F"
  })

  if female_user.save 
    Post.create({
      author_id: User.find_by(username: female_first_name.downcase).id,
      content: "Born on #{female_birthday_string}",
      event_date: female_birth_date, 
      event_category: "birthday", 
      life_event: true
    })
  end 
end 

user_ids = User.pluck(:id)
user_ids.delete(demo_user.id)

24.times do 
  random_id = user_ids.sample
  random_user = User.find_by(id: random_id)
  user_ids.delete(random_id)

  FriendRequest.create({
    sender_id: demo_user.id, 
    receiver_id: random_user.id,
    status: "accepted",
    seen: true
  })

  other_user_ids = User.pluck(:id)
  other_user_ids.delete(demo_user.id)
  other_user_ids.delete(random_user.id)

  19.times do 
    random_id = other_user_ids.sample
    other_random_user = User.find_by(id: random_id)
    other_user_ids.delete(random_id)

    sent_friend_request = FriendRequest.find_by(sender_id: other_random_user.id)

    unless sent_friend_request
      FriendRequest.create({
        sender_id: random_user.id, 
        receiver_id: other_random_user.id,
        status: "accepted",
        seen: true
      })
    end
  end 
end 