import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Users, Award, Shield, Linkedin, Twitter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '500K+', label: 'Vehicles Sold' },
    { value: '120+', label: 'Countries Served' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '15+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We connect buyers with vehicles from auctions across the United States, delivering to destinations worldwide.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your transactions are protected with industry-leading security measures and transparent processes.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our dedicated support team is available to guide you through every step of your purchase journey.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'We provide detailed vehicle information and history reports to help you make informed decisions.',
    },
  ];

  const team = [
    {
      name: 'Michael Roberts',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'David Martinez',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    },
  ];

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
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              About WestWheels
            </h1>
            <p className="text-muted-foreground text-lg">
              We're on a mission to make vehicle auctions accessible to everyone, everywhere. 
              Our platform connects buyers with premium salvage and clean-title vehicles from 
              the world's largest auction houses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2009, WestWheels started with a simple idea: make vehicle 
                  auctions accessible to buyers around the world. What began as a small 
                  operation has grown into one of the leading international vehicle auction 
                  platforms.
                </p>
                <p>
                  Today, we serve customers in over 120 countries, helping them find and 
                  purchase vehicles from major US auctions. Our team of experts handles 
                  everything from bidding to international shipping, making the process 
                  seamless and stress-free.
                </p>
                <p>
                  We believe everyone deserves access to quality vehicles at fair prices, 
                  and we're committed to making that a reality for our customers every day.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop"
                alt="Car auction"
                className="rounded-xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop"
                alt="Premium vehicle"
                className="rounded-xl w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"
                alt="Luxury car"
                className="rounded-xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop"
                alt="Sports car"
                className="rounded-xl w-full h-48 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The people behind WestWheels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <div className="flex justify-center gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
