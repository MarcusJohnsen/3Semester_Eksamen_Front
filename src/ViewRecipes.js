import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function AllRecipes() {
    const [allRecipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    function fetchAllRecipes() {
        facade.fetchAllRecipes("/api/rec/all", setRecipes);
    }

    console.log(allRecipes);


    return (
        <div>
            <h1>AllRecipes</h1>
            <hr />
            <br />
            <br />
            <table border="1" width="50%">
                <thead>
                    <tr>
                        <th width="150px">Name</th>
                        <th width="50px">Prep time</th>
                        <th width="50px">Directions</th>
                    </tr>
                </thead>
                <tbody>
                    {allRecipes.map((recipe) => {
                        return (
                            <tr key={recipe.id}>
                                <td>{recipe.recipeName}</td>
                                <td>{recipe.preparationTime}</td>
                                <td>{recipe.directions}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
