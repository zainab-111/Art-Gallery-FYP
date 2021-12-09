import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Platform,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ImagePicker from "expo-image-picker";
import { Left, Right, Container, H1 } from "native-base";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");
  const [pickedImagePath, setPickedImagePath] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unvailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  const options = {
    storageOptions: {
      skipBackup: true,
      path: "C:UserslenovoOneDriveDesktopArt_GalleryArt-Gallery-Eshopimages",
    },
  };

  // This function is triggered when the "Open camera" button pressed
  //const openCamera = async () => {


    // Ask the user for the permission to access the camera
   // console.log(props.route.params.item.image);

    //setting up browser
    //<WebView source={{ uri: "https://www.google.com/" }} />;

    // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    // if (permissionResult.granted === false) {
    //   alert("You've refused to allow this appp to access your camera!");
    //   return;
    // }

    // const result = await ImagePicker.launchCameraAsync();

    // // Explore the result
    // //  console.log(result);

    // if (!result.cancelled) {
    //   setPickedImagePath(result.uri);
    //   console.log(result.uri);

    //   /// aet imageCounter=1 (Global)

    //   ////   uploading func////

    //   ////
    // }
  //};
 
 const OpenWEB = () => {
    Linking.openURL("https://artgalleryzainab.000webhostapp.com/?url="+props.route.params.item.image);
  };

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>Rs {item.price}</Text>
        </Left>
        <Right>
          <EasyButton
          style={styles.AddCartButton}
            primary
            medium
            onPress={() => {
              props.addItemToCart(item.id),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
          <EasyButton style={styles.ArButton} secondary medium onPress={OpenWEB}>
            <Text style={{ color: "white" }}>View in AR</Text>
          </EasyButton>
        </Right>
      </View>
    </Container>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  //  backgroundColor: "red",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  AddCartButton: {
    backgroundColor: "#542F34",
    borderRadius: 20,
  },
  ArButton: {
    backgroundColor: "#A6607C",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "#542F34",
    fontWeight: "bold",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapToDispatchToProps)(SingleProduct);
