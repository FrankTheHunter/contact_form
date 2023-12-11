import express, { Express, Request, Response, Application } from "express";
import { app } from "../index";
import { ControllerBlog } from "../controllers/ControllerBlog";
import { insertBlog } from "../models/blog";
import client from "../database";


app.get('/createblog', (req: Request, res: Response) => {
  res.render('blog', { pageTitle: 'Blog' });
});


export let title: string;
export let img: string;
export let content: string;
export let login_isValid: boolean;
export let currentDate: Date;
export let isAdmin: boolean;
export let errors_message: string;



app.get("/submit-blog", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  title = req.query.title as string;
  img = req.query.img as string;
  content = req.query.content as string;
  login_isValid = true;
  isAdmin = true;
  errors_message = "";
  currentDate = new Date();
  console.log("Data gathered.");

  const isUserLoggedIn = req.session.loginIsValid || false;
  const isUserAdmin = req.session.loginIsAdmin || false;

  //AJOUT DES CLASSES CONTROL
  ControllerBlog.validateUserInputs();

  if (login_isValid && isAdmin) {
    console.log("Is Admin.");
    try {
      await insertBlog(currentDate);

      res.render("blog", {
        pageTitle: "Blog",
        messageSuccess: "Blog créé !",
        isUserLoggedIn: isUserLoggedIn, isUserAdmin: isUserAdmin,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).render("blog", {
        pageTitle: "Blog",
        messageNosuccess: "Erreur lors de la création du blog",
        isUserLoggedIn: isUserLoggedIn, isUserAdmin: isUserAdmin,
      });
    }
  }



});

app.get('/blog', async (req: Request, res: Response) => {
  const blogId = req.query.id as string;
  const isUserLoggedIn = req.session.loginIsValid || false;
  const isUserAdmin = req.session.loginIsAdmin || false;

  try {
    // Utilisez blogId pour récupérer les détails du blog depuis la base de données
    const result = await client.query('SELECT * FROM blogs WHERE id_blog = $1', [blogId]);
    console.log(result);
    // Assurez-vous que le blog a été trouvé
    if (result.rows.length > 0) {
      const blogDetails = result.rows[0];
      res.render('blog_ready', { pageTitle: 'Détails du Blog', isUserLoggedIn: isUserLoggedIn, isUserAdmin: isUserAdmin, blogDetails });
      console.log(blogDetails)
    } else {
      res.status(404).send('Blog non trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du blog :', error);
    res.status(500).send('Erreur interne du serveur');
  }
});



