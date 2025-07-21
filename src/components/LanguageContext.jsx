import React, { createContext, useState, useContext } from 'react';

export const translations = {
  homepage: {
    title: {
      en: 'Welcome to RoyalStats',
      fr: 'Bienvenue sur RoyalStats'
    },
    subtitle: {
      en: ' Explore Royal Caribbean Fleet Data. Compare ships, prices, and classes across Royal Caribbean’s entire fleet.',
      fr: 'Explorez les données de la flotte Royal Caribbean. Comparez les navires, les prix et les classes de toute la flotte Royal Caribbean.'
    },
    checkPrices: {
      en: 'Check out their prices',
      fr: 'Consultez leurs prix'
    },
    learnFleet: {
      en: 'Learn more about the fleet',
      fr: 'En savoir plus sur la flotte'
    },
    fleetTitle: {
      en: 'Royal Caribbean Fleetwide Comparisons',
      fr: 'Comparaison de la flotte Royal Caribbean'
    },
    modalTitle: {
      en: 'Filter by Cruise Class',
      fr: 'Filtrer par classe de croisière'
    },
    filterButton: {
      en: 'Filter',
      fr: 'Filtrer'
    },
    removeFilterButton: {
      en: 'Remove Filters',
      fr: 'Supprimer les filtres'
    },
    chartTitleMain: (currency, lang) =>
      lang === 'fr'
        ? `Prix Royal Caribbean (voyage de 7 nuits en ${currency})`
        : `Royal Caribbean Prices (7-Night Voyage in ${currency})`,
    chartTitleSub: (selected, lang) =>
      selected
        ? lang === 'fr' ? 'Navires sélectionnés' : 'Selected Ships'
        : lang === 'fr' ? 'Coût moyen par classe de navire' : 'Average cost per ship class',
    yAxisTitle: (currency, lang) => lang === 'fr' ? `Prix (${currency})` : `Price (${currency})`,
    donutTitle: {
      en: 'Fleet Distribution by Class',
      fr: 'Répartition de la flotte par classe'
    },
    homeLinkText: {
      en: 'Home',
      fr: 'Accueil'
    },
    fleetLinkText: {
      en: 'Fleet',
      fr: 'Flotte'
    },
    pricesLinkText: {
      en: 'Prices',
      fr: 'Prix'
    },
    languageToggleInfo: {
      en: 'Use the language toggle to switch languages',
      fr: 'Utilisez le sélecteur de langue pour changer la langue'
    }
  },
  ships: {
    classes: {
      Oasis: { en: 'Oasis', fr: 'Oasis' },
      Quantum: { en: 'Quantum', fr: 'Quantum' },
      Freedom: { en: 'Freedom', fr: 'Liberté' },
      Voyager: { en: 'Voyager', fr: 'Voyageur' },
      Radiance: { en: 'Radiance', fr: 'Rayonnement' },
      Vision: { en: 'Vision', fr: 'Vision' },
      Sovereign: { en: 'Sovereign', fr: 'Souverain' },
      Legacy: { en: 'Legacy', fr: 'Héritage' },
      Icon: { en: 'Icon', fr: 'Icône' }
    },
    names: {
      'Allure of the Seas': { en: 'Allure of the Seas', fr: 'Attraction des Mers' },
      'Harmony of the Seas': { en: 'Harmony of the Seas', fr: 'Harmonie des Mers' },
      'Oasis of the Seas': { en: 'Oasis of the Seas', fr: 'Oasis des Mers' },
      'Symphony of the Seas': { en: 'Symphony of the Seas', fr: 'Symphonie des Mers' },
      'Wonder of the Seas': { en: 'Wonder of the Seas', fr: 'Merveille des Mers' },
      'Utopia of the Seas': { en: 'Utopia of the Seas', fr: 'Utopie des Mers' },
      'Spectrum of the Seas': { en: 'Spectrum of the Seas', fr: 'Spectre des Mers' },
      'Quantum of the Seas': { en: 'Quantum of the Seas', fr: 'Quantum des Mers' },
      'Anthem of the Seas': { en: 'Anthem of the Seas', fr: 'Hymne des Mers' },
      'Ovation of the Seas': { en: 'Ovation of the Seas', fr: 'Ovation des Mers' },
      'Freedom of the Seas': { en: 'Freedom of the Seas', fr: 'Liberté des Mers' },
      'Liberty of the Seas': { en: 'Liberty of the Seas', fr: 'Liberté des Mers' },
      'Independence of the Seas': { en: 'Independence of the Seas', fr: 'Indépendance des Mers' },
      'Voyager of the Seas': { en: 'Voyager of the Seas', fr: 'Voyageur des Mers' },
      'Explorer of the Seas': { en: 'Explorer of the Seas', fr: 'Explorateur des Mers' },
      'Adventure of the Seas': { en: 'Adventure of the Seas', fr: 'Aventure des Mers' },
      'Radiance of the Seas': { en: 'Radiance of the Seas', fr: 'Rayonnement des Mers' },
      'Brilliance of the Seas': { en: 'Brilliance of the Seas', fr: 'Brillance des Mers' },
      'Serenade of the Seas': { en: 'Serenade of the Seas', fr: 'Sérénade des Mers' },
      'Vision of the Seas': { en: 'Vision of the Seas', fr: 'Vision des Mers' },
      'Grandeur of the Seas': { en: 'Grandeur of the Seas', fr: 'Grandeur des Mers' },
      'Sovereign of the Seas': { en: 'Sovereign of the Seas', fr: 'Souverain des Mers' },
      'Legend of the Seas': { en: 'Legend of the Seas', fr: 'Légende des Mers' },
      'Enchantment of the Seas': { en: 'Enchantment of the Seas', fr: 'Enchantement des Mers' },
      'Navigator of the Seas': { en: 'Navigator of the Seas', fr: 'Navigateur des Mers' },
      'Mariner of the Seas': { en: 'Mariner of the Seas', fr: 'Marin des Mers' },
      'Rhapsody of the Seas': { en: 'Rhapsody of the Seas', fr: 'Rhapsodie des Mers' },
      'Legend': { en: 'Legend', fr: 'Légende' },
      'Icon of the Seas': { en: 'Icon of the Seas', fr: 'Icône des Mers' }
    }
  },
  fleet: {
    journeyTitle: {
      en: 'Royal Caribbean\'s fleet',
      fr: 'La flotte de royal Caribbean'
    },
    journeyDescription: {
      en: 'Royal Caribbean has grown remarkably, launching groundbreaking ships and delivering unforgettable experiences on the seas. Click below to check some interesting facts about each of their classes',
      fr: 'Royal Caribbean a connu une croissance remarquable, en lançant des navires révolutionnaires et en offrant des expériences inoubliables en mer. Cliquez ci-dessous pour découvrir quelques faits intéressants sur chacune de leurs classes'
    },
    classDebutTitle: {
      en: 'Fleet Distribution by Class',
      fr: 'Répartition de la flotte par classe'
    },
    timelineTitle: {
      en: 'Royal Caribbean Fleet Timeline',
      fr: 'Chronologie de la flotte Royal Caribbean'
    }
  }
};

const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);