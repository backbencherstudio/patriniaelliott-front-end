import Image from "next/image";

interface WithdrawData {
  date: string;
  transactionId: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Canceled';
}

interface WithdrawActionProps {
  onView: (transaction: WithdrawData) => void;
  onDelete: (transactionId: string) => void;
  transaction: WithdrawData;
}

export default function WithdrawAction({ onView, onDelete, transaction }: WithdrawActionProps) {
  return (
    <div className="flex items-center gap-8">
      <span
        className="text-xs underline text-[#777980] hover:text-[#0068ef] cursor-pointer"
        onClick={() => onView(transaction)}
      >
        View details
      </span>
      <Image
        onClick={() => onDelete(transaction.transactionId)}
        src="/vendor/delete.svg"
        alt="Delete"
        width={16}
        height={16}
        className="cursor-pointer"
      />
    </div>
  );
} 