// password reset form
$("#resetForm").submit(async function (e) {
  e.preventDefault();
  let password = $("#newPassword").val();
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
      const response = await axios.patch(
        "http://localhost:5000/user",
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
        $("#resetForm")[0].reset();
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.data.msg);
        $("#resetForm")[0].reset();
      } else {
        alert(err.response.data.msg);
        $("#resetForm")[0].reset();
      }
    }
  }
});

// for toggle old password type
const eye = $("#eye");
const eyeSlash = $("#eyeSlash");
const oldPassword = $("#oldPassword");
eye.addClass("eye");
const toggleOldPassword = () => {
  if (oldPassword[0].type === "password") {
    oldPassword[0].type = "text";
    eye.removeClass("eye");
    eyeSlash.addClass("eye");
  } else {
    oldPassword[0].type = "password";
    eye.addClass("eye");
    eyeSlash.removeClass("eye");
  }
};

// for toggle new password type
const eye1 = $("#eye1");
const eyeSlash1 = $("#eyeSlash1");
const newPassword = $("#newPassword");
eye1.addClass("eye");
const toggleNewPassword = () => {
  if (newPassword[0].type === "password") {
    newPassword[0].type = "text";
    eye1.removeClass("eye");
    eyeSlash1.addClass("eye");
  } else {
    newPassword[0].type = "password";
    eye1.addClass("eye");
    eyeSlash1.removeClass("eye");
  }
};

// for toggle confirm password type
const eye2 = $("#eye2");
const eyeSlash2 = $("#eyeSlash2");
const rePassword = $("#rePassword");
eye2.addClass("eye");
const toggleConfirmPassword = () => {
  if (rePassword[0].type === "password") {
    rePassword[0].type = "text";
    eye2.removeClass("eye");
    eyeSlash2.addClass("eye");
  } else {
    rePassword[0].type = "password";
    eye2.addClass("eye");
    eyeSlash2.removeClass("eye");
  }
};
