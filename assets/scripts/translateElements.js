var getCurrentLanguage = () => {
    const urlParams = window.location.search;
    const paramLang = new URLSearchParams(urlParams).get("lang");
    const userBrowserLang = new Intl.Locale(navigator.language).language;
    return paramLang || userBrowserLang || "en";
};
var translateElements = async (macroses) => {
    const lang = getCurrentLanguage();
    document.documentElement.setAttribute("lang", lang);
    if (["ar", "he", "fa", "ur", "az", "ku", "ff", "dv"].includes(lang)) {
        document.documentElement.setAttribute("dir", "rtl");
    }
    const translations = await (await fetch(`./locales/${lang}.json`)).json();
    const nonTranslatedKeys = [];
    Object.entries(translations).forEach((translation) => {
        const key = translation[0];
        let value = translation[1];
        const macros = macroses == null ? void 0 : macroses[key];
        value = macros ? value.replaceAll(macros.macros, macros.macrosValue) : value;
        const elementToTranslate = document.querySelectorAll(
            `[data-translate="${key}"]`
        );
        if (elementToTranslate == null ? void 0 : elementToTranslate.length) {
            elementToTranslate.forEach((element) => {
                if (element) {
                    if (!element.childNodes.length) element.textContent = value;
                    element.childNodes.forEach((node) => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            node.nodeValue = value;
                        }
                    });
                }
            });
            return;
        }
        nonTranslatedKeys.push(key);
    });
    if (nonTranslatedKeys.length) {
        console.warn(
            `Some keys from locales folder weren't used for translantion when loading the landing page for the first time:`,
            nonTranslatedKeys.join(", ")
        );
    }
};
translateElements();