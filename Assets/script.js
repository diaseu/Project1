document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  let zipcode = document.getElementById('location').value, cuisine = document.getElementById('cuisine').value
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      // here, pass the actual API request url you are trying to hit
      'Target-URL': `https://api.yelp.com/v3/businesses/search?location=${zipcode}&term=${cuisine}&limit=5`,
      // here, put any other important headers if needed from the API
      'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
    }
  })
    .then(({ data }) => {
      for (let i = 0; i < 5; i++) {
        let restName = data.businesses[i].name, address = data.businesses[i].location.display_address, phone = data.businesses[i].phone, price = data.businesses[i].price, rating = data.businesses[i].rating
        document.getElementById('restaurantResults').innerHTML += `
        <div class="row mt-3">
            <div class="col s3">
              <img src="https://dummyimage.com/200x200/666/fff.jpg&text=rest" >
            </div>
            <div class="col s9">
              <h3 class="mb-1"> ${restName}</h2>
              <p>Address: ${address}</p>
              <p class="mb-3"> phone: ${phone}</p>

              <p>Rating: ${rating}</p>
              <p class="mb-3">Price: ${price}</p>
            </div>
          </div>
        `
        console.log(data.businesses[i].name)
      }
    })
    .catch(err => console.error(err))
})