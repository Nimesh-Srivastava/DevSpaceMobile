import { ActivityIndicator, FlatList, View, Text } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";

export default function HomeScreen() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => fetchPosts(),
        staleTime: 3000
    })
    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>Error fetching posts</Text>
    }
    return (
        <View style={{ backgroundColor: "#101218" }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={posts}
                renderItem={({ item }) => <PostListItem post={item} />}
            />
        </View>
    );
}
