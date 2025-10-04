'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useRef } from 'react';

export default function InvoiceModal({ open, onClose, transaction }) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Normalize API transaction → UI fields
  const tx = transaction || {}
  const txId = tx.id || tx.invoiceId || '-'
  const createdAt = tx.created_at ? new Date(tx.created_at).toLocaleString() : (tx.date || '-')
  const bookingId = tx.booking_id || '-'
  const userName = tx.user?.name || tx.guestName || '-'
  const type = tx.type ? String(tx.type).toLowerCase() : ''
  const provider = tx.provider || tx.paymentMethod || '-'
  const status = tx.status || '-'
  const reference = tx.reference_number || '-'
  const refundReason = tx.refund_reason ?? '-'
  const amount = tx.amount ? (type === 'refund' ? `-$${tx.amount}` : `$${tx.amount}`) : (tx.totalAmount || '$0')

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    // Headerr
    doc.setFontSize(18);
    doc.setTextColor('#22262e');
    doc.text('Invoice ID', 40, 50);
    doc.setFontSize(12);
    doc.setTextColor('#777980');
    doc.text(String(txId), 40, 70);

    doc.setFontSize(12);
    doc.setTextColor('#777980');
    doc.text(`Date: ${createdAt || '-'}`, 420, 50);

    // From/To/Info (with proper Y positions and line breaks)
    const fromAddress = doc.splitTextToSize('—', 150);
    const toAddress = doc.splitTextToSize('—', 150);

    // Titles
    doc.setFontSize(12);
    doc.setTextColor('#22262e');
    doc.setFont('helvetica', 'bold');
    doc.text('From:', 40, 110);
    doc.text('To:', 220, 110);
    doc.text('Info:', 400, 110);

    // Names
    doc.text('Travel Booking', 40, 125);
    doc.text(userName || 'Guest', 220, 125);

    // Addresses (multi-line)
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#777980');
    doc.text(fromAddress, 40, 140);
    doc.text(toAddress, 220, 140);

    // Info
    let infoY = 125;
    doc.setTextColor('#22262e');
    doc.setFontSize(11);
    doc.text('Account name:', 400, infoY);
    doc.setTextColor('#777980');
    doc.text(userName || 'Guest', 480, infoY);

    infoY += 15;
    doc.setTextColor('#22262e');
    doc.text('SUI:', 400, infoY);
    doc.setTextColor('#777980');
    doc.text(reference || '-', 430, infoY);

    infoY += 15;
    doc.setTextColor('#22262e');
    doc.text('PayPal:', 400, infoY);
    doc.setTextColor('#777980');
    doc.text(provider || '-', 450, infoY);

    // Table
   (autoTable as any)(doc, {
      startY: 180,
      theme: 'grid',
      headStyles: {
        fillColor: [250, 250, 250], // Table header bg color (light gray)
        textColor: '#22262e',
        fontStyle: 'bold',
        fontSize: 11,
      },
      bodyStyles: {
        textColor: '#4a4c56',
        fontSize: 11,
        fillColor: [255, 255, 255], // Default body bg color (white)
      },
      columnStyles: {
        0: { cellWidth: 200 },
        1: { cellWidth: 315 },
      },

      body: [
        ['Transaction ID', String(txId)],
        ['Booking ID', String(bookingId)],
        ['User', String(userName)],
        ['Type', String(type || '-')],
        ['Amount', String(amount)],
        ['Provider', String(provider)],
        ['Status', String(status)],
        ['Reference number', String(reference)],
        ['Created at', String(createdAt)],
        ...(type === 'refund' ? [['Refund reason', String(refundReason)]] : []),
      ],
      styles: {
        halign: 'left',
        valign: 'middle',
        cellPadding: 8,
      },
      tableLineColor: [229, 231, 235],
      tableLineWidth: 0.5,
      didParseCell: function (data) {
        // Left column (first column) gray, right column white
        if (data.section === 'body' && data.column.index === 0) {
          data.cell.styles.fillColor = [245, 245, 245]; // light gray
        }
        if (data.section === 'body' && data.column.index === 1) {
          data.cell.styles.fillColor = [255, 255, 255]; // white
        }
      },
    });

    // Download
    doc.save(`invoice-${txId || 'invoice'}.pdf`);
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[570px] max-w-[93%] w-full p-0 pb-8 bg-white rounded-2xl shadow-lg border border-[#e5e7eb]">
        <div ref={contentRef} className="p-0">
          {/* Header */}
          <div className="flex justify-between items-start px-6 pt-10 pb-2">
            <div>
              <div className="font-semibold text-[17px] leading-tight text-[#22262e]">Invoice / Transaction ID</div>
              <div className="text-[13px] text-[#777980] mt-0.5">{txId}</div>
            </div>
            <div className="text-[13px] text-[#777980] mt-1">Date: {createdAt}</div>
          </div>
          {/* From/To/Info */}
          <div className="grid grid-cols-3 justify-between gap-3 px-4 pb-4">
            <div className="">
              <div className="font-semibold text-[13px] text-[#22262e] mb-0.5">From:</div>
              <div className="text-[13px] text-[#22262e] font-medium">Travel Booking</div>
              <div className="text-[13px] text-[#777980]">—</div>
            </div>
            <div className="">
              <div className="font-semibold text-[13px] text-[#22262e] mb-0.5">To:</div>
              <div className="text-[13px] text-[#22262e] font-medium">{userName || '-'}</div>
              <div className="text-[13px] text-[#777980]">—</div>
            </div>
            <div className="">
              <div className="font-semibold text-[13px] text-[#22262e] mb-0.5">Info:</div>
              <div className="text-[13px] text-[#22262e]">Account name: <span className="text-[#777980]">{userName || '-'}</span></div>
              <div className="text-[13px] text-[#22262e]">Reference: <span className="text-[#777980]">{reference}</span></div>
              <div className="text-[13px] text-[#22262e]">Provider: <span className="text-[#777980]">{provider}</span></div>
            </div>
          </div>
          {/* Table */}
          <div className="px-6 mt-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa] w-[45%]">Transaction ID</td>
                    <td className="p-2 text-[#4a4c56]">{txId}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Booking ID</td>
                    <td className="p-2 text-[#4a4c56]">{bookingId}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">User</td>
                    <td className="p-2 text-[#4a4c56]">{userName}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Type</td>
                    <td className="p-2 text-[#4a4c56]">{type}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Amount</td>
                    <td className="p-2 text-[#4a4c56]">{amount}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Provider</td>
                    <td className="p-2 text-[#4a4c56]">{provider}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Status</td>
                    <td className="p-2 text-[#4a4c56]">{status}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Reference number</td>
                    <td className="p-2 text-[#4a4c56]">{reference}</td>
                  </tr>
                  {type === 'refund' && (
                    <tr className="border-b last:border-b-0">
                      <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Refund reason</td>
                      <td className="p-2 text-[#4a4c56]">{String(refundReason)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-secondaryColor mt-7 text-headerColor font-medium py-3 rounded-full text-base  cursor-pointer  transition-colors"
            >
              Download Invoice
            </button>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}
