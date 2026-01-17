import { motion } from 'framer-motion';
import { Info, Key } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface VehicleSecondaryInfoProps {
  loss: string;
  primaryDamage: string;
  secondaryDamage: string;
  odometer: number;
  odometerKm: number;
  startCode: string;
  keyPresent: boolean;
  acv: number;
  erc: number;
}

const VehicleSecondaryInfo = ({
  loss,
  primaryDamage,
  secondaryDamage,
  odometer,
  odometerKm,
  startCode,
  keyPresent,
  acv,
  erc,
}: VehicleSecondaryInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="space-y-2.5">
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Loss</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {loss}
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>The reported damages were noted by the auction house employee. This information is for reference only.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Primary damage</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {primaryDamage}
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>The reported damages were noted by the auction house employee. This information is for reference only.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Secondary damage</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {secondaryDamage}
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>The reported damages were noted by the auction house employee. This information is for reference only.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Odometer</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {odometer.toLocaleString()} mi ({odometerKm.toLocaleString()} km)
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>The indicated mileage was recorded by the auction house employee. We recommend verifying it using the odometer photo and the report available on our website.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Start code</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {startCode}
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>The vehicle was marked by the auction house employee as {startCode}, which means that at the time of inspection the vehicle started.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Key</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {keyPresent ? 'Present' : 'Missing'}
                {keyPresent && <Key className="h-4 w-4 text-green-500" />}
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>The key was recorded by the auction house employee as present. If found missing during vehicle pickup from the auction house, the vehicle will be picked up without the key.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-xs font-medium text-foreground">ACV / ERC</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                ${acv.toLocaleString()} USD / ${erc.toLocaleString()} USD
                <Info className="h-3 w-3" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Actual Cash Value (ACV) / Estimated Repair Cost (ERC)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleSecondaryInfo;
