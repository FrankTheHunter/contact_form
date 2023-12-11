import client from "../database";
import { UserHash } from "./UserHash";
import {
  firstname,
  lastname,
  pseudo,
  email,
  password,
  isAdmin,
} from "../routes/register";

class User {
  async register(): Promise<boolean> {
    try {
      const values = [
        firstname,
        lastname,
        email,
        pseudo,
        UserHash.hashPassword(password),
        isAdmin,
      ];
      const query =
        "INSERT INTO formulaire (last_name, first_name, email, pseudo, key_password, is_admin,) VALUES ($1, $2,$3, $4,$5,$6)";

      await client.query(query, values);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error);
      return false;
    }
    return true;
  }
}
