json.extract! @listing, :id
json.extract! @listing, :eta
json.extract! @listing, :est_duration
json.extract! @listing, :max_price
json.extract! @listing, :latitude
json.extract! @listing, :longitude
json.extract! @listing, :description
json.extract! @listing, :created_at  

json.lister do
  json.id @listing.lister.id
  json.img_url @listing.lister.img_url
  json.username @listing.lister.username
end

if (@listing.booker)
  json.booker do
    json.id @listing.booker.id
    json.img_url @listing.booker.img_url
    json.username @listing.booker.username
  end
end