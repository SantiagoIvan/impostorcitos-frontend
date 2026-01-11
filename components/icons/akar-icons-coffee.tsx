import * as React from "react";

export function CoffeeIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11 7c4.418 0 8 .895 8 2s-3.582 2-8 2s-8-.895-8-2c0-.357.375-.693 1.033-.984"/><path d="M3 9v9.343c0 1.061.44 2.08 1.409 2.513C5.624 21.399 7.711 22 11 22s5.377-.601 6.591-1.144c.968-.433 1.409-1.452 1.409-2.513V9m0 1a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3v0M7 3v4m4-5v2m4 0v3"/>
    </svg>
  );
}
