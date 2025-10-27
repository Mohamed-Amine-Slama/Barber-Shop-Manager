import React from "react";
const IMAGE_URL = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=60";

export const CoreTreatmentSection: React.FC = () => {
  return (
    <section id="about" className="relative py-16 md:py-24" style={{ background: '#F9F6F3' }}>
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Complex masked image with decorative rings and badge */}
        <div className="relative">
          {/* Decorative outline rings */}
          <div className="absolute -left-6 -top-8 h-40 w-40 rounded-full border-2" style={{ borderColor: '#A6B28B' }} />
          <div className="absolute left-8 -top-16 h-24 w-24 rounded-full border-2" style={{ borderColor: '#A6B28B' }} />

          {/* Masked image divided into 4 vertebra-like windows */}
          <div className="relative">
            <svg viewBox="0 0 600 480" className="w-full h-auto shadow-soft">
              <defs>
                <mask id="spineMask">
                  <rect width="600" height="480" fill="black" />
                  {/* Four rectangular panels, each slightly higher than the previous */}
                  <rect x="50" y="210" width="130" height="190" rx="24" fill="white" transform="rotate(-5 115 305)" />
                  <rect x="190" y="190" width="130" height="190" rx="24" fill="white" transform="rotate(-2 255 285)" />
                  <rect x="330" y="170" width="130" height="190" rx="24" fill="white" transform="rotate(2 395 265)" />
                  <rect x="470" y="150" width="130" height="190" rx="24" fill="white" transform="rotate(5 535 245)" />
                </mask>
              </defs>
              <g mask="url(#spineMask)">
                <image href={IMAGE_URL} x="0" y="0" width="600" height="480" preserveAspectRatio="xMidYMid slice" />
              </g>
              {/* Subtle outlines to echo panel segmentation */}
              <g fill="none" stroke="hsl(var(--primary) / 0.25)" strokeWidth="2">
                <rect x="50" y="210" width="130" height="190" rx="24" transform="rotate(-5 115 305)" />
                <rect x="190" y="190" width="130" height="190" rx="24" transform="rotate(-2 255 285)" />
                <rect x="330" y="170" width="130" height="190" rx="24" transform="rotate(2 395 265)" />
                <rect x="470" y="150" width="130" height="190" rx="24" transform="rotate(5 535 245)" />
              </g>

              {/* Right-side faint ring for balance */}
              <circle cx="520" cy="220" r="90" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="2" />
            </svg>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-8">
              <svg width="150" height="150" viewBox="0 0 150 150" className="shadow-soft">
                <defs>
                  <linearGradient id="badgeGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
                    <stop offset="100%" stopColor="hsl(var(--primary) / 0.35)" />
                  </linearGradient>
                </defs>
                <circle cx="75" cy="75" r="70" fill="white" stroke="hsl(var(--primary))" strokeWidth="2" />
                <circle cx="75" cy="75" r="52" fill="url(#badgeGrad)" />
                <text x="75" y="84" textAnchor="middle" fontSize="36" fontWeight="700" fill="hsl(var(--primary))">12</text>
                <defs>
                  <path id="experienceCircle" d="M75,75 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
                </defs>
                <text fontSize="11" letterSpacing="2" fill="#64748b">
                  <textPath href="#experienceCircle" startOffset="0">
                    YEARS EXPERIENCE • STYLE & GROOMING • BARBERING •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Title and feature list */}
        <div>
          <p className="uppercase tracking-widest text-sm mb-2" style={{ color: '#A6B28B' }}>About us</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
            <span style={{ color: '#1C352D' }}>The Art</span> of Classic Barbering
          </h2>
          <div className="space-y-4">
            {[
              { title: "Master Barbers", desc: "Our experienced barbers blend traditional techniques with modern styles to create your perfect look." },
              { title: "Premium Products", desc: "We use only the finest grooming products to ensure your hair and skin receive the best care." },
              { title: "Relaxing Experience", desc: "Enjoy complimentary beverages and a comfortable atmosphere while we take care of your grooming needs." }
            ].map((item, n) => (
              <div key={n} className="rounded-xl border p-4 flex items-start gap-4" style={{ background: '#F5C9B0', borderColor: '#A6B28B', color: '#1C352D' }}>
                <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold" style={{ background: '#A6B28B', color: '#F9F6F3' }}>{String(n + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1C352D' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: '#1C352D' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreTreatmentSection;
