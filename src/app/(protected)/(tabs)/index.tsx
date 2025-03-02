import { FlatList, View } from "react-native";
//import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";
import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*, group:groups(*), user:users!posts_user_id_fkey(*)");
        console.log(error);
        console.log("data : ", data);

        setPosts(data);
    };

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
