"use client";
import clx from "classnames";

export function Input({
  placeholder,
  value,
  onChange,
  className,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <input
      className={clx(className, "border border-gray-300 rounded-xl p-2")}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
    />
  );
}
