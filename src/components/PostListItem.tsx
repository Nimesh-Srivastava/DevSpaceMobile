import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "expo-router";
import { Tables } from "../types/database.types";

type PostListItemProps = {
    post: Post;
    isDetailedPost?: boolean;
};

type Post = Tables<"posts"> & {
    //user: Tables<"users">;
    group: Tables<"groups">;
};

export default function PostListItem({
    post,
    isDetailedPost,
}: PostListItemProps) {
    const shouldShowImage = isDetailedPost || post.image;
    const shouldShowDesc = isDetailedPost || !post.image;
    const iconColor = "white";
    return (
        <Link href={`/post/${post.id}`} asChild>
            <Pressable
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    gap: 7,
                    borderColor: "grey",
                    borderBottomWidth: 0.2,
                    backgroundColor: "#101218",
                }}
            >
                {/* post header */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={{ uri: post.group.image }}
                        style={{ width: 20, height: 20, borderRadius: 10, marginRight: 5 }}
                    />
                    <View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Text
                                style={{ fontWeight: "bold", fontSize: 13, color: "lightgrey" }}
                            >
                                s/{post.group.name}
                            </Text>
                            <Text
                                style={{
                                    color: "lightgrey",
                                    fontSize: 13,
                                    alignSelf: "flex-start",
                                }}
                            >
                                {formatDistanceToNowStrict(new Date(post.created_at))}
                            </Text>
                        </View>
                        {isDetailedPost && (
                            <Text style={{ fontSize: 13, color: "lightgrey" }}>
                                {post.user?.name}
                            </Text>
                        )}
                    </View>
                    {/*
                    <Pressable
                        onPress={() => console.error("Pressed")}
                        style={{
                            marginLeft: "auto",
                            backgroundColor: "#b9a3e3",
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                paddingVertical: 2,
                                paddingHorizontal: 7,
                                fontWeight: "bold",
                                fontSize: 13,
                            }}
                        >
                            Join
                        </Text>
                    </Pressable>
                */}
                </View>

                {/* post content */}
                <Text style={{ fontWeight: "bold", fontSize: 17, color: "white" }}>
                    {post.title}
                </Text>
                {shouldShowImage && post.image && (
                    <Image
                        source={{ uri: post.image }}
                        style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 15 }}
                    />
                )}

                {shouldShowDesc && post.description && (
                    <Text
                        style={{ color: "white" }}
                        numberOfLines={isDetailedPost ? undefined : 4}
                    >
                        {post.description}
                    </Text>
                )}

                {/* post footer */}
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={[{ flexDirection: "row" }, styles.iconBox]}>
                            <MaterialCommunityIcons
                                name="arrow-up-bold-outline"
                                size={19}
                                color={iconColor}
                            />
                            <Text
                                style={{
                                    fontWeight: "500",
                                    marginLeft: 5,
                                    color: iconColor,
                                    alignSelf: "center",
                                }}
                            >
                                {post.upvotes}
                            </Text>
                            <View
                                style={{
                                    width: 1,
                                    backgroundColor: "#D4D4D4",
                                    height: 14,
                                    marginHorizontal: 7,
                                    alignSelf: "center",
                                }}
                            />
                            <MaterialCommunityIcons
                                name="arrow-down-bold-outline"
                                size={19}
                                color={iconColor}
                            />
                        </View>
                        <View style={[{ flexDirection: "row" }, styles.iconBox]}>
                            <MaterialCommunityIcons
                                name="comment-outline"
                                size={19}
                                color={iconColor}
                            />
                            <Text
                                style={{
                                    fontWeight: "500",
                                    marginLeft: 5,
                                    alignSelf: "center",
                                    color: iconColor,
                                }}
                            >
                                {post.nr_of_comments}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: "auto", flexDirection: "row", gap: 10 }}>
                        <MaterialCommunityIcons
                            name="trophy-outline"
                            size={19}
                            color={iconColor}
                            style={styles.iconBox}
                        />
                        <MaterialCommunityIcons
                            name="share-outline"
                            size={19}
                            color={iconColor}
                            style={styles.iconBox}
                        />
                    </View>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    iconBox: {
        borderWidth: 0.2,
        borderColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
});
