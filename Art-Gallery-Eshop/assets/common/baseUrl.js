import { Platform } from "react-native";

let baseURL = "http://a213-111-68-99-41.ngrok.io/";

//For Production Purpose

// {
//   Platform.OS == "android"
//     ? (baseURL = "http://10.0.2.2:3000/api/v1/")
//     : (baseURL = "http://localhost:3000/api/v1/");
// }

export default baseURL;
