import { MyProfileService } from '@/service/user/myprofile.service'
import { useEffect, useState } from 'react'

export const useUserType = () => {
  const [userType, setUserType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const res: any = await MyProfileService.getMe()
        
        console.log('API Response for user type:', res)
        
        // Extract user type from the response structure
        // Based on the API response: { success: true, data: { type: "vendor" } }
        const data = (res as any)?.data ?? res
        const userData = data?.data ?? data ?? null
        
        // Try multiple possible paths for the type field
        const type = userData?.type || 
                    data?.type || 
                    res?.data?.type || 
                    res?.type || 
                    null
        
        console.log('Extracted user type:', type)
        console.log('Full response structure:', {
          'res': res,
          'data': data,
          'userData': userData,
          'userData.type': userData?.type,
          'data.type': data?.type,
          'res.data.type': res?.data?.type,
          'res.type': res?.type
        })
        setUserType(type)
      } catch (err: any) {
        console.error('Error fetching user type:', err)
        setError(err?.message || 'Failed to fetch user type')
        setUserType(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserType()
  }, [])

  return {
    userType,
    loading,
    error,
    isUser: userType === 'user',
    isVendor: userType === 'vendor',
    isAdmin: userType === 'admin',
    isUnknown: !userType || (userType !== 'user' && userType !== 'vendor' && userType !== 'admin'),
    refetch: () => {
      setLoading(true)
      setError(null)
      // Re-trigger the effect
      const fetchUserType = async () => {
        try {
          const res: any = await MyProfileService.getMe()
          const data = (res as any)?.data ?? res
          const userData = data?.data ?? data ?? null
          const type = userData?.type || 
                      data?.type || 
                      res?.data?.type || 
                      res?.type || 
                      null
          setUserType(type)
        } catch (err: any) {
          console.error('Error fetching user type:', err)
          setError(err?.message || 'Failed to fetch user type')
          setUserType(null)
        } finally {
          setLoading(false)
        }
      }
      fetchUserType()
    }
  }
}