// Define sound types
type SoundEffect = 'tick' | 'correct' | 'wrong' | 'reveal' | 'transition';

// Create an audio cache to prevent recreating Audio objects
const audioCache: { [key in SoundEffect]?: HTMLAudioElement } = {};

// Preload sounds
const preloadSounds = () => {
  if (typeof window === 'undefined') return;
  
  const sounds: { [key in SoundEffect]: string } = {
    tick: '/sounds/tick.mp3',
    correct: '/sounds/correct.mp3',
    wrong: '/sounds/wrong.mp3',
    reveal: '/sounds/reveal.mp3',
    transition: '/sounds/transition.mp3'
  };

  Object.entries(sounds).forEach(([key, path]) => {
    const audio = new Audio(path);
    audio.preload = 'auto';
    audioCache[key as SoundEffect] = audio;
  });
};

// Initialize sounds when the module loads
if (typeof window !== 'undefined') {
  preloadSounds();
}

export const playSound = (soundName: SoundEffect, volume = 0.5) => {
  try {
    if (typeof window === 'undefined') return;

    const audio = audioCache[soundName];
    if (!audio) return;

    // Clone the audio to allow multiple plays
    const sound = audio.cloneNode() as HTMLAudioElement;
    sound.volume = volume;
    
    sound.play().catch((error) => {
      console.warn(`Failed to play sound: ${soundName}`, error);
    });
  } catch (error) {
    console.warn(`Error playing sound: ${soundName}`, error);
  }
};