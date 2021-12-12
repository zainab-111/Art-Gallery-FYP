import { StatusBar } from "expo-status-bar";
import React, { useEffect, useContext } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

// Screens
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <StripeProvider publishablekey="pk_test_51K4nMsGWf29wQ8MRhk0j8FIwaexuHvZFej9Kh9wgMXtVDg7LM84bROHDBwhfe6pB1hN5utajaZbgIqplbXMOUk6L00V0BYhgGB">
      <Auth>
        <Provider store={store}>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </Provider>
      </Auth>
    </StripeProvider>
  );
}
