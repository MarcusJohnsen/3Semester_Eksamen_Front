import settingUrl from "./settings";

const URL = settingUrl.backendURL(); //Change this to your own URL

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loginRoles");
  }
  const setRoles = (roles) => {
    localStorage.setItem('loginRoles', roles)
  }
  const getRoles = () => {
    return localStorage.getItem('loginRoles')
  }
  const isAdmin = () => {
    const isAdmin = String(getRoles()).includes("admin");
    return isAdmin;
  }
  const isUser = () => {
    const isAdmin = String(getRoles()).includes("user");
    return isAdmin;
  }

  const login = (user, password) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => { setToken(res.token); console.log(res); setRoles(res.roles) })
  }
  const fetchUserData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
  }
  const fetchAdminData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
  }
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const fetchAllRecipes = (fetchURL, setRecipeList) => {
    let options = makeOptions("GET", true);
    fetch(URL + fetchURL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.recipeList ? setRecipeList(data.recipeList) : setRecipeList([]);
      });
  };

  const editRecipe = (body) => {
    let options = makeOptions("PUT", true, body);
    fetch(URL + "/api/rec/edit", options)
      .then(handleHttpErrors)
      .then((data) => {
        console.log(data);
      });
  };

  const deleteRecipe = (id, fetchURL, setRecipeList) => {
    let deleteURL = isAdmin() ? "/api/rec/" : "";
    let options = makeOptions("DELETE", true);
    fetch(URL + deleteURL + id, options)
      .then(console.log("Deletion completed on recipe with ID: " + id))
      .then(setTimeout(() => fetchAllRecipes(fetchURL, setRecipeList), 1000));
  };

  const fetchRecipeByID = (fetchURL, setRecipeList) => {
    let options = makeOptions("GET", true);
    fetch(URL + fetchURL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.recipeList ? setRecipeList(data.recipeList) : setRecipeList([]);
      });
  };

  const fetchRecipesByName = (fetchURL, setRecipeList) => {
    let options = makeOptions("GET", true);
    fetch(URL + fetchURL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.recipeList ? setRecipeList(data.recipeList) : setRecipeList([]);
      });
  };

  const addRecipeToWeeklyMenu = (id) => {
    let option = facade.makeOptions("PUT", true);
    fetch(settingUrl.addRecipe() + "/" + id, option)
      .then(handleHttpErrors)
      .then((data) => {
        console.log(data);
      });
  }

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchUserData,
    fetchAdminData,
    isAdmin,
    isUser,
    fetchAllRecipes,
    editRecipe,
    deleteRecipe,
    addRecipeToWeeklyMenu
  }
}
const facade = apiFacade();
export default facade;