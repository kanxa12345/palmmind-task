$("#myForm").submit(async function (e) {
  e.preventDefault();
  let password = $("#password").val();
  let confirmPassword = $("#rePassword").val();
  if (password !== confirmPassword) {
    $("#passwordWarning").show();
    return; // Stop form submission
  } else {
    $("#passwordWarning").hide();
    const formDataObject = {};
    const formDataArray = $(this).serializeArray();
    $.each(formDataArray, function (index, field) {
      if (field.name !== "rePassword") {
        formDataObject[field.name] = field.value;
      }
    });
    const jsonData = JSON.stringify(formDataObject);

    // Send form data to the backend using Axios
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert(response.data.msg);
        // Optionally, redirect or show a success message
        $("#myForm")[0].reset();
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.data.msg);
        $("#myForm")[0].reset();
      } else {
        console.error("Error:", err);
      }
    }
  }
});
