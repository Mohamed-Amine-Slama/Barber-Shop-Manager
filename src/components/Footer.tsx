import { Phone, MapPin, Clock, Scissors } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";

export const Footer = () => {
  const { t } = useLocale();

  return (
    <footer style={{ background: '#1C352D', color: '#F9F6F3' }} className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/Logo.png" alt="Premium Barber Shop Logo" className="h-10 w-10 object-contain rounded-full" />
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#F5C9B0' }}>{t("header.title")}</h3>
                <p className="text-sm" style={{ color: '#A6B28B' }}>{t("header.subtitle")}</p>
              </div>
            </div>
            <p style={{ color: '#F9F6F3' }} className="mb-6">Where classic barbering meets modern style. Experience the art of premium grooming.</p>
            <div className="flex items-center text-sm" style={{ color: '#A6B28B' }}>
              <Scissors className="w-4 h-4 mr-2" style={{ color: '#F5C9B0' }} />
              Crafted with Precision
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: '#F5C9B0' }}>Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" style={{ color: '#F9F6F3' }}>{t("header.nav.services")}</a></li>
              <li><a href="#gallery" style={{ color: '#F9F6F3' }}>{t("header.nav.gallery")}</a></li>
              <li><a href="#about" style={{ color: '#F9F6F3' }}>{t("header.nav.about")}</a></li>
              <li><a href="#location" style={{ color: '#F9F6F3' }}>{t("header.nav.location")}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: '#F5C9B0' }}>Services</h4>
            <ul className="space-y-3">
              <li style={{ color: '#F9F6F3' }}>Classic Haircut</li>
              <li style={{ color: '#F9F6F3' }}>Beard Trim & Styling</li>
              <li style={{ color: '#F9F6F3' }}>Hot Towel Shave</li>
              <li style={{ color: '#F9F6F3' }}>Hair Coloring</li>
              <li style={{ color: '#F9F6F3' }}>Complete Grooming Package</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: '#F5C9B0' }}>Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" style={{ color: '#A6B28B' }} />
                <a href="tel:+21624771020" style={{ color: '#F9F6F3' }} className="hover:underline">
                  +216 24 771 020
                </a>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5" style={{ color: '#A6B28B' }} />
                <a 
                  href="https://maps.app.goo.gl/n2fcAQyWWFAPQkAg7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#F9F6F3' }} 
                  className="hover:underline"
                >
                  View Location on Map
                </a>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-0.5" style={{ color: '#A6B28B' }} />
                <div style={{ color: '#F9F6F3' }}>
                  <p className="font-semibold mb-1">Working Hours</p>
                  <p>Tuesday - Sunday: 10:00 AM - 11:00 PM</p>
                  <p className="text-red-400 font-medium">Monday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #A6B28B' }} className="mt-12 pt-8 text-center">
          <p style={{ color: '#A6B28B' }}>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};