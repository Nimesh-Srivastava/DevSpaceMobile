import { FlatList, View } from "react-native";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";

export default function HomeScreen() {
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
