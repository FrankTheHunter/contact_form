import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';



app.get('/logout', (req: Request, res: Response) => {

    req.session.loginIsValid = false;
    req.session.loginIsAdmin = false;

    const isUserLoggedIn = req.session.loginIsValid || false;
    const isUserAdmin = req.session.loginIsAdmin || false;


    res.redirect("/");
});