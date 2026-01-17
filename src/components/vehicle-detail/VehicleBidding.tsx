import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Car } from '@/data/cars';

interface VehicleBiddingProps {
  car: Car;
  bidAmount: string;
  formatPrice: (price: number) => string;
  formatTimeLeft: () => string;
  onBidAmountChange: (value: string) => void;
  onBidValueChange: (value: number) => void;
  onAdjustBid: (amount: number) => void;
    lotPriceMin: number;
    lotPriceMax: number;

}

const VehicleBidding = ({
  car,
  bidAmount,
  formatPrice,
  formatTimeLeft,
  onBidAmountChange,
  onBidValueChange,

                            lotPriceMin,
                            lotPriceMax,
  onAdjustBid,
}: VehicleBiddingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="space-y-4">
        {/* Current Bid & Max Bid */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="text-xl font-bold text-foreground">{formatPrice(car.price)}</p>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground">Your max bid</p>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>We will represent you up to your max bid during the live auction.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-lg font-bold text-foreground">---</p>
          </div>
        </div>

        {/* Time Left */}
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <p className="text-xs text-muted-foreground">Time left</p>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Bid closing happens 30 minutes before the live auction starts.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm font-semibold text-green-600">{formatTimeLeft()}</p>
        </div>

        {/* Bid Input */}
        <div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onAdjustBid(-100)}
              className="h-9"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <Input
              type="text"
              value={bidAmount}
              onChange={(e) => {
                onBidAmountChange(e.target.value);
                onBidValueChange(parseInt(e.target.value) || 0);
              }}
              className="h-9 text-center text-sm"
              placeholder="0"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onAdjustBid(100)}
              className="h-9"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button className="w-full mt-3 bg-primary text-primary-foreground h-9 text-sm">
            Bid Now
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            You don't know how to start bidding?{' '}
            <Link to="/how-it-works" className="text-primary hover:underline">
              Purchase process
            </Link>
          </p>
            <div className="flex items-center gap-1">
            <span className="font-semiboldbold">Estimated cost:</span>
            <span className="font-semibold">
                {formatPrice(lotPriceMin)} – {formatPrice(lotPriceMax)}
              </span></div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleBidding;
