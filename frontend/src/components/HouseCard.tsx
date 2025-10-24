import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface House {
  id: string;
  price: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  imageUrl: string;
  featured?: boolean;
}

interface HouseCardProps {
  house: House;
  isFavorite: boolean;
  onToggleFavorite: (houseId: string) => void;
}

export function HouseCard({ house, isFavorite, onToggleFavorite }: HouseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={house.imageUrl}
          alt={house.address}
          className="w-full h-48 object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full"
          onClick={() => onToggleFavorite(house.id)}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>
        {house.featured && (
          <Badge className="absolute top-3 left-3">Featured</Badge>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <div className="mb-1">{formatPrice(house.price)}</div>
          <div className="flex items-center text-gray-600 gap-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{house.address}, {house.city}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-gray-700">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{house.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{house.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span className="text-sm">{house.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
