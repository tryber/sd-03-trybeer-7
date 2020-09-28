import React from 'react'
import AdminButtons from './AdminButtons'

function AdminSideBar() {
  return (
    <div
    className="side-menu-container"
    style={{ width: '250px', backgroundColor: 'black' }}
  >
    <AdminButtons />
  </div>
  )
}

export default AdminSideBar
