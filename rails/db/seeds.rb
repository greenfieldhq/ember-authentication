# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Speaker.delete_all
Speech.delete_all
User.delete_all
ApiKey.delete_all

ryan = User.create(name: 'Ryan Tremaine',
                  username: 'rtremaine',
                  email: 'ryan@greenfieldhq.com',
                  password: 'rt',
                  password_confirmation: 'rt')

mike = User.create(name: 'Mike Munroe',
                  username: 'mmunroe',
                  email: 'mike@greenfieldhq.com',
                  password: 'mm',
                  password_confirmation: 'mm')

ryan.api_keys << ApiKey.create(access_token: SecureRandom.hex,
                                scope: 'session',
                                expired_at: 4.hours.from_now)
ryan.api_keys << ApiKey.create(access_token: SecureRandom.hex,
                                scope: 'api',
                                expired_at: 4.hours.from_now)

mike.api_keys << ApiKey.create(access_token: SecureRandom.hex,
                                scope: 'session',
                                expired_at: 4.hours.from_now)
mike.api_keys << ApiKey.create(access_token: SecureRandom.hex,
                                scope: 'api',
                                expired_at: 4.hours.from_now)

bugs = Speaker.create(name: 'Bugs Bunny')
wile = Speaker.create(name: 'Wile E. Coyote')
yosemite = Speaker.create(name: 'Yosemite Sam')

bugs.speeches << Speech.new(name: 'Carrots, the other white meat.')
wile.speeches << Speech.new(name: 'Always look down!')
yosemite.speeches << Speech.new(name: 'Mudflaps and bad tattoos.')

