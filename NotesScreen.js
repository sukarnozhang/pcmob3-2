import React, { useState, useEffect, route } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import AddScreen from "./AddScreen";
import * as FileSystem from "expo-file-system";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS
                notes
                (id INTERGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    done INT);`
        );
      },
      null,
      refreshNotes
      );
  },[]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Entypo
            name="new-message"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  //  useEffect(() => {
  //     if (route.params?.text) {
  //       db.transaction((tx) => {
  //         tx.executeSql("INSERT INTO notes (done, value) VALUES (0, ?)", [
  //           route.params.text,
  //         ]);
  //       });

  //       const newNote = {
  //         title: route.params.text,
  //         done: false,
  //         id: notes.length.toString(),
  //       };
  //       setNotes([...notes, newNote]);
  //     }
  //   }, [route.params?.text]);

  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done,title) VALUES (0,?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Note");
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
      />
    </View>
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


   //    { title: "Walk the cat", done: false, id: "0" },
    //    { title: "Feed the elephant", done: false, id: "1" },