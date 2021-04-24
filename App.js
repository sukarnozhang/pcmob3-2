import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";

function NotesScreen({ navigation }) {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add Color" />,
    });
  });
 return <View style={styles.container}></View>;
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Notes"
         component={NotesScreen}
         options={{
           headerTitle: "Notes App",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 60,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "yellow",
             borderBottomColor: "#ccc",
             borderBottomWidth: 1,
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});


