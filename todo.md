1. Make the Search bar functional also the filter option  - *PENDING*
2. Enable the seller to upload images of the product from their device  - *PENDING*
3. Add content on about page  - *PENDING*
4. Fix the UI of profile page  - *PENDING*
5. Fix the responsiveness of alert popup - The alert popup on our application is not responsive and the way it is placed is not recommended  - *PENDING*
6. Make the Stars and review count functional - we obviously cannot let the seller enter the stars and reviews count neither we can add it manually as it is not recommended so we need make a way so that buyers can add review then it will increment the review count and also update the star count.  - *PENDING*
7. Make the order summary functional ( the amount in the checkout should be according to the cart items )  - *PENDING*
8. Make the bookmark button toggle between two states one state for already bookmarked and one for the products that are not bookmarked in the bookmarked page the button will be of bookmarked but if pressed it will remove from the bookmark and even on the home page when user scrolls if the product they are shown is already bookmarked then it should show the button of bookmarked. - **DONE**
9. make a popup appear when someone deletes an item to undo it - **DONE**
10. Next we need to figure out how we can make the rating button functional so that a user can leave ratings for the product and others can view the ratings - **DONE** 
11. we should make a component that opens a particular product in full screen that has even more information of the product.  - *PENDING*
12. also making an algorithm or someway to mark only some sellers as verified as everyone cannot be a verified seller as it builds trust to the customer if the person is verified.  - *PENDING*
13. add infinite scroll to the website  - *PENDING*
14. add loading bars as in when the products are being fetched it should show some loading elements in place of each product  - *PENDING*
15. add top loading bars - **DONE**
16. currently in the ratings star component we need to find a way to turn the stars solid when a user clicks on a star so all the stars on left should turn solid - **DONE**
17. make an API that will keep updating the ratings of the product whenever someone rates that product
18. try to find a way so that in the middleware fetchuser we can find out by the token whether the token is of a seller or a buyer and storing it in like req.user.role  - *PENDING*
19. made an endpoint for adding the star rating but rn it is not done correclty as it doesnot set it to the average of all the counts but it sets to whatever the last user sets it to so we have to do it next  - *PENDING*