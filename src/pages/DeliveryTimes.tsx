import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Cloud, Wind, Droplets, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Terminal {
  id: string;
  name: string;
  status: 'operational' | 'delayed' | 'closed';
  weather: {
    temperature: number;
    icon: string;
    humidity: number;
    windSpeed: number;
    alert: string | null;
  };
  currentStatus: string;
  timeframes: {
    label: string;
    duration: string;
  }[];
}

const DeliveryTimes = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const terminals: Terminal[] = [
    {
      id: 'savannah',
      name: 'Savannah Terminal',
      status: 'operational',
      weather: {
        temperature: 4,
        icon: '🌙',
        humidity: 27,
        windSpeed: 26,
        alert: null,
      },
      currentStatus: t('deliveryTimes.savannah.status'),
      timeframes: [
        {
          label: t('deliveryTimes.timeframe1'),
          duration: '4-11 days',
        },
        {
          label: t('deliveryTimes.timeframe2'),
          duration: '1-6 days',
        },
        {
          label: t('deliveryTimes.timeframe3'),
          duration: '3-37 days',
        },
        {
          label: t('deliveryTimes.timeframe4'),
          duration: '29-29 days',
        },
      ],
    },
    {
      id: 'houston',
      name: 'Houston Terminal',
      status: 'operational',
      weather: {
        temperature: 13,
        icon: '🌙',
        humidity: 46,
        windSpeed: 10,
        alert: null,
      },
      currentStatus: t('deliveryTimes.houston.status'),
      timeframes: [
        {
          label: t('deliveryTimes.timeframe1'),
          duration: '4-13 days',
        },
        {
          label: t('deliveryTimes.timeframe2'),
          duration: '4-14 days',
        },
        {
          label: t('deliveryTimes.timeframe3'),
          duration: '4-29 days',
        },
        {
          label: t('deliveryTimes.timeframe4'),
          duration: '16-26 days',
        },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            {t('deliveryTimes.operational')}
          </Badge>
        );
      case 'delayed':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            {t('deliveryTimes.delayed')}
          </Badge>
        );
      case 'closed':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            {t('deliveryTimes.closed')}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                {t('deliveryTimes.title')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('deliveryTimes.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Terminals Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {terminals.map((terminal, index) => (
                <motion.div
                  key={terminal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
                >
                  {/* Terminal Header */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                          {terminal.name}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{t('deliveryTimes.time')} {formatTime(currentTime)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(terminal.status)}
                      </div>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-6">
                    {/* Weather and Status Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {/* Weather Today */}
                      <div className="bg-background rounded-lg border border-border p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-foreground">{t('deliveryTimes.weatherToday')}</h3>
                          <Cloud className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl font-bold text-foreground">
                            {terminal.weather.temperature}°C
                          </span>
                          <span className="text-3xl">{terminal.weather.icon}</span>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4" />
                            <span>{t('deliveryTimes.humidity')} {terminal.weather.humidity}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4" />
                            <span>{t('deliveryTimes.windSpeed')} {terminal.weather.windSpeed} km/h</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>
                              {t('deliveryTimes.weatherAlert')} {terminal.weather.alert || '-'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Current Status */}
                      <div className="bg-background rounded-lg border border-border p-6 md:col-span-2">
                        <h3 className="font-semibold text-foreground mb-3">{t('deliveryTimes.currentStatus')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {terminal.currentStatus}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Timeframes */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-foreground mb-4">
                        {t('deliveryTimes.deliveryTimeframes')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {terminal.timeframes.map((timeframe, idx) => (
                          <div
                            key={idx}
                            className="bg-background rounded-lg border border-border p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                          >
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                {timeframe.label}
                              </p>
                              <p className="font-semibold text-foreground">
                                {timeframe.duration}
                              </p>
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 ml-4" />
                          </div>
                        ))}
                      </div>
                      {terminal.id === 'savannah' && (
                        <p className="text-xs text-muted-foreground mt-4">
                          * {t('deliveryTimes.containerNote')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryTimes;
