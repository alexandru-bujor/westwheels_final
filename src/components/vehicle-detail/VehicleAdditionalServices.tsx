import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface VehicleAdditionalServicesProps {
  purchaseRestriction: boolean;
  hazardousCargo: boolean;
  oversizedVehicle: boolean;
  oversizedPlus: boolean;
  showMoreServices: boolean;
  onPurchaseRestrictionChange: (checked: boolean) => void;
  onHazardousCargoChange: (checked: boolean) => void;
  onOversizedVehicleChange: (checked: boolean) => void;
  onOversizedPlusChange: (checked: boolean) => void;
  onShowMoreServicesChange: (open: boolean) => void;
}

const VehicleAdditionalServices = ({
  purchaseRestriction,
  hazardousCargo,
  oversizedVehicle,
  oversizedPlus,
  showMoreServices,
  onPurchaseRestrictionChange,
  onHazardousCargoChange,
  onOversizedVehicleChange,
  onOversizedPlusChange,
  onShowMoreServicesChange,
}: VehicleAdditionalServicesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-foreground">Additional Services</span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground">11</span>
            <Checkbox
              id="purchase-restriction"
              checked={purchaseRestriction}
              onCheckedChange={(checked) => onPurchaseRestrictionChange(checked === true)}
              className="h-3.5 w-3.5"
            />
            <Label htmlFor="purchase-restriction" className="text-xs cursor-pointer">
              Vehicle with purchase restriction
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 inline ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional fee for purchasing a vehicle from Michigan, Alabama, Wisconsin, Washington state. A different auction fees may apply.</p>
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
          <span className="text-xs text-muted-foreground">$0</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground">12</span>
            <Checkbox
              id="hazardous-cargo"
              checked={hazardousCargo}
              onCheckedChange={(checked) => onHazardousCargoChange(checked === true)}
              className="h-3.5 w-3.5"
            />
            <Label htmlFor="hazardous-cargo" className="text-xs cursor-pointer">
              Hazardous cargo
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 inline ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional fee for transporting electric (EV), hybrid (MHEV/HEV/PHEV), and hydrogen (FCEV) vehicle.</p>
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
          <span className="text-xs text-muted-foreground">$0</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground">13</span>
            <Checkbox
              id="oversized-vehicle"
              checked={oversizedVehicle}
              onCheckedChange={(checked) => onOversizedVehicleChange(checked === true)}
              className="h-3.5 w-3.5"
            />
            <Label htmlFor="oversized-vehicle" className="text-xs cursor-pointer">
              Oversized vehicle
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 inline ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional fee for transporting oversized vehicle like Pickup Truck (e.g. Ford F-150, Dodge Ram 1500) or large SUV (e.g. Cadillac Escalade).</p>
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
          <span className="text-xs text-muted-foreground">$0</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground">14</span>
            <Checkbox
              id="oversized-plus"
              checked={oversizedPlus}
              onCheckedChange={(checked) => onOversizedPlusChange(checked === true)}
              className="h-3.5 w-3.5"
            />
            <Label htmlFor="oversized-plus" className="text-xs cursor-pointer">
              Oversized+ vehicle
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 inline ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional fee for transporting oversized vehicle like Van or Cargo Van (e.g. Mercedes Sprinter, Ford Transit).</p>
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
          <span className="text-xs text-muted-foreground">$0</span>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Selecting a check mark will add the given amount to the estimated total price.
        </p>

        <Collapsible open={showMoreServices} onOpenChange={onShowMoreServicesChange}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full text-xs h-8">
              <span className={showMoreServices ? 'hidden' : ''}>Show more</span>
              <span className={showMoreServices ? '' : 'hidden'}>Show less</span>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </motion.div>
  );
};

export default VehicleAdditionalServices;
