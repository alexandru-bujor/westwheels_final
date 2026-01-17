import { motion } from 'framer-motion';
import { Tag, Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface VehiclePriceEstimatorProps {
  selectedCurrency: 'EUR' | 'PLN';
  selectedView: 'estimated' | 'current';
  selectedPort: string;
  finalTotalEUR: string;
  lotPriceMin: number;
  lotPriceMax: number;
  subtotalMin: number;
  subtotalMax: number;
  auctionFeesMin: number;
  auctionFeesMax: number;
  truckingToPort: number;
  shippingCost: number;
  bidCarsFee: number;
  formatPrice: (price: number) => string;
  onCurrencyChange: (currency: 'EUR' | 'PLN') => void;
  onViewChange: (view: 'estimated' | 'current') => void;
  onPortChange: (port: string) => void;
}

const VehiclePriceEstimator = ({
  selectedCurrency,
  selectedView,
  selectedPort,
  finalTotalEUR,
  lotPriceMin,
  lotPriceMax,
  subtotalMin,
  subtotalMax,
  auctionFeesMin,
  auctionFeesMax,
  truckingToPort,
  shippingCost,
  bidCarsFee,
  formatPrice,
  onCurrencyChange,
  onViewChange,
  onPortChange,
}: VehiclePriceEstimatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <h4 className="font-semibold text-foreground text-sm">Final Price Estimator</h4>
        </div>
        <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-20 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="PLN">PLN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <Button
          variant={selectedView === 'estimated' ? 'default' : 'outline'}
          size="sm"
          className="h-7 text-xs"
          onClick={() => onViewChange('estimated')}
        >
          Estimated
        </Button>
        <Button
          variant={selectedView === 'current' ? 'default' : 'outline'}
          size="sm"
          className="h-7 text-xs"
          onClick={() => onViewChange('current')}
        >
          Current Bid
        </Button>
      </div>

      {/* Main Price Display */}
      <div className="space-y-3 mb-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">{finalTotalEUR}</h3>
          <p className="text-xs text-muted-foreground">Estimated total price</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-sm font-semibold text-foreground">{formatPrice(lotPriceMin)} - {formatPrice(lotPriceMax)}</p>
            <p className="text-xs text-muted-foreground">Purchase amount</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-sm font-semibold text-foreground">{formatPrice(subtotalMin)} - {formatPrice(subtotalMax)}</p>
            <p className="text-xs text-muted-foreground">Customs value</p>
          </div>
        </div>
      </div>

      {/* Final Price Calculator */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4" />
          <h5 className="font-semibold text-foreground text-xs">Final Price Calculator</h5>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">1</span>
              <span className="text-muted-foreground">Lot Price</span>
            </div>
            <span className="font-medium">{formatPrice(lotPriceMin)} - {formatPrice(lotPriceMax)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">2</span>
              <span className="text-muted-foreground">Auction Fees</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Buyer Fee, Internet Bid Fee, Service Fee, Environmental Fee, Title Handling Fee</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="font-medium">{formatPrice(auctionFeesMin)} - {formatPrice(auctionFeesMax)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">3</span>
              <span className="text-muted-foreground">Trucking to port</span>
            </div>
            <span className="font-medium">{formatPrice(truckingToPort)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">4</span>
              <Select value={selectedPort} onValueChange={onPortChange}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rotterdam, NL">Rotterdam, NL</SelectItem>
                  <SelectItem value="Gdynia, PL">Gdynia, PL</SelectItem>
                  <SelectItem value="Bremerhaven, DE">Bremerhaven, DE</SelectItem>
                  <SelectItem value="Klaipeda, LT">Klaipeda, LT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="font-medium">{formatPrice(shippingCost)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">5</span>
              <span className="text-muted-foreground">WestWheels Fee (+ VAT/Tax)</span>
            </div>
            <span className="font-medium">{formatPrice(bidCarsFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">1</span>
              <span className="text-xs">-</span>
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">4</span>
              <span className="font-medium">Subtotal</span>
            </div>
            <span className="font-bold">{formatPrice(subtotalMin)} - {formatPrice(subtotalMax)}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          The calculator check location of the vehicle and shipment from one of the six ports in the USA depending on the branch location.
        </p>
      </div>
    </motion.div>
  );
};

export default VehiclePriceEstimator;
