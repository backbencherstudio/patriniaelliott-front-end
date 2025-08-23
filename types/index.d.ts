declare global {
    interface Window {
      katex: typeof import("katex");
    }
  }

  type User = {
  id: string;
  name: string;
  email: string;
  display_name: string | null;
  avatar: string | null;
  created_at: string;
};

type PackageFile = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: number;
  sort_order: number;
  package_id: string;
  file: string;
  file_alt: string;
  type: "package_file" | "trip_plan";
  is_featured: boolean;
  file_url: string;
};

export type Package = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: number;
  approved_at: string | null;
  user_id: string;
  name: string;
  description: string;
  price: string;
  duration: string | null;
  duration_type: string | null;
  min_capacity: number;
  max_capacity: number;
  type: "apartment" | string;
  cancellation_policy_id: string | null;
  address: string | null;
  amenities: any | null;
  bathrooms: number | null;
  bedrooms: number | null;
  beds: number | null;
  booking_method: "instant" | string;
  breakfast_available: boolean;
  check_in: string | null;
  check_out: string | null;
  city: string | null;
  commission_rate: string;
  country: string | null;
  host_earnings: string | null;
  house_rules: string | null;
  latitude: number | null;
  longitude: number | null;
  max_guests: number | null;
  parking: string | null;
  postal_code: string | null;
  rate_plans: string | null;
  size_sqm: number | null;
  unit_number: string | null;
  user: User;
  package_files: PackageFile[];
  package_room_types: any[];
  package_availabilities: any[];
  cancellation_policy: any | null;
  package_languages: any[];
  reviews: any[];
  rating_summary: {
    averageRating: number;
    totalReviews: number;
  };
};