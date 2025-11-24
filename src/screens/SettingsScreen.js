import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen({ navigation }) {
    const { currentUser, logout } = useContext(AuthContext);
    const { themePreference, setThemePreference, colors } = useContext(ThemeContext);
    const { language, setLanguage, t } = useContext(LanguageContext);
    const { moods } = useContext(MoodContext);

    const handleLogout = () => {
        logout();
    };

    const handleExport = async () => {
        try {
            const data = JSON.stringify(moods, null, 2);
            await Share.share({
                message: data,
                title: t('exportMoods'),
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const renderSectionHeader = (title) => (
        <Text style={[styles.sectionHeader, { color: colors.mutedForeground }]}>{title}</Text>
    );

    const renderItem = (label, value, onPress, showChevron = true) => (
        <TouchableOpacity style={[styles.item, { borderBottomColor: colors.border }]} onPress={onPress}>
            <Text style={[styles.itemLabel, { color: colors.foreground }]}>{label}</Text>
            <View style={styles.itemRight}>
                <Text style={[styles.itemValue, { color: colors.mutedForeground }]}>{value}</Text>
                {showChevron && <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.foreground }]}>{t('settings')}</Text>
            </View>

            <View style={styles.section}>
                {renderSectionHeader(t('account'))}
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                    <View style={[styles.item, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.itemLabel, { color: colors.foreground }]}>{t('welcome')}</Text>
                        <Text style={[styles.itemValue, { color: colors.foreground }]}>{currentUser}</Text>
                    </View>
                    <TouchableOpacity style={styles.item} onPress={handleLogout}>
                        <Text style={[styles.itemLabel, { color: colors.destructive }]}>{t('logout')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                {renderSectionHeader(t('appearance'))}
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                    {renderItem(t('theme'), t(themePreference), () => {
                        Alert.alert(t('theme'), undefined, [
                            { text: t('light'), onPress: () => setThemePreference('light') },
                            { text: t('dark'), onPress: () => setThemePreference('dark') },
                            { text: t('system'), onPress: () => setThemePreference('system') },
                            { text: t('cancel'), style: 'cancel' },
                        ]);
                    })}
                    {renderItem(t('language'), language.toUpperCase(), () => {
                        Alert.alert(t('language'), undefined, [
                            { text: 'English', onPress: () => setLanguage('en') },
                            { text: 'Français', onPress: () => setLanguage('fr') },
                            { text: 'Español', onPress: () => setLanguage('es') },
                            { text: t('cancel'), style: 'cancel' },
                        ]);
                    })}
                </View>
            </View>

            <View style={styles.section}>
                {renderSectionHeader(t('data'))}
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                    {renderItem(t('manageMoods'), '', () => navigation.navigate('ManageMoods'))}
                    {renderItem(t('exportMoods'), '', handleExport, false)}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.6,
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemLabel: {
        fontSize: 17,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemValue: {
        fontSize: 17,
    },
});
