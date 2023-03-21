import Cookies from "js-cookie";
import { URL } from "./url";

export default async function checkAuth() {
  const authToken = Cookies.get("auth-token");

  console.log("check auth", authToken);
  const res = await fetch(`${URL}/auth/status`, {
    method: "post",
    headers: { "auth-token": authToken! },
  });
  const resData = await res.json();
  return resData;
}
