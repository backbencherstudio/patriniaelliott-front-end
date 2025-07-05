import Image from "next/image";

function AdminAction({ status, onView, onDelete }: any) {
  return (
    <div>
    
        <div className=" flex  items-center gap-3">
          <span
            className="text-xs whitespace-nowrap underline text-[#777980] hover:text-[#0068ef] cursor-pointer"
            onClick={() => onView(status)}
          >
            Edit access rights
          </span>{" "}
          <button>
            {" "}
            <Image
              onClick={() => onDelete(status.id)}
              src="/dashboard/icon/delete.svg"
              alt="delete"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </button>
        </div>
     
       
    </div>
  );
}

export default AdminAction
