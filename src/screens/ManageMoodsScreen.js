import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import { MoodContext } from '../context/MoodContext';
import { ThemeContext } from '../context/ThemeContext';

export default function ManageMoodsScreen() {
    const { moods, deleteMood } = useContext(MoodContext);
    const { colors } = useContext(ThemeContext);
    const { t } = useContext(LanguageContext);

    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedMoodId, setSelectedMoodId] = useState(null);

    const handleDeletePress = (id) => {
        setSelectedMoodId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (selectedMoodId) {
            await deleteMood(selectedMoodId);
            setShowDeleteConfirm(false);
            setSelectedMoodId(null);
            // Show success message
            setShowDeleteSuccess(true);
            setTimeout(() => setShowDeleteSuccess(false), 1500);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setSelectedMoodId(null);
    };

    const renderItem = ({ item }) => (
        <View style={[styles.item, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <View style={styles.content}>
                <Text style={[styles.mood, { color: colors.foreground }]}>{item.mood}</Text>
                <Text style={[styles.date, { color: colors.mutedForeground }]}>
                    {item.date instanceof Date ? item.date.toLocaleDateString() : new Date(item.date).toLocaleDateString()}
                </Text>
                {item.note ? <Text style={[styles.note, { color: colors.mutedForeground }]} numberOfLines={1}>{item.note}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => handleDeletePress(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color={colors.destructive} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={moods}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{ color: colors.mutedForeground }}>{t('noMoods')}</Text>
                    </View>
                }
            />

            {/* Delete Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showDeleteConfirm}
                onRequestClose={cancelDelete}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.modalTitle, { color: colors.foreground }]}>{t('delete')}</Text>
                        <Text style={[styles.modalText, { color: colors.mutedForeground, marginBottom: 20 }]}>
                            {t('confirmDelete')}
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancel, { backgroundColor: colors.secondary }]}
                                onPress={cancelDelete}
                            >
                                <Text style={[styles.textStyle, { color: colors.foreground }]}>{t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete, { backgroundColor: colors.destructive }]}
                                onPress={confirmDelete}
                            >
                                <Text style={[styles.textStyle, { color: colors.destructiveForeground }]}>{t('delete')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showDeleteSuccess}
                onRequestClose={() => { }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={[styles.iconContainer, { backgroundColor: colors.destructive }]}>
                            <Ionicons name="trash" size={40} color={colors.destructiveForeground} />
                        </View>
                        <Text style={[styles.modalTitle, { color: colors.foreground }]}>{t('delete')}</Text>
                        <Text style={[styles.modalText, { color: colors.mutedForeground }]}>
                            Mood entry deleted.
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    content: {
        flex: 1,
    },
    mood: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        opacity: 0.6,
        marginTop: 4,
    },
    note: {
        fontSize: 14,
        marginTop: 4,
        fontStyle: 'italic',
    },
    deleteButton: {
        padding: 10,
    },
    empty: {
        alignItems: 'center',
        marginTop: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        width: '80%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        flex: 1,
        alignItems: 'center',
    },
    buttonCancel: {
        // backgroundColor set in component
    },
    buttonDelete: {
        // backgroundColor set in component
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
