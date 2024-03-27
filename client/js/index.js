let userList;
$(document).ready(async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/users");
    userList = data;
  } catch (err) {
    console.log(err);
  }
});
