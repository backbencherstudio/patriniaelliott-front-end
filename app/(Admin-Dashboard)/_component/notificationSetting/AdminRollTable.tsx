"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminRollData } from "@/DemoAPI/adminRollData";
import DynamicTableTwo from "../common/DynamicTableTwo";
import AdminAction from "./AdminAction";
import AdminRoleDialog from "./AdminRoleDialog";
import AdminStatus from "./AdminStatus";
import InviteTeamMembers from "./InviteTeamMembers";

export default function AdminRollTable() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  const [selectedData, setSelectedData] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const handleViewDetails = (user: any) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };
  const handleDelete = (user: any) => {
    setSelectedData(user);
  };
  const columns = [
    {
      label: "User Name",
      accessor: "name",
      width: "150px",
    },
    {
      label: "Email",
      accessor: "email",
      width: "208px",
    },
    {
      label: "Roles",
      accessor: "roles",
      width: "215px",
      formatter: (_, row) => (
        <Select
          defaultValue={row.roles[0]} // Use first role as default; adjust if multiple needed
          onValueChange={(value) =>
            console.log(`Changed role for ${row.name}:`, value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {row.roles.map((role: string, index: number) => (
              <SelectItem key={index} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "100px",
      formatter: (_, row) => <AdminStatus status={row.status} />,
    },
    {
      label: "Action",
      accessor: "actions",
      width: "182px",
      formatter: (_, row) => (
        <AdminAction
          onView={() => handleViewDetails(row)}
          onDelete={() => handleDelete(row)}
          status={row}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4 md:p-6  mx-auto">
        <InviteTeamMembers />
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
        <div>
          <DynamicTableTwo
            columns={columns}
            data={adminRollData}
            currentPage={currentPage}
            itemsPerPage={5}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <div>
        {isModalOpen && (
          <AdminRoleDialog onOpenChange={setIsModalOpen} open={isModalOpen} />
        )}
      </div>
    </div>
  );
}
