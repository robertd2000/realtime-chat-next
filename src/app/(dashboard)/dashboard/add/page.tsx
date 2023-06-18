import React, { FC } from 'react'
import AddFriendButton from '@/components/AddFriendButton/AddFriendButton'
import style from '@/styles/pages/dashboard/add/dashboardAdd.module.scss'

const AddDashboardPage: FC = () => {
  return (
    <main className={style.dashboardAdd}>
      <h1>Add a friend</h1>
      <AddFriendButton />
    </main>
  )
}

export default AddDashboardPage
