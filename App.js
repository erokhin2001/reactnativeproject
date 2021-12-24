import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, StatusBar, Alert, Vibration, Dimensions, Pressable, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView from 'react-native-maps'

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {

  const openTimer = () => {
    try {
      Linking.openURL('https://www.timeanddate.com/timer/');
    } catch (error) {
      Alert.alert('Error','Something went wrong!');
      Vibration.vibrate(400, true);
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Hello My Friend!</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Goals')}>
        <Text>Goals</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Quote')}>
        <Text>Quote</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Places')}>
        <Text>Helsinki</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={(openTimer)}>
        <Text>Timer</Text>
      </Pressable>
    </View>
  );
}

function GoalsScreen() {

  const [text, setText] = useState('');
  const [goals, setGoals] = useState([]);



  const buttonPressed = () => {
    if (text == '') {
      Alert.alert('Empty','Dont you have anything to do?');
      Vibration.vibrate(400, true);
    } else {
      setGoals([...goals, { key: text }]);
      setText('');
      Alert.alert('Great job!','Good luck!');
    }
    
  }

  return (
    <View style={styles.container}>
      <TextInput 
        value={text}
        onChangeText={text => setText(text)}
        style={styles.border}
      />
      <Pressable style={styles.button} onPress={buttonPressed}>
        <Text>Add Goal</Text>
      </Pressable>
      <FlatList style={styles.body}
        data={goals}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
      />
      <StatusBar style="auto" />
    </View>
  );

}



function QuoteScreen() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    quote: '',
    author: ''
  });

  const getQuote = async () => {
     try {
      const response = await fetch('https://free-quotes-api.herokuapp.com');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>"{data.quote}"</Text>
      <Text>{data.author}</Text>
    </View>
  );
  }


function PlacesScreen() {
  return (
    <View>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 60.171328,
        longitude: 24.940412,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      />
    </View>
  )}

function TimerScreen() {

  
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Quote" component={QuoteScreen} />
        <Stack.Screen name="Places" component={PlacesScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 190, 190)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
  },
  header: {
    margin: 55,
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
  },
  title: {
    // height: 40,
    flex: 1,
    fontStyle: 'italic',
    fontSize: 30,
    // borderRadius: 40,
  },
  body: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    margin: 6,
    backgroundColor: 'rgb(190, 100, 170)',
  },
  border: {
    width:300, 
    height: 30, 
    borderColor: 'gray', 
    borderWidth:1,
  }

});