import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Car, Bike, MoreHorizontal } from 'lucide-react';

const vehicleTypes = [
  { value: 'automobile', label: 'Automobile', icon: Car },
  { value: 'motorcycle', label: 'Motorcycle', icon: Bike },
  { value: 'atv', label: 'ATV', icon: Bike },
];

const moreVehicleTypes = [
  'Personal Watercraft',
  'Snowmobile',
  'Boat',
  'Trailer',
  'Travel Trailer',
  'Motor Home',
  'Emergency Equipment',
  'Heavy Equipment',
  'Farm Equipment',
  'Forestry Equipment',
  'Bus',
  'Truck',
];

const makes = [
  'All makes',
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac',
  'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Ford', 'Genesis', 'GMC', 'Honda',
  'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'KIA', 'Lamborghini', 'Land Rover', 'Lexus',
  'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan',
  'Porsche', 'RAM', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];

const years = Array.from({ length: 2028 - 1900 + 1 }, (_, i) => 2028 - i);

const VehicleSearchForm = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('automobile');
  const [archived, setArchived] = useState(false);
  const [copart, setCopart] = useState(true);
  const [iaai, setIaai] = useState(true);
  const [make, setMake] = useState<string | undefined>(undefined);
  const [model, setModel] = useState<string | undefined>(undefined);
  const [generation, setGeneration] = useState<string | undefined>(undefined);
  const [yearFrom, setYearFrom] = useState<string | undefined>(undefined);
  const [yearTo, setYearTo] = useState<string | undefined>(undefined);
  const [vinSearch, setVinSearch] = useState('');

  const handleSearch = () => {
    // Handle search logic here
    console.log('Search:', {
      type: selectedType,
      archived,
      copart,
      iaai,
      make,
      model,
      generation,
      yearFrom,
      yearTo,
      vinSearch,
    });
  };

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-lg p-4 md:p-6 max-w-6xl mx-auto">
      {/* Vehicle Type Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6 pb-4 border-b border-gray-200 dark:border-border">
        <div className="flex items-center gap-1 flex-wrap">
          {vehicleTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md transition-colors text-xs md:text-sm ${
                  selectedType === type.value
                    ? 'bg-primary text-white border-b-2 border-primary'
                    : 'text-gray-600 dark:text-foreground hover:bg-gray-100 dark:hover:bg-muted'
                }`}
              >
                <Icon className="h-4 w-4 md:h-6 md:w-6" />
                <span className="font-medium hidden sm:inline">{type.label}</span>
              </button>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md text-gray-600 dark:text-foreground hover:bg-gray-100 dark:hover:bg-muted text-xs md:text-sm">
                <MoreHorizontal className="h-4 w-4 md:h-6 md:w-6" />
                <span className="font-medium hidden sm:inline">More</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {moreVehicleTypes.map((type) => (
                <DropdownMenuItem key={type} onClick={() => setSelectedType(type.toLowerCase().replace(/\s+/g, '-'))}>
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="archived" checked={archived} onCheckedChange={setArchived} />
          <label htmlFor="archived" className="text-xs md:text-sm text-gray-600 dark:text-foreground cursor-pointer">
            Archived
          </label>
        </div>
      </div>

      {/* Form Title */}
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-foreground">What are you looking for?</h3>
      </div>

      {/* Search Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        {/* Row 1: All makes | All models | or search by VIN */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <div className="flex-1 min-w-[150px] md:min-w-[200px]">
            <Select value={make || undefined} onValueChange={setMake}>
              <SelectTrigger className="w-full h-9 md:h-10 text-xs md:text-sm">
                <SelectValue placeholder="All makes" />
              </SelectTrigger>
              <SelectContent>
                {makes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 min-w-[150px] md:min-w-[200px]">
            <Select value={model || undefined} onValueChange={setModel}>
              <SelectTrigger className="w-full h-9 md:h-10 text-xs md:text-sm">
                <SelectValue placeholder="All models" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-models">All models</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center w-full sm:w-auto">
            <p className="text-gray-500 dark:text-muted-foreground font-medium px-2 text-xs md:text-sm">or</p>
          </div>

          <div className="flex-1 min-w-[150px] md:min-w-[200px]">
            <div className="relative">
              <Input
                placeholder="Search by VIN or lot number"
                value={vinSearch}
                onChange={(e) => setVinSearch(e.target.value)}
                className="pr-10 h-9 md:h-10 text-xs md:text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Row 2: All generations | from | to | copart iaai show */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-3 md:pt-4 border-t border-gray-200 dark:border-border">
          <div className="flex-1 min-w-[150px] md:min-w-[200px]">
            <Select value={generation || undefined} onValueChange={setGeneration}>
              <SelectTrigger className="w-full h-9 md:h-10 text-xs md:text-sm">
                <SelectValue placeholder="All generations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-generations">All generations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[100px] md:min-w-[120px]">
            <Select value={yearFrom || undefined} onValueChange={setYearFrom}>
              <SelectTrigger className="h-9 md:h-10 text-xs md:text-sm">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[100px] md:min-w-[120px]">
            <Select value={yearTo || undefined} onValueChange={setYearTo}>
              <SelectTrigger className="h-9 md:h-10 text-xs md:text-sm">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto sm:ml-auto flex-wrap">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Switch
                id="copart"
                checked={copart}
                onCheckedChange={setCopart}
                className="switch-copart data-[state=checked]:bg-blue-600"
              />
              <label htmlFor="copart" className="text-xs md:text-sm text-gray-600 dark:text-foreground cursor-pointer">
                Copart
              </label>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Switch
                id="iaai"
                checked={iaai}
                onCheckedChange={setIaai}
                className="switch-iaai data-[state=checked]:bg-red-600"
              />
              <label htmlFor="iaai" className="text-xs md:text-sm text-gray-600 dark:text-foreground cursor-pointer">
                IAAI
              </label>
            </div>
            <Button
              type="button"
              onClick={() => navigate('/inventory')}
              className="bg-primary hover:bg-primary/90 text-white px-4 md:px-8 py-3 md:py-6 text-sm md:text-lg w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Show 131,020 vehicles</span>
              <span className="sm:hidden">Show vehicles</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VehicleSearchForm;
