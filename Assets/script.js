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
        let restName = data.businesses[i].name
        document.getElementById('restaurantResults').innerHTML += `
        <div class="row mt-3">
            <div class="col s3">
              <img src="https://dummyimage.com/200x200/666/fff.jpg&text=rest" >
            </div>
            <div class="col s9">
              <h3 class="mb-1">${restName}</h2>
              <p>Address: 1234 Candy Cane Rd, Snowland, CA 92222</p>
              <p class="mb-3">Phone Number: 17141234567</p>

              <p>Rating: # (# reviews)</p>
              <p class="mb-3">Price: $</p>
            </div>
          </div>
        `
        console.log(data.businesses[i].name)
      }
    })
    .catch(err => console.error(err))
})