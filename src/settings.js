function URLS() {
  function backendURL() {
    //const URL = "https://marcuscph.company/Semester3-Eksamen-Marcus";
    const URL = "http://localhost:8080/startcode";
    return URL;
  }

  function addRecipe() {
    const URL = backendURL() + "/api/rec";
    return URL;
  }

  function viewRecipes() {
    const URL = backendURL() + "/api/rec/all";
    return URL;
  }

  return {
    backendURL,
    addRecipe,
    viewRecipes,
  };
}

const settingUrl = URLS();

export default settingUrl;
