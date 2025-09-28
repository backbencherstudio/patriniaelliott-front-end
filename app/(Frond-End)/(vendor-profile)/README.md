# Vendor Profile Conditional Menu System

## Overview
This system implements conditional menu visibility based on the user's account type from the API response.

## How it Works

### 1. User Type Detection
- Uses `useUserType` hook to fetch user data from `/auth/me` endpoint via `MyProfileService.getMe()`
- Extracts user type from the API response structure: `{ success: true, data: { type: "vendor" } }`
- Tries multiple possible paths for the type field:
  - `userData?.type` (primary path)
  - `data?.type`
  - `res?.data?.type`
  - `res?.type`

### 2. Menu Logic
Based on the user type from API response:

**For `user` type:**
- ✅ Shows: User Verification menu
- ❌ Hides: Pending Request menu

**For `vendor` type:**
- ✅ Shows: Pending Request menu  
- ❌ Hides: User Verification menu

**For `admin` type:**
- ✅ Shows: All menus (User Verification + Pending Request)

**For unknown/null user types:**
- ✅ Shows: All menus (fallback behavior)
- This ensures no user is locked out of the system

**Common menus (always shown):**
- Add Profile Information
- Payment Method
- Transaction History
- Withdraw Balance

### 3. Implementation Details

#### Files Modified:
- `hooks/useUserType.ts` - Custom hook for user type detection
- `app/(Frond-End)/(vendor-profile)/component/common/Sidebar.tsx` - Main sidebar with conditional logic
- `app/(Frond-End)/(vendor-profile)/component/pending-request/PendingRequest.tsx` - Updated to use centralized hook

#### Key Features:
- Loading states while fetching user type
- Error handling for API failures
- Console logging for debugging
- Centralized user type management
- Fallback behavior for unknown user types
- Debug panel in development mode
- Support for admin, user, vendor, and unknown user types

### 4. Testing
To test the implementation:
1. Check browser console for user type detection logs
2. Verify menu items appear/disappear based on account type
3. Test with different user types (user, vendor, admin, unknown)
4. Check the debug panel in development mode (shows current user type and menu count)
5. Verify fallback behavior when user type is null or unknown

### 5. API Response Structure
The system expects the API response to contain user type information in one of these formats:
```json
{
  "data": {
    "data": {
      "type": "user" // or "vendor"
    }
  }
}
```

Or:
```json
{
  "data": {
    "type": "user" // or "vendor"
  }
}
```

## Usage
The sidebar will automatically detect the user type and show/hide menu items accordingly. No additional configuration is needed.