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
    const defaultParams = {
        ["p4" /* p4 */ ]: URL_PARAM.p4 ?? URL_PARAM.var,
        ["ymid" /* ymid */ ]: URL_PARAM.var_1 ?? URL_PARAM.var,
        ["var" /* var */ ]: URL_PARAM.var_2 ?? URL_PARAM.z,
        ["var_3" /* var_3 */ ]: URL_PARAM.var_3,
        ["b" /* b */ ]: URL_PARAM.b,
        ["campaignid" /* campaignid */ ]: URL_PARAM.campaignid,
        ["click_id" /* click_id */ ]: URL_PARAM.s,
        ["ab2r" /* ab2r */ ]: URL_PARAM.abtest,
        ["rhd" /* rhd */ ]: URL_PARAM.rhd,
        ["z" /* z */ ]: URL_PARAM.z,
        ["wua" /* wua */ ]: URL_PARAM.wua,
        ["cid" /* cid */ ]: URL_PARAM.cid,
        ["geo" /* geo */ ]: URL_PARAM.geo,
        ["os_version" /* os_version */ ]: await fetchPlatformVersion(),
        ["btz" /* btz */ ]: browserTimezone.toString(),
        ["bto" /* bto */ ]: browserTimeOffset.toString(),
        ["cmeta" /* cmeta */ ]: cmeta
    };
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
    // Clean domain: remove pathname and search params, keep only origin
    const domainUrl = new URL(domain);
    const cleanDomain = `${domainUrl.protocol}//${domainUrl.host}`;
    
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