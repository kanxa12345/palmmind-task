// user register form
$("#registerForm").submit(async function (e) {
  e.preventDefault();
  let password = $("#password").val();
  let confirmPassword = $("#rePassword").val();
  if (password !== confirmPassword) {
    $("#passwordWarning").show();
    return;
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
        window.location.href = "./login.html";
        $("#registerForm")[0].reset();
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.data.msg);
        $("#registerForm")[0].reset();
      } else {
        console.error("Error:", err);
      }
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

// for toggle confirm password type
const eye1 = $("#eye1");
const eyeSlash1 = $("#eyeSlash1");
const rePassword = $("#rePassword");
eye1.addClass("eye");
const toggleConfirmPassword = () => {
  if (rePassword[0].type === "password") {
    rePassword[0].type = "text";
    eye1.removeClass("eye");
    eyeSlash1.addClass("eye");
  } else {
    rePassword[0].type = "password";
    eye1.addClass("eye");
    eyeSlash1.removeClass("eye");
  }
};
