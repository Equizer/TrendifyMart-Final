import React, { useRef } from 'react'

const EditProduct = () => {
  const closeRef = useRef(null);
  const handleSave = () => {
    closeRef.current.click();
  } 
  return (
    <>
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
          <button ref={closeRef} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal content goes here...</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onClick={handleSave}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default EditProduct
