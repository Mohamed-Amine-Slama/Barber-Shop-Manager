import { Scissors, Sparkles as Razor, Droplet, User, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "@/lib/LocaleContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const Services = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const servicesList = t("services.list");
  const services = Array.isArray(servicesList) ? servicesList : [];

  const icons = [Scissors, Razor, Droplet, User];

  return (
    <section id="services" className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#F9F6F3' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #F5C9B0 0%, #A6B28B 100%)', opacity: 0.1 }}></div>
      
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 rounded-full blur-3xl" style={{ background: '#F5C9B0' }}></div>
      <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl" style={{ background: '#A6B28B' }}></div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm mb-4 md:mb-6" 
            style={{ background: '#F5C9B0', color: '#1C352D' }}
          >
            <Sparkles className="w-4 h-4" />Premium Barber Services
          </div>
          <h2 
            className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6`} 
            style={{ color: '#1C352D' }}
          >
            {t("services.title")}
          </h2>
          <p 
            className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} max-w-3xl mx-auto leading-relaxed`} 
            style={{ color: '#A6B28B' }}
          >
            {t("services.description")}
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6 md:gap-8`}>
          {services.map((service: any, index: number) => {
            const Icon = icons[index] ?? Scissors;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-700 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-8" 
                style={{ background: '#F5C9B0', borderColor: '#A6B28B', color: '#1C352D' }}
              >
                <CardContent className="relative p-6 md:p-8 h-full flex flex-col">
                  <div className="relative mb-6 md:mb-8">
                    <div 
                      className="w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md group-hover:shadow-lg" 
                      style={{ background: '#A6B28B', color: '#F9F6F3' }}
                    >
                      <Icon className="w-6 md:w-8 h-6 md:h-8" style={{ color: '#1C352D' }} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-3 md:mb-4 group-hover:text-[#1C352D] transition-colors duration-300`}>
                      {service.title}
                    </h3>
                    <p className="mb-4 md:mb-6 leading-relaxed" style={{ color: '#1C352D' }}>
                      {service.description}
                    </p>
                    <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      {Array.isArray(service.features) ? service.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center text-sm group-hover:translate-x-1 transition-transform duration-300">
                          <div 
                            className="w-2 h-2 rounded-full mr-2 md:mr-3 group-hover:scale-125 transition-transform duration-300" 
                            style={{ background: '#F5C9B0' }}
                          ></div>
                          <span className="group-hover:text-[#1C352D] transition-colors duration-300">{feature}</span>
                        </li>
                      )) : null}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 group-hover:shadow-md border" 
                      style={{ background: '#A6B28B', color: '#1C352D', borderColor: '#F5C9B0' }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};