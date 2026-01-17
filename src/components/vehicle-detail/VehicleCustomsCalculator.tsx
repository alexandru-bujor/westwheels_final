import { motion } from 'framer-motion';
import { Shield, Minus, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

interface VehicleCustomsCalculatorProps {
  customsValue: number;
  subtotalMax: number;
  taxPercent: string;
  vatPercent: string;
  taxAmount: number;
  vatAmount: number;
  allInAmount: number;
  customsTotal: number;
  finalTotalEUR: string;
  exchangeRateEUR: number;
  exchangeRatePLN: number;
  onCustomsValueChange: (value: number) => void;
  onAdjustCustoms: (amount: number) => void;
  onTaxPercentChange: (percent: string) => void;
  onVatPercentChange: (percent: string) => void;
}

const VehicleCustomsCalculator = ({
  customsValue,
  subtotalMax,
  taxPercent,
  vatPercent,
  taxAmount,
  vatAmount,
  allInAmount,
  customsTotal,
  finalTotalEUR,
  exchangeRateEUR,
  exchangeRatePLN,
  onCustomsValueChange,
  onAdjustCustoms,
  onTaxPercentChange,
  onVatPercentChange,
}: VehicleCustomsCalculatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <h5 className="font-semibold text-foreground text-xs">Customs Calculator</h5>
        </div>
        <Badge variant="outline" className="text-xs">EU Only</Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">1</span>
            <span className="text-xs">-</span>
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">4</span>
            <span className="text-sm text-muted-foreground">Customs value</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onAdjustCustoms(-100)}
              className="h-8 w-8"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="text"
              value={customsValue || subtotalMax}
              onChange={(e) => onCustomsValueChange(parseInt(e.target.value) || 0)}
              className="h-8 w-24 text-center text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onAdjustCustoms(100)}
              className="h-8 w-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">6</span>
            <Select value={taxPercent} onValueChange={onTaxPercentChange}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10% (Car)</SelectItem>
                <SelectItem value="22">22% (Truck)</SelectItem>
                <SelectItem value="6">6% (Motorcycle)</SelectItem>
                <SelectItem value="1.7">1.7% (Jet Ski/Boat)</SelectItem>
                <SelectItem value="0">0% (Classic Car)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="font-medium text-sm">€{taxAmount.toFixed(0)} - €{(taxAmount * 1.1).toFixed(0)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">7</span>
            <Select value={vatPercent} onValueChange={onVatPercentChange}>
              <SelectTrigger className="w-40 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="19">19% (Bremerhaven)</SelectItem>
                <SelectItem value="21">21% (Rotterdam)</SelectItem>
                <SelectItem value="23">23% (Gdynia)</SelectItem>
                <SelectItem value="9">9% (Classic Car)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="font-medium text-sm">€{vatAmount.toFixed(0)} - €{(vatAmount * 1.1).toFixed(0)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">8</span>
            <span className="text-sm text-muted-foreground">Custom agency "All In"</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3" />
              </TooltipTrigger>
              <TooltipContent>
                <p>The estimated customs handling cost applies to the loading of a standard number of cars into a container.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <span className="font-medium text-sm">€{allInAmount}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">6</span>
            <span className="text-xs">-</span>
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">8</span>
            <span className="font-medium text-sm">Custom clearance total</span>
          </div>
          <span className="font-bold text-sm">€{customsTotal.toFixed(0)} - €{(customsTotal * 1.1).toFixed(0)}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">1</span>
            <span className="text-xs">-</span>
            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">8</span>
            <span className="font-medium">Estimated total price</span>
          </div>
          <span className="font-bold">{finalTotalEUR}</span>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Custom clearance calculator is for information purposes only
          <br />
          <br />
          Exchange rate: USD/EUR {exchangeRateEUR}, USD/PLN {exchangeRatePLN}, EUR/PLN {(exchangeRatePLN / exchangeRateEUR).toFixed(4)}
          <br />
          Exchange rates updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
          <br />
          Rates of The National Bank of Poland{' '}
          <a href="http://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            nbp.pl
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default VehicleCustomsCalculator;
