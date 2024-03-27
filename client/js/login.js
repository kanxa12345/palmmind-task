// user login form
$("#loginForm").submit(async function (e) {
  e.preventDefault();
  const formDataObject = {};
  const formDataArray = $(this).serializeArray();
  $.each(formDataArray, function (index, field) {
    formDataObject[field.name] = field.value;
  });
  const jsonData = JSON.stringify(formDataObject);

  try {
    const response = await axios.post("http://localhost:5000/login", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert(response.data.msg);
      window.location.href = "./index.html";
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


// for toggle password type

const eye = $("#eye");
const eyeSlash = $("#eyeSlash");
const password = $("#password");

eye.addClass("eye");

const togglePassword = () => {
  if (password[0].type === "password") {
    password[0].type = "text";
    eye.removeClass("eye");
    eyeSlash.addClass("eye");
  } else {
    password[0].type = "password";
    eye.addClass("eye");
    eyeSlash.removeClass("eye");
  }
};
