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
* http://localhost:8770/filters/3?lcost=500&hcost=2000
> (GET) Sort on thr basis of price
* http://localhost:8770/filters/1?cuisineId=1&sort=1
> (GET) Pagination
* http://localhost:8770/filters/1?cuisineId=1&sort=1&skip=1&limit=2

// Page3
> (GET) Detilas of the restaurant
* http://localhost:8770/details/6288d22dbb17b75750d11ca8
> (GET) Menu wrt to restaurant
* http://localhost:8770/menu/10

// Page4
> (POST) Details of selected menu
* http://localhost:8770/menuDetails
 {"id":[4,2,6]}
> (POST) Place order
* http://localhost:8770/placeOrder
{
    "orderId": 6,
    "name": "Amit",
    "email": "amit@gmail.com",
    "address": "Hom 65",
    "phone": 8934645457,
    "cost": 922,
    "menuItem": [
      23,
      11,
      14,
      19
    ]
  }

// Page5
> (GET) View all order/Wrt to email
* http://localhost:8770/orders
> (PUT) Update order details
* http://localhost:8770/updateOrder
{
	"_id":"6466f48b6ac1aecc52d5b43b",
	"status":"Delivered"
}
> (DELETE) Delete order
* http://localhost:8770/deleteOrder
{"_id":"6466f4c06ac1aecc52d5b43c"}
