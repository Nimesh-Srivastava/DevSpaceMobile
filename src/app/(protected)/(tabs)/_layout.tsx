import { Tabs } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

export default function TabsLayout() {
    const { signOut } = useAuth();

    const [btnLoad, setBtnLoad] = useState<boolean>(false)

    const handleSignOut = () => {
        setBtnLoad(true)
        Alert.alert("Signed out")
        signOut()
        setBtnLoad(false)
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#9146ff",
                tabBarStyle: { backgroundColor: "#101218", borderTopWidth: 0 },
                headerStyle: { backgroundColor: "#101218" },
                headerTintColor: "#9146ff",
                headerTitleStyle: { fontSize: 22 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerRight: () => (
                        <>
                            {btnLoad ? <ActivityIndicator /> :
                                <Feather
                                    name="log-out"
                                    size={24}
                                    color={"red"}
                                    style={{ paddingRight: 10 }}
                                    onPress={() => handleSignOut()}
                                />}
                        </>
                    ),
                    title: "Home",
                    headerTitle: "DevSpace",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="communities"
                options={{
                    title: "Spaces",
                    tabBarIcon: ({ color }) => (
                        <Feather name="users" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="pluscircleo" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: "Chats",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbox-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: "Inbox",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="inbox" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
