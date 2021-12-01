import { Text } from "native-base";
import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      {/* <Image
                source={require("../assets/Logo2.png")}
                resizeMode="contain"
                style={{ height: 50 }}
            /> */}
      <Text>{`
        Best Paintings
        Asthetic looks for your room
        `}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0000",
  },
});

export default Header;
