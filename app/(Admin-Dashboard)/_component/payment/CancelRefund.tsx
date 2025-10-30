"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface CancelRefundModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export default function CancelRefund({
  open,
  onOpenChange,
  data,
}: CancelRefundModalProps) {
 
  const {token} = useToken()
  const queryClient = useQueryClient()

  // React Query mutation for cancel refund
  const cancelRefundMutation = useMutation({
    mutationFn: async () => {
      const formdata = {
        status: "canceled",
        partial_refund: false,
      };
      const response = await UserService.createData(`/dashboard/payments/transactions/refund-request/${data?.booking_id}`, formdata, token);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Refund canceled successfully");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["paymentData"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to cancel refund");
    }
  });

  const handleRefund = () => {
    cancelRefundMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-sm rounded-xl md:px-6 px-4 py-6 md:py-8">
        <DialogHeader>
        <div  className=" mt-3">
           <h3 className="text-xl lg:text-[28px] leading-[100%] font-medium text-center w-full"> Cancel refund</h3>
           <p className="text-base  text-center text-gray-800 mt-3 mb-3">
           Booking ID: <span className="text-gray-500">{data?.booking_id}</span> 
        </p>
          </div>
        </DialogHeader>

        <p className=" text-base lg:text-lg  ">
          Cancel refund <span className="">${data.amount}</span> to{" "}
          <span className="">{data?.user?.name}</span>?
        </p>


        <div className="flex justify-center w-full gap-4 mt-4">
          <button
            aria-label="Back"
            className="text-red-500 block border border-red-500  w-full rounded-md cursor-pointer hover:bg-red-50"
            onClick={() => onOpenChange(false)}
          >
            Back
          </button>
          <button 
            aria-label="Confirm" 
            onClick={handleRefund} 
            disabled={cancelRefundMutation.isPending} 
            className="bg-redColor disabled:cursor-not-allowed disabled:bg-red-500/50 w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white cursor-pointer"
          >
            {cancelRefundMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> 
                Processing...
              </span>
            ) : "Confirm"}
          </button>
      
        </div>
      </DialogContent>
    </Dialog>
  );
}

