import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../services/postService";

export default function DetailedPost() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPostById(id),
        staleTime: 3000
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
            <PostListItem post={post} isDetailedPost />
        </View>
    );
}
