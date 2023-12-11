import client from "../database";

export class UserRequestRegisterExist {
    private email: string;
    private pseudo: string;
    private isEmail: boolean;
    private isPseudo: boolean;


    constructor(email: string, pseudo: string) {
        this.pseudo = pseudo;
        this.email = email;
        this.isEmail = false;
        this.isPseudo = false;
    }

    async logRequest(): Promise<void> {
        try {
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [this.email];
            const result = await client.query(query, values);

            if (result.rows.length > 0) {
                this.isEmail = true;
            }


        } catch (error) {
            console.error("Error inserting data:", error);
            throw error; // Propagate the error to handle it in the route
        } finally {
            // client.end();
        }
        try {
            const query = "SELECT * FROM users WHERE pseudo = $1";
            const values = [this.pseudo];

            const result = await client.query(query, values);

            if (result.rows.length > 0) {
                this.isPseudo = true;
            }


        } catch (error) {
            console.error("Error inserting data:", error);
            throw error; // Propagate the error to handle it in the route
        } finally {
            // client.end();
        }
    }

    public async getIsEmailExist(): Promise<boolean> {
        await this.logRequest();
        return this.isEmail;
    }


    public async getIsPseudoExist(): Promise<boolean> {
        await this.logRequest();
        return this.isPseudo;
    }

}
