'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useRef } from 'react';

export default function InvoiceModal({ open, onClose, transaction }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    // Header
    doc.setFontSize(18);
    doc.setTextColor('#22262e');
    doc.text('Invoice ID', 40, 50);
    doc.setFontSize(12);
    doc.setTextColor('#777980');
    doc.text(transaction.invoiceId || '206123456', 40, 70);

    doc.setFontSize(12);
    doc.setTextColor('#777980');
    doc.text(`Date: ${transaction.date || '30-06-24'}`, 420, 50);

    // From/To/Info (with proper Y positions and line breaks)
    const fromAddress = doc.splitTextToSize(transaction.fromAddress || '55 W 39th St, New York, NY 10018, United States', 150);
    const toAddress = doc.splitTextToSize(transaction.toAddress || '6 Kelly Rd, Cambridge, MA 02139, EUA', 150);

    // Titles
    doc.setFontSize(12);
    doc.setTextColor('#22262e');
    doc.setFont('helvetica', 'bold');
    doc.text('From:', 40, 110);
    doc.text('To:', 220, 110);
    doc.text('Info:', 400, 110);

    // Names
    doc.text(transaction.fromName || 'Travel Booking', 40, 125);
    doc.text(transaction.toName || 'Stephia Skarlet', 220, 125);

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
    doc.text(transaction.accountName || 'Stephia Skarlet', 480, infoY);

    infoY += 15;
    doc.setTextColor('#22262e');
    doc.text('SUI:', 400, infoY);
    doc.setTextColor('#777980');
    doc.text(transaction.sui || 'NL40 INGB 0930 000', 430, infoY);

    infoY += 15;
    doc.setTextColor('#22262e');
    doc.text('PayPal:', 400, infoY);
    doc.setTextColor('#777980');
    doc.text(transaction.paypal || 'JonesY@email.com', 450, infoY);

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
        ['Property location', transaction.propertyLocation || '970 Ersel Street, Carrollton, TX 75006'],
        ['Guest name', transaction.guestName || 'Stephia Skarlet'],
        ['Check-in', transaction.checkIn || 'Jan 15, 2025'],
        ['Check-out', transaction.checkOut || 'Jan 18, 2025'],
        ['Days', transaction.days || '2 nights 3 days'],
        ['Hotel price', transaction.hotelPrice || '$250'],
        ['Service fee', transaction.serviceFee || '$20'],
        ['Total amount', transaction.totalAmount || '$270'],
        ['Payment method', transaction.paymentMethod || 'PayPal'],
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
    doc.save(`invoice-${transaction?.invoiceId || 'invoice'}.pdf`);
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[570px] max-w-[93%] w-full p-0 pb-8 bg-white rounded-2xl shadow-lg border border-[#e5e7eb]">
        <div ref={contentRef} className="p-0">
          {/* Header */}
          <div className="flex justify-between items-start px-6 pt-10 pb-2">
            <div>
              <div className="font-semibold text-[17px] leading-tight text-[#22262e]">Invoice ID</div>
              <div className="text-[13px] text-[#777980] mt-0.5">{transaction.invoiceId || '206123456'}</div>
            </div>
            <div className="text-[13px] text-[#777980] mt-1">Date: {transaction.date || '30-08-24'}</div>
          </div>
          {/* From/To/Info */}
          <div className="grid grid-cols-3 justify-between gap-3 px-4 pb-4">
            <div className="">
              <div className="font-semibold text-[13px] text-[#22262e] mb-0.5">From:</div>
              <div className="text-[13px] text-[#22262e] font-medium">{transaction.fromName || 'Travel Booking'}</div>
              <div className="text-[13px] text-[#777980]">{transaction.fromAddress || '55 W 39th St, New York, NY 10018, United States'}</div>
            </div>
            <div className="">
              <div className="font-semibold text-[13px] text-[#22262e] mb-0.5">To:</div>
              <div className="text-[13px] text-[#22262e] font-medium">{transaction.toName || 'Stephia Skarlet'}</div>
              <div className="text-[13px] text-[#777980]">{transaction.toAddress || '6 Kelly Rd, Cambridge, MA 02139, EUA'}</div>
            </div>
            <div className="">
              <div className="font-semibold text-[13px] text-[#22262e] mb-0.5">Info:</div>
              <div className="text-[13px] text-[#22262e]">Account name: <span className="text-[#777980]">{transaction.accountName || 'Stephia Skarlet'}</span></div>
              <div className="text-[13px] text-[#22262e]">SUI: <span className="text-[#777980]">{transaction.sui || 'NL40 INGB 0930 000'}</span></div>
              <div className="text-[13px] text-[#22262e]">PayPal: <span className="text-[#777980]">{transaction.paypal || 'JonesY@email.com'}</span></div>
            </div>
          </div>
          {/* Table */}
          <div className="px-6 mt-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa] w-[45%]">Property location</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.propertyLocation || '970 Great Street, Carrollton, TX 75009'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Guest name</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.guestName || 'Stephia Skarlet'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Check-in</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.checkIn || 'Jan 15, 2025'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Check-out</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.checkOut || 'Jan 18, 2025'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Days</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.days || '2 nights & 3 days'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Hotel price</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.hotelPrice || '$250'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Service fee</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.serviceFee || '$20'}</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Total amount</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.totalAmount || '$270'}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-[#22262e] bg-[#fafafa]">Payment method</td>
                    <td className="p-2 text-[#4a4c56]">{transaction.paymentMethod || 'PayPal'}</td>
                  </tr>
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
