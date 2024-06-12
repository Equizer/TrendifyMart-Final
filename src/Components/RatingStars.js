import React, { useState } from 'react'

function RatingStars() {
  const [stars, setStars] = useState(0);
  const findStarNumber = (number) => {
    setStars(number);
  }
  const printStars = () => {
    let starsArr = [];
    for (let i = 0; i < 5; i++) {
      starsArr.push(<i key={i} onClick={() => findStarNumber(i + 1)} className={`fa-${i < stars ? 'solid' : 'regular'} fa-star`}></i>) // passing i + 1 because i is initially 0 so clicking on to rate 2 star would actually give 1
    }
    return starsArr
  }

  const clearStars = () => {
    setStars(0);
  }

  return (
    <div>
      {printStars()}
      <i class="fa-solid fa-trash mx-3" onClick={clearStars}></i>
    </div>
  )
}

export default RatingStars
