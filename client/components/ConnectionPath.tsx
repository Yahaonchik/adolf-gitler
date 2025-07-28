export default function ConnectionPath() {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="relative w-full max-w-md">
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 356 826" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ aspectRatio: '356/826' }}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient 
              id="connectionGradient" 
              x1="2" 
              y1="326" 
              x2="348" 
              y2="329.5" 
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#606060"/>
              <stop offset="1" stopColor="#ED9E65"/>
            </linearGradient>
          </defs>
          
          {/* Top circle marker */}
          <circle 
            cx="279" 
            cy="8" 
            r="8" 
            fill="#ED9E65"
            className="drop-shadow-sm"
          />
          
          {/* Vertical dashed line (left side) */}
          <line 
            x1="2" 
            y1="73.9388" 
            x2="2" 
            y2="658.542" 
            stroke="url(#connectionGradient)" 
            strokeWidth="3" 
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
          
          {/* Top horizontal dashed line */}
          <line 
            x1="2" 
            y1="73.9388" 
            x2="279" 
            y2="73.9388" 
            stroke="url(#connectionGradient)" 
            strokeWidth="3" 
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
          
          {/* Top circle connecting line */}
          <line 
            x1="279" 
            y1="8" 
            x2="279" 
            y2="73.9388" 
            stroke="url(#connectionGradient)" 
            strokeWidth="3" 
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
          
          {/* Bottom horizontal dashed line */}
          <line 
            x1="2" 
            y1="658.542" 
            x2="348" 
            y2="658.542" 
            stroke="url(#connectionGradient)" 
            strokeWidth="3" 
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
          
          {/* Vertical dashed line (right side) */}
          <line 
            x1="348" 
            y1="658.542" 
            x2="348" 
            y2="818" 
            stroke="url(#connectionGradient)" 
            strokeWidth="3" 
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
          
          {/* Bottom circle marker */}
          <circle 
            cx="348" 
            cy="818" 
            r="8" 
            fill="#ED9E65"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    </div>
  );
}
