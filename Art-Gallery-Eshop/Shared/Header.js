import { Text } from "native-base";
import React, { useEffect, useContext } from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";
import { localSignin } from "../Context/actions/Auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";

const Header = () => {
  const context = useContext(AuthGlobal);
  console.log(context);

  useEffect(() => {
    const token = AsyncStorage.getItem("jwt");
    if (token) {
      localSignin(token, context.dispatch);
    }
  }, []);
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/homeH2.png")}
        resizeMode="contain"
        style={{ height: 100, width: 100 }}
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
