import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { UserService } from "@/service/user/user.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutClient from "../_component/AdminLayoutClient";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  
  return (
          <div >
            <AdminLayoutClient>
            {children}
            <CustomToastContainer />
            </AdminLayoutClient>
          </div>
  );
}
