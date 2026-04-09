interface LogoMProps {
  className?: string;
  color?: string;
}

export default function LogoM({ className, color = "black" }: LogoMProps) {
  return (
    <svg
      width="70"
      height="20"
      viewBox="0 0 70 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 20.0001H0V10H10V20.0001ZM40 10V0H70.0001V10H40L40.0002 20.0001H20.0001V10H40ZM20.0001 10H10V0H20.0001V10Z"
        fill={color}
      />
    </svg>
  );
}
