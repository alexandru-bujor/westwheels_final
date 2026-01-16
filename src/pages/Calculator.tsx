import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, DollarSign, Truck, Percent, CreditCard, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Calculator = () => {
  const { t } = useTranslation();
  const [vehiclePrice, setVehiclePrice] = useState<string>('');
  const [auctionFees, setAuctionFees] = useState<string>('800');
  const [shippingCost, setShippingCost] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('19');

  const destinations = [
    { value: 'moldova', label: 'Moldova', shipping: 2500, taxRate: '6' },
    { value: 'europe', label: 'Europe', shipping: 2500, taxRate: '19' },
  ];

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    const dest = destinations.find((d) => d.value === value);
    if (dest) {
      setShippingCost(dest.shipping.toString());
      setTaxRate(dest.taxRate);
    }
  };

  const calculateTotal = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const auction = parseFloat(auctionFees) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const tax = parseFloat(taxRate) || 0;

    const subtotal = price + auction + shipping;
    const taxAmount = subtotal * (tax / 100);
    const total = subtotal + taxAmount;

    return {
      subtotal,
      taxAmount,
      total,
    };
  };

  const { subtotal, taxAmount, total } = calculateTotal();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const exportCalculations = async () => {
    const calculations = {
      vehiclePrice: parseFloat(vehiclePrice) || 0,
      auctionFees: parseFloat(auctionFees) || 0,
      shippingCost: parseFloat(shippingCost) || 0,
      destination: destinations.find(d => d.value === destination)?.label || 'Not selected',
      taxRate: parseFloat(taxRate) || 0,
      subtotal,
      taxAmount,
      total,
      date: new Date().toLocaleString(),
    };

    // Website colors
    const brandBlue = [36, 154, 243]; // #249af3
    const accentGreen = [73, 163, 102]; // hsl(145 65% 51%) converted to RGB
    const darkGray = [28, 28, 28]; // hsl(0 0% 11%)
    const lightGray = [230, 230, 230]; // hsl(0 0% 90%)
    const textGray = [115, 115, 115]; // hsl(0 0% 45%)

    // Create new PDF document
    const doc = new jsPDF();
    
    // Convert logo to base64
    const getLogoBase64 = async (): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          } else {
            resolve('');
          }
        };
        img.onerror = () => resolve('');
        img.src = logo;
      });
    };

    const logoData = await getLogoBase64();

    // Header with colored background
    doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo - wider to avoid shrinking (60px width instead of 30px)
    if (logoData) {
      try {
        doc.addImage(logoData, 'PNG', 15, 8, 60, 24);
      } catch (e) {
        // If logo fails to load, continue without it
      }
    }
    
    // Title in header (white text) - positioned next to logo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Customs Calculator Export', 80, 25);
    
    // Date in header
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${calculations.date}`, 80, 33);
    
    // Reset text color
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    // Main content area
    let yPos = 55;
    
    // Section header with colored background
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(20, yPos - 5, 170, 8, 2, 2, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text('Calculation Details', 25, yPos);
    
    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    // Vehicle Price
    doc.text('Vehicle Price:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(formatCurrency(calculations.vehiclePrice), 160, yPos);
    yPos += 9;
    
    // Auction Fees
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Auction Fees:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(formatCurrency(calculations.auctionFees), 160, yPos);
    yPos += 9;
    
    // Shipping Cost
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Shipping Cost:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(formatCurrency(calculations.shippingCost), 160, yPos);
    yPos += 9;
    
    // Destination
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Destination:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(calculations.destination, 160, yPos);
    yPos += 9;
    
    // Tax Rate
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Tax Rate:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(`${calculations.taxRate}%`, 160, yPos);
    yPos += 15;
    
    // Colored line separator
    doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    // Summary section header
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(20, yPos - 5, 170, 8, 2, 2, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text('Summary', 25, yPos);
    
    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    // Subtotal
    doc.text('Subtotal:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(formatCurrency(calculations.subtotal), 160, yPos);
    yPos += 9;
    
    // Tax Amount
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Tax Amount:', 25, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text(formatCurrency(calculations.taxAmount), 160, yPos);
    yPos += 15;
    
    // Total with accent color background
    doc.setFillColor(accentGreen[0], accentGreen[1], accentGreen[2]);
    doc.roundedRect(20, yPos - 8, 170, 12, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Total:', 25, yPos);
    doc.setFontSize(18);
    doc.text(formatCurrency(calculations.total), 160, yPos);
    yPos += 20;
    
    // Footer note with gray text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text('* This is an estimate. Final costs may vary based on actual shipping rates,', 20, yPos);
    yPos += 5;
    doc.text('customs duties, and local regulations.', 20, yPos);
    
    // Footer with brand color
    yPos = 280;
    doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 8;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.text('WestWheels - Your Gateway to Premium Salvage Vehicles', 105, yPos, { align: 'center' });
    
    // Save PDF
    doc.save(`customs-calculator-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 lg:pt-28 lg:pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
              <CalcIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              {t('calculator.title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('calculator.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-2xl p-6 lg:p-8 border border-border"
              >
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                  Enter Details
                </h2>

                <div className="space-y-6">
                  {/* Vehicle Price */}
                  <div>
                    <Label htmlFor="vehiclePrice" className="text-sm font-medium mb-2 block">
                      {t('calculator.vehiclePrice')}
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="vehiclePrice"
                        type="number"
                        placeholder="e.g. 25000"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(e.target.value)}
                        className="pl-10 h-12 bg-background"
                      />
                    </div>
                  </div>

                  {/* Auction Fees */}
                  <div>
                    <Label htmlFor="auctionFees" className="text-sm font-medium mb-2 block">
                      {t('calculator.auctionFees')}
                    </Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="auctionFees"
                        type="number"
                        placeholder="e.g. 800"
                        value={auctionFees}
                        onChange={(e) => setAuctionFees(e.target.value)}
                        className="pl-10 h-12 bg-background"
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Destination
                    </Label>
                    <Select value={destination} onValueChange={handleDestinationChange}>
                      <SelectTrigger className="h-12 bg-background">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {destinations.map((dest) => (
                          <SelectItem key={dest.value} value={dest.value}>
                            {dest.label} (≈${dest.shipping.toLocaleString()})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shipping Cost */}
                  <div>
                    <Label htmlFor="shippingCost" className="text-sm font-medium mb-2 block">
                      {t('calculator.shipping')}
                    </Label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="shippingCost"
                        type="number"
                        placeholder="e.g. 2500"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                        className="pl-10 h-12 bg-background"
                      />
                    </div>
                  </div>

                  {/* Tax Rate */}
                  <div>
                    <Label htmlFor="taxRate" className="text-sm font-medium mb-2 block">
                      {t('calculator.taxes')} (%)
                    </Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="taxRate"
                        type="number"
                        placeholder="e.g. 19"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        className="pl-10 h-12 bg-background"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-brand rounded-2xl p-6 lg:p-8 text-primary-foreground"
              >
                <h2 className="font-display font-semibold text-xl mb-8">
                  Cost Breakdown
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">{t('calculator.vehiclePrice')}</span>
                    <span className="font-semibold">
                      {formatCurrency(parseFloat(vehiclePrice) || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">{t('calculator.auctionFees')}</span>
                    <span className="font-semibold">
                      {formatCurrency(parseFloat(auctionFees) || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">{t('calculator.shipping')}</span>
                    <span className="font-semibold">
                      {formatCurrency(parseFloat(shippingCost) || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">
                      {t('calculator.taxes')} ({taxRate}%)
                    </span>
                    <span className="font-semibold">{formatCurrency(taxAmount)}</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">{t('calculator.total')}</span>
                      <span className="font-display font-bold text-3xl">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary-foreground/10 rounded-xl">
                  <p className="text-sm text-primary-foreground/80">
                    * This is an estimate. Final costs may vary based on actual shipping rates,
                    customs duties, and local regulations.
                  </p>
                </div>

                <Button
                  onClick={exportCalculations}
                  className="w-full mt-6 bg-primary-foreground text-primary hover:opacity-90 hover:text-white"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t('inTransit.export')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculator;
