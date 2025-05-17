import React from 'react'
import MyProfile from '../component/my-profile/page'
import ChangePassword from '../component/change-password/changePasword'
import Payment1 from '../component/payment/payment1'
import Payment2 from '../component/payment/payment2'
import Payment3 from '../component/payment/payment3'
import DeleteAccount from '../component/delete-account/deleteaccount'
import DeleteModal from '../component/delete-account/deletemodal'
import Setting from '../component/setting/setting'

export default function MyAccount() {
  return (
    <>
        <MyProfile />
        <Payment1 />
        <Payment2 />
        <Payment3 />
        <DeleteAccount />
        <DeleteModal />
        <Setting />
        <ChangePassword />
    </>
  )
}
