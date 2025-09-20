import useFetchData from '@/hooks/useFetchData';
import StatCard from './StatCard';

function StateSection() {
    const {data , loading}=useFetchData("/admin/user/overview")
    console.log(data);
    
    const stats = [
  { title: "All Users", count: data?.data?.totalUsers || 0, iconPath: "/dashboard/icon/all.svg" },
  { title: "Admin", count: data?.data?.totalAdmins || 0, iconPath: "/dashboard/icon/admin.svg" },
  { title: "Total Host", count: data?.data?.totalHost || 0, iconPath: "/dashboard/icon/host.svg" },
  { title: "Total Guest", count: data?.data?.totalGuest || 0, iconPath: "/dashboard/icon/guest.svg" },
];
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
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
