import React from 'react'

const Searchbar = () => {
  return (
    <div className='d-flex justify-content-center my-3'>
      <button className='btn btn-secondary mx-2'>Filter</button>
      <div>
        <input  className="form-control" type="search" placeholder='Search here...' />
        </div>
      <button className='btn btn-primary'>Search</button>
    </div>
  )
}

export default Searchbar
