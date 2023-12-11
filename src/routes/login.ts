import express, { Express, Request, Response, Application } from "express";
import session from "express-session";
import { app } from "../index";
import { UserRequestLogin } from "../models/login";
import { UserHash } from "../controllers/UserHash";

app.get("/login", (req: Request, res: Response) => {
  res.render("login", { pageTitle: "Connexion" });
});

export let login: string;
export let password: string;
export let keyPassword: string;
export let loginIsValid: boolean;
export let loginIsAdmin: boolean;

app.get("/submit-login", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  login = req.query.login as string;
  password = req.query.password as string;
  // class control
  const controlform: boolean = true;

  if (controlform) {
    loginIsValid = false;
    loginIsAdmin = false;

    let userRequestLogin = new UserRequestLogin(login);

    userRequestLogin.logRequest();

    userRequestLogin
      .getIsLoginExist()
      .then((loginIsValid) => {

        if (loginIsValid) {
          // Classe controle Variable

          userRequestLogin
            .getKeyPassword()
            .then((keyPassword) => {
              // Utiliser keyPassword ici
              console.log(keyPassword);

              const passwordExist: boolean = UserHash.verifyPassword(
                password,
                keyPassword
              );
              // Si controle ok :
              // Classe controle login et password
              if (passwordExist) {
                req.session.loginIsValid = true;
                const isUserLoggedIn = req.session.loginIsValid || false;




                userRequestLogin
                  .getIsIsAdmin()
                  .then((isAdmin) => {
                    req.session.loginIsAdmin = isAdmin;
                    // res.render("home", {
                    //   pageTitle: "Home",
                    //   isUserLoggedIn: isUserLoggedIn,
                    // });
                    res.redirect("/");
                  });




              } else {
                res.render("login", {
                  pageTitle: "Connexion",
                  messagevoid: "Le login et/ou le mot de passe n'existe pas",
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          res.render("login", {
            pageTitle: "Connexion",
            messagevoid: "Le login et/ou le mot de passe n'existe pas",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.render("login", {
      pageTitle: "Connexion",
      messagevoid: "le login et/ou le mot de passe ne repondent aux critères",
    });
  }
});
