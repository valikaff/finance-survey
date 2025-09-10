import {
    URL_PARAM,
    createURLSearchParams,
    getUrl,
    parseConfig
} from "./shared-LJED7KYJ.js";
var createPushParams = async (pushZone) => {
    const searchParams = await createURLSearchParams({
        zone: pushZone.toString()
    });
    if (URL_PARAM.ymid) {
        searchParams.set("var_2" /* var_2 */ , URL_PARAM.ymid);
    }
    if (pushZone) {
        searchParams.set("z" /* z */ , pushZone);
    }
    if (URL_PARAM.wua) {
        searchParams.set("wua" /* wua */ , URL_PARAM.wua);
    }
    searchParams.set("sw", "./sw.js");
    return searchParams;
};
var setUpPushScript = async ({
    outDomain,
    pushDomain,
    pushZone,
    allowedNew,
    allowedPop,
    subscribedNew,
    subscribedPop
}) => {
    const s = document.createElement("script");
    const searchParams = await createPushParams(pushZone);
    s.src = `https://${pushDomain}/pns.js?${searchParams.toString()}`;
    s.onload = async (result) => {
        switch (result) {
            case "onPermissionDefault":
                break;
            case "onPermissionAllowed":
                if (allowedNew) {
                    window.open(await getUrl(allowedNew, outDomain), "_blank");
                }
                if (allowedPop) {
                    window.location.href = await getUrl(allowedPop, outDomain);
                }
                break;
            case "onPermissionDenied":
                break;
            case "onAlreadySubscribed":
                if (subscribedNew) {
                    window.open(await getUrl(subscribedNew, outDomain), "_blank");
                }
                if (subscribedPop) {
                    window.location.href = await getUrl(subscribedPop, outDomain);
                }
                break;
            case "onNotificationUnsupported":
                break;
            default:
                break;
        }
    };
    document.head.appendChild(s);
};
var initPushScript = () => {
    var _a, _b;
    const config = parseConfig(APP_CONFIG);
    if (!config) return;
    const push = config.push;
    if (!((_a = push == null ? void 0 : push.currentTab) == null ? void 0 : _a.domain) || !((_b = push == null ? void 0 : push.currentTab) == null ? void 0 : _b.zoneId) || false) return;
    setUpPushScript({
        outDomain: push.currentTab.domain,
        pushDomain: "vayxi.com",
        pushZone: push.currentTab.zoneId
    });
};
initPushScript();