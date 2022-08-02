# API list for KheirwBarake

### expected API Link example:

#### get user for login
> request method: GET
> https://www.antisoft.com/api/v1/login?username=user1

the username will be sent as a query in the link

##### expected response example:
 ```json:
  response:
  { status: 200,
  error: false,
  message: "success",
  payload:{ _ID: 1,
	   username: "user1",
	   password:" 123456"}
  }
  ```
##### OR 
```json:
 response: 
 { status: 404, 
 error: true, 
 message: "user not found"}
```

#### create a user in the Database

> request method: POST
> https://www.antisoft.com/api/v1/create-new-user
> body of request: {username: user2, password: 123456}

##### expected response example:
 ```json:
  response:
  { status: 200, 
  error: false,
  message: "user created successfully",
  payload:{ _ID: 1, 
	  username: "user1", 
	  password: 123456}
  }
  ```
##### OR 
```json:
 response: 
 {  status: 409, 
	error: true,
	message: "user name already exist"
	}
```

---------------
#### get categories
> request method: GET
> https://www.antisoft.com/api/v1/get-categories

 ##### expected response example:
 ```json: 
response: { status: 200, 
error: false,
message: "success",
payload:{ 
_id: 1,
name: "category 1",
productes: [{
		_id:1
		name: "lettuce",
		category_id:1,
		price: 20,
		currency: "USD",
		stock: 20,
		maxOrderPerUser: 3,},
	{
		_id:2
		name: "salt",
		category_id:1,
		price: 5,
		currency: "USD",
		stock: 15,
		maxOrderPerUser: 5,}
]
}
```
