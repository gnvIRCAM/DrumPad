import {Pressable, Image, View, Text} from 'react-native'; 
import { useState, useEffect } from 'react';
import {Audio} from 'expo-av'; 

export default function EditableDrumPad(props) {
    const padName = props.padName; 
    const [sound, setSound] = useState(); 
    const [recording, setRecording] = useState(); 
    const [permissionResponse, requestPermission] = Audio.usePermissions(); 
    const [recordingUri, setRecordingUri] = useState(); 
    const [isRecording, setIsRecording] = useState(false); 

    async function startRecording() {
        try {
            // Demander la permission d'accéder au micro
            if (permissionResponse.status !== 'granted') {
                await requestPermission(); 
            }
            // Autoriser enregistrement iOS
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true, 
                allowsRecordingIOS: true
            }); 
            // Commencer l'enregistrement 
            const {recording} = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            )
            setRecording(recording); 
        }
        catch (err) {
            console.error(err); 
        }
    }

    async function stopRecording() {
        await recording.stopAndUnloadAsync(); 
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false
        })
        const uri = recording.getURI()
        setRecordingUri(uri); 
        setRecording(undefined); 
    }

    async function playSound() {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true
        })
        const { sound } = await Audio.Sound.createAsync({uri:recordingUri});
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

    async function changeRecordingStatus() {
        if (!isRecording) {
            startRecording(); 
        }
        else {
            stopRecording(); 
        }
        setIsRecording(!isRecording); 
    }

    async function handlePressOut() {
        // Si on enregistrait, on arrête
        // Sinon, on ne fait rien
        if (isRecording) {
            changeRecordingStatus()
        }
    }

    return (
        <Pressable 
            style={{margin:3}}
            onPress={()=>playSound()} 
            onLongPress={()=>changeRecordingStatus()}
            onPressOut={() => handlePressOut()}
            >
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