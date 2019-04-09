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

Post.create({
  author_id: User.find_by(username: "test").id,
  content: "Born on January 9, 1992",
  event_date: demo_user_birth_date, 
  event_category: "birthday", 
  life_event: true
})

75.times do 
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

50.times do 
  success = false 

  until success 
    random_user = User.find_by(id: user_ids.sample)

    friend_request = FriendRequest.new({
      sender_id: User.find_by(username: "test").id, 
      receiver_id: random_user.id,
      status: "accepted",
      seen: true
    })

    if friend_request.save
      success = true
    else
      success = false 
    end 
  end

  50.times do 
    success = false 

    until success
      other_random_user = User.find_by(id: user_ids.sample)

      friend_request = FriendRequest.new({
        sender_id: random_user.id, 
        receiver_id: other_random_user.id,
        status: "accepted",
        seen: true
      })

      if friend_request.save 
        success = true 
      else 
        success = false
      end 
    end 
  end 
end 