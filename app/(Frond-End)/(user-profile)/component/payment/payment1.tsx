"use client";
import Link from "next/link";
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { MyProfileService } from '@/service/user/myprofile.service'
import { useToken } from '@/hooks/useToken'
import { useMyProfile } from '@/hooks/useMyProfile'
import Image from 'next/image'

interface Card {
  id: string
  stripe_payment_method_id: string
  customer_id: string
  brand: string
  last4: string
  exp_month: number
  exp_year: number
  is_default: boolean
  user_id: string
}

export default function Payment1() {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null)
  const { token } = useToken()
  const { me } = useMyProfile()

  const fetchCards = async () => {
    if (!token) return
    
    // Try different possible field names for customer_id
    const customerId = me?.customer_id || me?.stripe_customer_id || me?.id || 'cus_T4qCWyqDYI7Kaj'
    
    if (!customerId) {
      setError('Customer ID not found in user profile')
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      const response = await MyProfileService.getCards(customerId)
      
      if (response?.data?.success) {
        setCards(response.data.data || [])
      } else {
        setError('Failed to fetch cards')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cards')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [token, me])

  // Refresh cards when returning from add card page
  useEffect(() => {
    const handleFocus = () => {
      fetchCards()
    }
    
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [token, me])

  // Auto refresh on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCards()
    }, 500) // Small delay to ensure component is fully mounted
    
    return () => clearTimeout(timer)
  }, [])

  const getCardBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '/usericon/visa.svg'
      case 'mastercard':
        return '/usericon/mastercard.svg'
      case 'amex':
      case 'american_express':
        return '/usericon/amex.svg'
      case 'discover':
        return '/usericon/discover.svg'
      default:
        return '/usericon/mastercard.svg' // Default fallback
    }
  }

  const getCardStyle = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return {
          background: 'bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]',
          accent: 'from-white/10 to-transparent'
        }
      case 'mastercard':
        return {
          background: 'bg-gradient-to-br from-[#eb001b] to-[#f79e1b]',
          accent: 'from-white/20 to-transparent'
        }
      case 'amex':
      case 'american_express':
        return {
          background: 'bg-gradient-to-br from-[#006fcf] to-[#004a9f]',
          accent: 'from-white/15 to-transparent'
        }
      case 'discover':
        return {
          background: 'bg-gradient-to-br from-[#ff6000] to-[#cc4a00]',
          accent: 'from-white/15 to-transparent'
        }
      default:
        return {
          background: 'bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]',
          accent: 'from-white/10 to-transparent'
        }
    }
  }

  const formatExpiryDate = (month: number, year: number) => {
    const formattedMonth = month.toString().padStart(2, '0')
    const formattedYear = year.toString().slice(-2)
    return `${formattedMonth}/${formattedYear}`
  }

  const handleDeleteCard = async (card: Card) => {
    try {
      setDeletingCardId(card.id)
      
      // Use the Stripe payment method ID for deletion
      const response = await MyProfileService.deleteCard(card.stripe_payment_method_id)
      
      if (response?.data?.success) {
        setCards(prev => prev.filter(c => c.id !== card.id))
        toast.success('Card deleted successfully')
        // Refresh the component after successful deletion
        setTimeout(() => {
          fetchCards()
        }, 500)
      } else {
        toast.error(response?.data?.message || 'Failed to delete card')
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete card')
    } finally {
      setDeletingCardId(null)
    }
  }

  return (
    <div className="max-w-[960px] bg-white rounded-xl p-6 flex flex-col gap-6">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[#22262e] text-2xl font-medium">Add payment cards</h2>
          {cards.length > 0 && (
            <button 
              aria-label="Refresh Cards"
              onClick={fetchCards}
              disabled={loading}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          )}
        </div>
        <p className="text-[#777980] text-base">Save your passport details for use when booking your next stay, flight.</p>
      </div>
      
      {/* Saved Cards Section */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0068ef]"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const cardStyle = getCardStyle(card.brand)
            return (
            <div key={card.id} className="relative">
              {/* Credit Card Design */}
              <div className={`${cardStyle.background} rounded-xl p-6 h-48 shadow-lg border border-gray-200 relative overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer`}>
                {/* Card Background Pattern */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cardStyle.accent} rounded-full -translate-y-16 translate-x-16`}></div>
                <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${cardStyle.accent} rounded-full translate-y-12 -translate-x-12`}></div>
                
                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-sm">
                        <Image
                          src={getCardBrandIcon(card.brand)}
                          alt={card.brand}
                          width={32}
                          height={20}
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-xs font-bold text-gray-600">${card.brand.toUpperCase()}</span>`;
                            }
                          }}
                        />
                      </div>
                      {card.is_default && (
                        <span className="text-white text-xs bg-[#0068ef] px-2 py-1 rounded-full font-medium">Default</span>
                      )}
                    </div>
                    <button 
                      aria-label="Delete Card"
                      onClick={() => handleDeleteCard(card)}
                      className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete card"
                      disabled={deletingCardId === card.id}
                    >
                      {deletingCardId === card.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Middle Section - Card Number */}
                  <div className="flex-1 flex items-center">
                    <div className="text-white text-xl font-mono tracking-wider">
                      •••• •••• •••• {card.last4}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Expires</div>
                      <div className="text-white text-sm font-medium">{formatExpiryDate(card.exp_month, card.exp_year)}</div>
                    </div>
                    <div className="text-white/60 text-xs">
                      {card.brand.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Label */}
              <div className="mt-3 text-center">
                <span className="text-[#4a4c56] text-sm font-medium">Payment Card</span>
              </div>
            </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg width="32" height="20" viewBox="0 0 24 16" fill="none" className="text-gray-400">
              <rect width="24" height="16" rx="2" fill="currentColor" opacity="0.3"/>
              <rect x="2" y="4" width="20" height="8" rx="1" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>
          <p className="text-[#777980] text-lg mb-2">No saved cards found</p>
          <p className="text-[#999] text-sm">Add your first payment card to get started</p>
        </div>
      )}
      
      <div className="flex justify-between items-center px-4 py-3 rounded-lg outline-1 outline-[#e9e9ea]">
        <span className="text-[#070707] text-lg">Add payment cards</span>
        <Link 
          href={"/payment/add-new-card"}
          className="bg-[#0068ef] text-white px-8 py-3 rounded-lg font-medium shadow-sm cursor-pointer hover:bg-[#0058d6] transition-colors"
        >
          Add card
        </Link>
      </div>
    </div>
  )
}