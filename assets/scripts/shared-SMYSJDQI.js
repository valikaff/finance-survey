var getTranslations = async () => {
    const urlParams = window.location.search;
    const paramLang = new URLSearchParams(urlParams).get("lang");
    const userBrowserLang = new Intl.Locale(navigator.language).language;
    const lang = paramLang || userBrowserLang || "en";
    return await (await fetch(`./locales/${lang}.json`)).json();
};

export {
    getTranslations
};