document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  let zipcode = document.getElementById('location').value, cuisine = document.getElementById('cuisine').value
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      // here, pass the actual API request url you are trying to hit
      'Target-URL': `https://api.yelp.com/v3/businesses/search?location=${zipcode}&term=${cuisine}`,
      // here, put any other important headers if needed from the API
      'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
    }
   })
    .then(({ data }) => {
      console.log(data)
    })
    .catch(err => console.error(err))
  })