import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cars } from '@/data/cars';
import VehicleHeader from '@/components/vehicle-detail/VehicleHeader';
import VehicleGallery from '@/components/vehicle-detail/VehicleGallery';
import VehicleMainInfo from '@/components/vehicle-detail/VehicleMainInfo';
import VehicleSecondaryInfo from '@/components/vehicle-detail/VehicleSecondaryInfo';
import VehicleTertiaryInfo from '@/components/vehicle-detail/VehicleTertiaryInfo';
import VehicleAdditionalServices from '@/components/vehicle-detail/VehicleAdditionalServices';
import VehicleBidding from '@/components/vehicle-detail/VehicleBidding';
import VehiclePriceEstimator from '@/components/vehicle-detail/VehiclePriceEstimator';
import VehicleCustomsCalculator from '@/components/vehicle-detail/VehicleCustomsCalculator';

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
  const vehicleScore = car.saleScore || '30/50'

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
        <div className="mx-auto max-w-[95%] px-1 py-8">
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
          <VehicleHeader
            car={car}
            vin={vin}
            vehicleType={vehicleType}
            seriesName={seriesName}
            auctionSource={auctionSource}
            shippingFrom={shippingFrom}
            distance={distance}
            viewsCount={viewsCount}
            deliveryStart={deliveryStart}
            deliveryEnd={deliveryEnd}
            auctionDate={auctionDate}
            isFavorite={isFavorite}
            onFavoriteToggle={() => setIsFavorite(!isFavorite)}
            formatPrice={formatPrice}
                      />

          <div className="grid grid-cols-1 gap-6 lg:[grid-template-columns:repeat(20,minmax(0,1fr))]">
            {/* Left Column - Gallery */}
            <div className="lg:col-span-9">
              <VehicleGallery
              car={car}
              currentImage={currentImage}
              onPrevImage={prevImage}
              onNextImage={nextImage}
              onImageSelect={setCurrentImage}
              isFavorite={isFavorite}
                onFavoriteToggle={() => setIsFavorite(!isFavorite)}
              />
            </div>

            {/* Middle Column - Vehicle Info */}
            <div className="lg:col-span-6 space-y-4">
              <VehicleMainInfo
                lotNumber={lotNumber}
                vin={vin}
                seller={seller}
                sellerApproved={sellerApproved}
                saleDocument={saleDocument}
                saleDocumentApproved={saleDocumentApproved}
                copiedLot={copiedLot}
                copiedVin={copiedVin}
                showSaleDoc={showSaleDoc}
                saleDocSide={saleDocSide}
                onCopyLot={() => copyToClipboard(lotNumber, 'lot')}
                onCopyVin={() => copyToClipboard(vin, 'vin')}
                onShowSaleDocChange={setShowSaleDoc}
                onSaleDocSideChange={setSaleDocSide}
                vehicleScore={vehicleScore}
              />

              <VehicleSecondaryInfo
                loss={loss}
                primaryDamage={primaryDamage}
                secondaryDamage={secondaryDamage}
                odometer={odometer}
                odometerKm={odometerKm}
                startCode={startCode}
                keyPresent={keyPresent}
                acv={acv}
                erc={erc}
              />

              <VehicleTertiaryInfo
                car={car}
                exteriorColor={exteriorColor}
                cylinders={cylinders}
                fuelType={fuelType}
                bodyStyle={bodyStyle}
                series={series}
                transmission={transmission}
                interiorColor={interiorColor}
                showMoreSpecs={showMoreSpecs}
                onShowMoreSpecsChange={setShowMoreSpecs}
              />

              <VehicleAdditionalServices
                purchaseRestriction={purchaseRestriction}
                hazardousCargo={hazardousCargo}
                oversizedVehicle={oversizedVehicle}
                oversizedPlus={oversizedPlus}
                showMoreServices={showMoreServices}
                onPurchaseRestrictionChange={setPurchaseRestriction}
                onHazardousCargoChange={setHazardousCargo}
                onOversizedVehicleChange={setOversizedVehicle}
                onOversizedPlusChange={setOversizedPlus}
                onShowMoreServicesChange={setShowMoreServices}
                  />
                </div>

            {/* Right Column - Bidding & Calculators */}
            <div className="lg:col-span-5 space-y-4">
              <VehicleBidding
                car={car}
                bidAmount={bidAmount}
                formatPrice={formatPrice}
                formatTimeLeft={formatTimeLeft}
                onBidAmountChange={setBidAmount}
                onBidValueChange={setBidValue}
                onAdjustBid={adjustBid}
                lotPriceMin={lotPriceMin}
                lotPriceMax={lotPriceMax}
              />

              <VehiclePriceEstimator
                selectedCurrency={selectedCurrency}
                selectedView={selectedView}
                selectedPort={selectedPort}
                finalTotalEUR={finalTotalEUR}
                lotPriceMin={lotPriceMin}
                lotPriceMax={lotPriceMax}
                subtotalMin={subtotalMin}
                subtotalMax={subtotalMax}
                auctionFeesMin={auctionFeesMin}
                auctionFeesMax={auctionFeesMax}
                truckingToPort={truckingToPort}
                shippingCost={shippingCost}
                bidCarsFee={bidCarsFee}
                formatPrice={formatPrice}
                onCurrencyChange={setSelectedCurrency}
                onViewChange={setSelectedView}
                onPortChange={setSelectedPort}
              />

              <VehicleCustomsCalculator
                customsValue={customsValue}
                subtotalMax={subtotalMax}
                taxPercent={taxPercent}
                vatPercent={vatPercent}
                taxAmount={taxAmount}
                vatAmount={vatAmount}
                allInAmount={allInAmount}
                customsTotal={customsTotal}
                finalTotalEUR={finalTotalEUR}
                exchangeRateEUR={exchangeRateEUR}
                exchangeRatePLN={exchangeRatePLN}
                onCustomsValueChange={setCustomsValue}
                onAdjustCustoms={adjustCustoms}
                onTaxPercentChange={setTaxPercent}
                onVatPercentChange={setVatPercent}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
