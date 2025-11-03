import { CheckCircle } from 'lucide-react';

interface AreaListProps {
  areas: string[];
}

export const AreaList = ({ areas }: AreaListProps) => {
  return (
    <>
      {areas.map((area) => (
        <div key={area} className="flex items-center text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          {area}
        </div>
      ))}
    </>
  );
};


