import axios from "axios";

export const addFriendAPI = async (validatedEmail: { email: string }) => {
  await axios.post("/api/friends/add", {
    email: validatedEmail,
  });
};
