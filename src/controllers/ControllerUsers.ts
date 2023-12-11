import {
  firstname,
  lastname,
  pseudo,
  email,
  password,
  confirmation,
  errors_message,
} from "../routes/register";

export class ControllerUser {
  private static nameRegex = /^[A-Za-z\-]+$/;
  private static emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,3}$/;
  private static passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  private static pseudoRegex = /^[a-zA-Z0-9_]{3,20}$/;

  public static validateUserInputs(): { [key: string]: string } {
    if (!ControllerUser.nameRegex.test(firstname)) {
      errors_message.firstname = "The firstname must contain letters";
    }

    if (!ControllerUser.nameRegex.test(lastname)) {
      errors_message.lastname = "The lastname must contain letters";
    }

    if (!ControllerUser.pseudoRegex.test(pseudo)) {
      errors_message.pseudo =
        "The pseudo must contain letters, numbers or _ and have a length between 3 and 20 characters";
    }

    if (!ControllerUser.emailRegex.test(email)) {
      errors_message.email = "The e-mail is not available.";
    }

    if (!ControllerUser.passwordRegex.test(password)) {
      errors_message.password =
        "The password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character.";
    }

    if (password !== confirmation) {
      errors_message.confirmation = "Passwords do not match.";
    }

    if (Object.keys(errors_message).length > 0) {
      errors_message.validation = "false";
    } else {
      errors_message.validation = "true";
    }
    return errors_message;
  }
}
