import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import InventoryFilters from '@/components/InventoryFilters';
import { cars, makes, damageTypes, years } from '@/data/cars';

const Inventory = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDamage, setSelectedDamage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('endingSoon');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

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

    // Year filter
    if (selectedYear && selectedYear !== 'all') {
      result = result.filter((car) => car.year === parseInt(selectedYear));
    }

    // Damage filter
    if (selectedDamage && selectedDamage !== 'all') {
      result = result.filter((car) => car.damage === selectedDamage);
    }

    // Sort
    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'endingSoon':
        result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [searchQuery, selectedMake, selectedYear, selectedDamage, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMake('all');
    setSelectedYear('all');
    setSelectedDamage('all');
    setSortBy('endingSoon');
  };

  const hasActiveFilters =
    searchQuery || selectedMake !== 'all' || selectedYear !== 'all' || selectedDamage !== 'all';

  const FilterContent = () => (
    <InventoryFilters />
  );

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
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              {t('inventory.title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t('inventory.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or VIN..."
              className="pl-12 h-12 bg-card"
            />
          </div>

          <div className="flex gap-2">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-12" size="lg">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  {t('inventory.filters')}
                  {hasActiveFilters && (
                    <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>{t('inventory.filters')}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12 bg-card">
                <SelectValue placeholder={t('inventory.sort')} />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="endingSoon">{t('inventory.endingSoon')}</SelectItem>
                <SelectItem value="priceAsc">{t('inventory.priceAsc')}</SelectItem>
                <SelectItem value="priceDesc">{t('inventory.priceDesc')}</SelectItem>
                <SelectItem value="newest">{t('inventory.newest')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-xl p-6 border border-border">
              <h3 className="font-display font-semibold text-lg text-foreground mb-6">
                {t('inventory.filters')}
              </h3>
              <FilterContent />
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredCars.length}</span>{' '}
                {t('inventory.results')}
              </p>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  {t('inventory.noCars')}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  {t('inventory.clearFilters')}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Inventory;
