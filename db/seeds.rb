# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "guest", password: "password1")
User.create(username: "joe", password: "joejoe")
User.create(username: "selma", password: "Springfield")
User.create(username: "patty", password: "Bouvier")

Line.create(latitude: 37.773413, longitude: -122.440459, street_address: "1377 Fell St", city: "San Francisco", state: "CA", zip: 94117, floor: 1, description: "SF DMV Line")
Line.create(latitude: 37.689241, longitude: -122.472895, street_address: "1500 Sullivan Ave", city: "Daly City", state: "CA", zip: 94015, floor: 1, description: "Daly City DMV Line")
Line.create(latitude: 37.839537, longitude: -122.259845, street_address: "5300 Claremont Ave", city: "Oakland", state: "CA", zip: 94618, floor: 1, description: "Oakland DMV Line")
Line.create(latitude: 37.934827, longitude: -122.517602, street_address: "75 Tamal Vista Blvd", city: "Marin County", state: "CA", zip: 94925, floor: 1, description: "Marin DMV Line")
Line.create(latitude: 37.780011, longitude: -122.413520, street_address: "UN Plaza", city: "San Francisco", state: "CA", zip: "94102", floor: 1, description: "Generic SF Food Truck at UN Plaza")

LineListing.create(lister_id: 3, price: '$35.00', line_id: 1, active: true, description: "Come trade spots with me, Selma Bouvier, at the SF DMV line")
LineListing.create(lister_id: 4, price: '$20.00', line_id: 1, active: true, description: "Me and my sister Selma are waiting in line at the DMV, for a change")
LineListing.create(lister_id: 2, price: '$5.00', line_id: 5, active: true, description: "Making a little money during App Academy's lunch")

