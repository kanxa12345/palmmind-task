$(document).ready(() => {
  let currentModal = null;

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

  // Function to display user list in  table
  const displayUserList = (userList) => {
    const tableBody = $("#userTableBody");
    tableBody.empty();

    // Iterate through the user list and create table rows
    userList.forEach((user, id) => {
      const row = $("<tr></tr>");
      // Create table cells for each user property
      const serialNo = $("<td></td>").text(id + 1);
      const fullNameCell = $("<td></td>").text(user.fullName);
      const emailCell = $("<td></td>").text(user.email);

      // Append table cells to the table row
      row.append(serialNo, fullNameCell, emailCell);

      row.css("cursor", "pointer");
      row.click(() => {
        openModal(user);
      });

      // Append table row to the table body
      tableBody.append(row);
    });
  };

  // Function to open modal with user data
  const openModal = (user) => {
    // Close the current modal if it exists
    if (currentModal) {
      currentModal.remove();
      currentModal = null;
    }

    const modal = $("<div></div>");
    modal.css({
      position: "fixed",
      top: "50%",
      left: "50%",
      width: "40%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(250, 250, 250)",
      boxShadow: "5px 5px 5px 1px rgba(0, 0, 0, 0.15)",
      padding: "30px",
      zIndex: "999",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    });

    // Create content for the modal
    const header = $("<div></div>");
    const body = $("<div></div>");
    const heading = $("<h3></h3>").text(
      `${user.fullName.split(" ")[0]}'s Detail`
    );
    const crossBtn = $(`<i class="fa-solid fa-xmark"></i>`);
    const fullName = $("<h5></h5>").text(`Full Name: ${user.fullName}`);
    const email = $("<h6></h6>").text(`Email: ${user.email}`);

    header.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    });
    body.css({
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    });

    // Append content to the modal
    header.append(heading, crossBtn);
    body.append(fullName, email);
    modal.append(header, body);

    // Append modal to the document body
    $("body").append(modal);

    // Set current modal reference
    currentModal = modal;

    // Close modal when cross button is clicked
    crossBtn.css({ cursor: "pointer", fontSize: "20px" });
    crossBtn.click(() => {
      modal.remove();
      currentModal = null;
    });
  };

  fetchUserList();
});
