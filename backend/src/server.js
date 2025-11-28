import express from "express" ;
import {ENV} from  "./config/env.js" ;
import {db} from "./config/db.js" ;
import { favoritesTables } from "./db/schema.js"; 
const app = express() ;
const PORT = ENV.PORT || 8000 ;
app.use(express.json()) ;
app.get( "/api/health"  , (req , res) =>{
        res.status(200).json({success:true}) ;
}) ;

app.post( "/api/favorites" , async(req , res)=>{
        try{
                const{userId , recipeId , title , image , cookTime , servings } = req.body ;
                if(!userId || !recipeId || !title){
                        return res.status(400).json({error : "Missing fields required"}) ;
                }
                const newFavorite  = await db.insert(favoritesTables).values({
                        userId , recipeId , title , image , cookTime , servings
                }).returning() ;

                res.status(201).json(newFavorite[0]) ;
        }
        catch(error){
                console.log("Error in adding " , error) ;
                res.status(500).json({error: " Something went wrong"}) ;

        }
}) ;

// delete end point 
app.delete("/api/favorites/delete/:userId/:recipeId" , async(req , res) =>{
        try{
                const{ userId , recipeId}  = req.params ;

                await db
                .delete(favoritesTables)
                .where(
                        and(eq(favoritesTables.userId , userId)  , eq(favoritesTables.recipeId , recipeId ,parseInt(recipeId)) )
                ) ;
                res.status(200).json({message: "removed successfully "}) ;
        }

        catch(error){
                console.log("Error deleting your favourite recipe" , error) ;
                res.status(500).json({error  : "Something went wrong"}) ;
        }
}) ;


// fetching the request
 app.get("/api/favorites/:userId" , async(req , res) =>{
        try{
                const userId = req.params ;
                const userFavorites = await db.select().from(favoritesTables).where(eq(favoritesTables.userId), userId) ;
                res.status(200).json(userFavorites) ;
        }       
        catch(error){
                console.log("Error in fetching the recipe" ,error) ;
                res.status(500).json({error : "Internal server error"}) ;
        }
 } 

 ) ;

 


app.listen(PORT , () =>{
        console.log("Server is ohhhhhhhhhhhh running on port 5001") ;
})

















