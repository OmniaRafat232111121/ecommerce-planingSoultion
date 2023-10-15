// components/LanguageToggle.tsx
import React from 'react';
import { useTranslation } from 'next-i18next';

const LanguageToggle: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };




    return (
        <button onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'عربى' : 'English'}
        </button>
    );
};

export default LanguageToggle;
