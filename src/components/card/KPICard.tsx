interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
}

export default function KPICard({
  title,
  value,
  change,
  color = 'blue',
}: KPICardProps) {
  const changeColor = () => {
    if (!change) return 'text-black';
    if (change > 0) return 'text-red-500';
    if (change < 0) return 'text-green-500';
    return 'text-black';
  };

  const cardColor = () => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      red: 'bg-red-50 border-red-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
    };
    return colors[color];
  };

  return (
    <div
      className={` ${cardColor()} 
      rounded-xl p-6 shadow-lg
      border
      whitespace-nowrap 
      overflow-hidden
    `}
    >
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>

      <div className="text-3xl font-bold text-black flex justify-end select-none break-words">
        {change ? (
          <div className={`${changeColor()}`}>
            {change > 0 ? `+${change}` : change}%
          </div>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
