import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MoodItem({ mood, color, size = 60, showName = true }) {
    // Determine shape based on quadrant? 
    // For now, let's stick to rounded squares or circles. 
    // How We Feel uses different shapes for different quadrants sometimes, but consistent rounded squares is a good start.

    return (
        <View style={styles.container}>
            <View style={[styles.shape, { backgroundColor: color, width: size, height: size, borderRadius: size / 2.5 }]}>
                <Text style={[styles.emoji, { fontSize: size * 0.5 }]}>{mood.emoji}</Text>
            </View>
            {showName && <Text style={styles.name}>{mood.name}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shape: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    emoji: {
        textAlign: 'center',
    },
    name: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333', // Should be themed in parent
    },
});
