import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { TbSettingsSpark } from "react-icons/tb";
import { TfiEmail } from 'react-icons/tfi';
const settingsMenu = [
  { settingSlug: "general-settings", label: "General Settings" , icon:<TfiEmail className='text-lg  text-descriptionColor/90'/> },
  { settingSlug: "payment-transactions", label: "Payment & Transactions" , icon:<Image src="/icon/payment.svg" alt='payment' width={18} height={18}/>},
  { settingSlug: "email-notification-settings", label: "Email & Notification Settings" , icon:<IoNotificationsOutline className=' text-descriptionColor/90 text-xl '/>},
  { settingSlug: "manage-admin-role", label: "Manage Admin Role" , icon:<Image src="/icon/shopeBox.svg" alt='payment' width={18} height={18}/>},
  { settingSlug: "security-settings", label: "Security Settings" , icon:<Image src="/icon/secure.svg" alt='payment' width={19} height={18}/>},
  { settingSlug: "api-settings", label: "API Settings" , icon:<TbSettingsSpark className=' text-xl text-descriptionColor/90' />},
];

const NotificationMenu = () => {
  return (
    <div className=" p-6 bg-white rounded-2xl mt-2 border border-bgColor">
      <h1 className="lg:text-2xl text-xl font-medium text-gray-800 mb-6">Manage Notifications</h1>
      <ul className="">
        {settingsMenu.map((item) => (
          <Link href={`/dashboard/notifications/${item?.settingSlug}`} key={item.settingSlug} className="flex items-center justify-between pb-6 pt-5 last-of-type:pb-0 border-b last-of-type:border-0 border-gray-200  cursor-pointer  transition duration-200">
            <div className=' flex gap-4 items-center'>
                <div className=' text-descriptionColor'>
                    {item?.icon}
                </div>
            <span className="text-base  text-headerColor">{item.label}</span>

            </div>
            <span className="text-gray-500"><FaChevronRight /></span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NotificationMenu;
