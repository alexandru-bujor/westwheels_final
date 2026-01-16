import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const autoAuctionFAQs = [
    {
      question: 'How do I register for auto auctions through WestWheels?',
      answer:
        'To register for auto auctions, simply get in touch with our team. We guide you through the entire registration process, provide all required documentation, and help set up your account with our auction partners. Once registered, you gain access to a wide range of vehicles and machinery.',
    },
    {
      question: 'Can I inspect the vehicles before bidding?',
      answer:
        'Physical inspections are not always possible for online auctions. However, auction partners provide detailed condition reports, including high-quality photos and sometimes videos, allowing you to make informed bidding decisions.',
    },
    {
      question: 'How do I arrange shipping for my purchased vehicles?',
      answer:
        'WestWheels handles the entire shipping process. After a successful bid, we arrange pickup from the auction location, manage export documentation, and organize international shipping to your destination.',
    },
    {
      question: 'What types of vehicles and machinery are available through these auctions?',
      answer:
        'Available inventory includes cars, trucks, motorcycles, boats, and construction equipment. Options range from salvage vehicles to used cars and specialty machinery.',
    },
    {
      question: 'How does WestWheels assist with customs clearance and import requirements?',
      answer:
        'Our team manages all customs documentation and ensures compliance with international shipping and import regulations, guiding you through every step of the import process.',
    },
  ];

  const internationalTransportFAQs = [
    {
      question: 'What countries do you ship vehicles to?',
      answer:
        'We ship vehicles globally to most major ports across Europe, Asia, Africa, and other regions, supported by a wide network of reliable international carriers.',
    },
    {
      question: 'What types of vehicles can you ship internationally?',
      answer:
        'We ship cars, trucks, motorcycles, boats, and heavy machinery, using tailored solutions suitable for different sizes and vehicle types.',
    },
    {
      question: 'How do you ensure the safety of my vehicle during international transport?',
      answer:
        'Vehicles are secured using industry-leading loading techniques and high-quality materials. We also perform detailed inspections and documentation to ensure full transparency.',
    },
    {
      question: 'What is the process for customs clearance when shipping vehicles internationally?',
      answer:
        'We assist with all required documentation and coordinate with customs authorities to ensure compliance, minimize delays, and keep you informed throughout the process.',
    },
    {
      question: 'How long does international vehicle shipping typically take?',
      answer:
        'Ocean freight shipping usually takes 4–8 weeks, depending on the origin, destination, and shipping method. Exact estimates are provided per route.',
    },
  ];

  const domesticTransportFAQs = [
    {
      question: 'What types of vehicles do you transport domestically?',
      answer:
        'We transport cars, trucks, motorcycles, boats, and heavy machinery, whether a single vehicle or an entire fleet.',
    },
    {
      question: 'How long does domestic shipping typically take?',
      answer:
        'Short distances typically take 3–5 days, while coast-to-coast transport usually takes 7–10 days, depending on route and conditions.',
    },
    {
      question: 'How do you ensure the safety of my vehicle during domestic transport?',
      answer:
        'We use advanced loading techniques, high-quality equipment, and real-time tracking so you can monitor your vehicles status at any time.',
    },
    {
      question: 'What documentation is required for domestic vehicle shipping?',
      answer:
        'Required documents include: Vehicle title (front and back), Government-issued ID, Completed vehicle condition report. Our team assists you to ensure all paperwork is completed correctly.',
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
            <div className="w-16 h-16 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our services, auctions, and shipping processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Auto Auction Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
                Auto Auction Access
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {autoAuctionFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`auto-auction-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* International Transportation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
                International Transportation
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {internationalTransportFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`international-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Domestic Transportation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
                Domestic Transportation
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {domesticTransportFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`domestic-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please get in touch with our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
