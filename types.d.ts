declare module '@/DemoAPI/allProparty' {
  export interface Booking {
    id: string;
    bookingId: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    joinDate: string;
    status: 'Confirmed' | 'Pending' | 'Canceled';
    service: 'Hotel' | 'Appartment' | 'Tour';
    checkIn: string;
    checkOut: string;
    price: number;
  }
  export const bookings: Booking[];
}

declare module 'jspdf-autotable' {
  interface UserOptions {
    head?: any[][];
    body?: any[][];
    startY?: number;
    styles?: {
      fontSize?: number;
      [key: string]: any;
    };
    headStyles?: {
      fillColor?: number[];
      [key: string]: any;
    };
    [key: string]: any;
  }
}

declare module 'jspdf' {
  import { UserOptions } from 'jspdf-autotable';
  
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
  }
} 