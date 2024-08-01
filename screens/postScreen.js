import { FontAwesome6 } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db, storage } from "../firebase";

export default function CreateScreen({ navigation }) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [bodyText, setBodyText] = React.useState("");
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const clearImage = () => {
    setImage(null);
  };

  const uploadImage = async () => {
    if (!image) return null;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const filename = image.substring(image.lastIndexOf("/") + 1);
    const imageRef = ref(storage, `posts/${filename}`);

    try {
      await uploadBytes(imageRef, blob);
      blob.close();
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

const createPost = async () => {
  if (!title.trim()) {
    Alert.alert("Error", "Please enter a title for your post.");
    return;
  }

  try {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to create a post.");
      return;
    }
    setLoading(true);

    console.log("Starting image upload...");
    const imageUrl = await uploadImage();
    console.log("Image upload complete. URL:", imageUrl);

    const postData = {
      title: title || "No Title",
      body: bodyText || "No Body Text",
      community: searchText || "No Community",
      authorName: user.displayName || "Anonymous",
      authorUid: user.uid,
      createdAt: new Date(),
      imageUrl: imageUrl || null,
    };

    console.log("Prepared post data: ", postData);

    console.log("Adding document to Firestore...");
    const docRef = await addDoc(collection(db, "posts"), postData);
    console.log("Document written with ID: ", docRef.id);

    setLoading(false);
    Alert.alert("Success", "Your post has been created!");

    // Clear the form
    setTitle("");
    setBodyText("");
    setSearchText("");
    setImage(null);
  } catch (error) {
    console.error("Error in createPost: ", error);
    setLoading(false);
    Alert.alert("Error", "Failed to create post. Please try again.");
  }
};

  return (
    <View style={altStyles.screenContainer}>
      <ScrollView style={altStyles.scrollViewContainer}>
        <View style={altStyles.searchBar}>
          <TextInput
            style={altStyles.searchInput}
            placeholder="t/choose a community"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={altStyles.iconContainer}>
          <TouchableOpacity style={altStyles.icon}>
            <Icon name="menu-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={altStyles.icon}>
            <Icon name="link-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={altStyles.icon} onPress={pickImage}>
            <Icon name="image-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={altStyles.icon}>
            <Icon name="videocam-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={altStyles.icon}>
            <FontAwesome6 name="bars-progress" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={altStyles.richTextBoxContainer}>
          <TextInput
            style={[altStyles.richTextBox, altStyles.titleInput]}
            placeholder="An interesting title"
            value={title}
            onChangeText={setTitle}
            multiline={false}
          />
          <TextInput
            style={[altStyles.richTextBox, altStyles.bodyTextInput]}
            placeholder="Body text(optional)"
            value={bodyText}
            onChangeText={setBodyText}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={5}
          />
        </View>

        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={altStyles.buttonContainer}>
            {loading ? <ActivityIndicator size="small" color="purple"/> :
              <TouchableOpacity style={altStyles.button} onPress={createPost}>
                <Text style={altStyles.buttonText}>Post</Text>
              </TouchableOpacity>
            }
          </View>

          <View style={altStyles.buttonContainer}>
            {image && (
              <TouchableOpacity style={altStyles.button} onPress={clearImage}>
                <Text style={altStyles.buttonText}>Clear Image</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
  },
});

const altStyles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },

  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: StatusBar.currentHeight,
  },
  postContainer: {
    flex: 1,
    padding: 10,
  },
  scrollViewContainer: {
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
  },
  richTextBoxContainer: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  richTextBox: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    backgroundColor: "rgb(124, 81, 163)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginLeft: 10,
    marginBottom:30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  titleInput: {
    marginBottom: 10,
    maxHeight: 50,
    fontWeight: "bold",
    fontSize: 20,
  },
  bodyTextInput: {
    flex: 1,
    maxHeight: 150,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  button1: {
    backgroundColor: "blueviolet",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
