import { router, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePostById, fetchPostById } from "../../services/postService";
import { useSupabase } from "../../../lib/supabase";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function DetailedPost() {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPostById(id, supabase),
        staleTime: 3000
    })

    const { mutate: remove } = useMutation({
        mutationFn: () => deletePostById(id, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            router.back()
        },
        onError: (error) => {
            Alert.alert(error.message)
        }
    })

    if (isLoading) {
        return (
            <View style={{ backgroundColor: "#101218", flex: 1 }}>
                <ActivityIndicator />
            </View>

        )
    }

    if (error || !post) {
        return (
            <View style={{ backgroundColor: "#101218", flex: 1 }}>
                <Text>Post not found</Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: "#101218", flex: 1 }}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Entypo onPress={() => remove()} name="trash" size={24} color="white" />
                            <AntDesign name="search1" size={24} color="white" />
                            <MaterialIcons name="sort" size={27} color="white" />
                            <Entypo name="dots-three-horizontal" size={24} color="white" />
                        </View>
                    ),

                }}
            />
            <PostListItem post={post} isDetailedPost />
        </View>
    );
}
