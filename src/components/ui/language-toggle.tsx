import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLocale, Locale } from "@/lib/LocaleContext";

const languages: Record<Locale, { name: string; flag: string }> = {
  en: {
    name: "English",
    flag: "🇺🇸",
  },
  fr: {
    name: "Français",
    flag: "🇫🇷",
  },
};

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const currentLanguage = languages[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 h-9 px-3 hover:bg-accent"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium hidden sm:inline-block">
            {currentLanguage.name}
          </span>
          <span className="text-base sm:ml-1">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {(Object.entries(languages) as [Locale, { name: string; flag: string }][]).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setLocale(key)}
            className="cursor-pointer relative"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm">{value.name}</span>
              <span className="text-lg">{value.flag}</span>
            </div>
            {locale === key && (
              <div className="absolute left-0 w-1 h-full bg-primary rounded-r" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
