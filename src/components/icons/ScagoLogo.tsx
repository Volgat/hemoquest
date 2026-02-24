export const ScagoLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 160 35"
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="SCAGO Logo"
        {...props}
    >
      <style>
        {`.scago-text { font: bold 32px 'PT Sans', sans-serif; fill: hsl(var(--foreground)); }`}
      </style>
      
      <text x="0" y="29" className="scago-text">S</text>

      <g transform="translate(25, 0)">
        {/* Crescent C */}
        <path 
          d="M32 4 C 10 8, 8 32, 26 34 C 20 28, 20 10, 32 4 Z" 
          fill="hsl(var(--primary))"
        />
        {/* Blood drop */}
        <path 
          d="M24,12C19,18,24,25,24,25s5-7,0-13z"
          fill="hsl(var(--primary))" 
        />
      </g>
      
      <text x="62" y="29" className="scago-text">AGO</text>
    </svg>
);
