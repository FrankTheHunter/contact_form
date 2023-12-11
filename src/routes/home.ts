import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';
import client from "../database";


app.get('/', async (req: Request, res: Response) => {

  const isUserLoggedIn = req.session.loginIsValid || false;
  const isUserAdmin = req.session.loginIsAdmin || false;

  try {
    const result = await client.query('SELECT * FROM blogs');
    const blogs = result.rows.map((row: any) => {
      return {
        id: row.id_blog, // Remplacez "id" par le nom réel de la colonne contenant l'ID dans votre base de données
        title: row.title
      };
    });

    res.render('home', { pageTitle: 'Home', isUserLoggedIn: isUserLoggedIn, isUserAdmin: isUserAdmin, blogs });

  } catch (error) {
    console.error('Erreur lors de la récupération des blogs :', error);
    res.status(500).send('Erreur interne du serveur');
  }


});




