import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const textSizeBySize = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant = "default",
  size = "default",
}: CourseProgressProps) => {
  return (
    <div>
      <Progress
        className={cn(size === "sm" ? "h-1" : "h-2")}
        value={value}
        variant={variant}
      />
      <p
        className={cn(
          "font-medium mt-2",
          colorByVariant[variant],
          textSizeBySize[size]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
