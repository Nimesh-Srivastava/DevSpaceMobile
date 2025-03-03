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
    Image,
    Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "../../../atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "../../../lib/supabase";
import { Database, TablesInsert } from "../../../types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type InsertPost = TablesInsert<"posts">

const insertPost = async (post: InsertPost, supabase: SupabaseClient<Database>) => {
    const { data, error } = await supabase
        .from("posts").insert(post).select().single()

    if (error) { throw error }
    else { return data }

}

export default function CreateScreen() {
    const supabase = useSupabase()

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [group, setGroup] = useAtom(selectedGroupAtom);

    const queryClient = useQueryClient()

    const { mutate, data, isPending, error } = useMutation({
        mutationFn: async () => {
            if (!group) {
                throw new Error("Please select a space")
            }
            if (!title) {
                throw new Error("Please provide a title for your post")
            }
            return insertPost({
                title, description: body,
                group_id: group.id,
            }, supabase)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            goBack()
        },
        onError: (error) => { Alert.alert("Failed to post", error.message) }
    })

    const goBack = () => {
        setTitle("");
        setBody("");
        setGroup(null);
        router.back();
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: "black",
                flex: 1,
            }}
        >
            {/* header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                    marginVertical: 5,
                    marginHorizontal: 10,
                }}
            >
                <AntDesign
                    name="close"
                    size={30}
                    color={"white"}
                    onPress={() => goBack()}
                />
                <Pressable
                    onPress={() => mutate()}
                    style={{ marginLeft: "auto" }}
                    disabled={isPending}
                >
                    <Text style={styles.postButton}>{isPending ? "Posting" : "Post"}</Text>
                </Pressable>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 10, marginHorizontal: 10 }}
                >
                    {/* space selector */}
                    <Link href={"groupSelector"} asChild>
                        <Pressable style={styles.spaceContainer}>
                            {group ? (
                                <>
                                    <Image
                                        source={{ uri: group.image }}
                                        style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
                                    />
                                    <Text>{group.name}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.s}>s/</Text>
                                    <Text style={{ color: "black", fontWeight: "bold" }}>
                                        Select a space
                                    </Text>
                                </>
                            )}
                            <AntDesign name="caretdown" size={12} color="black" />
                        </Pressable>
                    </Link>

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
        backgroundColor: "#9146ff",
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
        backgroundColor: "#9146ff",
        fontWeight: "bold",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});
