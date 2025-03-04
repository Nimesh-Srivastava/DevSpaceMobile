import {
    ActivityIndicator,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../../atoms";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../services/groupService";
import { Tables } from "../../types/database.types";
import { useSupabase } from "../../lib/supabase";

type Group = Tables<"groups">

export default function GroupSelector() {
    const supabase = useSupabase()
    const [searchVal, setSearchVal] = useState<string>("");
    const setGroup = useSetAtom(selectedGroupAtom);

    const { data: groups, isLoading, error } = useQuery({
        queryKey: ["groups", searchVal],
        queryFn: () => fetchGroups(searchVal, supabase),
        staleTime: 10000,
        placeholderData: (previousData) => previousData
    })

    const onGroupSelected = (group: Group) => {
        setGroup(group);
        router.back();
    };
    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: "black", alignItems: "center" }} >
                <ActivityIndicator />
            </View>
        )
    }

    if (error || !groups) {
        return (
            <View style={{ flex: 1, backgroundColor: "black" }} >
                <Text style={{ color: "white" }} >Error fetching spaces</Text>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{ backgroundColor: "black", flex: 1, paddingHorizontal: 10 }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                    marginHorizontal: 10,
                    marginVertical: 5,
                }}
            >
                <AntDesign
                    name="close"
                    size={30}
                    color={"white"}
                    onPress={() => router.back()}
                />
                <Text
                    style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                        flex: 1,
                        textAlign: "center",
                        paddingRight: 30,
                    }}
                >
                    Post to
                </Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    paddingVertical: 7,
                    backgroundColor: "lightgrey",
                    borderRadius: 5,
                    gap: 5,
                    marginVertical: 10,
                    alignItems: "center",
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                }}
            >
                <AntDesign name="search1" size={16} color={"gray"} />
                <TextInput
                    placeholder="Search your spaces"
                    placeholderTextColor={"gray"}
                    style={{
                        padding: 5,
                        flex: 1,
                    }}
                    value={searchVal}
                    onChangeText={setSearchVal}
                />

                {searchVal && (
                    <AntDesign
                        name="closecircle"
                        size={15}
                        color={"darkgrey"}
                        onPress={() => setSearchVal("")}
                    />
                )}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}>
                <FlatList
                    style={{ marginHorizontal: 10 }}
                    data={groups}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => onGroupSelected(item)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 15,
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
                            />
                            <Text style={{ color: "white", fontSize: 15 }}>s/{item.name}</Text>
                        </Pressable>
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
