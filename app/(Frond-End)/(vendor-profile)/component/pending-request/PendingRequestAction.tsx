import Image from "next/image";

interface PropertyRequest {
  id: string;
  propertyName: string;
  propertyType: string;
  location: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  price: string;
  guestCapacity: number;
  bedrooms: number;
  bathrooms: number;
}

interface PendingRequestActionProps {
  onEdit: () => void;
  onDelete: () => void;
  property: PropertyRequest;
}

export default function PendingRequestAction({ onEdit, onDelete }: PendingRequestActionProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        aria-label="Edit Property"
        onClick={onEdit}
        className="text-xs underline text-[#0068ef] hover:text-[#0051bd] cursor-pointer"
      >
        Edit
      </button>
      <button aria-label="Delete Property" onClick={onDelete}>
        <Image
          src="/vendor/delete.svg"
          alt="Delete"
          width={16}
          height={16}
          className="cursor-pointer hover:opacity-70"
        />
      </button>
    </div>
  );
}