import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  Heart,
  Clock,
  ChevronDown,
  TrendingUp,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Car } from "@/data/cars";

interface VehicleHeaderProps {
  car: Car;
  vin: string;
  vehicleType: string;
  seriesName: string;
  auctionSource: string;
  shippingFrom: string;
  distance: string;
  lotPriceMin: number;
  lotPriceMax: number;
  viewsCount: number;
  deliveryStart: string;
  deliveryEnd: string;
  auctionDate: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  formatPrice: (price: number) => string;
}

export default function VehicleHeader({
  car,
  vin,
  vehicleType,
  seriesName,
  auctionSource,
  shippingFrom,
  distance,
  lotPriceMin,
  lotPriceMax,
  viewsCount,
  deliveryStart,
  deliveryEnd,
  auctionDate,
  isFavorite,
  onFavoriteToggle,
  formatPrice,
}: VehicleHeaderProps) {
  // Extract lot ID from lot number format (e.g., "0-12345678" -> "12345678")
  const lotId = car.lot?.split('-')[1] || car.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card rounded-lg overflow-hidden mb-6"
    >
      {/* ───────── TOP BAR ───────── */}
      <div className="border-b border-border px-4 py-1.5 flex justify-between items-center text-[11px]">
        <div className="flex items-center gap-1 flex-wrap">
          <Link to="/" className="font-semibold text-primary hover:underline">
            WestWheels
          </Link>
          <span className="text-muted-foreground">/</span>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
              {vehicleType} <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Automobile</DropdownMenuItem>
              <DropdownMenuItem>Motorcycle</DropdownMenuItem>
              <DropdownMenuItem>ATV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{car.make}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{car.model}</span>
          <span className="text-muted-foreground">/</span>

          <Link to="#" className="text-primary hover:underline truncate max-w-[220px]">
            {car.year} {car.make} {car.model} {vin}
          </Link>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <Eye className="w-3 h-3" />
          <span>
            <b>{viewsCount}</b> people viewed this vehicle
          </span>
        </div>
      </div>

      {/* ───────── MAIN ───────── */}
      <div className="px-4 py-3 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
        {/* LEFT */}
        <div className="space-y-2">
          {/* Title Row with Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-wrap">
            <h2 className="text-base font-bold">
              {car.year} {car.make} {car.model}
              {seriesName && `, ${seriesName}`}
            </h2>
            
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] flex-wrap">
              <span className="text-muted-foreground">Location:</span>
              <span>{car.location}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Shipping from:</span>
              <span>{shippingFrom}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Distance:</span>
              <span>{distance}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Estimated cost:</span>
              <span className="font-semibold">
                {formatPrice(lotPriceMin)} – {formatPrice(lotPriceMax)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-mono">{vin}</span>
            <span className="text-muted-foreground">{lotId}</span>
            <a
              href="#"
              className="uppercase text-[10px] bg-red-500 text-white px-2 py-0.5 rounded"
            >
              {auctionSource}
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[11px]">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-muted-foreground">Estimated delivery time (EU)</div>
              <div className="font-semibold">
                {deliveryStart} – {deliveryEnd}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onFavoriteToggle}
            className="text-[11px]"
          >
            <Heart
              className={`w-3 h-3 mr-1 ${
                isFavorite ? "fill-primary text-primary" : ""
              }`}
            />
            {isFavorite ? "Watching" : "Watch"}
          </Button>
        </div>
      </div>

      {/* ───────── BOTTOM BAR ───────── */}
      <div className="border-t border-border px-4 py-1.5 flex flex-wrap items-center gap-2 text-[11px]">
        <Button variant="ghost" size="sm" className="h-7 text-[11px]">
          <TrendingUp className="w-4 h-4 mr-1" />
          Sales History
        </Button>

        <Button variant="ghost" size="sm" className="h-7 text-[11px]">
          <Copy className="w-4 h-4 mr-1" />
          Similar archival offers
        </Button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
          <span className="text-muted-foreground">Live auction</span>
          <span className="font-semibold">{auctionDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
