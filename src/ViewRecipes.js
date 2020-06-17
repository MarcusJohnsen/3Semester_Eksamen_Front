import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function AllRecipes() {
    const [allRecipes, setRecipes] = useState([]);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState();
    const [editRecipe, setEditedRecipe] = useState({});

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    function fetchAllRecipes() {
        facade.fetchAllRecipes("/api/rec/all", setRecipes);
    }

    function fetchRecipeByID() {
        facade.fetchRecipeByID("/api/rec/allByID/", setRecipes);
    }

    const editRecipes = (id) => {
        let recipe = allRecipes.filter((recipe) => recipe.id === id)[0];
        setEditedRecipe(recipe);
    };

    const deleteRecipe = (id) => {
        facade.deleteRecipe(id, URL, setRecipes);
    };

    function sortByNewest() {
        let sortedRecipesByID = allRecipes.sort((rec1, rec2) => {
            return rec2.id - rec1.id;
        });
        setRecipes(sortedRecipesByID);
        setUpdate(!update);
    }

    function sortByOldest() {
        let sortedRecipesByID = allRecipes.sort((rec1, rec2) => {
            return rec1.id - rec2.id;
        });
        setRecipes(sortedRecipesByID);
        setUpdate(!update);
    }

    function addToWeeklyMenu(id) {
        let recipe = allRecipes.filter((recipe) => recipe.id === id)[0];
        facade.addFavoriteJoke(id);
    }

    function searchRecipes(event) {
        facade.fetchAllRecipes("/api/rec/allByName/" + search, setRecipes);
    }

    function changeHandler(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            <h1>AllRecipes</h1>
            <hr />
            <p>
                Search for recipes by name:
                <input type="text" placeholder="Search recipe on name"
                    value={search} onChange={changeHandler}
                />
                <button onClick={searchRecipes}>search</button>
            </p>
            <br />
            <br />
            <button onClick={sortByNewest} id="sortNew">
                Sort by Newest
            </button>
            <button onClick={sortByOldest} id="sortOld">
                Sort by Oldest
            </button>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th width="50px">ID</th>
                        <th width="200px">Name</th>
                        <th width="100px">Prep time</th>
                        <th width="567px">Directions</th>
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
                                    <td align="center">
                                        <button onClick={() => addToWeeklyMenu(recipe.id)}
                                            id="weeklyBtn">Add to weekly menu</button>
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