import { motion } from 'framer-motion';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface VehicleMainInfoProps {
  lotNumber: string;
  vin: string;
  seller: string;
  sellerApproved: boolean;
  saleDocument: string;
  saleDocumentApproved: boolean;
  copiedLot: boolean;
  copiedVin: boolean;
  showSaleDoc: boolean;
  saleDocSide: 'front' | 'rear';
  onCopyLot: () => void;
  onCopyVin: () => void;
  onShowSaleDocChange: (open: boolean) => void;
  onSaleDocSideChange: (side: 'front' | 'rear') => void;
  vehicleScore: string;
}

const VehicleMainInfo = ({
  lotNumber,
  vin,
  seller,
  sellerApproved,
  saleDocument,
  saleDocumentApproved,
  copiedLot,
  copiedVin,
  showSaleDoc,
  saleDocSide,
  onCopyLot,
  onCopyVin,
  onShowSaleDocChange,
  onSaleDocSideChange,
    vehicleScore,
}: VehicleMainInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="space-y-3">
        {/* Lot */}
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Lot</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">0-<span className="font-semibold">{lotNumber.split('-')[1]}</span></span>
            <button
              onClick={onCopyLot}
              className="text-muted-foreground hover:text-primary transition-colors p-0.5"
            >
              {copiedLot ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* VIN */}
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">VIN</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-mono">{vin}</span>
            <button
              onClick={onCopyVin}
              className="text-muted-foreground hover:text-primary transition-colors p-0.5"
            >
              {copiedVin ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Seller */}
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Seller</span>
          <div className="flex items-center gap-1.5">
            {sellerApproved && (
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The seller has been considered trustworthy by WestWheels</p>
                </TooltipContent>
              </Tooltip>
            )}
            <span className="text-xs font-semibold text-foreground">{seller}</span>
          </div>
        </div>

        {/* Sale Document */}
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <span className="text-xs font-medium text-foreground">Sale Document</span>
          <div className="flex items-center gap-1.5">
            {saleDocumentApproved && (
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export possible / registration in Poland possible with current documentation</p>
                </TooltipContent>
              </Tooltip>
            )}
            <span className="text-xs font-semibold text-foreground">{saleDocument}</span>
          </div>
        </div>

          {/* Vehicle Score */}
          <div className="flex items-center justify-between py-1.5 border-b border-border">
              <span className="text-xs font-medium text-foreground">Vehicle Score</span>
              <div className="flex items-center gap-1.5">

                      <Tooltip>
                          <TooltipTrigger>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </TooltipTrigger>
                          <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-foreground">{vehicleScore || '35/50'}</span>
                          </div>
                      </Tooltip>
              </div>
          </div>

        {/* Show Sale Document */}
        <Collapsible open={showSaleDoc} onOpenChange={onShowSaleDocChange}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-xs h-8 mt-1">
              Show sale document
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 bg-muted rounded-lg">
            <div className="flex gap-2 mb-3">
              <Button
                variant={saleDocSide === 'front' ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => onSaleDocSideChange('front')}
              >
                Front side
              </Button>
              <Button
                variant={saleDocSide === 'rear' ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => onSaleDocSideChange('rear')}
              >
                Rear side
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Please note that this is a template. The original title may contain different details, including branding.
            </p>
          </CollapsibleContent>
        </Collapsible>


      </div>
    </motion.div>
  );
};

export default VehicleMainInfo;
