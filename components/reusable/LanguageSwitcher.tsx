'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/provider/LanguageProvider";
import { useEffect, useState } from "react";
import { BsGlobe2 } from "react-icons/bs";

declare global {
    interface Window {
        google: {
            translate: {
                TranslateElement: new (
                    config: {
                        pageLanguage: string;
                        includedLanguages: string;
                        autoDisplay: boolean;
                    }
                ) => void;
            };
        };
    }
}

interface LanguageSwitcherProps {
    variant?: 'default' | 'minimal';
    className?: string;
    onLanguageChange?: (lang: string) => void;
}

type Language = {
    code: string;
    name: string;
    flag: string;
};

const languages: Language[] = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w20/gb.png" },
    { code: "es", name: "Spanish", flag: "https://flagcdn.com/w20/es.png" },
    { code: "fr", name: "French", flag: "https://flagcdn.com/w20/fr.png" },
    { code: "de", name: "German", flag: "https://flagcdn.com/w20/de.png" },
    { code: "it", name: "Italian", flag: "https://flagcdn.com/w20/it.png" },
    { code: "zh-CN", name: "Chinese", flag: "https://flagcdn.com/w20/cn.png" },
];

const LanguageSwitcher = ({ variant = 'default', className = '', onLanguageChange }: LanguageSwitcherProps) => {
    const [selectedLang, setSelectedLang] = useState("en");
    const { setSelectedLang: setContextLang } = useLanguage();

    // Load language from localStorage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setSelectedLang(savedLanguage);
            setContextLang(savedLanguage);
        }
    }, []);

    const handleChange = (value: string) => {
        setSelectedLang(value);
        localStorage.setItem('selectedLanguage', value);
        setContextLang(value);
        onLanguageChange?.(value);
        // Initialize Google Translate
        const waitForGoogleTranslate = setInterval(() => {
            if (typeof window.google !== 'undefined' && window.google.translate) {
                clearInterval(waitForGoogleTranslate);
                const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                if (selectElement) {
                    selectElement.value = value;
                    selectElement.dispatchEvent(new Event('change'));
                }
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,fr,de,it,pt,zh-CN',
                    autoDisplay: false
                });
            }
        }, 100);
        setTimeout(() => clearInterval(waitForGoogleTranslate), 5000);
    };

    // Find the selected language object
    const selectedLanguage = languages.find(lang => lang.code === selectedLang) || languages[0];

    return (
        <div className={`flex items-center ${className}`}>
            <div className="">
                <Select value={selectedLang} onValueChange={handleChange}>
                    <SelectTrigger className="w-full border-none focus:!ring-0 focus:!ring-offset-0 text-white !px-2 !h-8 lg:!h-10 lg:!px-3 ">
                        <div className="flex items-center gap-2">
                            <BsGlobe2 className="text-white" />
                            <SelectValue className="text-white">
                                {selectedLanguage.name}
                            </SelectValue>
                        </div>
                    </SelectTrigger>
                    <SelectContent className="">
                        {languages.map((lang) => (
                            <SelectItem 
                                key={lang.code} 
                                value={lang.code} 
                                className={`hover:!bg-yellow-400 !px-2 !h-8 ${selectedLang === lang.code ? 'bg-yellow-400/20' : ''}`}
                            >
                                <div className="flex items-center gap-2">
                                   
                                    {lang.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div id="google_translate_element" className="hidden" />
        </div>
    );
};

export default LanguageSwitcher;
