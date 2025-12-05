import { useState, useMemo, useEffect, useCallback } from 'react';
import { HouseCard, House } from './components/HouseCard';
import { FilterBar, FilterOptions } from './components/FilterBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { LogOut, User, Home, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
const API_BASE_URL = 'https://kkkjh223n2.execute-api.us-east-2.amazonaws.com/V2';

// Helper to decode the Cognito Token to get the real User ID (sub)
const getUserIdFromToken = () => {
  const token = localStorage.getItem('cognito_token');
  if (!token) return 'demo-user';

  try {
    const cleanToken = token.replace('#access_token=', '').replace('&token_type=Bearer', '').split('&')[0];
    const base64Url = cleanToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const parsed = JSON.parse(jsonPayload);
    return parsed.sub || parsed.username || 'demo-user';
  } catch (e) {
    console.warn("Could not decode token, using fallback ID", e);
    return 'demo-user';
  }
};

export default function App() {
  // --- AUTH STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userId, setUserId] = useState('');

  // --- DATA STATE ---
  const [houses, setHouses] = useState<House[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(false);

  // --- FILTERS STATE ---
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  });

  // 1. INITIAL AUTH CHECK
  useEffect(() => {
    const hash = window.location.hash;
    const storedToken = localStorage.getItem('cognito_token');

    if (hash && hash.includes('access_token')) {
      localStorage.setItem('cognito_token', hash);
      setIsLoggedIn(true);
      window.history.replaceState(null, '', window.location.pathname);
    }
    else if (storedToken) {
      setIsLoggedIn(true);
    }
    else {
      window.location.href = '/index.html';
      return;
    }

    const realUserId = getUserIdFromToken();
    setUserId(realUserId);
    setCurrentUser('Agent');
    setIsLoading(false);

  }, []);

  // 2. FETCH HOUSES (Search API)
  const fetchHouses = useCallback(async () => {
    if (!isLoggedIn) return;

    // Guard Clause: Don't search if filters are empty to avoid 400 Bad Request
    const hasFilters = filters.city || (filters.minPrice && filters.maxPrice);

    if (!hasFilters) {
      return;
    }

    setIsFetchingData(true);

    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.minPrice) params.append('min_price', filters.minPrice);
      if (filters.maxPrice) params.append('max_price', filters.maxPrice);
      if (filters.bedrooms) params.append('bed', filters.bedrooms);
      if (filters.bathrooms) params.append('bath', filters.bathrooms);

      const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
        method: 'GET',
      });

      if (!response.ok) {
        console.warn("API Search returned status:", response.status);
        setHouses([]);
        return;
      }

      const data = await response.json();

      let houseList = [];
      if (data.body && typeof data.body === 'string') {
        const parsedBody = JSON.parse(data.body);
        houseList = parsedBody.data || [];
      } else if (data.data) {
        houseList = data.data;
      }

      // Sanitize Data to prevent crashes
      const safeHouseList = houseList.map((h: any) => ({
        ...h,
        price: typeof h.price === 'number' ? h.price : 0,
        id: h.HouseID || h.id,
        city: h.city || 'Unknown',
        address: h.address || 'No Address',
        bedrooms: h.bed || h.bedrooms || 0,
        bathrooms: h.bath || h.bathrooms || 0,
        sqft: h.sqft || 0,
        imageUrl: h.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60'
      }));

      setHouses(safeHouseList);
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setIsFetchingData(false);
    }
  }, [filters, isLoggedIn]);

  // 3. FETCH FAVORITES
  const fetchFavorites = useCallback(async () => {
    if (!isLoggedIn || !userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/favorites?userId=${userId}`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.favoriteIds && Array.isArray(data.favoriteIds)) {
        setFavorites(new Set(data.favoriteIds));
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, [isLoggedIn, userId]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchHouses();
      fetchFavorites();
    }
  }, [isLoggedIn, fetchHouses, fetchFavorites]);


  // 4. TOGGLE FAVORITE
  const toggleFavorite = async (houseId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(houseId)) newFavorites.delete(houseId);
      else newFavorites.add(houseId);
      return newFavorites;
    });

    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          houseId: houseId
        })
      });

      const result = await response.json();
      if (result.success) {
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          if (result.isFavorite) newFavorites.add(houseId);
          else newFavorites.delete(houseId);
          return newFavorites;
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cognito_token');
    setIsLoggedIn(false);
    window.location.href = '/index.html';
  };

  // Reverted logic: Only shows favorites if they exist in the CURRENT 'houses' list
  const favoriteHouses = useMemo(() => {
    return houses.filter((house) => favorites.has(house.id));
  }, [houses, favorites]);


  // --- RENDER ---

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50">
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
                <span className="hidden sm:inline">{currentUser}</span>
                <span className="text-xs text-gray-400">({userId.slice(0, 8)}...)</span>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All Properties ({houses.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favorites.size})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <FilterBar filters={filters} onFilterChange={setFilters} />

            {isFetchingData ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : houses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {(!filters.city && !filters.minPrice)
                    ? "Enter a City or Price Range to start searching."
                    : "No properties match your filters."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {houses.map((house) => (
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
                  You haven't added any favorites yet.
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