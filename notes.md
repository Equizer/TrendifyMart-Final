{/*                                  ALGORITHM FOR THE SELLER FEATURE FOR THE APPLICATION
// first i will let the user sign up then i would let the user chooose to be a consumer or to be a seller.
// so for that i have set the defualt value of seller to be false and the type to be a boolean so when the user signs in they are going to be just a user then in the profile sextion maybe i will give them an option to sign up to become a seller / partner to sell products oin the platform
//when the user signs up to become a seller i will get the user id fromthe local storage which will be stored in the auth-token then i will search for the user in the DB then change the value of the seller which was initially false to be true and then in my frontend i should have checks whether the user is seller or a consumer then we will decide whether to give the user certain features or not like CRUD product */ }


1. One thing that i noticed while working with react is that setState is a async function so we should avoid sending states into http request as it might send in he not updated value causing a delay in sending and unexpected output so we can use that in jsx becuz the state causes re-render so using it in jsx will cause a re-render whenever the state changes even though it takes some moments but if we send them in http requests it might send it before the state is changed
 - Therefore, we should always use the most updated values in while passing in functions and http requests to make sure the newest value is sent in the payload/arguments.
 
 2. when we are running functions for adding editing deleting something and we need to fetch data display after these functions it is a good practice to use await mark the function async and the function in which the function is used as well then we can ensure that fetching data is runs only after a certain function completes becuz sometimes fetching data was running before the product was added.




