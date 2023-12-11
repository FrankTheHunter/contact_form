import client from "../database";
import {
    title,
    content,
    img
} from "../routes/blog";

export async function insertBlog(currentDate: Date): Promise<void> {

    try {
      
      const query = "INSERT INTO blogs (title, text_content_blog, picture, date_create, id_category, id_user) VALUES ($1, $2, $3, $4, $5, $6)";
  
      const values = [
        title,
        content,
        img,
        currentDate,
        1,
        1
      ];
  
      await client.query(query, values);
  
      console.log("Data inserted successfully");
  
    } catch (error) {
  
      console.error("Error inserting data:", error);
      throw error; // Propager l'erreur pour la gérer dans la route
  
    }
  
}