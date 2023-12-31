import React from 'react'
import Sidebar from './Sidebar'

const OffCanvas = () => {
  return (
    <div class="offcanvas offcanvas-start" id="demo">
      <div class="offcanvas-header">
        <h1 class="offcanvas-title">Menu</h1>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
    <Sidebar />
      </div>
    </div>
  )
}

export default OffCanvas
