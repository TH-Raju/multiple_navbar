import { Progress } from "@/components/ui/progress";

export function MyProgressbar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <Progress value={value} className="h-2" />
      <span>{value}%</span>
    </div>
  );
}
