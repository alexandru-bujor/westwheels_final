import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, DollarSign, Truck, Percent, CreditCard } from 'lucide-react';
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
    { value: 'eu', label: 'Europe', shipping: 2500 },
    { value: 'uk', label: 'United Kingdom', shipping: 2200 },
    { value: 'asia', label: 'Asia', shipping: 3500 },
    { value: 'africa', label: 'Africa', shipping: 3000 },
    { value: 'south-america', label: 'South America', shipping: 2800 },
    { value: 'australia', label: 'Australia', shipping: 4000 },
  ];

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    const dest = destinations.find((d) => d.value === value);
    if (dest) {
      setShippingCost(dest.shipping.toString());
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
