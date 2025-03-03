import { ActivityIndicator, FlatList, View, Text } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useSupabase } from "../../../lib/supabase";

export default function HomeScreen() {
    const supabase = useSupabase()
    const { data: posts, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => fetchPosts(supabase),
        staleTime: 10000
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
                onRefresh={refetch}
                refreshing={isRefetching}
            />
        </View>
    );
}
