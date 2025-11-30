import { MapPin } from 'lucide-react';

interface TownCardProps {
  town: string;
}

export const TownCard = ({ town }: TownCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <MapPin className="w-5 h-5 text-green-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-900">{town}</h3>
      </div>
      <p className="text-gray-600 text-sm mt-2">
        Full landscaping and building services available in {town} and surrounding areas.
      </p>
    </div>
  );
};








