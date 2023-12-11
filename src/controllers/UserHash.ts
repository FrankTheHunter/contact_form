import * as crypto from "crypto";

export class UserHash {
  // Creating a random salt
  static salt: string = "ya64hs";

  // Hash the salt and password with 10000 iterations, 64 length and sha512 digest
  static hashPassword(password: string): string {
    const hash: string = crypto
      .pbkdf2Sync(password, UserHash.salt, 10000, 64, "sha512")
      .toString("hex");

    return hash;
  }

  // Hash the salt and password with 10000 iterations, 64 length and sha512 digest
 static verifyPassword(inputPassword: string, storedHash: string): boolean {
    const hash = crypto
      .pbkdf2Sync(inputPassword, UserHash.salt, 10000, 64, "sha512")
      .toString("hex");

    return hash === storedHash;
  }

}
