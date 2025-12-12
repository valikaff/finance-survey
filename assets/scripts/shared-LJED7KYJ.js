var url = new URL(window.location.href);
var URL_PARAM = {
    p4: url.searchParams.get("p4" /* p4 */ ) ?? "",
    pz: url.searchParams.get("pz" /* pz */ ) ?? "",
    tb: url.searchParams.get("tb" /* tb */ ) ?? "",
    tb_reverse: url.searchParams.get("tb_reverse" /* tb_reverse */ ) ?? "",
    ae: url.searchParams.get("ae" /* ae */ ) ?? "",
    z: url.searchParams.get("z" /* z */ ) ?? "",
    var: url.searchParams.get("var" /* var */ ) ?? "",
    var_1: url.searchParams.get("var_1" /* var_1 */ ) ?? "",
    var_2: url.searchParams.get("var_2" /* var_2 */ ) ?? "",
    var_3: url.searchParams.get("var_3" /* var_3 */ ) ?? "",
    b: url.searchParams.get("b" /* b */ ) ?? "",
    campaignid: url.searchParams.get("campaignid" /* campaignid */ ) ?? "",
    abtest: url.searchParams.get("abtest" /* abtest */ ) ?? "",
    rhd: url.searchParams.get("rhd" /* rhd */ ) ?? "1",
    s: url.searchParams.get("s" /* s */ ) ?? "",
    ymid: url.searchParams.get("ymid" /* ymid */ ) ?? "",
    wua: url.searchParams.get("wua" /* wua */ ) ?? "",
    use_full_list_or_browsers: url.searchParams.get("use_full_list_or_browsers" /* use_full_list_or_browsers */ ) ?? "",
    cid: url.searchParams.get("cid" /* cid */ ) ?? "",
    geo: url.searchParams.get("geo" /* geo */ ) ?? ""
};
var fetchPlatformVersion = async () => {
    const navigatorWithUAData = navigator;
    if (!navigatorWithUAData.userAgentData) {
        return "";
    }
    try {
        const hints = ["platformVersion"];
        return (await navigatorWithUAData.userAgentData.getHighEntropyValues(hints)).platformVersion;
    } catch (error) {
        console.error("Error retrieving data from navigator.userAgentData", error);
        return "";
    }
};
var getBrowserTimezone = () => {
    if (typeof Intl !== "undefined" && typeof Intl.DateTimeFormat === "function") {
        const {
            timeZone
        } = Intl.DateTimeFormat().resolvedOptions();
        if (timeZone) {
            return timeZone;
        }
    }
    return "";
};
var getBrowserTimeOffset = () => {
    return ( /* @__PURE__ */ new Date()).getTimezoneOffset();
};
var setSearchParams = (params) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
        if (!params[key]) return;
        searchParams.set(key, params[key]);
    });
    return searchParams;
};
var urlParamsUpdateUseParamMapping = ({
    passParamToParams,
    searchParams,
    windowUrl
}) => {
    passParamToParams.forEach((mapping) => {
        const {
            from,
            to,
            joinWith
        } = mapping;
        const value = Array.isArray(from) ? from.map((param) => windowUrl.searchParams.get(param) ?? "").filter(Boolean).join(joinWith ?? "") : windowUrl.searchParams.get(from) ?? "";
        if (value) {
            to.forEach((param) => {
                searchParams.set(param, value);
            });
        }
    });
    return searchParams;
};
var createURLSearchParams = async ({
    zone,
    passParamToParams
}) => {
    var _a;
    const browserTimezone = getBrowserTimezone();
    const browserTimeOffset = getBrowserTimeOffset();
    const dataVer = ((_a = document.querySelector("html")) == null ? void 0 : _a.getAttribute("data-version")) || "";
    const landMetadata = JSON.stringify({
        dataVer
    });
    const cmeta = btoa(landMetadata);
    const optionallySearchParams = {
        ["pz" /* pz */ ]: URL_PARAM.pz,
        ["tb" /* tb */ ]: URL_PARAM.tb,
        ["tb_reverse" /* tb_reverse */ ]: URL_PARAM.tb_reverse,
        ["ae" /* ae */ ]: URL_PARAM.ae
    };
    // Get all parameters from current URL (always use fresh values from current page)
    const currentUrl = new URL(window.location.href);
    const allUrlParams = {};
    currentUrl.searchParams.forEach((value, key) => {
        // Skip 'step' parameter as it's only for internal navigation
        if (key !== "step") {
            allUrlParams[key] = value;
        }
    });
    
    // Start with all URL parameters from current page
    const defaultParams = { ...allUrlParams };
    
    // Apply fallback logic for important parameters
    // p4: use from URL or fallback
    if (!defaultParams["p4" /* p4 */ ] && (URL_PARAM.p4 || URL_PARAM.var)) {
        defaultParams["p4" /* p4 */ ] = URL_PARAM.p4 ?? URL_PARAM.var;
    }
    // ymid: always set from fallback (as in original - always uses var_1 ?? var, not from URL)
    if (URL_PARAM.var_1 || URL_PARAM.var) {
        defaultParams["ymid" /* ymid */ ] = URL_PARAM.var_1 ?? URL_PARAM.var;
    }
    // var: use from URL or fallback
    if (!defaultParams["var" /* var */ ] && (URL_PARAM.var_2 || URL_PARAM.z)) {
        defaultParams["var" /* var */ ] = URL_PARAM.var_2 ?? URL_PARAM.z;
    }
    if (!defaultParams["var_3" /* var_3 */ ] && URL_PARAM.var_3) {
        defaultParams["var_3" /* var_3 */ ] = URL_PARAM.var_3;
    }
    if (!defaultParams["b" /* b */ ] && URL_PARAM.b) {
        defaultParams["b" /* b */ ] = URL_PARAM.b;
    }
    if (!defaultParams["campaignid" /* campaignid */ ] && URL_PARAM.campaignid) {
        defaultParams["campaignid" /* campaignid */ ] = URL_PARAM.campaignid;
    }
    if (!defaultParams["click_id" /* click_id */ ] && URL_PARAM.s) {
        defaultParams["click_id" /* click_id */ ] = URL_PARAM.s;
    }
    if (!defaultParams["ab2r" /* ab2r */ ] && URL_PARAM.abtest !== undefined) {
        defaultParams["ab2r" /* ab2r */ ] = URL_PARAM.abtest;
    }
    if (!defaultParams["rhd" /* rhd */ ] && URL_PARAM.rhd) {
        defaultParams["rhd" /* rhd */ ] = URL_PARAM.rhd;
    }
    if (!defaultParams["z" /* z */ ] && URL_PARAM.z) {
        defaultParams["z" /* z */ ] = URL_PARAM.z;
    }
    if (!defaultParams["wua" /* wua */ ] && URL_PARAM.wua) {
        defaultParams["wua" /* wua */ ] = URL_PARAM.wua;
    }
    if (!defaultParams["cid" /* cid */ ] && URL_PARAM.cid) {
        defaultParams["cid" /* cid */ ] = URL_PARAM.cid;
    }
    if (!defaultParams["geo" /* geo */ ] && URL_PARAM.geo) {
        defaultParams["geo" /* geo */ ] = URL_PARAM.geo;
    }
    
    // Technical parameters are always generated fresh (override URL values)
    defaultParams["os_version" /* os_version */ ] = await fetchPlatformVersion();
    defaultParams["btz" /* btz */ ] = browserTimezone.toString();
    defaultParams["bto" /* bto */ ] = browserTimeOffset.toString();
    defaultParams["cmeta" /* cmeta */ ] = cmeta;
    
    if (zone) defaultParams["zoneid" /* zoneid */ ] = zone;
    Object.entries(optionallySearchParams).forEach(([key, value]) => {
        if (value) defaultParams[key] = value;
    });
    const searchParams = setSearchParams(defaultParams);
    return passParamToParams ? urlParamsUpdateUseParamMapping({
        passParamToParams,
        searchParams,
        windowUrl: new URL(window.location.href)
    }) : searchParams;
};
var getUrl = async (zone, domain, passParamToParams) => {
    // Clean domain: remove pathname, search params, and hash
    let cleanDomain;
    try {
        // Try to parse as URL
        const domainUrl = new URL(domain);
        cleanDomain = `${domainUrl.protocol}//${domainUrl.host}`;
    } catch (e) {
        // If parsing fails, try manual cleaning
        // Remove protocol if present, then extract host
        let hostPart = domain.replace(/^https?:\/\//, '').split('/')[0].split('?')[0].split('#')[0];
        // Determine protocol from original domain or default to https
        const protocol = domain.startsWith('http://') ? 'http://' : 'https://';
        cleanDomain = protocol + hostPart;
    }
    
    // Build clean URL with afu.php path
    const url2 = new URL(`${cleanDomain}/afu.php`);
    const searchParams = await createURLSearchParams({
        zone: zone.toString(),
        passParamToParams
    });
    const urlWithParams = decodeURIComponent(`${url2.toString()}?${searchParams.toString()}`);
    console.log("URL generated:", urlWithParams);
    return urlWithParams;
};
var checkConfig = () => {
    if (typeof APP_CONFIG === "undefined") {
        document.body.innerHTML = `
            <p style="">LANDING CAN'T BE RENDERED. \u{1F514} PLEASE ADD CODE(you can find an object with options in your Propush account) FROM PROPUSH TO HEAD TAG.</p>
        `;
        return false;
    }
    return true;
};
var tabs = ["currentTab", "newTab"];
var exitTypes = ["zoneId", "url"];
var parseConfig = (rawAppConfig) => {
    const isConfigExist = checkConfig();
    if (!isConfigExist) return void 0;
    const {
        domain,
        videoCount,
        prizeName,
        prizeImg,
        ...exits
    } = rawAppConfig;
    const parsedExits = Object.entries(exits).reduce(
        (acc, [key, value]) => {
            const [exitName, tabOrType, type] = key.split("_");
            if (exitName) {
                if (tabs.includes(tabOrType)) {
                    const tab = tabOrType;
                    if (exitTypes.includes(type)) {
                        acc[exitName] = {
                            ...acc[exitName],
                            [tab]: {
                                domain: type === "zoneId" ? domain : void 0,
                                [type]: value
                            }
                        };
                    }
                } else if (exitTypes.includes(tabOrType)) {
                    const type2 = tabOrType;
                    acc[exitName] = {
                        ...acc[exitName],
                        currentTab: {
                            domain: type2 === "zoneId" ? domain : void 0,
                            [type2]: value
                        }
                    };
                } else {
                    const someSetting = tabOrType;
                    acc[exitName] = {
                        ...acc[exitName],
                        [someSetting]: value
                    };
                }
            }
            return acc;
        }, {}
    );
    return {
        videoCount,
        prizeName,
        prizeImg,
        ...parsedExits
    };
};

export {
    URL_PARAM,
    createURLSearchParams,
    getUrl,
    parseConfig
};