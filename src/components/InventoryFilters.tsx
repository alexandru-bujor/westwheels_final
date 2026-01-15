import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const makes = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac',
  'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Ford', 'Genesis', 'GMC', 'Honda',
  'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'KIA', 'Lamborghini', 'Land Rover', 'Lexus',
  'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan',
  'Porsche', 'RAM', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];

const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Other'];
const drivetrains = ['FWD', 'RWD', 'AWD', '4WD'];
const transmissions = ['Automatic', 'Manual', 'CVT', 'Other'];
const bodyColors = ['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Brown', 'Other'];
const bodyTypes = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Wagon', 'Truck', 'Van', 'Other'];
const conditionCodes = ['Clean', 'Salvage', 'Rebuilt', 'Parts Only', 'Other'];
const sellerTypes = ['Dealer', 'Private', 'Auction', 'Other'];
const keysIncluded = ['Yes', 'No', 'Unknown'];
const damageTypes = ['None', 'Front End', 'Rear End', 'Side', 'Top/Roof', 'Undercarriage', 'All Over', 'Other'];
const auctions = ['Copart', 'IAAI', 'Other'];
const saleStatuses = ['Active', 'Sold', 'Pending', 'Cancelled'];

interface InventoryFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const InventoryFilters = ({ onFilterChange }: InventoryFiltersProps) => {
  const [buyNowPrice, setBuyNowPrice] = useState([0, 100000]);
  const [selectedMake, setSelectedMake] = useState<string | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [selectedTrim, setSelectedTrim] = useState<string | undefined>(undefined);
  const [yearRange, setYearRange] = useState([1960, 2027]);
  const [odometerRange, setOdometerRange] = useState([0, 250000]);
  const [engineCapacity, setEngineCapacity] = useState([0, 9.9]);
  const [engineCylinders, setEngineCylinders] = useState<string | undefined>(undefined);
  const [fuelType, setFuelType] = useState<string | undefined>(undefined);
  const [drivetrain, setDrivetrain] = useState<string | undefined>(undefined);
  const [transmission, setTransmission] = useState<string | undefined>(undefined);
  const [bodyColor, setBodyColor] = useState<string | undefined>(undefined);
  const [bodyType, setBodyType] = useState<string | undefined>(undefined);
  const [conditionCode, setConditionCode] = useState<string | undefined>(undefined);
  const [sellerType, setSellerType] = useState<string | undefined>(undefined);
  const [keysIncludedValue, setKeysIncludedValue] = useState<string | undefined>(undefined);
  const [damage, setDamage] = useState<string | undefined>(undefined);
  const [auction, setAuction] = useState<string | undefined>(undefined);
  const [saleStatus, setSaleStatus] = useState<string | undefined>(undefined);
  const [auctionDate, setAuctionDate] = useState<string>('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [makeOpen, setMakeOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Buy now price */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Buy now price</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              value={buyNowPrice[0]}
              onChange={(e) => setBuyNowPrice([Number(e.target.value), buyNowPrice[1]])}
              className="h-9"
              min={0}
              max={100000}
            />
            <span className="text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              value={buyNowPrice[1]}
              onChange={(e) => setBuyNowPrice([buyNowPrice[0], Number(e.target.value)])}
              className="h-9"
              min={0}
              max={100000}
            />
          </div>
          <Slider
            value={buyNowPrice}
            onValueChange={setBuyNowPrice}
            min={0}
            max={100000}
            step={1000}
            className="w-full"
          />
        </div>
      </div>

      {/* Make */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Make</Label>
        <Popover open={makeOpen} onOpenChange={setMakeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedMake || 'Search for a make'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search for a make..." />
              <CommandList>
                <CommandEmpty>No make found.</CommandEmpty>
                <CommandGroup>
                  {makes.map((make) => (
                    <CommandItem
                      key={make}
                      value={make}
                      onSelect={() => {
                        setSelectedMake(make === selectedMake ? undefined : make);
                        setMakeOpen(false);
                      }}
                    >
                      {make}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Model */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Model</Label>
        <Popover open={modelOpen} onOpenChange={setModelOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedModel || 'Search for a model'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search for a model..." />
              <CommandList>
                <CommandEmpty>No model found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem value="all-models" onSelect={() => {
                    setSelectedModel(undefined);
                    setModelOpen(false);
                  }}>
                    All Models
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Trim */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Trim</Label>
        <Select value={selectedTrim || undefined} onValueChange={setSelectedTrim}>
          <SelectTrigger>
            <SelectValue placeholder="Select trim" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-trims">All Trims</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Year */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Year</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={yearRange[0]}
              onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
              className="h-9"
              min={1960}
              max={2027}
            />
            <Input
              type="number"
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
              className="h-9"
              min={1960}
              max={2027}
            />
          </div>
          <Slider
            value={yearRange}
            onValueChange={setYearRange}
            min={1960}
            max={2027}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Odometer */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Odometer</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={odometerRange[0]}
              onChange={(e) => setOdometerRange([Number(e.target.value), odometerRange[1]])}
              className="h-9"
              min={0}
              max={250000}
            />
            <span className="text-sm text-muted-foreground">mi</span>
            <Input
              type="number"
              value={odometerRange[1]}
              onChange={(e) => setOdometerRange([odometerRange[0], Number(e.target.value)])}
              className="h-9"
              min={0}
              max={250000}
            />
            <span className="text-sm text-muted-foreground">mi</span>
          </div>
          <Slider
            value={odometerRange}
            onValueChange={setOdometerRange}
            min={0}
            max={250000}
            step={1000}
            className="w-full"
          />
        </div>
      </div>

      {/* Engine capacity */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Engine capacity</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              step="0.1"
              value={engineCapacity[0]}
              onChange={(e) => setEngineCapacity([Number(e.target.value), engineCapacity[1]])}
              className="h-9"
              min={0}
              max={9.9}
            />
            <span className="text-sm text-muted-foreground">L</span>
            <Input
              type="number"
              step="0.1"
              value={engineCapacity[1]}
              onChange={(e) => setEngineCapacity([engineCapacity[0], Number(e.target.value)])}
              className="h-9"
              min={0}
              max={9.9}
            />
            <span className="text-sm text-muted-foreground">L</span>
          </div>
          <Slider
            value={engineCapacity}
            onValueChange={setEngineCapacity}
            min={0}
            max={9.9}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>

      {/* Engine cylinders */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Engine cylinders</Label>
        <Select value={engineCylinders || undefined} onValueChange={setEngineCylinders}>
          <SelectTrigger>
            <SelectValue placeholder="Select cylinders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-cylinders">All</SelectItem>
            {[3, 4, 5, 6, 8, 10, 12].map((cyl) => (
              <SelectItem key={cyl} value={cyl.toString()}>
                {cyl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel type */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Fuel type</Label>
        <Select value={fuelType || undefined} onValueChange={setFuelType}>
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-fuel">All</SelectItem>
            {fuelTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Drivetrain */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Drivetrain</Label>
        <Select value={drivetrain || undefined} onValueChange={setDrivetrain}>
          <SelectTrigger>
            <SelectValue placeholder="Select drivetrain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-drivetrain">All</SelectItem>
            {drivetrains.map((dt) => (
              <SelectItem key={dt} value={dt}>
                {dt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Transmission</Label>
        <Select value={transmission || undefined} onValueChange={setTransmission}>
          <SelectTrigger>
            <SelectValue placeholder="Select transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-transmission">All</SelectItem>
            {transmissions.map((trans) => (
              <SelectItem key={trans} value={trans}>
                {trans}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Body color */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Body color</Label>
        <Select value={bodyColor || undefined} onValueChange={setBodyColor}>
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-color">All</SelectItem>
            {bodyColors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Body type */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Body type</Label>
        <Select value={bodyType || undefined} onValueChange={setBodyType}>
          <SelectTrigger>
            <SelectValue placeholder="Select body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-body">All</SelectItem>
            {bodyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition code */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Condition code</Label>
        <Select value={conditionCode || undefined} onValueChange={setConditionCode}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-condition">All</SelectItem>
            {conditionCodes.map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Seller type */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Seller type</Label>
        <Select value={sellerType || undefined} onValueChange={setSellerType}>
          <SelectTrigger>
            <SelectValue placeholder="Select seller type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-seller">All</SelectItem>
            {sellerTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Keys included */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Keys included</Label>
        <Select value={keysIncludedValue || undefined} onValueChange={setKeysIncludedValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-keys">All</SelectItem>
            {keysIncluded.map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Damage */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Damage</Label>
        <Select value={damage || undefined} onValueChange={setDamage}>
          <SelectTrigger>
            <SelectValue placeholder="Select damage type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-damage">All</SelectItem>
            {damageTypes.map((dmg) => (
              <SelectItem key={dmg} value={dmg}>
                {dmg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Auction */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Auction</Label>
        <Select value={auction || undefined} onValueChange={setAuction}>
          <SelectTrigger>
            <SelectValue placeholder="Select auction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-auction">All</SelectItem>
            {auctions.map((auc) => (
              <SelectItem key={auc} value={auc}>
                {auc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sale status */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Sale status</Label>
        <Select value={saleStatus || undefined} onValueChange={setSaleStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All</SelectItem>
            {saleStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Auction date */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Auction date</Label>
        <Input
          type="date"
          value={auctionDate}
          onChange={(e) => setAuctionDate(e.target.value)}
          className="h-9"
        />
      </div>

      {/* Advanced filters */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            Advanced filters
            <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          {/* Add any additional advanced filters here */}
          <div className="text-sm text-muted-foreground">
            Additional filter options will appear here
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default InventoryFilters;
