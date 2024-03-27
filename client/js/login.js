$("#loginForm").submit(async function (e) {
  e.preventDefault();
  const formDataObject = {};
  const formDataArray = $(this).serializeArray();
  $.each(formDataArray, function (index, field) {
    formDataObject[field.name] = field.value;
  });
  const jsonData = JSON.stringify(formDataObject);

  // Send form data to the backend using Axios
  try {
    const response = await axios.post("http://localhost:5000/login", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert(response.data.msg);
      // Optionally, redirect or show a success message
      $("#loginForm")[0].reset();
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (err) {
    if (err.response && err.response.status === 403) {
      alert(err.response.data.msg);
      $("#loginForm")[0].reset();
    } else {
      alert(err.response.data.msg);
      $("#loginForm")[0].reset();
    }
  }
});
