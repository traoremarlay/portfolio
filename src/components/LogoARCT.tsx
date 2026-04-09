import { CSSProperties } from "react";

interface LogoARCTProps {
  className?: string;
  color?: string;
  style?: CSSProperties;
}

export default function LogoARCT({ className, color = "black", style }: LogoARCTProps) {
  return (
    <svg
      width="37"
      height="25"
      viewBox="0 0 37 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g clipPath="url(#clip0_arct)">
        <path
          d="M36.5395 0H0.000976562V24.0272H36.5395V0Z"
          fill="#D9D9D9"
        />
        <path
          d="M36.5385 18.3762V10.6459C36.5385 9.90727 35.9397 9.30848 35.2011 9.30848H29.4769C27.261 9.30848 25.4646 7.51213 25.4646 5.29621V2.1326C25.4646 0.954795 24.5098 0 23.332 0H6.22819C5.05039 0 4.09559 0.954795 4.09559 2.1326V5.70014C4.09559 6.43878 3.4968 7.03757 2.75816 7.03757H1.42173C0.636532 7.03757 0 7.6741 0 8.4593V13.7447C0 14.5299 0.636532 15.1664 1.42173 15.1664H2.75816C3.4968 15.1664 4.09559 15.7652 4.09559 16.5038V22.7192C4.09559 24.202 6.14949 24.5831 6.68142 23.199L10.8568 12.3345C11.2539 11.3011 12.2466 10.6192 13.3536 10.6192H24.1272C24.8658 10.6192 25.4646 11.2179 25.4646 11.9566V18.3762C25.4646 19.1149 26.0634 19.7137 26.802 19.7137H35.2011C35.9397 19.7137 36.5385 19.1149 36.5385 18.3762Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_arct">
          <rect width="37" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
