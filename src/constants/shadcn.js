export const ZINC = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
};

export const SHADCN_COLORS = {
    light: {
        background: '#ffffff',
        foreground: ZINC[950],

        card: '#ffffff',
        cardForeground: ZINC[950],

        popover: '#ffffff',
        popoverForeground: ZINC[950],

        primary: ZINC[900],
        primaryForeground: ZINC[50],

        secondary: ZINC[100],
        secondaryForeground: ZINC[900],

        muted: ZINC[100],
        mutedForeground: ZINC[500],

        accent: ZINC[100],
        accentForeground: ZINC[900],

        destructive: '#ef4444',
        destructiveForeground: ZINC[50],

        border: ZINC[200],
        input: ZINC[200],
        ring: ZINC[950],

        // How We Feel Quadrants (Keep these vibrant)
        highUnpleasant: '#FF5C5C',
        highPleasant: '#FFD600',
        lowUnpleasant: '#5C9DFF',
        lowPleasant: '#4CD964',
    },
    dark: {
        background: ZINC[950],
        foreground: ZINC[50],

        card: ZINC[900],
        cardForeground: ZINC[50],

        popover: ZINC[900],
        popoverForeground: ZINC[50],

        primary: ZINC[50],
        primaryForeground: ZINC[900],

        secondary: ZINC[800],
        secondaryForeground: ZINC[50],

        muted: ZINC[800],
        mutedForeground: ZINC[400],

        accent: ZINC[800],
        accentForeground: ZINC[50],

        destructive: '#7f1d1d',
        destructiveForeground: ZINC[50],

        border: ZINC[800],
        input: ZINC[800],
        ring: ZINC[300],

        // How We Feel Quadrants
        highUnpleasant: '#FF5C5C',
        highPleasant: '#FFD600',
        lowUnpleasant: '#5C9DFF',
        lowPleasant: '#4CD964',
    }
};
