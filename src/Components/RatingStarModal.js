import React, { useContext, useState } from "react";
import RatingStars from "./RatingStars";
import ProductContext from '../context/products/ProductContext'
import BookmarkContext from '../context/bookmarked/BookmarkedContext'

const RatingStar = (props) => {
  const productContext = useContext(ProductContext);
  const { addRatingStars, fetchAllProducts, reviewStatus} = productContext;
  const bookmarkContext = useContext(BookmarkContext);
  const { fetchUserBookmarkedItems } = bookmarkContext;
  const [stars, setStars] = useState(0);
  const submitReview = async () => {
    await addRatingStars(props.currentStarProductId, stars);
    await fetchAllProducts();
    await fetchUserBookmarkedItems();
    setStars(0);
  }

  return (
    <div className="modal fade" id={`ratingStar-${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      {!reviewStatus ? <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Rate this Product</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>{props.currentStarProductName}</p>
            <RatingStars stars={stars} setStars={setStars} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" disabled={stars === 0} onClick={submitReview}>Submit</button>
          </div>
        </div>
      </div>
        :
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Thank you for reviewing this product.</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{props.currentStarProductName}</p>
              <RatingStars stars={stars} setStars={setStars} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" disabled={stars === 0} onClick={submitReview}>Submit</button>
            </div>
          </div>
        </div>}

    </div>
  )
}

export default RatingStar