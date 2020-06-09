function URLS() {
  function backendURL() {
    const URL = "https://marcuscph.company/CA3-Gruppe3-Marcus";
    return URL;
  }

  function externalApi() {
    const URL =
      "https://marcuscph.company/CA3-Gruppe3-Marcus/api/info/external";
    return URL;
  }

  return {
    backendURL,
    externalApi,
  };
}

const settingUrl = URLS();

export default settingUrl;
