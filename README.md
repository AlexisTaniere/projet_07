# Projet N°7 du parcours developpeur web d'OpenClassRoom
Ce projet intitulé Groupomania consiste à réaliser un réseau social d'entreprise

## Technologies utilisées
    - Backend (serveur) :
        * [Serveur Node](https://nodejs.org/en/) (v16.13.1) 
        * [Express](https://expressjs.com/fr/)
        * Javascript 
        * Base de données [mysql](https://www.mysql.com/fr/) (v8.0.29)
        * [Nodemon](https://nodemon.io/)

    - Frontend (client):
        - Javascript/[React](https://fr.reactjs.org/) (v18.1.0)
        - [Sass](https://sass-lang.com/)
        - [Axios](https://axios-http.com/)


  ### Prérequis
  MySQL doit être installé sur votre machine

### Installer l'application

1 - Ouvrir un terminal et créer un dossier à l'endroit de votre choix

`mkdir "nom_de_votre_dossier"`

`cd "nom_de_votre_dossier"`

2 - Cloner le repository dans le dossier que vous avez choisi

`git clone https://github.com/AlexisTaniere/projet_07.git`

3 - Installer le backend

`cd backend`

`npm install`

4 - Installer le frontend

`cd frontend`

`npm install`

5 - Création de la base de données

Connectez-vous à votre base de données en remplaçant le nom d'utilisateur
`mysql -u nom d'utilisateur -p`

Saisissez votre mot de passe puis tapez sur la touche entrée

Créez une nouvelle base de données en remplaçant dbname par le nom de votre choix :
`CREATE DATABASE dbname`

Puis rendez-vous dans le fichier database.js du back-end et modifier les valeurs suivantes :

<code>let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});</code>

Remplacez : 'root' par votre 'nom d'utilisateur'
            indiquez entre '' votre mot de passe (si vous en avez mis un pour cet utilisateur)
            'test' par le nom de la base de données que vous venez de créer (NOM_BDD)


Tapez la commande suivante : 

`mysql -u NOM_UTILISATEUR -p NOM_BDD < dump.sql`

en remplaçant NOM_UTILISATEUR et NOM_BDD par ceux modifiés précédemment

6 - Lancer le backend 

`cd backend`

`nodemon server`

7 - Lancer le frontend

`cd frontend`

`npm run start`



    