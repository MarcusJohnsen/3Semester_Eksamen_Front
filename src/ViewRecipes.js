import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function AllRecipes() {
    const [allRecipes, setRecipes] = useState([]);
    const [editRecipe, setEditedRecipe] = useState({});

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    function fetchAllRecipes() {
        facade.fetchAllRecipes("/api/rec/all", setRecipes);
    }

    const editRecipes = (id) => {
        let recipe = allRecipes.filter((recipe) => recipe.id === id)[0];
        setEditedRecipe(recipe);
    };

    const deleteRecipe = (id) => {
        facade.deleteRecipe(id, URL, setRecipes);
    };

    return (
        <div>
            <h1>AllRecipes</h1>
            <hr />
            <br />
            <br />
            <table border="1" width="50%">
                <thead>
                    <tr>
                        <th width="50px">ID</th>
                        <th width="50px">Name</th>
                        <th width="50px">Prep time</th>
                        <th width="150px">Directions</th>
                    </tr>
                </thead>
                <tbody>
                    {allRecipes.map((recipe) => {
                        if (facade.isAdmin() === true) {
                            return (
                                <tr key={recipe.id}>
                                    <td>{recipe.id}</td>
                                    <td>{recipe.recipeName}</td>
                                    <td>{recipe.preparationTime}</td>
                                    <td>{recipe.directions}</td>
                                    <td align="center">
                                        <button onClick={() => editRecipes(recipe.id)} id="tableBtn">Edit Recipe</button>
                                    </td>
                                    <td align="center">
                                        <button onClick={() => deleteRecipe(recipe.id)} id="tableBtn">Delete Recipe</button>
                                    </td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={recipe.id}>
                                    <td>{recipe.id}</td>
                                    <td>{recipe.recipeName}</td>
                                    <td>{recipe.preparationTime}</td>
                                    <td>{recipe.directions}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
            <button onClick={fetchAllRecipes} id="btn">Press to fetch all recipies again!</button>
            {editRecipe.id && (
                <EditRecipe setEditedRecipe={setEditedRecipe} editRecipe={editRecipe} />
            )}
        </div>
    );
}

function EditRecipe({ setEditedRecipe, editRecipe }) {
    const [recipe, setRecipe] = useState(editRecipe);

    useEffect(() => {
        setRecipe(editRecipe);
    }, [editRecipe]);

    function submitHandler(event) {
        event.preventDefault();
        facade.editRecipe(recipe);
        setEditedRecipe({});
    }

    function changeHandlerRecName(event) {
        let str = event.target.value;
        setRecipe({
            ...recipe, recipeName: str,
        });
    }
    function changeHandlerRecPrepTime(event) {
        let str = event.target.value;
        setRecipe({
            ...recipe, preparationTime: str,
        });
    }
    function changeHandlerDirections(event) {
        let str = event.target.value;
        setRecipe({
            ...recipe, directions: str
        });
    }

    return (
        <>
            <br />
          Recipe ID: {editRecipe.id}
            <form onSubmit={submitHandler}>
                <input type="text" value={recipe.recipeName} onChange={changeHandlerRecName}
                    placeholder="New recipe name" style={{ width: "200px" }} /><br />
                <br />
                <input type="text" value={recipe.preparationTime} onChange={changeHandlerRecPrepTime}
                    placeholder="New Recipe preparation time" style={{ width: "200px" }} /><br />
                <br />
                <input type="text" value={recipe.directions} onChange={changeHandlerDirections}
                    placeholder="New recipe description" style={{ width: "400px" }} /><br />
                <br />
                <input type="submit" value="Submit Edited Recipe" />
            </form>
        </>
    );
}