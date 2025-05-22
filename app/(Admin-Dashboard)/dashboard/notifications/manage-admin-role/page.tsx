import AdminRollTable from '@/app/(Admin-Dashboard)/component/notificationSetting/AdminRollTable'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

function AdminNotificationPage() {
  return (
    <div>
       <div className=" px-4 mb-20 ">
      <div className=" flex items-center  md:text-base text-sm gap-2 lg:gap-4 mt-6 lg:mt-0 mb-6">

     <Link href="/dashboard/notifications" className="text-grayColor1">Manage notifications </Link>  <FaChevronRight className="text-grayColor1"/> <p className=" text-headerColor">Manage Admin Role</p>
      </div>
      <div>
        <AdminRollTable/>
      </div>
    </div>
    </div>
  )
}

export default AdminNotificationPage
