import { FaStar } from "react-icons/fa6";

function Rating({ rating }: any) {
  return (
    <div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={
              i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Rating;
