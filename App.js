import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import NotesStack from "./NotesStack";
import AddScreen from "./AddScreen";



const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator mode="modal" headerMode="none">
       <Stack.Screen
         name="Notes Stack"
         component={NotesStack}
         options={{ headerShown: false }}
       />
       <Stack.Screen name="Add Note" component={AddScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}


