import { View, FlatList, SafeAreaView } from "react-native";
import DrumPad from "./DrumPad";
import EditableDrumPad from "./EditableDrumPad";

export default function GridPad() {
    const samples_dir = '../assets/audio/'
    const sounds = [
        {name: 'Kick', 
         path: require(samples_dir+'kick.wav')}, 
        {name :'Snare', 
         path: require(samples_dir+'snare.wav')}, 
        {name :'Ride', 
         path: require(samples_dir+'ride.wav')}, 
         {name :'Hi-Hat', 
         path: require(samples_dir+'hihat.wav')}, 
         {name :'Open Hat', 
         path: require(samples_dir+'openhat.wav')}, 
         {name :'Crash', 
         path: require(samples_dir+'crash.wav')}, 
         {name :'Bell', 
         path: require(samples_dir+'bell.wav')}, 
         {name :'rim', 
         path: require(samples_dir+'rim.wav')}, 
         {name :'clap', 
         path: require(samples_dir+'clap.wav')},
        // 'Crash',
        // 'Bell', 
        // 'Rim', 
        // 'Clap', 
    ]
    const edit_names = []
    for (var i=1; i<10; i++) {
        edit_names.push('Pad '+i)
    }
    return (
        <SafeAreaView>
            <FlatList 
                numColumns={3}
                data={sounds}
                renderItem={({item}) => 
                <DrumPad padName={item.name} soundPath={item.path}/>}
            />
            <FlatList 
                numColumns={3}
                data={edit_names}
                renderItem={({item}) => <EditableDrumPad padName={item}/>}
            />
        </SafeAreaView>

    )


}