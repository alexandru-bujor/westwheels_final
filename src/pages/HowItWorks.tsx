import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, MousePointer, CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: MousePointer,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      details: [
        'Create your free account in minutes',
        'Browse thousands of vehicles from US auctions',
        'Use filters to find exactly what you need',
        'Set up alerts for specific makes and models',
        'Place bids directly from our platform',
      ],
    },
    {
      icon: CreditCard,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      details: [
        'Receive instant notification when you win',
        'Complete payment securely online',
        'Multiple payment options available',
        'Full invoice with all costs detailed',
        'Dedicated support throughout the process',
      ],
    },
    {
      icon: Truck,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      details: [
        'We handle all export documentation',
        'Track your shipment in real-time',
        'Door-to-door delivery available',
        'Insurance coverage included',
        'Customs clearance assistance',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              {t('howItWorks.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-8 lg:gap-16`}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="aspect-square max-w-md mx-auto bg-gradient-brand rounded-3xl p-8 flex items-center justify-center">
                      <step.icon className="w-32 h-32 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center font-display font-bold text-2xl lg:text-3xl text-primary-foreground shadow-brand">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-3 h-3 text-accent-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-charcoal">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join thousands of satisfied buyers who have saved big on their dream vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-brand">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/inventory">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Vehicles
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
