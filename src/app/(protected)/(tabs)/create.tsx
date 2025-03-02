import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const goBack = () => {
    setTitle("");
    setBody("");
    router.back();
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "black", flex: 1, paddingHorizontal: 10 }}
    >
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
          marginVertical: 5,
        }}
      >
        <AntDesign
          name="close"
          size={30}
          color={"white"}
          onPress={() => goBack()}
        />
        <Pressable
          onPress={() => console.error("pressed")}
          style={{ marginLeft: "auto" }}
        >
          <Text style={styles.postButton}>Post</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 10 }}
        >
          {/* space selector */}
          <View style={styles.spaceContainer}>
            <Text style={styles.s}>s/</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Select a space
            </Text>
            <AntDesign name="caretdown" size={12} color="black" />
          </View>

          {/* post inputs */}
          <TextInput
            placeholder="Title"
            placeholderTextColor={"grey"}
            selectionColor={"white"}
            multiline
            scrollEnabled={false}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
              marginVertical: 10,
              borderRadius: 10,
            }}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Body (optional)"
            placeholderTextColor={"grey"}
            selectionColor={"white"}
            multiline
            scrollEnabled={false}
            style={{
              fontSize: 20,
              color: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
              marginVertical: 10,
              borderRadius: 10,
            }}
            value={body}
            onChangeText={setBody}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postButton: {
    color: "white",
    backgroundColor: "#4c00cf",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  spaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: 10,
    gap: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
    marginVertical: 10,
  },

  s: {
    color: "white",
    backgroundColor: "#4c00cf",
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});
