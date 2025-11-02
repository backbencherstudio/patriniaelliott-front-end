
import { useToken } from '@/hooks/useToken';
import { UserService } from '@/service/user/user.service';
import { useQuery } from '@tanstack/react-query';
import StatCard from './StatCard';

function StateSection() {
    const {token}=useToken();
   const {data:overviewData,isLoading:overviewLoading}=useQuery({
    queryKey: ["overviewData",token],
    queryFn: ()=>UserService.getData("/admin/user/overview",token),
    enabled: !!token
   });
   
    const stats = [
  { title: "All Users", count: overviewData?.data?.data?.totalUsers || 0, iconPath: "/dashboard/icon/all.svg" },
  { title: "Admin", count: overviewData?.data?.data?.totalAdmins || 0, iconPath: "/dashboard/icon/admin.svg" },
  { title: "Total Host", count: overviewData?.data?.data?.totalHost || 0, iconPath: "/dashboard/icon/host.svg" },
  { title: "Total Guest", count: overviewData?.data?.data?.totalGuest || 0, iconPath: "/dashboard/icon/guest.svg" },
];
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewLoading ? (
          // Skeleton Loading - 4 cards
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-1 xl:p-8 p-2 bg-neutral-50 rounded-lg flex items-center gap-1.5 md:gap-2.5 animate-pulse">
              {/* Icon Skeleton */}
              <div className="md:w-9 md:h-9 w-7 h-7 bg-gray-300 rounded-md"></div>
              
              {/* Content Skeleton */}
              <div className="flex flex-col md:gap-2 flex-1">
                {/* Title Skeleton */}
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                {/* Count Skeleton */}
                <div className="h-3 bg-gray-300 rounded w-12"></div>
              </div>
            </div>
          ))
        ) : (
          stats.map((stat, index) => (
            <StatCard key={index} {...stat}  />
          ))
        )}
        </div>
    </div>
  )
}

export default StateSection
