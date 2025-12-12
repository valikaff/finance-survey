import { getTranslations } from "./shared-SMYSJDQI.js";
import { makeExit } from "./shared-JTBNAF6N.js";
import { createURLSearchParams, parseConfig } from "./shared-LJED7KYJ.js";
var CURRENT_QUESTION_KEY = "step";

function removeUrlParameter(paramKey) {
    const url = window.location.href;
    const r = new URL(url);
    r.searchParams.delete(paramKey);
    const newUrl = r.href;
    window.history.replaceState(window.history.state, "", newUrl);
}
var getCurrentStepFromURL = (key = CURRENT_QUESTION_KEY, shouldDeleteKey = true) => {
    const url = new URL(window.location.href);
    const step = url.searchParams.get(key);
    if (shouldDeleteKey) removeUrlParameter(key);
    return step;
};
var getTranslation = (translations, key, defaultValue = "No data") => {
    if (!key || !translations[key]) {
        console.warn(`Translation for key "${key}" not found`);
        return defaultValue;
    }
    return translations[key];
};
var tabUnderClick = async (config, newTabParamValue, key = CURRENT_QUESTION_KEY) => {
    // Build URL with only tracking parameters (same as buildStepUrl logic)
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams();
    
    // Add tracking parameters from current URL
    TRACKING_PARAMS.forEach(param => {
        const value = currentUrl.searchParams.get(param);
        if (value) {
            params.set(param, value);
        }
    });
    
    // Add step parameter
    params.set(key, newTabParamValue.toString());
    
    const newTabUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    makeExit({
            ...config,
            tabUnderClick: {
                ...config.tabUnderClick,
                newTab: {
                    url: newTabUrl
                }
            }
        },
        "tabUnderClick"
    );
};
var STEP_DOMAIN_TIMEOUT_MS = 2500;
var shouldRedirectByStep = (actionType) => ["nextStep", "progress", "tabUnderClick"].includes(actionType);
var fetchStepDomain = async (stepNumber) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), STEP_DOMAIN_TIMEOUT_MS);
    try {
        const response = await fetch(`/api/step-domain?step=${stepNumber}`, {
            signal: controller.signal
        });
        if (!response.ok) {
            throw new Error(`Step domain request failed with status ${response.status}`);
        }
        const data = await response.json();
        return (data == null ? void 0 : data.domain) || null;
    } catch (error) {
        console.warn("[step-domain] unable to fetch domain", error);
        return null;
    } finally {
        clearTimeout(timer);
    }
};
// Tracking parameters (user macros) that should be preserved between steps
const TRACKING_PARAMS = [
    "p4", "pz", "tb", "tb_reverse", "ae", "z", "var", "var_1", "var_2", "var_3",
    "b", "campaignid", "abtest", "s", "ymid", "wua", "use_full_list_or_browsers",
    "cid", "geo"
];

// Technical parameters that should NOT be passed between steps (only on exits)
const TECHNICAL_PARAMS = ["rhd", "os_version", "btz", "bto", "cmeta"];

var buildStepUrl = async (stepNumber, domain) => {
    const baseDomain = domain || window.location.origin;
    const target = new URL(baseDomain);
    if (!target.pathname) target.pathname = "/";
    
    // Extract only tracking parameters from current URL
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams();
    
    // Add tracking parameters from current URL
    TRACKING_PARAMS.forEach(param => {
        const value = currentUrl.searchParams.get(param);
        if (value) {
            params.set(param, value);
        }
    });
    
    // Add step parameter
    params.set(CURRENT_QUESTION_KEY, stepNumber.toString());
    
    target.search = params.toString();
    return target.toString();
};
var redirectToStepDomain = async ({
    stepNumber,
    actionType,
    config,
    fallbackNextStep
}) => {
    if (actionType === "tabUnderClick") {
        // For tabUnderClick: open zone in current tab, new step in new tab
        try {
            const domain = await fetchStepDomain(stepNumber);
            if (!domain) {
                // No domain found, fallback to old behavior
                console.warn(`[step-domain] No domain found for step ${stepNumber}, using fallback`);
                await tabUnderClick(config, stepNumber);
                return;
            }
            console.log(`[step-domain] Got domain for step ${stepNumber}:`, domain);
            const newStepUrl = await buildStepUrl(stepNumber, domain);
            console.log(`[step-domain] Built new step URL:`, newStepUrl);
            
            // Use makeExit with zone in currentTab (or newTab if no currentTab) and new step in newTab
            const tabUnderClickConfig = config.tabUnderClick || {};
            console.log(`[step-domain] tabUnderClick config:`, tabUnderClickConfig);
            const exitConfig = {
                ...config,
                tabUnderClick: {
                    // Keep existing currentTab (zone) for current tab
                    currentTab: tabUnderClickConfig.currentTab,
                    // Put new step URL in newTab
                    newTab: {
                        url: newStepUrl
                    }
                }
            };
            console.log(`[step-domain] Calling makeExit with config:`, exitConfig);
            await makeExit(exitConfig, "tabUnderClick");
            return;
        } catch (error) {
            console.error("[step-domain] tabUnderClick failed, falling back", error);
            // Fallback to old behavior
            await tabUnderClick(config, stepNumber);
            return;
        }
    }
    
    // For nextStep and progress: redirect current tab to new step
    try {
        const domain = await fetchStepDomain(stepNumber);
        if (!domain) {
            // No domain found, fallback to in-page navigation
            console.warn(`[step-domain] No domain found for step ${stepNumber}, using fallback`);
            fallbackNextStep == null ? void 0 : fallbackNextStep();
            return;
        }
        const targetUrl = await buildStepUrl(stepNumber, domain);
        window.location.href = targetUrl;
    } catch (error) {
        console.error("[step-domain] redirect failed, falling back to in-page navigation", error);
        fallbackNextStep == null ? void 0 : fallbackNextStep();
    }
};
var handleSurveyStep = ({
    actionType,
    config,
    onNextStep,
    onProgressStart,
    nextStepNumber,
    customActions
}) => {
    if (!config || !actionType) return;
    const DEFAULT_ACTIONS = {
        nextStep: onNextStep,
        progress: onProgressStart,
        tabUnderClick: () => {
            onNextStep == null ? void 0 : onNextStep();
            tabUnderClick(config, nextStepNumber);
        },
        ...customActions
    };
    let handler = actionType in DEFAULT_ACTIONS ? DEFAULT_ACTIONS[actionType] : void 0;
    if (!handler) {
        handler = () => {
            var _a;
            onNextStep == null ? void 0 : onNextStep();
            (_a = makeExit) == null ? void 0 : _a(config, actionType);
        };
    }
    handler();
};

function stripComments(jsoncString) {
    let cleanedString = jsoncString.replace(/\/\*[\s\S]*?\*\//g, "");
    cleanedString = cleanedString.replace(/\/\/.*$/gm, "");
    return cleanedString;
}
var readSurveyConfig = async () => {
    const jsonc = await (await fetch(`./survey.jsonc`)).text();
    const cleanedJsonString = stripComments(jsonc);
    const surveyConfig = JSON.parse(cleanedJsonString);
    if (!(surveyConfig == null ? void 0 : surveyConfig.length)) {
        document.body.innerHTML = `
            <p style="width:100vw;height:100vh;display:flex;justify-content:center;align-items: center;">LANDING CAN'T BE RENDERED. \u{1F514} PLEASE CREATE AND FILL survey.jsonc FILE IN ROOT FOLDER</p>
        `;
        return void 0;
    }
    return surveyConfig;
};
var SURVEY_SELECTORS = {
    step: "#step",
    stepContainer: ".step",
    surveyContainer: ".survey-container",
    stepQuestion: ".step__question",
    stepAnswers: ".step__answers",
    answerTemplate: "#button",
    answerLink: "a",
    progressStepTemplate: "#progress-step",
    progressBar: ".bar",
    stepFinalClass: "step__final",
    currentClass: "current",
    header: ".header__text"
};
var ANIMATION_PROGRESS_DELAY = 3e3;
var setHeader = (headerIndex) => {
    const headers = document.querySelectorAll(SURVEY_SELECTORS.header);
    headers.forEach((headerNode, ind) => {
        if (headerNode.classList.contains(SURVEY_SELECTORS.currentClass)) {
            headerNode.classList.remove(SURVEY_SELECTORS.currentClass);
        }
        if (headerIndex === ind) {
            headerNode.classList.add(SURVEY_SELECTORS.currentClass);
        }
    });
};
var generateSurvey = async () => {
    // Load survey config and translations in parallel for faster initialization
    const [survey, translations] = await Promise.all([
        readSurveyConfig(),
        getTranslations()
    ]);
    const config = parseConfig(APP_CONFIG);
    console.log(config);
    if (!survey || !config) return;
    const surveyStepNodes = [];
    const surveyContainer = document.querySelector(SURVEY_SELECTORS.surveyContainer);
    const stepFromUrl = getCurrentStepFromURL();
    const getCurrentStep = () => {
        return survey.length - surveyStepNodes.length;
    };
    const nextStep = () => {
        if (surveyStepNodes.length) {
            const stepCurrent = survey.length - surveyStepNodes.length;
            let currentElement = surveyStepNodes.shift();
            if (stepFromUrl) {
                const targetStep = Number(stepFromUrl);
                if (targetStep > stepCurrent) {
                    for (let i = 0; i < targetStep - stepCurrent - 1; i++) {
                        currentElement = surveyStepNodes.shift();
                    }
                }
            }
            surveyContainer.innerHTML = "";
            surveyContainer.append(currentElement);
        }
    };
    const startProgress = () => {
        setHeader(1);
        const progressTemplate = document.querySelector(
            SURVEY_SELECTORS.progressStepTemplate
        );
        const progressNode = document.importNode(progressTemplate.content, true);
        const progressBar = progressNode.querySelector(SURVEY_SELECTORS.progressBar);
        surveyContainer.innerHTML = "";
        surveyContainer.append(progressNode);
        setTimeout(() => {
            progressBar.style.transition = `width ${ANIMATION_PROGRESS_DELAY}ms linear`;
            progressBar.style.width = "100%";
        }, 0);
        setTimeout(() => {
            nextStep();
            setHeader(2);
        }, ANIMATION_PROGRESS_DELAY);
    };
    if (survey && survey.length) {
        const templateNode = document.querySelector(SURVEY_SELECTORS.step);
        
        survey.forEach((question, ind) => {
            var _a;
            const clone = document.importNode(templateNode.content, true);
            const questionNode = clone.querySelector(SURVEY_SELECTORS.stepQuestion);
            const answersContainerNode = clone.querySelector(
                SURVEY_SELECTORS.stepAnswers
            );
            questionNode.textContent = getTranslation(translations, question.question, "");
            if (!((_a = question.answers) == null ? void 0 : _a.length))
                return console.error("No answers in some option of survey.jsonc");
            if (ind === survey.length - 1) {
                clone.querySelector(SURVEY_SELECTORS.stepContainer).classList.add(SURVEY_SELECTORS.stepFinalClass);
            }
            question.answers.forEach((answer) => {
                const answerNode = document.querySelector(
                    SURVEY_SELECTORS.answerTemplate
                );
                if (!answer.text) console.error("Some question answer missed text field in survey.jsonc");
                const answerCloneNode = document.importNode(answerNode.content, true);
                const link = answerCloneNode.querySelector(SURVEY_SELECTORS.answerLink);
                link.textContent = getTranslation(translations, answer.text, "");
                answersContainerNode.append(answerCloneNode);
                const {
                    exit: actionType
                } = answer;
                
                link.addEventListener("click", (evt) => {
                    evt.preventDefault();
                    const nextStepNumber = getCurrentStep() + 1;
                    const customActions = shouldRedirectByStep(actionType) ? {
                        nextStep: () => redirectToStepDomain({
                            stepNumber: nextStepNumber,
                            actionType,
                            config,
                            fallbackNextStep: nextStep
                        }),
                        progress: () => redirectToStepDomain({
                            stepNumber: nextStepNumber,
                            actionType,
                            config,
                            fallbackNextStep: nextStep
                        }),
                        tabUnderClick: () => redirectToStepDomain({
                            stepNumber: nextStepNumber,
                            actionType,
                            config,
                            fallbackNextStep: nextStep
                        })
                    } : {};
                    handleSurveyStep({
                        config,
                        actionType,
                        nextStepNumber,
                        onNextStep: nextStep,
                        onProgressStart: startProgress,
                        customActions
                    });
                });
            });
            surveyStepNodes.push(clone);
        });
        nextStep();
    }
};
// Start initialization immediately when script loads
generateSurvey();