
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash2 } from 'lucide-react';
import { FaRegEdit } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

function ListingAction({ onView, data,onEdit }: any) {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger className='px-4'>
          <HiOutlineDotsHorizontal className="cursor-pointer text-center
           text-gray-600 hover:text-gray-800 text-xl" />
        </PopoverTrigger>
        <PopoverContent className="w-[180px] relative top-1 -left-16 p-2 bg-white shadow-lg rounded-lg border border-gray-100">
        <div className='absolute w-4 h-4 z-0 transform  rotate-45 right-4 -top-2 border-t border-l border-gray-100 bg-whiteColor'>

        </div>
        <ul className="text-sm text-gray-700">
  <li
    onClick={() => onView(data)}
    className="px-4 flex gap-2 text-sm items-center py-2 group cursor-pointer 
               border-l-2 border-transparent 
               hover:text-blackColor hover:border-secondaryColor hover:bg-secondaryColor/20 
               transition-all duration-100 ease-in-out"
  >
    <FiEye className="transition-colors duration-100 group-hover:text-secondaryColor" />
    View Details
  </li>

  <li
     onClick={() => onEdit(data)}
    className="px-4 flex gap-2 text-sm items-center py-2 group cursor-pointer 
               border-l-2 border-transparent 
               hover:text-blackColor hover:border-secondaryColor hover:bg-secondaryColor/20 
               transition-all duration-100 ease-in-out"
  >
    <FaRegEdit className="transition-colors duration-100 group-hover:text-secondaryColor" />
    Edit
  </li>

  <li
    onClick={() => {
      // Add delete logic here
    }}
    className="px-4 flex gap-2 text-sm items-center py-2 group cursor-pointer 
               border-l-2 border-transparent 
               hover:text-blackColor hover:border-secondaryColor hover:bg-secondaryColor/20 
               transition-all duration-100 ease-in-out"
  >
    <Trash2
      size={14}
      className="transition-colors duration-100 group-hover:text-secondaryColor"
    />
    Delete
  </li>
</ul>

        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ListingAction;
