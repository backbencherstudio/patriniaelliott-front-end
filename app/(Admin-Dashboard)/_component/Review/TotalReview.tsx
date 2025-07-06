import { CircularProgressbar } from 'react-circular-progressbar'; // Import CircularProgressBar component 
import 'react-circular-progressbar/dist/styles.css'; // Import the default styles

function TotalReview() {
  const averageRating = 4.5; // This will be dynamic from your data
  const maxRating = 5; // Maximum possible rating (for example, 5 stars)

  const percentage = (averageRating / maxRating) * 100;

  return (
    <div className="py-4 px-6 bg-bgColor border-0 rounded-lg shadow-none">
      <div className="h-full">
        <div className="flex items-center h-full justify-between">
          <div className="">
            <h4 className="lg:text-3xl text-xl font-medium">{averageRating}</h4>
            <p className="mt-3 text-sm text-descriptionColor">Average Review</p>
          </div>

          <div className="flex items-center w-21 h-21 space-x-4">
            <CircularProgressbar
              value={percentage}
              styles={{
                path: {
                  stroke: '#0068EF',
                  strokeLinecap: 'round', // Make the stroke rounded
                  strokeWidth: 8, // Make the stroke bold
                  transition: 'stroke-dashoffset 1s ease 0s', // Apply smooth animation
                },
                text: {
                  fill: '#000',
                  fontSize: '24px',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalReview;
