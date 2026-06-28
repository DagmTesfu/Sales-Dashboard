import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  icon: ReactNode;
  label: string;
};

export function IconButton({
  active = false,
  className = "",
  icon,
  label,
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-lg border text-sm transition ${
        active
          ? "border-[#15171a] bg-[#15171a] text-white shadow-sm"
          : "border-[#d7d0c2] bg-white text-[#4f555c] hover:border-[#15171a] hover:text-[#15171a]"
      } ${className}`}
      type="button"
      {...props}
    >
      {icon}
    </button>
  );
}
