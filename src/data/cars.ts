export interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  buyNowPrice?: number;
  damage: string;
  images: string[];
  engine: string;
  mileage: number;
  location: string;
  vin: string;
  endDate: string;
  bids: number;
  // Additional fields
  lot?: string;
  seller?: string;
  sellerApproved?: boolean;
  saleDocument?: string;
  saleDocumentApproved?: boolean;
  loss?: string;
  primaryDamage?: string;
  secondaryDamage?: string;
  startCode?: string;
  keyPresent?: boolean;
  acv?: number;
  erc?: number;
  exteriorColor?: string;
  fuelType?: string;
  cylinders?: number;
  drivetrain?: string;
  transmission?: string;
  bodyType?: string;
  bodyStyle?: string;
  series?: string;
  interiorColor?: string;
  auction?: string;
}

export const cars: Car[] = [
  {
    id: "1",
    title: "2022 BMW M4 Competition",
    make: "BMW",
    model: "M4",
    year: 2022,
    price: 42500,
    buyNowPrice: 55000,
    damage: "Front End",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop",
    ],
    engine: "3.0L Twin-Turbo I6",
    mileage: 12500,
    location: "Los Angeles, CA",
    vin: "WBS43AZ02NCK12345",
    endDate: "2024-02-15T18:00:00Z",
    bids: 23
  },
  {
    id: "2",
    title: "2023 Mercedes-AMG GT",
    make: "Mercedes-Benz",
    model: "AMG GT",
    year: 2023,
    price: 68900,
    damage: "Minor Dents",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=450&fit=crop",
    ],
    engine: "4.0L V8 Biturbo",
    mileage: 8200,
    location: "Miami, FL",
    vin: "WDDYJ7JA5NA012345",
    endDate: "2024-02-14T20:00:00Z",
    bids: 31
  },
  {
    id: "3",
    title: "2021 Porsche 911 Turbo S",
    make: "Porsche",
    model: "911",
    year: 2021,
    price: 125000,
    buyNowPrice: 165000,
    damage: "Clean Title",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=450&fit=crop",
    ],
    engine: "3.8L Twin-Turbo Flat-6",
    mileage: 15800,
    location: "New York, NY",
    vin: "WP0AD2A91MS234567",
    endDate: "2024-02-16T15:00:00Z",
    bids: 45
  },
  {
    id: "4",
    title: "2020 Audi RS7 Sportback",
    make: "Audi",
    model: "RS7",
    year: 2020,
    price: 52000,
    damage: "Rear End",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=450&fit=crop",
    ],
    engine: "4.0L TFSI V8",
    mileage: 28500,
    location: "Chicago, IL",
    vin: "WUAPWAF21LN901234",
    endDate: "2024-02-13T22:00:00Z",
    bids: 18
  },
  {
    id: "5",
    title: "2023 Tesla Model S Plaid",
    make: "Tesla",
    model: "Model S",
    year: 2023,
    price: 78500,
    damage: "Water Damage",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&h=450&fit=crop",
    ],
    engine: "Tri Motor Electric",
    mileage: 5200,
    location: "Seattle, WA",
    vin: "5YJSA1E61PF345678",
    endDate: "2024-02-17T19:00:00Z",
    bids: 27
  },
  {
    id: "6",
    title: "2022 Lamborghini Huracán EVO",
    make: "Lamborghini",
    model: "Huracán",
    year: 2022,
    price: 185000,
    buyNowPrice: 240000,
    damage: "Side Damage",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&h=450&fit=crop",
    ],
    engine: "5.2L V10",
    mileage: 4800,
    location: "Las Vegas, NV",
    vin: "ZHWUF4ZF5NLA56789",
    endDate: "2024-02-18T21:00:00Z",
    bids: 52
  },
  {
    id: "7",
    title: "2021 Ford Mustang GT500",
    make: "Ford",
    model: "Mustang",
    year: 2021,
    price: 48000,
    damage: "Front End",
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&h=450&fit=crop",
    ],
    engine: "5.2L Supercharged V8",
    mileage: 18900,
    location: "Detroit, MI",
    vin: "1FA6P8SJ5M5901234",
    endDate: "2024-02-14T17:00:00Z",
    bids: 34
  },
  {
    id: "8",
    title: "2023 Chevrolet Corvette Z06",
    make: "Chevrolet",
    model: "Corvette",
    year: 2023,
    price: 92000,
    damage: "Clean Title",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=450&fit=crop",
    ],
    engine: "5.5L Flat-Plane V8",
    mileage: 3200,
    location: "Phoenix, AZ",
    vin: "1G1YY2D45P5123456",
    endDate: "2024-02-19T16:00:00Z",
    bids: 41
  },
  {
    id: "9",
    title: "2020 McLaren 720S",
    make: "McLaren",
    model: "720S",
    year: 2020,
    price: 168000,
    buyNowPrice: 220000,
    damage: "Minor Dents",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    ],
    engine: "4.0L Twin-Turbo V8",
    mileage: 11200,
    location: "San Francisco, CA",
    vin: "SBM14DCA5LW789012",
    endDate: "2024-02-15T23:00:00Z",
    bids: 38
  },
  {
    id: "10",
    title: "2022 Nissan GT-R Nismo",
    make: "Nissan",
    model: "GT-R",
    year: 2022,
    price: 135000,
    damage: "Mechanical",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=450&fit=crop",
    ],
    engine: "3.8L Twin-Turbo V6",
    mileage: 9800,
    location: "Houston, TX",
    vin: "JN1TBNT36Z0123456",
    endDate: "2024-02-16T20:00:00Z",
    bids: 29
  },
  {
    id: "11",
    title: "2021 Dodge Challenger Hellcat",
    make: "Dodge",
    model: "Challenger",
    year: 2021,
    price: 38500,
    damage: "Side Damage",
    images: [
      "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=800&h=450&fit=crop",
    ],
    engine: "6.2L Supercharged HEMI V8",
    mileage: 22400,
    location: "Denver, CO",
    vin: "2C3CDZC97MH234567",
    endDate: "2024-02-13T18:00:00Z",
    bids: 21
  },
  {
    id: "12",
    title: "2023 Range Rover Sport SVR",
    make: "Land Rover",
    model: "Range Rover",
    year: 2023,
    price: 89000,
    buyNowPrice: 115000,
    damage: "Flood Damage",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=450&fit=crop",
    ],
    engine: "5.0L Supercharged V8",
    mileage: 7600,
    location: "Atlanta, GA",
    vin: "SALWV2SE2PA456789",
    endDate: "2024-02-20T14:00:00Z",
    bids: 16
  }
];

export const makes = [...new Set(cars.map(car => car.make))];
export const damageTypes = [...new Set(cars.map(car => car.damage))];
export const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
