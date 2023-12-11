<https://www.mermaidchart.com/app/projects/dbfbaab4-dc64-48da-bf0f-84863989127c/diagrams/ffa3fb73-c8e0-4ed2-8c1a-bdb0779ac490/version/v0.1/edit>


---

title: Blog Groupe 1 the best
---

classDiagram
users  <|-- blogs
users  <|-- comments
blogs  <|-- comments
blogs  <|-- categories
note for blogs "The pictures is a directory in serveur"

   class users{
    +int id_user (unique)*
    +String first_name
    +String last_name
    +String email
    +String pseudo
    +String key_password
    +Boolean admin
    +Datetime date_create
   }

   class blogs{
    +int id_blog(unique)*
    +int id_user
    +int id_category
    +String title
    +Text text_content_blog
    +String picture
    +Datetime date_create
   }

   class comments{
    +int id_comment(unique)*
    +int id_blog
    +int id_user
    +Text text_content_comments
    +Datetime date_create
   }

   class categories{
    +int id_category(unique)*
    +String name_category
   }
