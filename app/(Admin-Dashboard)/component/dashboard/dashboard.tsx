'use client'
import React from 'react';
import Image from 'next/image';
import Usermodal from '../modal/usermodal';
interface StatCardProps {
  title: string;
  count: number;
  iconPath: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Banned';
}

const StatCard = ({ title, count, iconPath }: StatCardProps) => (
  <div className="flex-1 p-6 bg-neutral-50 rounded-lg outline-offset-[-1px] flex justify-start items-center gap-2.5">
    <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline-offset-[-1.12px] inline-flex flex-col justify-center items-center gap-[7.50px] overflow-hidden">
      <Image src={iconPath} alt={title} width={18} height={18} />
    </div>
    <div className="inline-flex flex-col justify-center items-start gap-2">
      <div className="justify-start text-[#070707] text-base font-medium leading-none">{title}</div>
      <div className="justify-start text-[#777980] text-xs font-normal leading-3">{count}</div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: UserData['status'] }) => {
  const statusStyles = {
    Active: {
      bg: 'bg-[#38c976]/10',
      border: 'outline-[#abefc6]',
      text: 'text-[#067647]',
      icon: '/dashboard/icon/tik.svg'
    },
    Inactive: {
      bg: 'bg-[#ffa23a]/10',
      border: 'outline-[#ffa23a]',
      text: 'text-[#ffa23a]',
      icon: '/dashboard/icon/loading.svg'
    },
    Banned: {
      bg: 'bg-[#fe5050]/10',
      border: 'outline-[#fe5050]',
      text: 'text-[#fe5050]',
      icon: '/dashboard/icon/cross.svg'
    }
  };

  const style = statusStyles[status];

  return (
    <div className={`pl-1.5 pr-2 py-1.5 ${style.bg} rounded-2xl outline outline-1 outline-offset-[-1px] ${style.border} flex justify-start items-center gap-1`}>
      <div className="w-3 h-3 relative overflow-hidden">
        <Image 
          src={style.icon} 
          alt={status} 
          width={12} 
          height={12} 
          className={style.text}
        />
      </div>
      <div className={`text-center justify-start ${style.text} text-xs font-normal font-['Inter'] leading-3`}>
        {status}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [users, setUsers] = React.useState<UserData[]>([
    {
      id: "#123562",
      name: "Elisabeth Sarah",
      email: "elisabeth-sarah@gmail.com",
      phone: "(217) 555-0113",
      role: "Guest",
      joinDate: "02/01/2025",
      status: "Active"
    },
    {
      id: "#123543",
      name: "Kristin Watson",
      email: "kristin-watson@gmail.com",
      phone: "(225) 555-0118",
      role: "Host",
      joinDate: "05/01/2025",
      status: "Active"
    },
    {
      id: "#123543",
      name: "Ronald Richards",
      email: "ronald-richards@gmail.com",
      phone: "(702) 555-0122",
      role: "Guest",
      joinDate: "12/01/2025",
      status: "Active"
    },
    {
      id: "#123562",
      name: "Wade Warren",
      email: "wade-warren@gmail.com",
      phone: "(208) 555-0112",
      role: "Guest",
      joinDate: "01/02/2025",
      status: "Active"
    },
    {
      id: "#127832",
      name: "Eleanor Pena",
      email: "eleanore-pena@gmail.com",
      phone: "(671) 555-0110",
      role: "Host",
      joinDate: "02/01/2025",
      status: "Inactive"
    },
    {
      id: "#131781",
      name: "Darrell Steward",
      email: "darrell-steward@gmail.com",
      phone: "(252) 555-0126",
      role: "Guest",
      joinDate: "08/01/2025",
      status: "Banned"
    },
    {
      id: "#231780",
      name: "Henry Gosh",
      email: "henry-osh@gmail.com",
      phone: "(217) 555-0113",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active"
    },
    {
      id: "#231783",
      name: "Esther Howard",
      email: "esther-howard@gmail.com",
      phone: "(702) 555-0122",
      role: "Guest",
      joinDate: "08/01/2025",
      status: "Inactive"
    },
    {
      id: "#031781",
      name: "Dianne Russell",
      email: "dianne- russell@gmail.com",
      phone: "(603) 555-0123",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active"
    },
    {
      id: "#331781",
      name: "Theresa Webb",
      email: "theresa-webb@gmail.com",
      phone: "(907) 555-0101",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);

  const handleDelete = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const stats = [
    {
      title: "All Users",
      count: 200,
      iconPath: "/dashboard/icon/all.svg"
    },
    {
      title: "Admin",
      count: 6,
      iconPath: "/dashboard/icon/admin.svg"
    },
    {
      title: "Total Host",
      count: 40,
      iconPath: "/dashboard/icon/host.svg"
    },
    {
      title: "Total Guest",
      count: 60,
      iconPath: "/dashboard/icon/guest.svg"
    }
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full bg-white">
        <div className="w-[984px] p-4 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="justify-center text-[#22262e] text-2xl font-medium leading-normal">Overview</div>
            <div className="justify-center text-[#777980] text-base font-normal leading-none tracking-tight">
              View list of total customer and hosts
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <Usermodal 
          onClose={handleCloseModal}
          userData={{
            name: selectedUser.name,
            role: selectedUser.role,
            id: selectedUser.id,
            status: selectedUser.status,
            profileImage: "https://placehold.co/100x100",
            verificationStatus: {
              status: "Pending verification",
              rating: 4.7
            },
            contact: {
              email: selectedUser.email,
              phone: selectedUser.phone,
              address: "8 12 Victoria Road Barnsley, South Yorkshire S70 2BB"
            },
            bio: "Described by Queenstown House & Garden magazine as having one of the best views we've ever seen' you will love relaxing in this newly built",
            details: {
              joinDate: selectedUser.joinDate,
              gender: "Not specified",
              dateOfBirth: "Not specified",
              language: "English",
              lastActive: new Date().toLocaleDateString()
            }
          }}
        />
      )}

      <div className="w-[984px] p-4 bg-white rounded-xl inline-flex flex-col justify-center items-center gap-4">
        <div className="self-stretch inline-flex justify-start items-start gap-4">
          <div className="flex-1 flex justify-start items-center">
            <div className="px-4 py-2 border-b-2 border-[#d6ae29] flex justify-center items-center gap-2.5">
              <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">All users</div>
            </div>
            <div className="px-4 py-2 border-b border-[#d2d2d5] flex justify-center items-center gap-2.5">
              <div className="justify-start text-[#777980] text-base font-normal font-['Inter'] leading-none">Host</div>
            </div>
            <div className="px-4 py-2 border-b border-[#d2d2d5] flex justify-center items-center gap-2.5">
              <div className="justify-start text-[#777980] text-base font-normal font-['Inter'] leading-none">Guest</div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded outline-1 outline-offset-[-1px] outline-[#0068ef] flex justify-start items-center gap-4">
            <div className="flex justify-start items-center gap-1">
              <Image 
                src="/dashboard/icon/filter.svg" 
                alt="filter" 
                width={14} 
                height={14} 
                className="text-[#0068ef]"
              />
              <div className="justify-center text-[#0068ef] text-sm font-normal font-['Inter'] leading-tight">Last 30 days</div>
              <Image 
                src="/dashboard/icon/downarrow.svg" 
                alt="downarrow" 
                width={14} 
                height={14} 
                className="text-[#0068ef]"
              />
            </div>
          </div>
        </div>

        <div className="w-[952px] inline-flex justify-start items-center">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 rounded-t-xl">
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">User ID</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">User Name</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">Email</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">Number</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">Role</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">Join Date</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">Status</th>
                <th className="px-3 py-4 text-left text-[#4a4c56] text-sm font-normal font-['Inter']">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b border-[#eaecf0]">
                  <td className="px-3 py-[22px] text-[#070707] text-xs font-normal font-['Inter']">{user.id}</td>
                  <td className="px-3 py-[22px] text-[#777980] text-xs font-normal font-['Inter']">{user.name}</td>
                  <td className="px-3 py-[22px] text-[#777980] text-xs font-normal font-['Inter']">{user.email}</td>
                  <td className="px-3 py-[22px] text-[#777980] text-xs font-normal font-['Inter']">{user.phone}</td>
                  <td className="px-3 py-[22px] text-[#777980] text-xs font-normal font-['Inter']">{user.role}</td>
                  <td className="px-3 py-[22px] text-[#777980] text-xs font-normal font-['Inter']">{user.joinDate}</td>
                  <td className="px-3 py-4">
                    <StatusBadge status={user.status as UserData['status']} />
                  </td>
                  <td className="px-3 py-5 flex items-center gap-8">
                    <div 
                      className="justify-center text-xs font-normal font-['Inter'] underline leading-3 text-[#777980] hover:text-[#0068ef] cursor-pointer"
                      onClick={() => handleViewDetails(user)}
                    >
                      View details
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Image 
                        src="/dashboard/icon/delete.svg"
                        alt="delete"
                        width={16}
                        height={16}
                        className="text-[#777980] hover:text-[#0068ef]"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
