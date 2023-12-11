-- Creation of product table

CREATE TABLE IF NOT EXISTS users (
        ID_USER SERIAL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        pseudo VARCHAR(255) NOT NULL,
        key_password VARCHAR(1024) NOT NULL,
        is_admin BOOLEAN NOT NULL,
        date_create TIMESTAMP NOT NULL,
        UNIQUE (ID_USER),
        PRIMARY KEY (ID_USER)
    );


CREATE TABLE IF NOT EXISTS blogs (
        ID_BLOG SERIAL,
        id_user INT NOT NULL,
        id_category INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        text_content_blog TEXT NOT NULL,
        picture VARCHAR(255) NOT NULL,
        date_create TIMESTAMP NOT NULL,
        UNIQUE (ID_BLOG),
        PRIMARY KEY (ID_BLOG)
    );


CREATE TABLE IF NOT EXISTS comments (
        ID_COMMENT SERIAL,
        id_blog INT NOT NULL,
        id_user INT NOT NULL,
        text_content_comment TEXT NOT NULL,
        date_create TIMESTAMP NOT NULL,
        UNIQUE (ID_COMMENT),
        PRIMARY KEY (ID_COMMENT)
    );


CREATE TABLE IF NOT EXISTS categories (
        ID_CATEGORY SERIAL,
        name_category VARCHAR(255) NOT NULL,
        UNIQUE (ID_CATEGORY),
        PRIMARY KEY (ID_CATEGORY)
    );