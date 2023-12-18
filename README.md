# Projet Contact Form

Ce projet utilise Docker Compose pour orchestrer un environnement avec un service PostgreSQL et une application Node.js pour un formulaire de contact.

## Configuration du Projet

Le fichier `docker-compose.yml` définit deux services principaux et les configure pour fonctionner ensemble.

### PostgreSQL Service (`postgres_db`)

- **Nom du Conteneur:** `postgres_db`
- **Image PostgreSQL:** `postgres`
- **Base de Données:** `contact_form`
- **Nom d'Utilisateur PostgreSQL:** `root`
- **Mot de Passe PostgreSQL:** `password`
- **Port:** Le service expose le port 5432 sur la machine hôte.

### Node.js Service (`nodejs`)

- **Nom du Conteneur:** `contact_form`
- **Image Node.js:** `prout`
- **Dépendances:** Le service dépend du service PostgreSQL (`postgres_db`).
- **Variables d'Environnement:**
  - `POSTGRES_DB`: Nom de la base de données PostgreSQL (`contact_form`).
  - `POSTGRES_USER`: Nom d'utilisateur PostgreSQL (`root`).
  - `POSTGRES_PASSWORD`: Mot de passe PostgreSQL (`password`).
  - `POSTGRES_HOST`: Nom d'hôte du service PostgreSQL (`postgres_db`).
- **Port:** Le service expose le port 3000 sur la machine hôte.
- **Commande de Démarrage:** `npm run dev`

## Instructions d'Utilisation

1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.
2. Clonez ce dépôt sur votre machine locale.

    ```bash
    git clone https://github.com/votre-utilisateur/contact-form.git
    cd contact-form
    ```

3. Exécutez la commande suivante pour démarrer les services.

    ```bash
    docker-compose up -d
    ```

4. Attendez que les conteneurs démarrent complètement.
5. Accédez à l'application Node.js à l'adresse [http://localhost:3000](http://localhost:3000) dans votre navigateur web.

## Notes Additionnelles

- Les fichiers source de l'application Node.js se trouvent dans le répertoire `src`.
- Les fichiers générés lors de la construction de l'application sont stockés dans le répertoire `dist`.
- Vous pouvez arrêter les services à l'aide de la commande suivante :

    ```bash
    docker-compose down
    ```
