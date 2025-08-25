# Vendor Service

This service provides API methods for managing vendor profile data.

## API Endpoints

The service uses the following base endpoint structure:
- Base URL: `{ENV}/api/vendor-user-verification/vendor/{ID}`

## Methods

### `getVendorProfile(vendorId: string, token: string)`
Fetches vendor profile data using a provided token.

**Parameters:**
- `vendorId`: The vendor's unique identifier
- `token`: Authentication token

**Returns:** Promise with vendor profile data

### `updateVendorProfile(vendorId: string, data: any, token: string)`
Updates vendor profile data using a provided token.

**Parameters:**
- `vendorId`: The vendor's unique identifier
- `data`: Object containing updated profile data
- `token`: Authentication token

**Returns:** Promise with update response

### `getVendorProfileWithCookie(vendorId: string, context?: any)`
Fetches vendor profile data using token from cookies.

**Parameters:**
- `vendorId`: The vendor's unique identifier
- `context`: Optional context for cookie access

**Returns:** Promise with vendor profile data

### `updateVendorProfileWithCookie(vendorId: string, data: any, context?: any)`
Updates vendor profile data using token from cookies.

**Parameters:**
- `vendorId`: The vendor's unique identifier
- `data`: Object containing updated profile data
- `context`: Optional context for cookie access

**Returns:** Promise with update response

## Data Structure

The vendor data follows this structure:

```typescript
interface VendorData {
  id: string;
  email: string;
  name: string;
  first_name: string;
  phone_number: string;
  VendorVerification?: {
    business_website?: string;
    vendor_type?: string;
    TIN?: string;
  };
}
```

## Usage Example

```typescript
import { VendorService } from './vendor.service';

// Fetch vendor profile
const vendorData = await VendorService.getVendorProfileWithCookie('vendor-id-here');

// Update vendor profile
const updateData = {
  first_name: 'John',
  email: 'john@example.com',
  phone_number: '123-456-7890',
  VendorVerification: {
    business_website: 'https://example.com',
    vendor_type: 'Property Manager',
    TIN: 'TAX-123456'
  }
};

const response = await VendorService.updateVendorProfileWithCookie('vendor-id-here', updateData);
```

## Error Handling

The service includes proper error handling and will throw errors for:
- Network failures
- Authentication failures
- Invalid data
- Server errors

## Notes

- The service automatically handles authentication headers
- For production use, vendor IDs should come from user context or route parameters
- The service supports both direct token passing and cookie-based authentication 