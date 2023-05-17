//page1
> (GET) List of all cities
* http://localhost:8770/location
> (GET) List of all restaurants
* http://localhost:8770/restaurants
> (GET) Restaurants wrt city
* http://localhost:8770/restaurants?stateId=3
> (GET) List of meals
* http://localhost:8770/meals

//page2
> (GET) Restaurants wrt to mealType
* http://localhost:8770/restaurants?mealId=3
* http://localhost:8770/restaurants?mealId=3&stateId=2
> (GET) Filter Restaurants wrt to mealType + cuisineType
* http://localhost:8770/filters/4?cuisineId=3
> (GET) Filter Restaurants wrt to mealType + cost
> (GET) Sort on thr basis of price
> (GET) Pagination

// Page3
> (GET) Detilas of the restaurant
> (GET) Menu wrt to restaurant

// Page4
> (POST) Details of selected menu
> (POST) Place order

// Page5
> (GET) View all order/Wrt to email
> (PUT) Update order details
> (DELETE) Delete order

