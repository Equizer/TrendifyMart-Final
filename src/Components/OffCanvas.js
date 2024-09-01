import React from 'react'
import Sidebar from './Sidebar'

const OffCanvas = () => {
  return (
    <div className="offcanvas offcanvas-start bg-primary off-canvas-query" id="demo" style={{width: "160px"}}>
      <div className="offcanvas-header">
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" style={{zIndex: 100, position: "absolute", right: "15px", top: "20px"}}></button>
      </div>
      <div className="offcanvas-body">
        <Sidebar />
      </div>
    </div>
  )
}

export default OffCanvas
