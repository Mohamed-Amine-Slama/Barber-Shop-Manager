import { useState } from "react";
import { X, Play, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";

// Import all media files
import img1 from "@/assets/1.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img15 from "@/assets/15.jpg";
import img16 from "@/assets/16.jpg";
import img22 from "@/assets/22.jpg";
import heroImg from "@/assets/hero-rehabilitation.jpg";

import vid2 from "@/assets/2.mp4";
import vid7 from "@/assets/7.mp4";
import vid8 from "@/assets/8.mp4";
import vid9 from "@/assets/9.mp4";
import vid10 from "@/assets/10.mp4";
import vid11 from "@/assets/11.mp4";
import vid12 from "@/assets/12.mp4";
import vid13 from "@/assets/13.mp4";
import vid14 from "@/assets/14.mp4";
import vid17 from "@/assets/17.mp4";
import vid18 from "@/assets/18.mp4";
import vid19 from "@/assets/19.mp4";
import vid20 from "@/assets/20.mp4";
import vid21 from "@/assets/21.mp4";

interface MediaItem {
  src: string;
  type: "image" | "video";
  thumbnail?: string;
}

// Pattern: 2 images, 2 videos, 2 images, 2 videos...
const mediaItems: MediaItem[] = [
  { src: img1, type: "image" },
  { src: img3, type: "image" },
  { src: vid2, type: "video" },
  { src: vid7, type: "video" },
  { src: img4, type: "image" },
  { src: img5, type: "image" },
  { src: vid8, type: "video" },
  { src: vid9, type: "video" },
  { src: img6, type: "image" },
  { src: img15, type: "image" },
  { src: vid10, type: "video" },
  { src: vid11, type: "video" },
  { src: img16, type: "image" },
  { src: img22, type: "image" },
  { src: vid12, type: "video" },
  { src: vid13, type: "video" },
  { src: heroImg, type: "image" },
  { src: vid14, type: "video" },
  { src: vid17, type: "video" },
  { src: vid18, type: "video" },
  { src: vid19, type: "video" },
  { src: vid20, type: "video" },
  { src: vid21, type: "video" },
];

export const Gallery = () => {
  const { t } = useLocale();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const INITIAL_DISPLAY_COUNT = 8;
  const displayedItems = showAll ? mediaItems : mediaItems.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden" style={{ background: '#F9F6F3' }}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: '#F5C9B0' }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: '#A6B28B' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full" style={{ background: '#F5C9B0', color: '#1C352D' }}>
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#1C352D' }}>
            Our Work Gallery
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#A6B28B' }}>
            Premium cuts, precision styling, and satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-lg transition-all duration-500"
              style={{ background: '#F5C9B0', border: '1px solid #A6B28B' }}
              onClick={() => setSelectedMedia(item)}
            >
              {/* Border gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-transparent to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10 pointer-events-none"></div>
              
              {item.type === "image" ? (
                <>
                  <img
                    src={item.src}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ background: 'rgba(28,53,45,0.3)' }}></div>
                </>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:from-black/80 transition-all duration-500" style={{ background: 'rgba(28,53,45,0.2)' }}>
                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ background: '#A6B28B' }}>
                      <Play className="w-7 h-7" style={{ color: '#1C352D' }} fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && mediaItems.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="group relative px-8 py-4 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ background: '#A6B28B', color: '#1C352D' }}
            >
              <span className="relative flex items-center gap-2">
                View More ({mediaItems.length - INITIAL_DISPLAY_COUNT} more)
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setShowAll(false);
                document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group px-8 py-4 border-2 font-semibold rounded-xl shadow-md hover:shadow-lg hover:border-2 transition-all duration-300"
              style={{ background: '#F5C9B0', color: '#1C352D', borderColor: '#A6B28B' }}
            >
              <span className="flex items-center gap-2">
                Show Less
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Modal for viewing full media */}
      {selectedMedia && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" style={{ background: 'rgba(28,53,45,0.97)' }} onClick={() => setSelectedMedia(null)}>
          {/* Close button */}
          <button
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border transition-all duration-300 flex items-center justify-center group"
            style={{ background: '#F5C9B0', borderColor: '#A6B28B', color: '#1C352D' }}
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Media container */}
          <div
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.src}
                alt="Full view"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-lg border-2"
                style={{ borderColor: '#A6B28B' }}
              />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-2xl shadow-lg border-2"
                style={{ borderColor: '#A6B28B' }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
