import { Text } from "native-base";
import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/homeH2.png")}
        resizeMode="contain"
        style={{ height: 100, width: 100}}
      />
      {/* <Text style={{color: "black", fontSize: 20, fontWeight: "bold",fontFamily: "Cochin", }}>{`
        Home
        `}</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    //padding: 5,
    backgroundColor: "#ffff",
  },
});

export default Header;
