import { useContext, useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    const { colors } = useContext(ThemeContext);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate to Home after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('Main'); // Assuming 'Main' is the name of the BottomTabs or Root stack
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: width * 0.6,
        height: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
});
