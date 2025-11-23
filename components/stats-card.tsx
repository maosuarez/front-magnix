import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ label, value, icon, trend }: StatsCardProps) {
  return (
    <Card className="bg-card hover:border-primary transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {trend && (
              <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs mes anterior
              </p>
            )}
          </div>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
