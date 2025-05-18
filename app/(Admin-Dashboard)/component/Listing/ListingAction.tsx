
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';
import { Trash2 } from 'lucide-react';
import { FaRegEdit } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

function ListingAction({ onView, data }: any) {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger>
          <HiOutlineDotsHorizontal className="cursor-pointer text-gray-600 hover:text-gray-800" />
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-2 bg-white shadow-lg rounded-lg border border-gray-200">
          <PopoverArrow className="fill-current text-white" />
          <ul className="text-sm text-gray-700">
            <li
              onClick={() => {
                onView(data);
              }}
              className="px-4 flex  gap-2 text-sm items-center py-2 hover:bg-gray-100 cursor-pointer"
            >
             <FiEye/> View Details
            </li>
            <li className="px-4 flex gap-2 text-sm items-center py-2 hover:bg-gray-100 cursor-pointer">
            <FaRegEdit/>  Edit
            </li>
            <li
              onClick={() => {
                // Add your delete logic here
              }}
              className="px-4 flex gap-2 items-center text-sm py-2 hover:bg-gray-100 cursor-pointer"
            >
           <Trash2 size={14} />   Delete
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ListingAction;
