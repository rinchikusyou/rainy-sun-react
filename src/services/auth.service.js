const API_URL = "http://localhost:5000";

export const toAuth = async (data, isLogin = true) => {
  return fetch(API_URL + "/api/user/" + (isLogin ? "login" : "registration"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((data) => data.json());
};
