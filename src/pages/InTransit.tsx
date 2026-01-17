import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Truck, MapPin, Calendar, CheckCircle2, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { getCarImages } from '@/utils/carImages';

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
}

// Sample in-transit vehicles
const inTransitCars: InTransitCar[] = [
  {
    id: 'transit-1',
    title: '2021 Mercedes-Benz C-Class',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 28500,
    images: getCarImages('transit-1'),
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
  },
  {
    id: 'transit-2',
    title: '2020 BMW 3 Series',
    make: 'BMW',
    model: '3 Series',
    year: 2020,
    price: 24500,
    images: getCarImages('transit-2'),
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
  },
  {
    id: 'transit-3',
    title: '2022 Audi A4',
    make: 'Audi',
    model: 'A4',
    year: 2022,
    price: 32500,
    images: getCarImages('transit-3'),
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
  },
  {
    id: 'transit-4',
    title: '2019 Volkswagen Golf',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2019,
    price: 18500,
    images: getCarImages('transit-4'),
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
  },
  {
    id: 'transit-5',
    title: '2021 Ford Mustang',
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 38500,
    images: getCarImages('transit-5'),
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
  },
  {
    id: 'transit-6',
    title: '2020 Toyota Camry',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22500,
    images: getCarImages('transit-6'),
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
  },
];

const InTransit = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('arrival');

  const makes = useMemo(() => {
    const uniqueMakes = new Set(inTransitCars.map((car) => car.make));
    return Array.from(uniqueMakes).sort();
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...inTransitCars];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.title.toLowerCase().includes(query) ||
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.vin.toLowerCase().includes(query)
      );
    }

    // Make filter
    if (selectedMake && selectedMake !== 'all') {
      result = result.filter((car) => car.make === selectedMake);
    }

    // Status filter
    if (selectedStatus && selectedStatus !== 'all') {
      result = result.filter((car) => car.transitStatus === selectedStatus);
    }

    // Sort
    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'arrival':
        result.sort((a, b) => new Date(a.estimatedArrival).getTime() - new Date(b.estimatedArrival).getTime());
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [searchQuery, selectedMake, selectedStatus, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = t('common.days') === 'zile' ? 'ro-RO' : 
                   t('common.days') === 'Tage' ? 'de-DE' :
                   t('common.days') === 'días' ? 'es-ES' :
                   t('common.days') === '天' ? 'zh-CN' : 'en-US';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {t('inTransit.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('inTransit.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('inTransit.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:flex gap-3 lg:gap-4">
              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger className="w-full lg:w-[160px] h-10">
                  <SelectValue placeholder={t('inTransit.allMakes')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('inTransit.allMakes')}</SelectItem>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-[160px] h-10">
                  <SelectValue placeholder={t('inTransit.status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('inTransit.allStatuses')}</SelectItem>
                  <SelectItem value="in-transit">{t('inTransit.inTransit')}</SelectItem>
                  <SelectItem value="pre-arrival">{t('inTransit.preArrival')}</SelectItem>
                  <SelectItem value="arrived">{t('inTransit.arrived')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[160px] h-10 col-span-2 lg:col-span-1">
                  <SelectValue placeholder={t('inTransit.sort')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arrival">{t('inTransit.arrivalDate')}</SelectItem>
                  <SelectItem value="priceAsc">{t('inTransit.priceAsc')}</SelectItem>
                  <SelectItem value="priceDesc">{t('inTransit.priceDesc')}</SelectItem>
                  <SelectItem value="newest">{t('inTransit.yearNewest')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">{t('inTransit.noVehicles')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                    {/* Image - Clickable */}
                    <Link to={`/in-transit/${car.id}`} rel="noopener noreferrer">
                      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
                        <img
                          src={car.images[0]}
                          alt={car.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          {getStatusBadge(car.transitStatus)}
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <Link to={`/in-transit/${car.id}`} target="_blank" rel="noopener noreferrer">
                        <h3 className="font-display font-semibold text-foreground text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem] cursor-pointer">
                          {car.title}
                        </h3>
                      </Link>
                      
                      <div className="space-y-2.5 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{car.currentLocation || car.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">
                            <span className="font-medium">{t('inTransit.estimatedArrival')}:</span> {formatDate(car.estimatedArrival)}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Truck className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">
                            <span className="font-medium">{t('inTransit.destination')}:</span> {car.destination}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{t('inTransit.price')}</p>
                          <p className="font-display font-bold text-2xl text-accent">
                            {formatPrice(car.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{car.year}</p>
                          <p className="text-xs text-muted-foreground">{car.mileage.toLocaleString()} {t('vehicle.mileage')}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-10"
                          onClick={() => window.open(`/in-transit/${car.id}`, '_blank')}
                        >
                          {t('inTransit.details')}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-10 bg-gradient-brand text-primary-foreground hover:opacity-90"
                          onClick={() => {
                            window.location.href = `/contact?vehicle=${car.id}&action=buy`;
                          }}
                        >
                          {t('inTransit.buyNow')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              {t('inTransit.infoTitle')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('inTransit.infoDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-center">{t('inTransit.statusInTransit')}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('inTransit.statusInTransitDesc')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-center">{t('inTransit.statusPreArrival')}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('inTransit.statusPreArrivalDesc')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-center">{t('inTransit.statusArrived')}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('inTransit.statusArrivedDesc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InTransit;
