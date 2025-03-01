import { Tabs } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#4c00cf",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitle: "DevSpace",
                    headerTintColor: "#4c00cf",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="communities"
                options={{
                    title: "Communities",
                    headerTintColor: "#4c00cf",
                    tabBarIcon: ({ color }) => (
                        <Feather name="users" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    headerTintColor: "#4c00cf",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="pluscircleo" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: "Chats",
                    headerTintColor: "#4c00cf",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbox-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: "Inbox",
                    headerTintColor: "#4c00cf",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="inbox" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
