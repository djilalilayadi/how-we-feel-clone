export const MOOD_QUADRANTS = {
    HIGH_UNPLEASANT: 'highUnpleasant', // Red
    HIGH_PLEASANT: 'highPleasant',     // Yellow
    LOW_UNPLEASANT: 'lowUnpleasant',   // Blue
    LOW_PLEASANT: 'lowPleasant',       // Green
};

export const MOODS = [
    // High Energy / Pleasant (Yellow)
    { name: 'Happy', emoji: '😊', quadrant: MOOD_QUADRANTS.HIGH_PLEASANT },
    { name: 'Excited', emoji: '🤩', quadrant: MOOD_QUADRANTS.HIGH_PLEASANT },
    { name: 'Energetic', emoji: '⚡', quadrant: MOOD_QUADRANTS.HIGH_PLEASANT },

    // Low Energy / Pleasant (Green)
    { name: 'Calm', emoji: '😌', quadrant: MOOD_QUADRANTS.LOW_PLEASANT },
    { name: 'Grateful', emoji: '🙏', quadrant: MOOD_QUADRANTS.LOW_PLEASANT },
    { name: 'Loved', emoji: '🥰', quadrant: MOOD_QUADRANTS.LOW_PLEASANT },
    { name: 'Relaxed', emoji: '🧘', quadrant: MOOD_QUADRANTS.LOW_PLEASANT },

    // High Energy / Unpleasant (Red)
    { name: 'Angry', emoji: '😡', quadrant: MOOD_QUADRANTS.HIGH_UNPLEASANT },
    { name: 'Anxious', emoji: '😰', quadrant: MOOD_QUADRANTS.HIGH_UNPLEASANT },
    { name: 'Frustrated', emoji: '😤', quadrant: MOOD_QUADRANTS.HIGH_UNPLEASANT },
    { name: 'Stressed', emoji: '😓', quadrant: MOOD_QUADRANTS.HIGH_UNPLEASANT },

    // Low Energy / Unpleasant (Blue)
    { name: 'Sad', emoji: '😔', quadrant: MOOD_QUADRANTS.LOW_UNPLEASANT },
    { name: 'Tired', emoji: '😴', quadrant: MOOD_QUADRANTS.LOW_UNPLEASANT },
    { name: 'Confused', emoji: '😕', quadrant: MOOD_QUADRANTS.LOW_UNPLEASANT },
    { name: 'Bored', emoji: '😐', quadrant: MOOD_QUADRANTS.LOW_UNPLEASANT },
];

export const getMoodColor = (moodName, colors) => {
    const mood = MOODS.find(m => m.name === moodName);
    if (mood && colors[mood.quadrant]) {
        return colors[mood.quadrant];
    }
    return colors.secondary; // Fallback
};
