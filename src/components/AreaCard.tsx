import { MapPin } from 'lucide-react';

interface AreaCardProps {
  title: string;
  areas: string[];
}

export const AreaCard = ({ title, areas }: AreaCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <ul className="text-gray-600 space-y-1 text-sm">
        {areas.map((area) => (
          <li key={area}>• {area}</li>
        ))}
      </ul>
    </div>
  );
};


