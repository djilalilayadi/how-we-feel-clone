import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

export const LanguageContext = createContext();

const translations = {
    en: {
        settings: 'Settings',
        account: 'Account',
        logout: 'Logout',
        appearance: 'Appearance',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
        language: 'Language',
        data: 'Data',
        exportMoods: 'Export Moods',
        manageMoods: 'Manage Moods',
        delete: 'Delete',
        cancel: 'Cancel',
        confirmDelete: 'Are you sure you want to delete this mood?',
        welcome: 'Welcome',
        moods: 'Your Moods',
        noMoods: 'No moods yet',
        startCheckin: 'Start Mood Check-in',
        selectMood: 'Select Mood',
        selectIntensity: 'Select Intensity',
        addNotes: 'Add Notes',
        home: 'Home',
        history: 'History',
        insights: 'Insights',
        edit: 'Edit',
        save: 'Save',
        update: 'Update',
    },
    fr: {
        settings: 'Paramètres',
        account: 'Compte',
        logout: 'Se déconnecter',
        appearance: 'Apparence',
        theme: 'Thème',
        light: 'Clair',
        dark: 'Sombre',
        system: 'Système',
        language: 'Langue',
        data: 'Données',
        exportMoods: 'Exporter les humeurs',
        manageMoods: 'Gérer les humeurs',
        delete: 'Supprimer',
        cancel: 'Annuler',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette humeur ?',
        welcome: 'Bienvenue',
        moods: 'Vos humeurs',
        noMoods: 'Pas encore d\'humeurs',
        startCheckin: 'Commencer le suivi',
        selectMood: 'Sélectionner l\'humeur',
        selectIntensity: 'Sélectionner l\'intensité',
        addNotes: 'Ajouter des notes',
        home: 'Accueil',
        history: 'Historique',
        insights: 'Aperçus',
        edit: 'Modifier',
        save: 'Enregistrer',
        update: 'Mettre à jour',
    },
    es: {
        settings: 'Ajustes',
        account: 'Cuenta',
        logout: 'Cerrar sesión',
        appearance: 'Apariencia',
        theme: 'Tema',
        light: 'Claro',
        dark: 'Oscuro',
        system: 'Sistema',
        language: 'Idioma',
        data: 'Datos',
        exportMoods: 'Exportar estados de ánimo',
        manageMoods: 'Gestionar estados de ánimo',
        delete: 'Eliminar',
        cancel: 'Cancelar',
        confirmDelete: '¿Estás seguro de que quieres eliminar este estado de ánimo?',
        welcome: 'Bienvenido',
        moods: 'Tus estados de ánimo',
        noMoods: 'Aún no hay estados de ánimo',
        startCheckin: 'Iniciar registro',
        selectMood: 'Seleccionar estado de ánimo',
        selectIntensity: 'Seleccionar intensidad',
        addNotes: 'Añadir notas',
        home: 'Inicio',
        history: 'Historial',
        insights: 'Perspectivas',
        edit: 'Editar',
        save: 'Guardar',
        update: 'Actualizar',
    },
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        loadLanguagePreference();
    }, []);

    const loadLanguagePreference = async () => {
        try {
            const storedLang = await AsyncStorage.getItem('languagePreference');
            if (storedLang) {
                setLanguage(storedLang);
            } else {
                // Simple detection (fallback to en)
                const locales = Localization.getLocales();
                if (locales && locales.length > 0) {
                    const code = locales[0].languageCode;
                    if (['en', 'fr', 'es'].includes(code)) {
                        setLanguage(code);
                    }
                }
            }
        } catch (error) {
            console.log('Error loading language preference:', error);
        }
    };

    const setLanguageAndSave = async (newLang) => {
        try {
            setLanguage(newLang);
            await AsyncStorage.setItem('languagePreference', newLang);
        } catch (error) {
            console.log('Error saving language preference:', error);
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndSave, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
