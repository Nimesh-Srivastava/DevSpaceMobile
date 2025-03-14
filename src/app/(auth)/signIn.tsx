import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import React from "react";

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const [btnLoad, setBtnLoad] = React.useState<boolean>(false)

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return;

        // Start the sign-in process using the email and password provided
        try {
            setBtnLoad(true)
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/");
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                //console.error(JSON.stringify(signInAttempt, null, 2));
                JSON.stringify(signInAttempt, null, 2)
            }
        } catch (err: any) {
            setBtnLoad(false)
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            //console.error(JSON.stringify(err, null, 2));
            JSON.stringify(err, null, 2)
            Alert.alert("Incorrect username or password")
        }
    }, [isLoaded, emailAddress, password]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Text style={styles.logo}>DevSpace</Text>
            <Text style={styles.sublogo}>ENGINEERING CORE</Text>
            <Text style={styles.title}>Input credentials</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Username or Email"
                placeholderTextColor="grey"
                onChangeText={setEmailAddress}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry
                onChangeText={setPassword}
            />
            {btnLoad ? <ActivityIndicator /> : <Button title="Sign In" onPress={onSignInPress} />}
            {/*
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Link href="/signUp" asChild>
          <TouchableOpacity>
            <Text style={styles.signUpText}> Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
      */}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#101218",
    },
    logo: {
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#9146ff",
        top: -100,
    },
    sublogo: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        color: "grey",
        top: -100,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "white",
    },
    signUpContainer: {
        flexDirection: "row",
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        color: "grey",
    },
    signUpText: {
        fontSize: 16,
        color: "#007bff",
        fontWeight: "bold",
    },
});
