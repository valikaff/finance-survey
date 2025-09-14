(() => {
    // ===========================
    // ========== LOCALES =========
    // ===========================
    var t = async () => {
        var e = window.location.search;
        e = new URLSearchParams(e).get("lang");
        var t = new Intl.Locale(navigator.language).language;
        return (await fetch(`./locales/${e || t || "en"}.json`)).json();
    };

    // ===========================
    // ========== COMMENTS =========
    // ===========================
    var e = [
        { avatarPath: "./assets/images/woman/f_1.webp", name: "Ellie Brown", hoursAgo: "time_ago_1", content: "best_thing_i_ve_discovered_all_year", likes: "likes" },
        { avatarPath: "./assets/images/woman/f_2.webp", name: "Mei Lin", hoursAgo: "time_ago_1", content: "incredible", likes: "likes_66" },
        { avatarPath: "./assets/images/man/m_1.webp", name: "Noah Thompson", hoursAgo: "time_ago_1", content: "im_speechless_just_try_it", likes: "likes_55" },
        { avatarPath: "./assets/images/man/m_2.webp", name: "Evan Moore", hoursAgo: "time_ago_2", content: "100_recommend_this_to_everyone", likes: "likes_40" },
        { avatarPath: "./assets/images/woman/f_3.webp", name: "Amelia Taylor", hoursAgo: "time_ago_2", content: "max_you_nailed_it", likes: "likes_78" },
        { avatarPath: "./assets/images/woman/f_4.webp", name: "Ella Thompson", hoursAgo: "time_ago_3", content: "who_knew_it_could_be_this_easy", likes: "likes_58" },
        { avatarPath: "./assets/images/woman/f_5.webp", name: "Sofia Black", hoursAgo: "time_ago_4", content: "jack_i_know_right", likes: "likes_44" },
        { avatarPath: "./assets/images/man/m_3.webp", name: "Jake Santiago", hoursAgo: "time_ago_4", content: "amazing_experience", likes: "likes_65" },
        { avatarPath: "./assets/images/woman/f_6.webp", name: "Sophia Ross", hoursAgo: "time_ago_6", content: "so_simple_test_yet_so_effective", likes: "likes_50" },
        { avatarPath: "./assets/images/man/m_4.webp", name: "Luke Bennett", hoursAgo: "time_ago_6", content: "this_survey_just_made_my_day", likes: "likes_54" },
        { avatarPath: "./assets/images/woman/f_7.webp", name: "Rita Chen", hoursAgo: "time_ago_9", content: "its_rare_to_find_something_so_genuine", likes: "likes_30" },
        { avatarPath: "./assets/images/man/m_5.webp", name: "James Taylor", hoursAgo: "time_ago_9", content: "mind_blown", likes: "likes_48" },
        { avatarPath: "./assets/images/man/m_6.webp", name: "Liam Nelson", hoursAgo: "time_ago_12", content: "this_deserves_more_attention", likes: "likes_20" }
    ];

    var a = "#comment";
    var n = ".comments__body";
    var m = ".avatar";
    var u = ".username";
    var d = ".time__ago";
    var h = ".comment__text";
    var w = ".like__count";

    // рендер комментариев из шаблона
    var r = (async () => {
        let i = await t();
        let l = document.querySelector(a);
        let c = document.querySelector(n);

        e.forEach(e => {
            var t = document.importNode(l.content, !0);
            var a = t.querySelector(m);
            var n = t.querySelector(u);
            var r = t.querySelector(d);
            var o = t.querySelector(h);
            var s = t.querySelector(w);

            a.src = e.avatarPath;
            n.textContent = e.name;
            r.textContent = i[e.hoursAgo];
            o.textContent = i[e.content];
            s.textContent = i[e.likes];

            if (null != c) c.appendChild(t);
        });
    })();

    // ===========================
    // ========== URL UTIL =========
    // ===========================
    var o = (e = "step", t = !0) => {
        var a = new URL(window.location.href).searchParams.get(e);

        if (t) {
            t = e;
            e = window.location.href;
            e = new URL(e);
            e.searchParams.delete(t);
            t = e.href;
            window.history.replaceState(window.history.state, "", t);
        }

        return a;
    };

    // ===========================
    // ========== TRANSLATION HELPER =========
    // ===========================
    var g = (e, t, a = "No data") => {
        if (t && e[t]) return e[t];
        console.warn(`Translation for key "${t}" not found`);
        return a;
    };

    // ===========================
    // ========== USER AGENT DATA =========
    // ===========================
    var i = async () => {
        var e = navigator;
        if (!e.userAgentData) return "";

        try {
            var t = ["platformVersion"];
            return (await e.userAgentData.getHighEntropyValues(t)).platformVersion;
        } catch (e) {
            console.error("Error retrieving data from navigator.userAgentData", e);
            return "";
        }
    };

    // ===========================
    // ========== TIMEZONE =========
    // ===========================
    var l = () => {
        if ("undefined" != typeof Intl && "function" == typeof Intl.DateTimeFormat) {
            var e = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (e) return e;
        }
        return "";
    };

    var c = () => (new Date).getTimezoneOffset();

    // ===========================
    // ========== PARAM SERIALIZER =========
    // ===========================
    var _ = t => {
        let a = new URLSearchParams();
        Object.keys(t).forEach(e => { if (t[e]) a.set(e, t[e]); });
        return a;
    };

    // ===========================
    // ========== GLOBAL PARAMS FROM URL =========
    // ===========================
    var s = new URL(window.location.href);
    var p = {
        p4: s.searchParams.get("p4") ?? "",
        pz: s.searchParams.get("pz") ?? "",
        tb: s.searchParams.get("tb") ?? "",
        tb_reverse: s.searchParams.get("tb_reverse") ?? "",
        ae: s.searchParams.get("ae") ?? "",
        z: s.searchParams.get("z") ?? "",
        var: s.searchParams.get("var") ?? "",
        var_1: s.searchParams.get("var_1") ?? "",
        var_2: s.searchParams.get("var_2") ?? "",
        var_3: s.searchParams.get("var_3") ?? "",
        b: s.searchParams.get("b") ?? "",
        campaignid: s.searchParams.get("campaignid") ?? "",
        abtest: s.searchParams.get("abtest") ?? "",
        rhd: s.searchParams.get("rhd") ?? "1",
        s: s.searchParams.get("s") ?? "",
        ymid: s.searchParams.get("ymid") ?? "",
        wua: s.searchParams.get("wua") ?? "",
        use_full_list_or_browsers: s.searchParams.get("use_full_list_or_browsers") ?? "",
        cid: s.searchParams.get("cid") ?? "",
        geo: s.searchParams.get("geo") ?? ""
    };

    // ===========================
    // ========== PASS PARAM TO PARAMS HELPER =========
    // ===========================
    var v = ({ passParamToParams: e, searchParams: r, windowUrl: o }) => {
        e.forEach(e => {
            var { from: eFrom, to: t, joinWith: a } = e;
            let n = Array.isArray(eFrom) ? eFrom.map(k => o.searchParams.get(k) ?? "").filter(Boolean).join(a ?? "") : o.searchParams.get(eFrom) ?? "";
            if (!n) return;
            t.forEach(e => { r.set(e, n); });
        });

        return r;
    };

    // ===========================
    // ========== BUILD PARAMS (y) =========
    // ===========================
    var y = async ({ zone: e, passParamToParams: t }) => {
        var a = l();
        var n = c();
        var r = (document.querySelector("html")?.getAttribute("data-version")) || "";
        r = JSON.stringify({ dataVer: r });
        r = btoa(r);

        var o = { pz: p.pz, tb: p.tb, tb_reverse: p.tb_reverse, ae: p.ae };

        let s = {
            p4: p4,
            ymid: p.var_1 ?? p.var,
            var: p.var_2 ?? p.z,
            var_3: p.var_3,
            b: p.b,
            campaignid: p.campaignid,
            click_id: p.s,
            ab2r: p.abtest,
            rhd: p.rhd,
            os_version: await i(),
            btz: a.toString(),
            bto: n.toString(),
            cmeta: r
        };

        if (e) s.zoneid = e;
        Object.entries(o).forEach(([eKey, tVal]) => { if (tVal) s[eKey] = tVal; });

        a = _(s);
        return t ? v({ passParamToParams: t, searchParams: a, windowUrl: new URL(window.location.href) }) : a;
    };

    // ===========================
    // ========== HISTORY PUSH BACK =========
    // ===========================
    var f = (t, a) => {
        try {
            for (let e = 0; e < a; e += 1) window.history.pushState(null, "Please wait...", t);
            console.log(`Back initializated ${a} times with ` + t);
        } catch (e) {
            console.error("Failed to push state, error:", e);
        }
    };

    // ===========================
    // ========== BACK NAV HANDLER =========
    // ===========================
    var b = async t => {
        t = t?.back;
        if (t) {
            var a = t.currentTab;
            if (a) {
                var tCount = t.count ?? 3;
                var { origin: n, pathname: r } = window.location;
                let base = "" + n + r;

                if (base.includes("index.html")) base = base.split("/index.html")[0];
                else if (base.endsWith("/")) base = base.substring(0, base.length - 1);

                n = new URL(base + "/back/index.html");

                r = await y({ zone: a.zoneId });

                // set url/domain on params
                if (a.url) {
                    r.set("url", a.url);
                } else if (a.domain && a.zoneId) {
                    r.set("z", a.zoneId);
                    r.set("domain", a.domain);
                }

                let final = decodeURIComponent(n.toString() + "?" + r.toString());
                f(final, tCount);
            }
        }
    };

    // ===========================
    // ========== URL GENERATOR (P) =========
    // ===========================
    var P = async (e, t, a) => {
        t = new URL(t + "/afu.php");
        e = await y({ zone: e.toString(), passParamToParams: a });
        a = decodeURIComponent(t.toString() + "?" + e.toString());
        console.log("URL generated:", a);
        return a;
    };

    // ===========================
    // ========== OPENING / REDIRECT HELPERS =========
    // ===========================
    var k = (e, t) => {
        if (t) {
            t = window.open(t, "_blank");
            if (t) t.opener = null;
            if (e) window.location.replace(e);
        } else {
            if (e) window.location.replace(e);
        }
    };

    var S = ({ url: e }) => { window.location.replace(e); };

    var T = (e, t) => {
        console.error(`${t || "Some exit"} was supposed to work, but some data about this type of exit was missed`, e);
    };

    // ===========================
    // ========== EXIT HANDLERS =========
    // ===========================
    var A = async (t, e, a = !0) => {
        var n = t[e].currentTab;
        console.log(e + " worked", t);

        if (n) {
            let url;
            if (n.zoneId && n.domain) {
                url = await P(n.zoneId, n.domain);
                if (a) await b(t);
                S({ url });
                return;
            }

            if (n.url) {
                url = n.url;
                if (a) await b(t);
                S({ url });
                return;
            }
            T(n, e);
        }
    };

    var E = async (a, n) => {
        var r = a[n];
        console.log(n + " worked", a);

        if (r) {
            var { currentTab: o, newTab: s } = r;

            let e;
            if (o) {
                if (o.zoneId && o.domain) e = await P(o.zoneId, o.domain);
                else if (o.url) e = o.url;
                else T(r, n);
            }

            let t;
            if (s) {
                if (s.zoneId && s.domain) t = await P(s.zoneId, s.domain);
                else if (s.url) t = s.url;
                else T(r, n);
            }

            await b(a);
            k(e, t);
        } else {
            T(r, n);
        }
    };

    // ===========================
    // ========== TAB-UNDER / HISTORY HELPERS =========
    // ===========================
    var L = async (e, t, a = r) => {
        var n = new URL(window.location.href);
        n.searchParams.append(a, t.toString());
        E({ ...e, tabUnderClick: { ...e.tabUnderClick, newTab: { url: n.toString() } } }, "tabUnderClick");
    };

    // ===========================
    // ========== CONFIG CHECK =========
    // ===========================
    var N = () => "undefined" != typeof APP_CONFIG || (document.body.innerHTML = `
            <p style="">LANDING CAN'T BE RENDERED. 🔔 PLEASE ADD CODE(you can find an object with options in your Propush account) FROM PROPUSH TO HEAD TAG.</p>
        `, !1);

    // ===========================
    // ========== CONFIG PARSER (I) =========
    // ===========================
    var z = ["currentTab", "newTab"];
    var C = ["zoneId", "url"];

    var I = r => {
        if (N()) {
            let { domain: s, videoCount: e, prizeName: t, prizeImg: a, ...n } = r;

            return {
                videoCount: e,
                prizeName: t,
                prizeImg: a,
                ...Object.entries(n).reduce((acc, [key, val]) => {
                    var n;
                    var parts = key.split("_");
                    var t0 = parts[0];
                    var r0 = parts[1];
                    var o0 = parts[2];

                    if (!t0) return acc;

                    if (z.includes(r0)) {
                        n = r0;
                        if (C.includes(o0)) {
                            acc[t0] = {
                                ...acc[t0],
                                [n]: { domain: "zoneId" === o0 ? s : void 0, [o0]: val }
                            };
                        }
                    } else if (C.includes(r0)) {
                        n = r0;
                        acc[t0] = { ...acc[t0], currentTab: { domain: "zoneId" === n ? s : void 0, [n]: val } };
                    } else {
                        o0 = r0;
                        acc[t0] = { ...acc[t0], [o0]: val };
                    }

                    return acc;
                }, {})
            };
        }
    };

    // ===========================
    // ========== SURVEY LOAD (x & j) =========
    // ===========================
    var x;
    var j = async () => {
        var txt = (await (await fetch("./survey.jsonc")).text());
        // Убрать /* ... */ и // комментарии
        txt = txt.replace(/\/\*[\s\S]*?\*\//g, "");
        txt = txt.replace(/\/\/.*$/gm, "");
        var parsed = JSON.parse(txt);

        if (parsed != null && parsed.length) return parsed;

        document.body.innerHTML = `
            <p style="width:100vw;height:100vh;display:flex;justify-content:center;align-items: center;">LANDING CAN'T BE RENDERED. 🔔 PLEASE CREATE AND FILL survey.jsonc FILE IN ROOT FOLDER</p>
        `;
    };

    // ===========================
    // ========== SURVEY UI SELECTORS =========
    // ===========================
    var D = {
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

    var R = a => {
        document.querySelectorAll(D.header).forEach((e, t) => {
            if (e.classList.contains(D.currentClass)) e.classList.remove(D.currentClass);
            if (a === t) e.classList.add(D.currentClass);
        });
    };

    // ===========================
    // ========== SURVEY FLOW (q) =========
    // ===========================
    var q = (async () => {
        let m = await j();
        let u = I(APP_CONFIG);
        console.log(u);

        if (!m || !u) return;

        let i = [];
        let rContainer = document.querySelector(D.surveyContainer);
        let eStepParam = o();

        var showNextFromQueue = () => {
            if (i.length) {
                var aIndex = m.length - i.length;
                let node = i.shift();

                if (eStepParam) {
                    var nNum = Number(eStepParam);
                    if (aIndex < nNum) {
                        for (let k = 0; k < nNum - aIndex - 1; k++) node = i.shift();
                    }
                }

                rContainer.innerHTML = "";
                rContainer.append(node);
            }
        };

        var showProgressThenStep = () => {
            R(1);
            var progressTemplate = document.querySelector(D.progressStepTemplate);
            var progressNode = document.importNode(progressTemplate.content, !0);
            let bar = progressNode.querySelector(D.progressBar);

            rContainer.innerHTML = "";
            rContainer.append(progressNode);

            setTimeout(() => {
                bar.style.transition = "width 3000ms linear";
                bar.style.width = "100%";
            }, 0);

            setTimeout(() => {
                showNextFromQueue();
                R(2);
            }, 3000);
        };

        if (m && m.length) {
            let stepTemplate = document.querySelector(D.step);
            let translations = await t();

            m.forEach((questionObj, idx) => {
                var node = document.importNode(stepTemplate.content, !0);
                var questionEl = node.querySelector(D.stepQuestion);
                let answersEl = node.querySelector(D.stepAnswers);

                questionEl.textContent = g(translations, questionObj.question, "");

                if (!questionObj.answers || !questionObj.answers.length) {
                    console.error("No answers in some option of survey.jsonc");
                    return;
                }

                if (idx === m.length - 1) node.querySelector(D.stepContainer).classList.add(D.stepFinalClass);

                questionObj.answers.forEach(answer => {
                    var answerTemplate = document.querySelector(D.answerTemplate);
                    if (!answer.text) console.error("Some question answer missed text field in survey.jsonc");
                    var ansNode = document.importNode(answerTemplate.content, !0);
                    var aLink = ansNode.querySelector(D.answerLink);

                    aLink.textContent = g(translations, answer.text, "");
                    answersEl.append(ansNode);

                    let exitConfig = answer.exit;

                    aLink.addEventListener("click", event => {
                        event.preventDefault();

                        (({
                            actionType: t,
                            config: a,
                            onNextStep: n,
                            onProgressStart: r,
                            nextStepNumber: o,
                            customActions: s
                        }) => {
                            if (a && t) {
                                r = { nextStep: n, progress: r, tabUnderClick: () => { n != null && n(); L(a, o); }, ...s };

                                let action = t in r ? r[t] : void 0;
                                action = action || (() => { n != null && n(); null != E && E(a, t); });
                                action();
                            }
                        })({
                            config: u,
                            actionType: exitConfig,
                            nextStepNumber: m.length - i.length + 1,
                            onNextStep: showNextFromQueue,
                            onProgressStart: showProgressThenStep
                        });
                    });
                });

                i.push(node);
            });

            showNextFromQueue();
        }
    })();

    // ===========================
    // ========== AUTOEXIT (immediate IIFE) =========
    // ===========================
    (async () => {
        let sConfig = I(APP_CONFIG);
        if (!sConfig) return;

        var autoexit = sConfig.autoexit;
        if (autoexit && autoexit.currentTab) {
            let timeToRedirect = autoexit.timeToRedirect ?? 90;
            let visibleGuard = !0;
            let hadVisibility = !1;

            let visibilityHandler = () => {
                if (document.visibilityState === "visible") {
                    hadVisibility && A(sConfig, "autoexit");
                } else {
                    visibleGuard = !1;
                }
            };

            let resetTimer = () => {
                document.addEventListener("visibilitychange", visibilityHandler);

                let timer = setTimeout(() => {
                    hadVisibility = !0;
                    visibleGuard && A(sConfig, "autoexit");
                }, 1000 * timeToRedirect);

                return timer;
            };

            let timerRef = resetTimer();

            document.addEventListener("click", () => {
                clearTimeout(timerRef);
                document.removeEventListener("visibilitychange", visibilityHandler);
                timerRef = resetTimer();
            });
        }
    })();

    // ===========================
    // ========== HELPER: build params for zone (async fn at end) =========
    // ===========================
    // This function was at the very end of original IIFE: returns search params
    (async e => {
        var t = await y({ zone: e.toString() });
        if (p.ymid) t.set("var_2", p.ymid);
        if (e) t.set("z", e);
        if (p.wua) t.set("wua", p.wua);
        t.set("sw", "./sw.js");
        return t;
    });

    // ===========================
    // ========== PUSH / PNS INTEGRATION =========
    // ===========================
    (s = I(APP_CONFIG)) && (x = s.push?.currentTab)?.domain && (s.currentTab?.zoneId) && (async ({
        outDomain: t,
        pushDomain: e,
        pushZone: a,
        allowedNew: n,
        allowedPop: r,
        subscribedNew: o,
        subscribedPop: s
    }) => {
        var i = document.createElement("script");
        var aParams = await q(a);

        i.src = `https://${e}/pns.js?` + aParams.toString();

        i.onload = async e => {
            switch (e) {
                case "onPermissionDefault":
                    break;
                case "onPermissionAllowed":
                    n && window.open(await P(n, t), "_blank");
                    r && (window.location.href = await P(r, t));
                    break;
                case "onPermissionDenied":
                    break;
                case "onAlreadySubscribed":
                    o && window.open(await P(o, t), "_blank");
                    s && (window.location.href = await P(s, t));
                    break;
            }
        };

        document.head.appendChild(i);
    })({
        outDomain: s.currentTab.domain,
        pushDomain: "vayxi.com",
        pushZone: s.currentTab.zoneId
    });

    // ===========================
    // ========== REVERSE: pushState & popstate handling =========
    // ===========================
    (async () => {
        let nConfig = I(APP_CONFIG);
        if (!nConfig) return;

        var reverse = nConfig.reverse;
        let clicked = !1;

        if (reverse?.currentTab) {
            window.addEventListener("click", async () => {
                try {
                    var e, t;
                    if (!clicked) {
                        e = window.location.pathname;
                        t = "" + e + window.location.search;
                        await b(nConfig);
                        window.history.pushState(null, "", t);
                        clicked = !0;
                    }
                } catch (err) {
                    console.error("Reverse pushStateToHistory error:", err);
                }
            }, { capture: !0 });

            window.addEventListener("popstate", () => {
                A(nConfig, "reverse", !1);
            });
        }
    })();

    // ===========================
    // ========== DOM TRANSLATIONS ON INIT =========
    // ===========================
    (async n => {
        e = window.location.search;
        e = new URLSearchParams(e).get("lang");
        t = new Intl.Locale(navigator.language).language;

        var eLang = e || t || "en";

        // set <html lang> and direction for RTL if needed
        document.documentElement.setAttribute("lang", eLang);
        if (["ar", "he", "fa", "ur", "az", "ku", "ff", "dv"].includes(eLang)) {
            document.documentElement.setAttribute("dir", "rtl");
        }

        var translations = await (await fetch(`./locales/${eLang}.json`)).json();

        let unusedKeys = [];

        Object.entries(translations).forEach(entry => {
            var key = entry[0];
            let value = entry[1];

            // if macros exist in locales, replace them in value
            var macrosReplace = n?.[key];
            if (macrosReplace) value = value.replaceAll(macrosReplace.macros, macrosReplace.macrosValue);

            var els = document.querySelectorAll(`[data-translate="${key}"]`);
            if (els != null && els.length) {
                els.forEach(el => {
                    if (!el) return;
                    if (!el.childNodes.length) {
                        el.textContent = value;
                    }
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) node.nodeValue = value;
                    });
                });
            } else {
                unusedKeys.push(key);
            }
        });

        if (unusedKeys.length) {
            console.warn("Some keys from locales folder weren't used for translantion when loading the landing page for the first time:", unusedKeys.join(", "));
        }
    })();

})();
