import PaymentForm from "./PaymentForm";


export default function StepTwo({totalAmount}:any) {
  return (
    <div className="mt-6 space-y-6">
      <PaymentForm totalAmount={totalAmount}/>
    </div>
  );
}
