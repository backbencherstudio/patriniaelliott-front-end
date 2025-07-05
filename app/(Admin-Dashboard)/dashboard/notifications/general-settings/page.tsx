import GeneralSettingsForm from "@/app/(Admin-Dashboard)/_component/setting/SettingsForm"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa"

function GeneralSetting() {
  return (
    <div className=" px-4">
      <div className=" flex items-center gap-2 lg:gap-4 mt-6 lg:mt-0 mb-6">

        <Link href="/dashboard/notifications" className="text-base text-grayColor1">Manage notifications </Link>  <FaChevronRight className="text-grayColor1" /> <p className="text-base text-headerColor">General Settings</p>
      </div>
      <GeneralSettingsForm />
    </div>
  )
}

export default GeneralSetting
