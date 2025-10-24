import { Select } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export interface FilterOptions {
  city: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
}

export function FilterBar({ onFilterChange, filters }: FilterBarProps) {
  const handleChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h3 className="mb-4">Filter Properties</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Any city"
            value={filters.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="Any"
            value={filters.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            placeholder="Any"
            value={filters.bathrooms}
            onChange={(e) => handleChange('bathrooms', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
