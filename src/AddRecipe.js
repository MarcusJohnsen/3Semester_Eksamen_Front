import React, { useState } from "react";
import settingUrl from "./settings";

export function AddRecipe() {
  const URL = settingUrl.addRecipe();
  const [recipeName, setName] = useState("");
  const [recipePrepTime, setPrepTime] = useState("");
  const [recipeDescription, setDescription] = useState("");

  function PostAddRecipeApi(recipeName, recipePrepTime, recipeDescription) {
    let input = {
      recipeName: recipeName,
      preparationTime: recipePrepTime,
      directions: recipeDescription,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(input),
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function submitHandler(event) {
    event.preventDefault();
    PostAddRecipeApi(recipeName, recipePrepTime, recipeDescription);
    setName("");
    setPrepTime("");
    setDescription("");
  }

  function changeHandlerRecName(event) {
    let str = event.target.value;
    setName(str);
  }

  function changeHandlerRecPrepTime(event) {
    let str = event.target.value;
    setPrepTime(str);
  }

  function changeHandlerDirections(event) {
    let str = event.target.value;
    setDescription(str);
  }

  return (
    <div>
      <h1>Add your Recipe here</h1>
      <hr />
      <form onSubmit={submitHandler}>
        <input type="text" value={recipeName} onChange={changeHandlerRecName}
          placeholder="Recipe name" style={{ width: "200px" }} /><br />

        <br />
        <input type="text" value={recipePrepTime} onChange={changeHandlerRecPrepTime}
          placeholder="Recipe preparation time" style={{ width: "200px" }} /><br />
        <br />
        <input type="text" value={recipeDescription} onChange={changeHandlerDirections}
          placeholder="Recipe description" style={{ width: "400px" }} /><br />
        <br />
        <input type="submit" value="Add Recipe" />
      </form>
    </div>
  );
}