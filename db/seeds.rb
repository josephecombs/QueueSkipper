# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "guest", password: "password1")
User.create(username: "joe", password: "joejoe", img_url: "http://archive.wizards.com/mtg/images/daily/events/gpauc08/T8_combs.jpg")
User.create(username: "selma", password: "Springfield", img_url: "http://img1.wikia.nocookie.net/__cb20140826210408/simpsons/images/b/ba/Selma_Bouvier.png")
User.create(username: "patty", password: "Bouvier", img_url: "http://upload.wikimedia.org/wikipedia/en/f/f8/Patty_Bouvier.png")
User.create(username: "matt", password: "leick1", img_url: "http://m.c.lnkd.licdn.com/mpr/pub/image-es1d6PGhM_mNG_CrxGEFpf-zV2xwItEPoy1D0hshVmKzQgcOes1DRTfhVdwSlW3-cqnP/matthew-leick.jpg")


Listing.create(eta: '14:05:06 PST', est_duration: '00:30:00', max_price: '$20.00', lister_id: 2, description: "Making a little money during App Academy's lunch, at a Generic SF Food Truck", latitude: 37.780011, longitude: -122.259845)
Listing.create(eta: '15:00:00 PST', est_duration: '00:45:00', max_price: '$35.00', lister_id: 3, description: "Come trade spots with me, Selma Bouvier, at the SF DMV line", latitude: 37.773413, longitude: -122.440459)
Listing.create(eta: '15:20:00 PST', est_duration: '01:05:00', max_price: '$40.00', lister_id: 4, description: "Me and my sister Selma are waiting in line at the DMV, for a change.  I'm at the Oakland DMV", latitude: 37.839537, longitude: -122.259845)
Listing.create(eta: '16:20:00 PST', est_duration: '02:05:00', max_price: '$40.00', lister_id: 5, description: "Arbitraging time right now!", latitude: 37.780097, longitude: -122.413574)


# Line.create(latitude: 37.773413, longitude: -122.440459, street_address: "1377 Fell St", city: "San Francisco", state: "CA", zip: 94117, floor: 1, description: "SF DMV Line")
# Line.create(latitude: 37.689241, longitude: -122.472895, street_address: "1500 Sullivan Ave", city: "Daly City", state: "CA", zip: 94015, floor: 1, description: "Daly City DMV Line")
# Line.create(latitude: 37.839537, longitude: -122.259845, street_address: "5300 Claremont Ave", city: "Oakland", state: "CA", zip: 94618, floor: 1, description: "Oakland DMV Line")
# Line.create(latitude: 37.934827, longitude: -122.517602, street_address: "75 Tamal Vista Blvd", city: "Marin County", state: "CA", zip: 94925, floor: 1, description: "Marin DMV Line")
# Line.create(latitude: 37.780011, longitude: -122.413520, street_address: "UN Plaza", city: "San Francisco", state: "CA", zip: "94102", floor: 1, description: "Generic SF Food Truck at UN Plaza")
#
# LineListing.create(lister_id: 3, price: '$35.00', line_id: 1, active: true, description: "Come trade spots with me, Selma Bouvier, at the SF DMV line")
# LineListing.create(lister_id: 4, price: '$20.00', line_id: 1, active: true, description: "Me and my sister Selma are waiting in line at the DMV, for a change")
# LineListing.create(lister_id: 2, price: '$5.00', line_id: 5, active: true, description: "Making a little money during App Academy's lunch")
#
# LineImage.create( line_id: 5, img_link: "http://www.tbd.com")
# LineImage.create( line_id: 5, img_link: "http://www.pwoiqrqp.com")
# LineImage.create( line_id: 1, img_link: "http://www.qwopierqpwiruqwe.com")
#
# LineListingImage.create( line_listing_id: 1, img_link: "http://blablablab.com/sdf.jpg")
# LineListingImage.create( line_listing_id: 1, img_link: "http://zzzzzz.com/oiwqyer.jpg")
# LineListingImage.create( line_listing_id: 3, img_link: "http://wiertopiu.com/2345s.jpg")


