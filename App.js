import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import DrumPad from './components/DrumPad';
import GridPad from './components/GridPad';

export default function App() {
  return (
    <View style={styles.container}>
      <GridPad />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
