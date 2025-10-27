import { MapPin, Phone, Clock } from "lucide-react";

export const LocationSection = () => {
  return (
    <section id="location" className="py-20" style={{ background: '#F9F6F3' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#1C352D' }}>
            Visit Us
          </h2>
          <p className="text-lg" style={{ color: '#A6B28B' }}>
            Find us at our location and experience premium grooming services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg" style={{ borderLeft: '4px solid #F5C9B0' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#1C352D' }}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F5C9B0' }}>
                    <Phone className="w-6 h-6" style={{ color: '#1C352D' }} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1" style={{ color: '#1C352D' }}>Phone</h4>
                    <a 
                      href="tel:+21624771020" 
                      className="text-lg hover:underline"
                      style={{ color: '#A6B28B' }}
                    >
                      +216 24 771 020
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F5C9B0' }}>
                    <MapPin className="w-6 h-6" style={{ color: '#1C352D' }} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1" style={{ color: '#1C352D' }}>Location</h4>
                    <a 
                      href="https://maps.app.goo.gl/n2fcAQyWWFAPQkAg7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: '#A6B28B' }}
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F5C9B0' }}>
                    <Clock className="w-6 h-6" style={{ color: '#1C352D' }} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2" style={{ color: '#1C352D' }}>Working Hours</h4>
                    <div className="space-y-1" style={{ color: '#A6B28B' }}>
                      <p className="font-medium">Tuesday - Sunday</p>
                      <p className="text-lg">10:00 AM - 11:00 PM</p>
                      <p className="text-red-500 font-semibold mt-2">Monday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3236.8!2d10.592072258571516!3d35.84861580531614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDUwJzU1LjAiTiAxMMKwMzUnMzEuNSJF!5e0!3m2!1sen!2stn!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barber Shop Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
