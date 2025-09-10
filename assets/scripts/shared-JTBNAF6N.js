import {
    createURLSearchParams,
    getUrl
} from "./shared-LJED7KYJ.js";
var pushStateToHistory = (url, times) => {
    try {
        for (let i = 0; i < times; i += 1) {
            window.history.pushState(null, "Please wait...", url);
        }
        console.log(`Back initializated ${times} times with ${url}`);
    } catch (error) {
        console.error("Failed to push state, error:", error);
    }
};
var initBackIfNeeded = async (config) => {
    const back = config == null ? void 0 : config.back;
    if (back) {
        const {
            currentTab
        } = back;
        if (currentTab) {
            const historyTimeAmount = back.count ?? 3;
            const {
                origin,
                pathname
            } = window.location;
            let base = `${origin}${pathname}`;
            if (base.includes("index.html")) {
                base = base.split("/index.html")[0];
            } else if (base.endsWith("/")) {
                base = base.substring(0, base.length - 1);
            }
            const backUrlBase = new URL(`${base}/back/index.html`);
            const searchParams = await createURLSearchParams({
                zone: currentTab.zoneId
            });
            if (currentTab.url) searchParams.set("url", currentTab.url);
            else if (currentTab.domain && currentTab.zoneId) {
                searchParams.set("z", currentTab.zoneId);
                searchParams.set("domain", currentTab.domain);
            }
            const backUrl = decodeURIComponent(`${backUrlBase.toString()}?${searchParams.toString()}`);
            pushStateToHistory(backUrl, historyTimeAmount);
        }
    }
};
var openCurrentAndNewTab = (currentTabUrl, newTabUrl) => {
    if (newTabUrl) {
        const newTab = window.open(newTabUrl, "_blank");
        if (newTab) {
            newTab.opener = null;
            if (currentTabUrl) {
                window.location.replace(currentTabUrl);
                return;
            }
        }
    } else if (currentTabUrl) {
        window.location.replace(currentTabUrl);
    }
};
var Redirect = ({
    url
}) => {
    window.location.replace(url);
};
var exitError = (exitData, exitName) => {
    console.error(
        `${exitName || "Some exit"} was supposed to work, but some data about this type of exit was missed`,
        exitData
    );
};
var makeRedirect = async (config, exitName, shouldInitBack = true) => {
    const {
        currentTab: exitData
    } = config[exitName];
    console.log(`${exitName} worked`, config);
    if (exitData) {
        let url;
        if (exitData.zoneId && exitData.domain) {
            url = await getUrl(exitData.zoneId, exitData.domain);
            if (shouldInitBack) initBackIfNeeded(config);
            return Redirect({
                url
            });
        }
        if (exitData.url) {
            url = exitData.url;
            if (shouldInitBack) initBackIfNeeded(config);
            return Redirect({
                url
            });
        }
    }
    exitError(exitData, exitName);
};
var makeExit = async (config, exitName) => {
    const exitData = config[exitName];
    console.log(`${exitName} worked`, config);
    if (exitData) {
        const {
            currentTab,
            newTab
        } = exitData;
        let currentTabUrl;
        if (currentTab) {
            if (currentTab.zoneId && currentTab.domain) {
                currentTabUrl = await getUrl(currentTab.zoneId, currentTab.domain);
            } else if (currentTab.url) {
                currentTabUrl = currentTab.url;
            } else {
                exitError(exitData, exitName);
            }
        }
        let newTabUrl;
        if (newTab) {
            if (newTab.zoneId && newTab.domain) {
                newTabUrl = await getUrl(newTab.zoneId, newTab.domain);
            } else if (newTab.url) {
                newTabUrl = newTab.url;
            } else {
                exitError(exitData, exitName);
            }
        }
        initBackIfNeeded(config);
        openCurrentAndNewTab(currentTabUrl, newTabUrl);
        return;
    }
    exitError(exitData, exitName);
};

export {
    initBackIfNeeded,
    makeRedirect,
    makeExit
};