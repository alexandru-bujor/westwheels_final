import { motion } from 'framer-motion';
import { Fuel as FuelIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { Car } from '@/data/cars';

interface VehicleTertiaryInfoProps {
  car: Car;
  exteriorColor: string;
  cylinders: number;
  fuelType: string;
  bodyStyle: string;
  series: string;
  transmission: string;
  interiorColor: string;
  showMoreSpecs: boolean;
  onShowMoreSpecsChange: (open: boolean) => void;
}

const VehicleTertiaryInfo = ({
  car,
  exteriorColor,
  cylinders,
  fuelType,
  bodyStyle,
  series,
  transmission,
  interiorColor,
  showMoreSpecs,
  onShowMoreSpecsChange,
}: VehicleTertiaryInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="space-y-2.5">
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Exterior color</span>
          <span className="text-xs text-muted-foreground">{exteriorColor}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Engine</span>
          <span className="text-xs text-muted-foreground">{cylinders} cyl.</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Fuel Type</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            {fuelType}
            <FuelIcon className="h-4 w-4" />
          </span>
        </div>

        <Collapsible open={showMoreSpecs} onOpenChange={onShowMoreSpecsChange}>
          <CollapsibleContent className="mt-2 space-y-1.5">
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-semibold text-foreground mb-2">Data fetched from the platform IAAI</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Body Style</span>
                  <span className="text-xs text-foreground">{bodyStyle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Model</span>
                  <span className="text-xs text-foreground">{car.model}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Series</span>
                  <span className="text-xs text-foreground">{series}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Engine</span>
                  <span className="text-xs text-foreground">{cylinders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Fuel Type</span>
                  <span className="text-xs text-foreground">{fuelType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Cylinders</span>
                  <span className="text-xs text-foreground">{cylinders} Cyl</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Transmission</span>
                  <span className="text-xs text-foreground">{transmission}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Exterior</span>
                  <span className="text-xs text-foreground">{exteriorColor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Interior</span>
                  <span className="text-xs text-foreground">{interiorColor}</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full mt-2 text-xs h-8">
              <span className={showMoreSpecs ? 'hidden' : ''}>Show more</span>
              <span className={showMoreSpecs ? '' : 'hidden'}>Show less</span>
              <span className="ml-2">9</span>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </motion.div>
  );
};

export default VehicleTertiaryInfo;
