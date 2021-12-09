import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../Shared/OrderCard";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import { useEffect } from "react/cjs/react.development";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      } else {
        AsyncStorage.getItem("jwt")
          .then((res) => {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => {
                // console.log(user.data);
                setUserProfile(user.data);
              });
          })
          .catch((error) => console.log(error));

        axios
          .get(`${baseURL}orders`)
          .then((x) => {
            const data = x.data;
            console.log(data);
            const userOrders = data.filter(
              (order) => order.user._id === context.stateUser.user.sub
            );
            setOrders(userOrders);
          })
          .catch((error) => console.log(error));
      }

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#A6607C" }}>
          {userProfile ? userProfile.name : context.stateUser.user.name}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20, }}>
            Email:{" "}
            {userProfile ? userProfile.email : context.stateUser.user.email}
          </Text>
          <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20, }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
          color="#542F34"
            title={"Sign Out"}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View>
            {orders && orders.length > 0 ? (
              orders.map((x) => {
                return <OrderCard key={x._id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default UserProfile;
