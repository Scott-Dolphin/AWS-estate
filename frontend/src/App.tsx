import { useState, useMemo } from 'react';
import { LoginForm } from './components/LoginForm';
import { HouseCard, House } from './components/HouseCard';
import { FilterBar, FilterOptions } from './components/FilterBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { LogOut, User, Home } from 'lucide-react';

// Mock house data
const mockHouses: House[] = [
  {
    id: '1',
    price: 825000,
    city: 'San Francisco',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2100,
    address: '123 Market Street',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MTI0NzU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
  },
  {
    id: '2',
    price: 1250000,
    city: 'Los Angeles',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    address: '456 Sunset Boulevard',
    imageUrl: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZmFjYWRlfGVufDF8fHx8MTc2MTM0MjM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
  },
  {
    id: '3',
    price: 675000,
    city: 'Austin',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    address: '789 Tech Drive',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZXxlbnwxfHx8fDE3NjEzMTc0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    price: 545000,
    city: 'Seattle',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    address: '321 Pine Avenue',
    imageUrl: 'https://images.unsplash.com/photo-1689574666875-6c591bca0b32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHByb3BlcnR5fGVufDF8fHx8MTc2MTMxOTcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '5',
    price: 495000,
    city: 'Denver',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    address: '654 Mountain View Road',
    imageUrl: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc2MTIyMjkwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '6',
    price: 925000,
    city: 'San Francisco',
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 2400,
    address: '987 Castro Street',
    imageUrl: 'https://images.unsplash.com/photo-1606788075819-9574a6edfab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob21lfGVufDF8fHx8MTc2MTIyODI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '7',
    price: 785000,
    city: 'Austin',
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2200,
    address: '147 Congress Avenue',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MTI0NzU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '8',
    price: 1450000,
    city: 'Los Angeles',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    address: '258 Hollywood Hills Drive',
    imageUrl: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZmFjYWRlfGVufDF8fHx8MTc2MTM0MjM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleLogin = (username: string, password: string) => {
    // Mock authentication - accepts any username/password
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setFavorites(new Set());
  };

  const toggleFavorite = (houseId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(houseId)) {
        newFavorites.delete(houseId);
      } else {
        newFavorites.add(houseId);
      }
      return newFavorites;
    });
  };

  const filteredHouses = useMemo(() => {
    return mockHouses.filter((house) => {
      if (filters.city && !house.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      if (filters.minPrice && house.price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && house.price > parseInt(filters.maxPrice)) {
        return false;
      }
      if (filters.bedrooms && house.bedrooms < parseInt(filters.bedrooms)) {
        return false;
      }
      if (filters.bathrooms && house.bathrooms < parseFloat(filters.bathrooms)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const favoriteHouses = useMemo(() => {
    return mockHouses.filter((house) => favorites.has(house.id));
  }, [favorites]);

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-blue-600" />
              <h1>Housing Market Viewer</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-5 w-5" />
                <span>{currentUser}</span>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All Properties ({filteredHouses.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favorites.size})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <FilterBar filters={filters} onFilterChange={setFilters} />
            
            {filteredHouses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No properties match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHouses.map((house) => (
                  <HouseCard
                    key={house.id}
                    house={house}
                    isFavorite={favorites.has(house.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteHouses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  You haven't added any favorites yet. Click the heart icon on properties to save them.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteHouses.map((house) => (
                  <HouseCard
                    key={house.id}
                    house={house}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
