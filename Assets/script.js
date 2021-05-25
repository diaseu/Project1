$('#main').show()

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
});

document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  $('#main').show()
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
      $('#restaurantResults').html('')
      for (let i = 0; i < 5; i++) {
        let restName = data.businesses[i].name, address = data.businesses[i].location.display_address, phone = data.businesses[i].phone, price = data.businesses[i].price, rating = data.businesses[i].rating, imgSrc = data.businesses[i].image_url
        if (phone === '') {
          phone = 'No phone number'
        }
        if (!data.businesses[i].hasOwnProperty('price')) {
          price = 'No price available'
        }
        document.getElementById('restaurantResults').innerHTML += `
        
                  <div class="col s12 m11">
            <div class="card horizontal">
              <div class="card-image">
                <img src="${imgSrc}" class="responsive-img" alt="${restName}">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h4 class="header">${restName}</h4>
                  <p><strong>Address</strong>: ${address}</p>
                  <p class="mb-3"><strong>Phone</strong>: ${phone}</p>
                  <p><strong>Rating</strong>: ${rating}</p>
                  <p><strong>Price</strong>: ${price}</p>
                </div>
              </div>
            </div>
          </div>
                    
        
        `
      }
    })
    .catch(err => console.error(err))
  axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${cuisine}&apiKey=794d04dc9b2941a7ae833658031148f5`)
    .then(({ data }) => {
      for (let i = 0; i < 5; i++) {
        let recId = data.results[i].id
        axios.get(`https://api.spoonacular.com/recipes/${recId}/information?apiKey=794d04dc9b2941a7ae833658031148f5&includeNutrition=true`)
          .then(res => {
            let price = Math.round(100 * (res.data.pricePerServing / 100)) / 100, imgSrc = res.data.image, recipe = res.data.instructions, time = res.data.readyInMinutes, glutenFree = res.data.glutenFree ? true : false, glutenFreeDisplay = ''
            if (glutenFree) {
              glutenFreeDisplay = '✅'
            }
            else {
              glutenFreeDisplay = '❌'
            }
            document.getElementById('recipeResults').innerHTML += `
          <div class="col s12 m11">
            <div class="card horizontal">
              <div class="card-image">
                <img src="${imgSrc}" class="responsive-img" alt="${res.data.title}">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h4 class="header">${res.data.title}</h4>
                  <p><strong>Gluten-Free</strong>: ${glutenFreeDisplay}</p>
                  <p><strong>Servings</strong>: ${res.data.servings}</p>
                  <p><strong>Price</strong>: $${price}/serving</p>
                </div>
                <div class="card-action">
                  <a href="#" data-target="#recipe${i}" class="modal-trigger">See Recipe</a>
                  <a href=""><span class="material-icons right">bookmark_border</span></a>

                </div>
              </div>
            </div>
          </div>
                    
            <div id="recipe${i}" class="modal modal-fixed-footer">
              <div class="modal-content">
                <h4>${res.data.title}</h4>
                <p>${res.data.instructions}</p>
              </div>
              <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
              </div>
            </div>
            `
            console.log(res.data)
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {})
          })
          .catch(err => console.error(err))

      }

    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.className === 'modal-trigger') {
    let instance = M.Modal.getInstance(document.querySelector(event.target.dataset.target))
    instance.open()
  }
})