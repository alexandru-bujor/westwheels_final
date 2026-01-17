import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@autoamerica.md',
      description: 'Send us an email anytime',
      link: 'mailto:info@autoamerica.md',
    },
    {
      icon: Mail,
      title: 'Accounting',
      value: 'contabil@autoamerica.md',
      description: 'For accounting inquiries',
      link: 'mailto:contabil@autoamerica.md',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '068503505',
      description: 'Call us during business hours',
      link: 'tel:068503505',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'Strada Meșterul Manole 5A, Chișinău',
      description: 'Visit our main office',
      link: 'https://www.google.com/maps/place/West+Wheels+SRL/@47.0262537,28.8918458,17z/data=!4m6!3m5!1s0x40c97d6cd94659c7:0x501355e94de730ef!8m2!3d47.0264596!4d28.8918493!16s%2Fg%2F11jtsjvvpm?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Sat: 9AM - 7PM',
      description: 'Sunday: Closed',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 lg:pt-28 lg:pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              {t('nav.contact')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border"
            >
              <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
                Send us a message
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="h-12 bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-12 bg-background"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="h-12 bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="h-12 bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="bg-background resize-none"
                  />
                </div>

                <Button className="w-full h-12 bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-brand text-lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => {
                  const content = (
                    <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center mb-3">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-primary font-medium mb-1">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  );
                  
                  if (item.link) {
                    return (
                      <a
                        key={index}
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block"
                      >
                        {content}
                      </a>
                    );
                  }
                  
                  return <div key={index}>{content}</div>;
                })}
              </div>

              {/* Map */}
              <div className="bg-card rounded-2xl overflow-hidden border border-border h-80">
                  <iframe
                      title="West Wheels Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.7015378395286!2d28.889274376674074!3d47.0264632278582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d6cd94659c7%3A0x501355e94de730ef!2sWest%20Wheels%20SRL!5e0!3m2!1sen!2s!4v1768581124075!5m2!1sen!2s"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                  />

              </div>
            </motion.div>
          </div>
        </div>
      </section>

        <Footer/>
    </div>
  );
};

export default Contact;
