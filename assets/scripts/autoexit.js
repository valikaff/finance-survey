import {
    makeRedirect
} from "./shared-JTBNAF6N.js";
import {
    parseConfig
} from "./shared-LJED7KYJ.js";
var autoexit = async () => {
    const config = parseConfig(APP_CONFIG);
    if (!config) return;
    const autoexit2 = config == null ? void 0 : config.autoexit;
    if (autoexit2 == null ? void 0 : autoexit2.currentTab) {
        const timeToRedirect = autoexit2.timeToRedirect ?? 90;
        let shouldRedirect = true;
        let timerFinished = false;
        const checkVisibilty = function() {
            if (document.visibilityState === "visible") {
                if (timerFinished) makeRedirect(config, "autoexit");
            } else {
                shouldRedirect = false;
            }
        };
        const setAutoexit = () => {
            document.addEventListener("visibilitychange", checkVisibilty);
            return setTimeout(() => {
                timerFinished = true;
                if (shouldRedirect) makeRedirect(config, "autoexit");
            }, timeToRedirect * 1e3);
        };
        let timeout = setAutoexit();
        document.addEventListener("click", () => {
            clearTimeout(timeout);
            document.removeEventListener("visibilitychange", checkVisibilty);
            timeout = setAutoexit();
        });
    }
};
autoexit();