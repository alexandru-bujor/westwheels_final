import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  Info,
  Key,
  Fuel as FuelIcon,
  Minus,
  Plus,
  Tag,
  Calculator,
  Shield,
  Eye,
  ChevronDown,
  History,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cars, Car } from '@/data/cars';

const VehicleDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasTimeLeft, setHasTimeLeft] = useState(false);

  // Copy states
  const [copiedLot, setCopiedLot] = useState(false);
  const [copiedVin, setCopiedVin] = useState(false);

  // UI states
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [showSaleDoc, setShowSaleDoc] = useState(false);
  const [saleDocSide, setSaleDocSide] = useState<'front' | 'rear'>('front');
  const [bidValue, setBidValue] = useState(0);
  const [customsValue, setCustomsValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<'EUR' | 'PLN'>('EUR');
  const [selectedPort, setSelectedPort] = useState('Rotterdam, NL');
  const [taxPercent, setTaxPercent] = useState('6');
  const [vatPercent, setVatPercent] = useState('21');
  const [selectedView, setSelectedView] = useState<'estimated' | 'current'>('estimated');
  
  // Additional services
  const [purchaseRestriction, setPurchaseRestriction] = useState(false);
  const [hazardousCargo, setHazardousCargo] = useState(false);
  const [oversizedVehicle, setOversizedVehicle] = useState(false);
  const [oversizedPlus, setOversizedPlus] = useState(false);

  const car = cars.find((c) => c.id === id);

  useEffect(() => {
    if (!car) return;

    const calculateTimeLeft = () => {
      const endTime = new Date(car.endDate).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setHasTimeLeft(true);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setHasTimeLeft(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [car]);

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Vehicle not found
          </h1>
          <Link to="/inventory">
            <Button>Back to Inventory</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string, type: 'lot' | 'vin') => {
    navigator.clipboard.writeText(text);
    if (type === 'lot') {
      setCopiedLot(true);
      setTimeout(() => setCopiedLot(false), 2000);
    } else {
      setCopiedVin(true);
      setTimeout(() => setCopiedVin(false), 2000);
    }
  };

  const formatTimeLeft = () => {
    return `${timeLeft.days} d ${timeLeft.hours} h ${timeLeft.minutes} min ${timeLeft.seconds} sec`;
  };

  const adjustBid = (amount: number) => {
    const current = bidValue || car.price;
    const newValue = Math.max(car.price, current + amount);
    setBidValue(newValue);
    setBidAmount(newValue.toString());
  };

  const adjustCustoms = (amount: number) => {
    setCustomsValue(Math.max(0, customsValue + amount));
  };

  // Car data with defaults
  const lotNumber = car.lot || `0-${car.id.padStart(8, '0')}`;
  const vin = car.vin;
  const seller = car.seller || 'Auto Club Of Southern Ca (acsc)';
  const sellerApproved = car.sellerApproved !== false;
  const saleDocument = car.saleDocument || 'Salvage certificate (California)';
  const saleDocumentApproved = car.saleDocumentApproved !== false;
  const loss = car.loss || 'Collision';
  const primaryDamage = car.primaryDamage || car.damage || 'Right side';
  const secondaryDamage = car.secondaryDamage || '-';
  const odometer = car.mileage;
  const odometerKm = Math.round(odometer * 1.60934);
  const startCode = car.startCode || 'Starts';
  const keyPresent = car.keyPresent !== false;
  const acv = car.acv || 8110;
  const erc = car.erc || 0;
  const exteriorColor = car.exteriorColor || 'Burgundy';
  const fuelType = car.fuelType || 'Gasoline';
  const cylinders = car.cylinders || 2;
  const bodyStyle = car.bodyStyle || 'CRUISER';
  const series = car.series || 'DYNA FAT BOB';
  const transmission = car.transmission || 'Unknown';
  const interiorColor = car.interiorColor || 'Black';

  // Additional data for header
  const vehicleType = 'Motorcycle';
  const auctionSource = car.auction || 'IAAI';
  const shippingFrom = 'Los Angeles (CA)';
  const distance = '~70 mil (113 km)';
  const viewsCount = 47;
  const seriesName = car.series || 'Dyna Fat Bob';
  const deliveryStart = '16 April';
  const deliveryEnd = '30 April';
  const auctionDate = 'Friday, 16 January, 19:00';

  // Calculate prices
  const lotPriceMin = car.price;
  const lotPriceMax = car.buyNowPrice || car.price * 1.4;
  const auctionFeesMin = 555;
  const auctionFeesMax = 630;
  const truckingToPort = 246;
  const shippingCosts: Record<string, number> = {
    'Rotterdam, NL': 495,
    'Gdynia, PL': 745,
    'Bremerhaven, DE': 495,
    'Klaipeda, LT': 495,
  };
  const shippingCost = shippingCosts[selectedPort] || 495;
  const bidCarsFee = 450;
  
  const subtotalMin = lotPriceMin + auctionFeesMin + truckingToPort + shippingCost + bidCarsFee;
  const subtotalMax = lotPriceMax + auctionFeesMax + truckingToPort + shippingCost + bidCarsFee;
  
  const customsValueAmount = customsValue || subtotalMax;
  const taxAmount = (customsValueAmount * parseFloat(taxPercent)) / 100;
  const vatAmount = ((customsValueAmount + taxAmount) * parseFloat(vatPercent)) / 100;
  const allInAmount = 300;
  const customsTotal = taxAmount + vatAmount + allInAmount;
  
  const finalTotalMin = subtotalMin + customsTotal;
  const finalTotalMax = subtotalMax + customsTotal;
  
  const exchangeRateEUR = 0.8593;
  const exchangeRatePLN = 3.6153;
  
  const finalTotalEUR = selectedCurrency === 'EUR' 
    ? `€${(finalTotalMin * exchangeRateEUR).toFixed(0)} - €${(finalTotalMax * exchangeRateEUR).toFixed(0)}`
    : `${(finalTotalMin * exchangeRatePLN).toFixed(0)} PLN - ${(finalTotalMax * exchangeRatePLN).toFixed(0)} PLN`;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 lg:pt-24 pb-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link to="/inventory" className="hover:text-primary transition-colors">
              Inventory
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{car.title}</span>
          </motion.div>

          {/* Vehicle Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg border border-border p-6 mb-8 space-y-4"
          >
            {/* Top Row: Breadcrumb, Title, Views */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Link to="/" className="font-semibold text-primary hover:underline">WestWheels</Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{vehicleType}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{car.make}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{car.model}</span>
                <span className="text-muted-foreground">/</span>
                <Link to="#" className="text-primary hover:underline">
                  {car.year} {car.make} {car.model} {vin}
                </Link>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{viewsCount} people viewed this vehicle</span>
              </div>
            </div>

            {/* Main Section: 70% left, 30% right */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Left Side - 70% */}
              <div className="flex-1 lg:max-w-[70%]">
                <div className="space-y-4">
                  {/* First Row: Description, VIN, Auction */}
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 uppercase">
                      {car.year} {car.make} {car.model}, {seriesName}
                    </h1>
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                      <span className="text-xs md:text-sm font-mono text-foreground">{vin}</span>
                      <Badge variant="destructive" className="bg-red-500 text-white text-xs">{auctionSource}</Badge>
                    </div>
                  </div>

                  {/* Second Row: Location, Shipping, Distance, Estimated Cost - In one row */}
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-foreground">{car.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Shipping from:</span>
                      <span className="text-foreground">{shippingFrom}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Odległość:</span>
                      <span className="text-foreground">{distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Estimated cost:</span>
                      <span className="font-semibold text-primary">
                        {formatPrice(lotPriceMin)} - {formatPrice(lotPriceMax)}
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Estimated cost includes lot price range</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Third Row: Sales History, Similar Offers */}
                  <div className="flex items-center gap-2 md:gap-3 pt-2 flex-wrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs">
                          <History className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          <span className="hidden sm:inline">Sales History</span>
                          <span className="sm:hidden">History</span>
                          <span className="ml-1 md:ml-2">0</span>
                          <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>No sales history available</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs">
                          <Package className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          <span className="hidden sm:inline">Similar archival offers</span>
                          <span className="sm:hidden">Similar</span>
                          <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>No similar offers available</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Right Side - 30% */}
              <div className="lg:max-w-[30%] lg:min-w-[200px] flex flex-col lg:items-end gap-3">
                <div className="text-xs md:text-sm lg:text-right">
                  <div className="text-muted-foreground mb-1">Estimated delivery time (EU)</div>
                  <div className="font-semibold text-foreground">{deliveryStart} - {deliveryEnd}</div>
                </div>
                <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs w-full lg:w-auto" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                  Watch
                </Button>
              </div>
            </div>

            {/* Bottom Row: Live Auction */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-muted-foreground">Live auction</span>
              <span className="text-sm font-semibold text-foreground">{auctionDate}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Gallery (60%) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={car.images[currentImage]}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
                    {currentImage + 1} / {car.images.length}
                  </div>

                  {/* Damage Badge */}
                  <Badge
                    variant={car.damage === 'Clean Title' ? 'default' : 'destructive'}
                    className="absolute top-4 left-4"
                  >
                    {car.damage}
                  </Badge>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        index === currentImage ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${car.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Title & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                      {car.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{car.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite ? 'fill-primary text-primary' : ''
                        }`}
                      />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info & Bidding */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Main Info Box */}
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
                          onClick={() => copyToClipboard(lotNumber, 'lot')}
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
                          onClick={() => copyToClipboard(vin, 'vin')}
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

                    {/* Show Sale Document */}
                    <Collapsible open={showSaleDoc} onOpenChange={setShowSaleDoc}>
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
                            onClick={() => setSaleDocSide('front')}
                          >
                            Front side
                          </Button>
                          <Button
                            variant={saleDocSide === 'rear' ? 'default' : 'outline'}
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setSaleDocSide('rear')}
                          >
                            Rear side
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Please note that this is a template. The original title may contain different details, including branding.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Expert Message */}
                    <div className="bg-primary/10 rounded-lg p-3 mt-3">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-xs">PS</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-xs">Patryk Szwałek</h4>
                          <p className="text-xs text-muted-foreground mb-1">WestWheels Expert</p>
                          <p className="text-xs text-foreground">
                            <strong>Recommended by WestWheels!</strong>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Hello, this vehicle is offered by the trusted IAAI's seller and has all necessary documents for registration in Poland. Enjoy bidding!!
                          </p>
                        </div>
                      </div>
                  </div>
                </div>
              </motion.div>

                {/* Secondary Info Box */}
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

                {/* Tertiary Info Box */}
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

                    <Collapsible open={showMoreSpecs} onOpenChange={setShowMoreSpecs}>
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

                {/* Additional Services */}
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
                          onCheckedChange={(checked) => setPurchaseRestriction(checked === true)}
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
                          onCheckedChange={(checked) => setHazardousCargo(checked === true)}
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
                          onCheckedChange={(checked) => setOversizedVehicle(checked === true)}
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
                          onCheckedChange={(checked) => setOversizedPlus(checked === true)}
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

                    <Collapsible open={showMoreServices} onOpenChange={setShowMoreServices}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full text-xs h-8">
                          <span className={showMoreServices ? 'hidden' : ''}>Show more</span>
                          <span className={showMoreServices ? '' : 'hidden'}>Show less</span>
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                </div>
              </motion.div>

                {/* Bidding Section */}
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
                          onClick={() => adjustBid(-100)}
                          className="h-9"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                  <Input
                          type="text"
                    value={bidAmount}
                          onChange={(e) => {
                            setBidAmount(e.target.value);
                            setBidValue(parseInt(e.target.value) || 0);
                          }}
                          className="h-9 text-center text-sm"
                          placeholder="0"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => adjustBid(100)}
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
                    </div>
                  </div>
                </motion.div>

                {/* Final Price Estimator */}
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
                    <Select value={selectedCurrency} onValueChange={(v: 'EUR' | 'PLN') => setSelectedCurrency(v)}>
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
                      onClick={() => setSelectedView('estimated')}
                    >
                      Estimated
                    </Button>
                <Button
                      variant={selectedView === 'current' ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSelectedView('current')}
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
                          <Select value={selectedPort} onValueChange={setSelectedPort}>
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

                {/* Customs Calculator */}
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
                          onClick={() => adjustCustoms(-100)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="text"
                          value={customsValue || subtotalMax}
                          onChange={(e) => setCustomsValue(parseInt(e.target.value) || 0)}
                          className="h-8 w-24 text-center text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => adjustCustoms(100)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">6</span>
                        <Select value={taxPercent} onValueChange={setTaxPercent}>
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
                        <Select value={vatPercent} onValueChange={setVatPercent}>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
