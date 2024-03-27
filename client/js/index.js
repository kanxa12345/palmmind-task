$(document).ready(() => {
  // Function to update UI based on login state
  function updateUI() {
    const { isLogin, userDetail } = store.getState();
    console.log(isLogin, userDetail);
    const loginBtn = $("#loginBtn");
    if (isLogin) {
      loginBtn.hide();
    } else {
      loginBtn.show();
    }
  }

  // Initial UI update
  updateUI();

  // Subscribe to the Redux store to listen for state changes
  store.subscribe(updateUI);

  // Fetch user list
  let userList;
  async function fetchUserList() {
    try {
      const { data } = await axios.get("http://localhost:5000/users");
      userList = data;
    } catch (err) {
      console.log(err);
    }
  }

  fetchUserList();
});
