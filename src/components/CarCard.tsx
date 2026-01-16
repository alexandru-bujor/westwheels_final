import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, MapPin, Heart, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Car } from '@/data/cars';

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(car.endDate).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [car.endDate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDamageVariant = (damage: string) => {
    if (damage === 'Clean Title') return 'accent';
    if (damage === 'Minor Dents') return 'secondary';
    return 'destructive';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="group"
    >
      <Link to={`/vehicle/${car.id}`} target="_blank" rel="noopener noreferrer">
        <div className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={car.images[0]}
              alt={car.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Add to favorites"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? 'fill-primary text-primary' : 'text-foreground'
                }`}
              />
            </button>

            {/* Damage Badge */}
            {/*<Badge
              variant={getDamageVariant(car.damage) as any}
              className="absolute top-3 left-3"
            >
              {car.damage !== 'Clean Title' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {car.damage}
            </Badge>*/}

            {/* Timer */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Clock className="h-4 w-4" />
                <div className="flex gap-1.5 text-sm font-medium animate-count-pulse">
                  <span>{timeLeft.days}{t('common.days').charAt(0)}</span>
                  <span>{timeLeft.hours}{t('common.hours').charAt(0)}</span>
                  <span>{timeLeft.minutes}{t('common.minutes').charAt(0)}</span>
                  <span>{timeLeft.seconds}{t('common.seconds').charAt(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-display font-semibold text-foreground text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {car.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5" />
              <span>{car.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t('vehicle.currentBid')}</p>
                <p className="font-display font-bold text-xl text-accent">
                  {formatPrice(car.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{car.bids} {t('vehicle.bids')}</p>
                {car.buyNowPrice && (
                  <p className="text-sm text-primary font-medium">
                    {t('vehicle.buyNow')}: {formatPrice(car.buyNowPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">

              <Button
                variant="outline"
                size="sm"
                className="flex-1 addtowatch"
                onClick={(e) => e.preventDefault()}
              >
                {t('vehicle.watchlist')}
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-brand text-primary-foreground hover:opacity-90"
                onClick={(e) => e.preventDefault()}
              >
                {t('vehicle.placeBid')}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
