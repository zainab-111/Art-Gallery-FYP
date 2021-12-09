import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"} style={styles.Loginpage}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton
          style={styles.LoginButton}
          large
          primary
          onPress={() => handleSubmit()}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 30 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>New to Art Gallery? Register now</Text>
        <EasyButton
          style={styles.RegisterButton}
          large
          secondary
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  LoginButton: {
    backgroundColor: "#542F34",
    borderRadius: 20,
  },
  RegisterButton: {
    backgroundColor: "#A6607C",
    borderRadius: 20,
  },
  Loginpage: {
    backgroundColor: "#ffff",
  },
});

export default Login;
