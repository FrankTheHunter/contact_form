import {title, content} from "../routes/blog";

export class ControllerBlog {

    public static validateUserInputs(): { [key: string]: string } {

        const errors: { [key: string]: string } = {};
        console.log("Data validating.");

        if(title == ""){

            errors.title = "Title can't be empty";
        }

        if(content == ""){

            errors.content = "Content can't be empty";
        }

        console.log("Inputs validated.");

        return errors;
    }

}



