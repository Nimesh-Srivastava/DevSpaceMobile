import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import groups from "../../../assets/data/groups.json";

export default function GroupSelector() {
    const [searchVal, setSearchVal] = useState<string>("");

    const filteredGroups = groups.filter((group) =>
        group.name.toLowerCase().includes(searchVal.toLowerCase()),
    );

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

            <FlatList
                style={{ marginHorizontal: 10 }}
                data={filteredGroups}
                renderItem={({ item }) => (
                    <Pressable
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
                        <Text style={{ color: "white", fontSize: 15 }}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}
