import { ActivityIndicator, FlatList, View, Text } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { supabase } from "../../../lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
    const { data, error } = await supabase
        .from("posts")
        .select("*, group:groups(*), user:users!posts_user_id_fkey(*)");
    if (error) {
        throw error
    } else {
        return data
    }
};

export default function HomeScreen() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => fetchPosts()
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
