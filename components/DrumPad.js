import {Pressable, Image, View, Text} from 'react-native'; 
import { useState, useEffect } from 'react';
import {Audio} from 'expo-av'; 

export default function DrumPad(props) {
    const padName = props.padName; 
    const soundPath = props.soundPath;
    const [sound, setSound] = useState(); 

    async function playSound() {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true
        })
        const { sound } = await Audio.Sound.createAsync(soundPath);
        setSound(sound); 
        console.log('Playing sound...'); 
        await sound.playAsync(); 
    }

    useEffect(() => {
        return sound? () => {
            // Libérer la mémoire allouée à l'audio précédent
            console.log('Unloading sound...')
            sound.unloadAsync(); 
        }: undefined; 
    }, [sound])

    return (
        <Pressable onPressIn={()=>playSound()} style={{margin:3}}>
            {({pressed}) => (
                <View>
                    <Image 
                    style={{width:80, height:80}}
                    source={pressed?require('../assets/pressed_pad.png'):
                    require('../assets/pad.png')}
                    />
                    <View style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                                  justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{padName}</Text>
                    </View>
                </View>
            )
            }
        </Pressable>
    )
}