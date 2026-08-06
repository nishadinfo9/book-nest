import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  label: string;
  value?: string | number | null;
  icon?: ReactNode;
  className?: string;
  emptyText?: string;
}

export function EditableField({
  label,
  value,
  icon,
  className,
  emptyText = "Not provided",
}: EditableFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-sm font-medium break-words">
        {value && value.toString().trim().length > 0 ? (
          value
        ) : (
          <span className="italic text-muted-foreground">{emptyText}</span>
        )}
      </p>
    </div>
  );
}