'use client'
import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import InvoiceModal from './InvoiceModal'
import RefundDetailsModal from './RefundDetailsModal'
import TransStatCard from './TransStatCard'
import TransStatuse from './TransStatuse'
import { useVendorApi } from '@/hooks/useVendorApi'
import { VendorService } from '@/service/vendor/vendor.service'

export default function TransectionHistory() {
  const [activeTab, setActiveTab] = useState<'All transactions' | 'Bookings' | 'Refunds'>('All transactions')
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | '7' | '15' | '30'>('all')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showInvoice, setShowInvoice] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const { loading, handleApiCall } = useVendorApi()
  const [stats, setStats] = useState<any>({ total_bookings: 0, total_earnings: 0, total_withdraw: 0, total_refund: 0 })
  const [rows, setRows] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 days' },
    { value: '15', label: 'Last 15 days' },
    { value: '30', label: 'Last 30 days' }
  ]

  // fetch data
  const reload = async (page = 1) => {
    const res: any = await handleApiCall(VendorService.getTransactions, { page, limit: 10 })
    const root = res?.data?.data || res?.data || res
    const statistics = root?.statistics || {}
    const list = root?.transactions?.data || []
    const pg = root?.transactions?.pagination || {}
    setStats(statistics)
    const mapped = list.map((t: any) => ({
      date: new Date(t.created_at).toLocaleDateString('en-GB'),
      transactionId: t.id,
      type: (t.type || '').charAt(0).toUpperCase() + (t.type || '').slice(1),
      amount: (t.type === 'refund' ? '-' : '') + '$' + (t.amount || 0),
      paymentMethod: (t.provider || '').charAt(0).toUpperCase() + (t.provider || '').slice(1),
      status: mapStatus(t.status),
      _raw: t,
    }))
    setRows(mapped)
    setTotalPages(pg?.totalPages || 1)
  }

  useEffect(() => { reload(1) }, [])

  // Debug panel (temporary)
  const [debug, setDebug] = useState<any>(null)
  useEffect(() => {
    (async ()=>{
      try {
        const res: any = await VendorService.getTransactions({ page: 1, limit: 10 })
        setDebug(res?.data || res)
      } catch (e) {
        setDebug({ error: (e as any)?.message || 'failed' })
      }
    })()
  }, [])

  const filteredTransactions = useMemo(()=>{
    return rows.filter((transaction: any) => {
      if (activeTab === 'All transactions') return true
      if (activeTab === 'Bookings') return (transaction.type || '').toLowerCase() === 'booking'
      if (activeTab === 'Refunds') return (transaction.type || '').toLowerCase() === 'refund'
      return true
    })
  }, [rows, activeTab])

  const statCards = [
    { title: "Total Bookings", count: stats.total_bookings || 0, iconPath: "/vendor/tik.svg" },
    { title: "Total Earnings", count: stats.total_earnings || 0, iconPath: "/vendor/totalearn.svg" },
    { title: "Withdrawn", count: stats.total_withdraw || 0, iconPath: "/vendor/withdrawn.svg" },
    { title: "Refunds Issued", count: stats.total_refund || 0, iconPath: "/vendor/refunds.svg" },
  ]

  const nowrap = (v: any) => <div className="whitespace-nowrap">{v}</div>
  const columns = [
    { label: 'Date', accessor: 'date', formatter: (v: any) => nowrap(v) },
    { label: 'Transaction ID', accessor: 'transactionId', formatter: (v: any) => nowrap(v) },
    { label: 'Type', accessor: 'type', formatter: (v: any) => nowrap(v) },
    { label: 'Amount', accessor: 'amount', formatter: (v: any) => nowrap(v) },
    { label: 'Payment Method', accessor: 'paymentMethod', formatter: (v: any) => nowrap(v) },
    {
      label: 'Status',
      accessor: 'status',
      formatter: (value: string) => <TransStatuse status={value} />
    },
    {
      label: 'Action',
      accessor: 'action',
      formatter: (_: any, row: any) => (
        <button
          aria-label="View Transaction Details"
          className="text-[#0068ef] underline text-xs hover:text-[#0051bd]"
          onClick={() => {
            setSelectedTransaction(row?._raw || row);
            setShowInvoice(true);
          }}
        >
          View details
        </button>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="">
            <h2 className="text-2xl font-medium text-[#22262e] mb-1">Transaction History</h2>
            <p className="text-base text-[#777980]">
              Check up on your overall transaction history and stay updated on all your financial activities.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white rounded-xl p-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <TransStatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Debug Box (remove after verification) */}
      {/* <div className="w-full bg-white rounded-xl p-4 mx-auto">
        <div className="text-sm text-[#777980] mb-2">Debug API preview</div>
        <pre className="text-xs bg-[#f8fafc] p-3 rounded border overflow-x-auto max-h-60">{JSON.stringify(debug, null, 2)}</pre>
      </div> */}

      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {['All transactions', 'Bookings', 'Refunds'].map((tab) => (
              <button
                aria-label={`Filter ${tab}`}
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-2 md:px-4 py-2 border-b-2 cursor-pointer text-sm md:text-base ${activeTab === tab
                  ? 'border-[#d6ae29] text-[#070707]'
                  : 'border-[#f3f3f4] text-[#777980]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <div
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-3 py-1.5 rounded border border-[#0068ef] flex items-center gap-3 cursor-pointer hover:bg-[#f5f5f5] justify-center md:justify-start"
            >
              <Image
                src="/vendor/date.svg"
                alt="Calendar"
                width={14}
                height={14}
              />
              <span className="text-[#0068ef] text-sm">
                {dateRanges.find(range => range.value === selectedDateRange)?.label}
              </span>
              <Image
                src="/vendor/down.svg"
                alt="Dropdown"
                width={14}
                height={14}
              />
            </div>

            {isDateDropdownOpen && (
              <div className="absolute top-full left-0 md:right-0 mt-1 bg-white rounded-lg shadow-lg border py-1 z-10 w-full md:w-auto">
                {dateRanges.map((range) => (
                  <div
                    key={range.value}
                    onClick={() => {
                      setSelectedDateRange(range.value as 'all' | '7' | '15' | '30');
                      setIsDateDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-sm text-[#4a4c56]"
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Full-width responsive table - no fixed/min widths; nowrap enforced by formatter */}
          <DynamicTableWithPagination
            loading={loading}
            totalPages={totalPages}
            columns={columns}
            data={filteredTransactions}
            currentPage={currentPage}
            itemsPerPage={10}
            onPageChange={(page) => { setCurrentPage(page); reload(page) }}
            noDataMessage="No transactions found."
            className="w-full flex "
          />
        </div>
      </div>

      {showInvoice && (selectedTransaction?.type === 'refund' || selectedTransaction?.type === 'Refund') ? (
        <RefundDetailsModal
          open={showInvoice}
          onClose={setShowInvoice}
          transaction={selectedTransaction}
        />
      ) : showInvoice ? (
        <InvoiceModal
          open={showInvoice}
          onClose={setShowInvoice}
          transaction={selectedTransaction}
        />
      ) : null}
    </div>
  )
}

// Map provider status to UI status tokens
function mapStatus(status: string): string {
  const s = (status || '').toLowerCase()
  if (s === 'succeeded' || s === 'approved' || s === 'completed') return 'Completed'
  if (s === 'canceled' || s === 'failed') return 'Failed'
  return 'Pending'
}
