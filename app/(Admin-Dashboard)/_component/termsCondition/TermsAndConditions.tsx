"use client";

const termsAndConditions = [
  {
    section: 1,
    title: "Definitions",
    content: [
      {
        term: "Platform",
        definition:
          "Refers to Travel Booking, which provides listing management for properties and tour packages.",
      },
      {
        term: "User",
        definition:
          "Refers to anyone accessing or using our website, including property owners, tour operators, and travelers.",
      },
      {
        term: "Listing",
        definition:
          "Refers to any property (apartment/hotel) or tour package added to our platform.",
      },
      {
        term: "Admin",
        definition:
          "Refers to website managers who oversee listings and transactions.",
      },
    ],
  },
  {
    section: 2,
    title: "User Accounts & Responsibilities",
    content: [
      "Users must register an account to list properties or tour packages.",
      "Users must provide accurate and up-to-date information about listings.",
      "Users are responsible for the content they post and ensuring its legality (e.g., no misleading descriptions, false pricing).",
      "Users must not engage in fraudulent activities, including fake bookings or false claims.",
    ],
  },
  {
    section: 3,
    title: "Listing & Booking Policies",
    subSections: [
      {
        title: "For Property Listings (Apartments/Hotels)",
        content: [
          "Property owners must ensure the availability and condition of the listed property.",
          "Prices should be transparent and include any additional fees (e.g., cleaning charges, taxes).",
          "Owners are responsible for managing bookings, cancellations, and disputes.",
        ],
      },
      {
        title: "For Tour Packages",
        content: [
          "Tour operators must provide accurate descriptions, including itinerary, duration, and inclusions.",
          "Prices should clearly mention any extra costs (e.g., meals, transportation).",
          "Operators must specify refund and cancellation policies.",
        ],
      },
    ],
  },
  {
    section: 4,
    title: "Payments & Refunds",
    content: [
      "Payment processing is handled by [Your Payment Provider].",
      "Users must agree to payment terms, including deposit requirements and deadlines.",
      "Refunds and cancellations are subject to the specific policy of each listing (property or tour).",
    ],
  },
  {
    section: 5,
    title: "Cancellation Policy",
    subSections: [
      {
        title: "For Property Bookings (Apartments/Hotels)",
        content: [
          "Flexible Cancellation: Full refund if canceled at least [5 days] before check-in.",
          "Moderate Cancellation: 50% refund if canceled at least [3 days] before check-in.",
          "Strict Cancellation: No refund for cancellations within [2 days] before check-in.",
          "No-show Policy: No refunds for guests who do not arrive on the booking date.",
        ],
      },
      {
        title: "For Tour Packages",
        content: [
          "Full Refund: Cancellations made at least [5 days] before the tour start date.",
          "Partial Refund: [30% refund for cancellations made [3 days] before the tour.",
          "No Refund: Cancellations within [2 days] of the tour date.",
          "Tour Operator Cancellations: If the operator cancels due to unforeseen circumstances, customers will receive a full refund or a reschedule option.",
        ],
      },
    ],
  },
  {
    section: 6,
    title: "Prohibited Activities",
    content: [
      "Posting false, misleading, or fraudulent listings.",
      "Using the platform for illegal activities (e.g., money laundering, scams).",
      "Attempting to bypass our payment system or engage in off-platform transactions.",
      "Uploading offensive, discriminatory, or harmful content.",
    ],
  },
  {
    section: 7,
    title: "Privacy & Data Protection",
    content: [
      "We collect and store user data securely (e.g., account details, booking history).",
      "Personal information will not be shared with third parties without consent.",
      "Users can review our [Privacy Policy] for more details.",
    ],
  },
  {
    section: 8,
    title: "Amendments & Updates",
    content: [
      "We may update these Terms and Conditions periodically.",
      "Users will be notified of major changes via email or on the website.",
      "Continued use of the platform constitutes acceptance of the latest terms.",
    ],
  },
  {
    section: 9,
    title: "Contact Information",
    content: [
      "For any questions, complaints, or support requests, contact us at:",
      "Email: hello@travelinfo.com",
      "Phone: 602-774-4735",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <div className=" px-4 py-6">
      <div className=" p-6 rounded-lg bg-whiteColor mb-6">
        <div className=" md:flex justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-semibold mb-6">
            Terms and Conditions
          </h1>
          <div className="bg-secondaryColor/10 p-3 rounded-lg text-end space-y-2">
            <p className="text-sm text-descriptionColor">
              Effective Date: Feb 6, 2024
            </p>
            <p className="text-sm text-descriptionColor">
              Last Date: Jan 12, 2025
            </p>
          </div>
        </div>
        <p className="text-base lg:text-lg text-descriptionColor">
          Welcome to Booking Website. These Terms and Conditions govern your use
          of our website and services related to property rentals
          (apartments/hotels) and tour packages. By accessing or using our
          platform, you agree to comply with these terms.
        </p>
      </div>
      {termsAndConditions.map((section) => (
        <div
          key={section.section}
          className="mb-6 p-6 rounded-lg bg-whiteColor"
        >
          <h2 className="text-xl lg:text-2xl font-medium">
            {" "}
            <span>{section?.section}. </span>
            {section.title}
          </h2>
          {section.content ? (
            <ul className="list-disc pl-5">
              {section.content.map((item, idx) => (
                <li key={idx} className="mb-2">
                  {/* Check if it's an object and render it properly */}
                  {typeof item === "object" ? (
                    <>
                      <div>
                        <h5 className="text-descriptionColor font-semibold">
                          "{item.term}:"{" "}
                          <span className="text-descriptionColors font-normal">
                            {item.definition}
                          </span>
                        </h5>
                      </div>
                    </>
                  ) : (
                    <p>{item}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : section.subSections ? (
            section.subSections.map((subSection, subIndex) => (
              <div key={subIndex}>
                <h3 className="text-xl font-semibold mt-4">
                  {subSection.title}:
                </h3>
                <ul className="list-disc pl-5">
                  {subSection.content.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <p className="text-descriptionColors font-normal">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
