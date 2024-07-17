import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";
import SignInScreen from "./signInScreen";

const Stack = createNativeStackNavigator();

export function SignUpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: true,
          headerTitle: "Sign In",
          headerTintColor: "purple",
        }}
      />
    </Stack.Navigator>
  );
}

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const appAuth = auth;

  const signUp = async () => {
    setLoading(true);
    try {
      //  setUid(uuidv4());
      //  console.log(uid);
      const response = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password
      );
      const userDet = response.user;

      // Update the user's display name
      await updateProfile(userDet, {
        displayName: username,
      });

      await setDoc(doc(db, "users", userDet.uid), {
        username: username,
        email: email,
        bio: "",
        profilePicture: "",
        uid: userDet.uid,
      });
      alert("Account created successfully ");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.SignUpContainer}>
      <Image
        source={require("../assets/talkchat-logo.jpg")}
        style={{ width: 100, height: 100 }}
      />

      <View style={{ gap: 10, width: "100%", alignItems: "center" }}>
        {/*Sign up and start talking*/}
        <Text
          style={{
            color: "rgb(124, 81, 163)",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Sign up and start talking
        </Text>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderRadius: 20,
            paddingLeft: 20,
            borderWidth: 1,
          }}
          placeholder="Input your username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        {/* email */}
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderRadius: 20,
            paddingLeft: 20,
            borderWidth: 1,
          }}
          placeholder="Input your email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {/*password*/}
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderRadius: 20,
            paddingLeft: 20,
            borderWidth: 1,
          }}
          placeholder="Input your password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        {/*sign in button*/}
        {loading ? (
          <ActivityIndicator size="large" color="purple" />
        ) : (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              height: 30,
              width: 60,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#988fb5",
            }}
            onPress={() => signUp()}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          alignSelf: "flex",
          borderBottomWidth: 1,
        }}
      >
        <Text>
          By continuing, you agree to our{" "}
          <Text style={{ fontWeight: "bold" }}>User Agreement</Text> and
          ackownledge that you understand the{" "}
          <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 1,
            width: "100%",
            height: 30,
          }}
        >
          <Text style={{ alignItems: "center" }}>Already have an account?</Text>
          <SignInButton navigation={navigation} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function SignInButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SignIn")}
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgb(84, 18, 146)",
      }}
    >
      <Text>Sign In</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  SignUpContainer: {
    flex: 1,
    backgroundColor: "rgb(241, 242, 244)",
    paddingTop: 100,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
