$(function() {

//on submit, call submitForm() function
  $("#contactForm").submit(function(event) {
    event.preventDefault();
    submitForm();
  });

//function that handles AJAX call to PHP file
  let submitForm = () => {
    let name = $("#name").val();
    let email = $("#email").val();
    let subject = $("#subject").val();
    let message = $("#message").val();

    $.ajax({
      type: "POST",
      url: "./contact.php",
      data: {
        name: name,
        email: email,
        subject: subject,
        message: message,
        captcha: grecaptcha.getResponse()
      },
      success: function(text){
        if (text == "Recaptcha Success, Mail Sent Successfully") {
          //You can delete the console.logs if youre satisfied it works fine
          console.log("Mail Sent :" + text);
          formSuccess();
        } else {
          console.log("Mail Send Failure :" + text);
        }
      }
    });

  };

  let formSuccess = () => {
    $("#msgSubmit").removeClass("hidden");
  };

});
