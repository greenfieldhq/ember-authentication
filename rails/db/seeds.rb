# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Speaker.delete_all
Speech.delete_all

bugs = Speaker.create(name: 'Bugs Bunny')
wile = Speaker.create(name: 'Wile E. Coyote')
yosemite = Speaker.create(name: 'Yosemite Sam')

bugs.speeches << Speech.new(name: 'Carrots, the other white meat.')
wile.speeches << Speech.new(name: 'Always look down!')
yosemite.speeches << Speech.new(name: 'Mudflaps and bad tattoos.')
