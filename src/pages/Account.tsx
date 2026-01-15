import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Gavel, Heart, FileText, Settings, LogOut, Eye, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Account = () => {
  const { t } = useTranslation();

  const myBids = [
    { id: 1, vehicle: '2022 BMW M4 Competition', bid: 42500, status: 'winning', endDate: '2024-02-15' },
    { id: 2, vehicle: '2021 Ford Mustang GT500', bid: 45000, status: 'outbid', endDate: '2024-02-14' },
    { id: 3, vehicle: '2023 Tesla Model S Plaid', bid: 75000, status: 'won', endDate: '2024-02-10' },
  ];

  const watchlist = [
    { id: 1, vehicle: '2023 Mercedes-AMG GT', price: 68900, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=120&fit=crop' },
    { id: 2, vehicle: '2022 Lamborghini Huracán', price: 185000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&h=120&fit=crop' },
    { id: 3, vehicle: '2021 Porsche 911 Turbo S', price: 125000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=120&fit=crop' },
  ];

  const documents = [
    { id: 1, name: 'Invoice - BMW M4', date: '2024-02-10', type: 'PDF' },
    { id: 2, name: 'Bill of Lading - Tesla Model S', date: '2024-02-08', type: 'PDF' },
    { id: 3, name: 'Title Transfer - Ford Mustang', date: '2024-01-25', type: 'PDF' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'winning':
        return 'default';
      case 'outbid':
        return 'destructive';
      case 'won':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 lg:pt-28">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="font-display font-bold text-2xl text-foreground mb-1">
                  John Doe
                </h1>
                <p className="text-muted-foreground mb-3">john.doe@example.com</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gavel className="h-4 w-4" />
                    <span>12 Active Bids</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>8 Watchlist</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>3 Vehicles Won</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="bids" className="w-full">
              <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1 mb-6">
                <TabsTrigger value="bids" className="flex-1 sm:flex-none">
                  <Gavel className="h-4 w-4 mr-2" />
                  My Bids
                </TabsTrigger>
                <TabsTrigger value="watchlist" className="flex-1 sm:flex-none">
                  <Heart className="h-4 w-4 mr-2" />
                  Watchlist
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex-1 sm:flex-none">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>

              {/* My Bids */}
              <TabsContent value="bids">
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Vehicle</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Your Bid</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">End Date</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myBids.map((bid) => (
                          <tr key={bid.id} className="border-b border-border last:border-0">
                            <td className="py-4 px-6 font-medium text-foreground">{bid.vehicle}</td>
                            <td className="py-4 px-6 text-accent font-semibold">{formatPrice(bid.bid)}</td>
                            <td className="py-4 px-6">
                              <Badge variant={getStatusVariant(bid.status) as any}>
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground">{bid.endDate}</td>
                            <td className="py-4 px-6">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* Watchlist */}
              <TabsContent value="watchlist">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden">
                      <img src={item.image} alt={item.vehicle} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">{item.vehicle}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-accent font-bold">{formatPrice(item.price)}</span>
                          <Button size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90">
                            Bid Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Documents */}
              <TabsContent value="documents">
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Document</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((doc) => (
                          <tr key={doc.id} className="border-b border-border last:border-0">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-medium text-foreground">{doc.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground">{doc.date}</td>
                            <td className="py-4 px-6">
                              <Badge variant="outline">{doc.type}</Badge>
                            </td>
                            <td className="py-4 px-6">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
