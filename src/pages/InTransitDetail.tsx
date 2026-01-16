import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Copy,
  Fuel as FuelIcon,
  Gauge,
  Settings,
  Car,
  Package,
  Navigation,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface InTransitCar {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  engine: string;
  mileage: number;
  location: string;
  vin: string;
  transitStatus: 'in-transit' | 'pre-arrival' | 'arrived';
  estimatedArrival: string;
  destination: string;
  currentLocation?: string;
  damage?: string;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  cylinders?: number;
  drivetrain?: string;
  exteriorColor?: string;
  interiorColor?: string;
}

// Sample in-transit vehicles (same as in InTransit.tsx)
const inTransitCars: InTransitCar[] = [
  {
    id: 'transit-1',
    title: '2021 Mercedes-Benz C-Class',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 28500,
    images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop'],
    engine: '2.0L I4',
    mileage: 32000,
    location: 'Los Angeles, CA',
    vin: 'WDDWF4KB1MR123456',
    transitStatus: 'in-transit',
    estimatedArrival: '2024-02-15',
    destination: 'Chișinău, Moldova',
    currentLocation: 'Port of Hamburg, Germany',
    damage: 'Clean Title',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    cylinders: 4,
    drivetrain: 'RWD',
    exteriorColor: 'Black',
    interiorColor: 'Black',
  },
  {
    id: 'transit-2',
    title: '2020 BMW 3 Series',
    make: 'BMW',
    model: '3 Series',
    year: 2020,
    price: 24500,
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop'],
    engine: '2.0L I4',
    mileage: 45000,
    location: 'Miami, FL',
    vin: 'WBA8A9C50KG789012',
    transitStatus: 'pre-arrival',
    estimatedArrival: '2024-02-10',
    destination: 'Chișinău, Moldova',
    currentLocation: 'Port of Constanța, Romania',
    damage: 'Minor Dents',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    cylinders: 4,
    drivetrain: 'RWD',
    exteriorColor: 'White',
    interiorColor: 'Beige',
  },
  {
    id: 'transit-3',
    title: '2022 Audi A4',
    make: 'Audi',
    model: 'A4',
    year: 2022,
    price: 32500,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800&h=600&fit=crop'],
    engine: '2.0L I4',
    mileage: 18000,
    location: 'New York, NY',
    vin: 'WAUZZZ8K2NA123789',
    transitStatus: 'in-transit',
    estimatedArrival: '2024-02-20',
    destination: 'Chișinău, Moldova',
    currentLocation: 'Atlantic Ocean',
    damage: 'Clean Title',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    cylinders: 4,
    drivetrain: 'AWD',
    exteriorColor: 'Silver',
    interiorColor: 'Black',
  },
  {
    id: 'transit-4',
    title: '2019 Volkswagen Golf',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2019,
    price: 18500,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800&h=600&fit=crop'],
    engine: '1.4L I4',
    mileage: 55000,
    location: 'Chicago, IL',
    vin: 'WVWZZZ1JZKW456789',
    transitStatus: 'arrived',
    estimatedArrival: '2024-02-05',
    destination: 'Chișinău, Moldova',
    currentLocation: 'Chișinău, Moldova',
    damage: 'Clean Title',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    cylinders: 4,
    drivetrain: 'FWD',
    exteriorColor: 'Blue',
    interiorColor: 'Gray',
  },
  {
    id: 'transit-5',
    title: '2021 Ford Mustang',
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 38500,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800&h=600&fit=crop'],
    engine: '5.0L V8',
    mileage: 25000,
    location: 'Houston, TX',
    vin: '1FA6P8TH5M5123456',
    transitStatus: 'pre-arrival',
    estimatedArrival: '2024-02-12',
    destination: 'Chișinău, Moldova',
    currentLocation: 'Port of Rotterdam, Netherlands',
    damage: 'Clean Title',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    cylinders: 8,
    drivetrain: 'RWD',
    exteriorColor: 'Red',
    interiorColor: 'Black',
  },
  {
    id: 'transit-6',
    title: '2020 Toyota Camry',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22500,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800&h=600&fit=crop'],
    engine: '2.5L I4',
    mileage: 38000,
    location: 'Seattle, WA',
    vin: '4T1B11HK5KU789012',
    transitStatus: 'in-transit',
    estimatedArrival: '2024-02-18',
    destination: 'Chișinău, Moldova',
    currentLocation: 'Port of Antwerp, Belgium',
    damage: 'Clean Title',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    cylinders: 4,
    drivetrain: 'FWD',
    exteriorColor: 'Gray',
    interiorColor: 'Beige',
  },
];

const InTransitDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedVin, setCopiedVin] = useState(false);

  const car = inTransitCars.find((c) => c.id === id);

  useEffect(() => {
    if (!car) {
      navigate('/in-transit');
    }
  }, [car, navigate]);

  if (!car) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = t('common.days') === 'zile' ? 'ro-RO' : 
                   t('common.days') === 'Tage' ? 'de-DE' :
                   t('common.days') === 'días' ? 'es-ES' :
                   t('common.days') === '天' ? 'zh-CN' : 'en-US';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-transit':
        return <Badge variant="secondary" className="gap-1"><Truck className="h-3 w-3" /> {t('inTransit.inTransit')}</Badge>;
      case 'pre-arrival':
        return <Badge variant="default" className="gap-1"><Clock className="h-3 w-3" /> {t('inTransit.preArrival')}</Badge>;
      case 'arrived':
        return <Badge variant="accent" className="gap-1"><CheckCircle2 className="h-3 w-3" /> {t('inTransit.arrived')}</Badge>;
      default:
        return null;
    }
  };

  const copyToClipboard = (text: string, type: 'vin') => {
    navigator.clipboard.writeText(text);
    if (type === 'vin') {
      setCopiedVin(true);
      setTimeout(() => setCopiedVin(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/in-transit')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('inTransit.title')}
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border">
              <img
                src={car.images[0]}
                alt={car.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {getStatusBadge(car.transitStatus)}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 bg-background/80 backdrop-blur-sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 bg-background/80 backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                {car.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span>{car.year}</span>
                <span>•</span>
                <span>{car.mileage.toLocaleString()} {t('vehicle.mileage')}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-muted-foreground">{t('inTransit.price')}</span>
                <span className="font-display font-bold text-4xl text-accent">
                  {formatPrice(car.price)}
                </span>
              </div>
            </div>

            <Separator />

            {/* Transit Information */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                {t('inTransit.infoTitle')}
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{t('inTransit.destination')}</p>
                    <p className="font-medium text-foreground">{car.destination}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <Navigation className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{t('inTransit.currentLocation')}</p>
                    <p className="font-medium text-foreground">{car.currentLocation || car.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{t('inTransit.estimatedArrival')}</p>
                    <p className="font-medium text-foreground">{formatDate(car.estimatedArrival)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{t('inTransit.origin')}</p>
                    <p className="font-medium text-foreground">{car.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Specifications */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                {t('vehicle.specs')}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('vehicle.engine')}</p>
                    <p className="font-medium text-foreground">{car.engine}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FuelIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('inTransit.fuelType')}</p>
                    <p className="font-medium text-foreground">{car.fuelType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('inTransit.transmission')}</p>
                    <p className="font-medium text-foreground">{car.transmission}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('inTransit.bodyType')}</p>
                    <p className="font-medium text-foreground">{car.bodyType}</p>
                  </div>
                </div>

                {car.cylinders && (
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t('inTransit.cylinders')}</p>
                      <p className="font-medium text-foreground">{car.cylinders}</p>
                    </div>
                  </div>
                )}

                {car.drivetrain && (
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t('inTransit.drivetrain')}</p>
                      <p className="font-medium text-foreground">{car.drivetrain}</p>
                    </div>
                  </div>
                )}

                {car.exteriorColor && (
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t('inTransit.exteriorColor')}</p>
                      <p className="font-medium text-foreground">{car.exteriorColor}</p>
                    </div>
                  </div>
                )}

                {car.interiorColor && (
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t('inTransit.interiorColor')}</p>
                      <p className="font-medium text-foreground">{car.interiorColor}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* VIN */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('vehicle.vin')}</p>
                  <p className="font-mono font-medium text-foreground">{car.vin}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(car.vin, 'vin')}
                >
                  {copiedVin ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => window.location.href = `/contact?vehicle=${car.id}`}
              >
                {t('inTransit.details')}
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-gradient-brand text-primary-foreground hover:opacity-90"
                onClick={() => window.location.href = `/contact?vehicle=${car.id}&action=buy`}
              >
                {t('inTransit.buyNow')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* More In Transit Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
            {t('inTransit.moreInTransit')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inTransitCars
              .filter((c) => c.id !== car.id)
              .slice(0, 3)
              .map((otherCar, index) => (
                <Link
                  key={otherCar.id}
                  to={`/in-transit/${otherCar.id}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={otherCar.images[0]}
                        alt={otherCar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(otherCar.transitStatus)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {otherCar.title}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{t('inTransit.price')}</p>
                          <p className="font-display font-bold text-xl text-accent">
                            {formatPrice(otherCar.price)}
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{otherCar.year}</p>
                          <p>{otherCar.mileage.toLocaleString()} {t('vehicle.mileage')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(otherCar.estimatedArrival)}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default InTransitDetail;
