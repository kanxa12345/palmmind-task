$(document).ready(() => {
  // Fetch user list
  let userList;
  const fetchUserList = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/users");
      userList = data.userList;
      displayUserList(userList); // Call function to display user list
    } catch (err) {
      console.log(err);
    }
  };

  // Function to display user list on the UI
  const displayUserList = (userList) => {
    const tableBody = $("#userTableBody"); // Assuming you have a tbody element in your Bootstrap table with id "userTableBody"
    tableBody.empty(); // Clear existing table body content

    // Iterate through the user list and create table rows
    userList.forEach((user, id) => {
      const row = $("<tr></tr>");

      // Create table cells for each user property
      const serialNumber = $("<td></td>").text(id + 1);
      const fullNameCell = $("<td></td>").text(user.fullName);
      const emailCell = $("<td></td>").text(user.email);

      // Append table cells to the table row
      row.append(serialNumber, fullNameCell, emailCell);

      // Append table row to the table body
      tableBody.append(row);
    });
  };

  fetchUserList();
});
