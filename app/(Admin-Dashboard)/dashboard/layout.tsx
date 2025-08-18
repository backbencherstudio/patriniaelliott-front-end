import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import AdminLayoutClient from "../_component/AdminLayoutClient";


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {


  return (
          <div >
            <AdminLayoutClient>
            {children}
            <CustomToastContainer />
            </AdminLayoutClient>
          </div>
  );
};

export default AdminLayout;
