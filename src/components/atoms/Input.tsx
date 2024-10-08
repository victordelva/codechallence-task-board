"use client";
import clx from "classnames";

export function Input({
  label,
  placeholder,
  value,
  onChange,
  className,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block relative mt-[-24px] top-3 left-2 p-1 bg-white text-sm font-medium text-gray-700 w-fit">
          {label}
        </label>
      )}
      <input
        className={clx("border border-gray-300 rounded-xl p-2 w-full")}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
      />
    </div>
  );
}
