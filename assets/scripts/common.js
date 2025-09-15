( () => {
    var t = async () => {
        var e = window.location.search
          , e = new URLSearchParams(e).get("lang")
          , t = new Intl.Locale(navigator.language).language;
        return (await fetch(`./locales/${e || t || "en"}.json`)).json()
    }
      , e = [{
        avatarPath: "./assets/images/woman/f_1.webp",
        name: "Ellie Brown",
        hoursAgo: "time_ago_1",
        content: "best_thing_i_ve_discovered_all_year",
        likes: "likes"
    }, {
        avatarPath: "./assets/images/woman/f_2.webp",
        name: "Mei Lin",
        hoursAgo: "time_ago_1",
        content: "incredible",
        likes: "likes_66"
    }, {
        avatarPath: "./assets/images/man/m_1.webp",
        name: "Noah Thompson",
        hoursAgo: "time_ago_1",
        content: "im_speechless_just_try_it",
        likes: "likes_55"
    }, {
        avatarPath: "./assets/images/man/m_2.webp",
        name: "Evan Moore",
        hoursAgo: "time_ago_2",
        content: "100_recommend_this_to_everyone",
        likes: "likes_40"
    }, {
        avatarPath: "./assets/images/woman/f_3.webp",
        name: "Amelia Taylor",
        hoursAgo: "time_ago_2",
        content: "max_you_nailed_it",
        likes: "likes_78"
    }, {
        avatarPath: "./assets/images/woman/f_4.webp",
        name: "Ella Thompson",
        hoursAgo: "time_ago_3",
        content: "who_knew_it_could_be_this_easy",
        likes: "likes_58"
    }, {
        avatarPath: "./assets/images/woman/f_5.webp",
        name: "Sofia Black",
        hoursAgo: "time_ago_4",
        content: "jack_i_know_right",
        likes: "likes_44"
    }, {
        avatarPath: "./assets/images/man/m_3.webp",
        name: "Jake Santiago",
        hoursAgo: "time_ago_4",
        content: "amazing_experience",
        likes: "likes_65"
    }, {
        avatarPath: "./assets/images/woman/f_6.webp",
        name: "Sophia Ross",
        hoursAgo: "time_ago_6",
        content: "so_simple_test_yet_so_effective",
        likes: "likes_50"
    }, {
        avatarPath: "./assets/images/man/m_4.webp",
        name: "Luke Bennett",
        hoursAgo: "time_ago_6",
        content: "this_survey_just_made_my_day",
        likes: "likes_54"
    }, {
        avatarPath: "./assets/images/woman/f_7.webp",
        name: "Rita Chen",
        hoursAgo: "time_ago_9",
        content: "its_rare_to_find_something_so_genuine",
        likes: "likes_30"
    }, {
        avatarPath: "./assets/images/man/m_5.webp",
        name: "James Taylor",
        hoursAgo: "time_ago_9",
        content: "mind_blown",
        likes: "likes_48"
    }, {
        avatarPath: "./assets/images/man/m_6.webp",
        name: "Liam Nelson",
        hoursAgo: "time_ago_12",
        content: "this_deserves_more_attention",
        likes: "likes_20"
    }]
      , a = "#comment"
      , n = ".comments__body"
      , m = ".avatar"
      , u = ".username"
      , d = ".time__ago"
      , h = ".comment__text"
      , w = ".like__count"
      , r = ((async () => {
        let i = await t()
          , l = document.querySelector(a)
          , c = document.querySelector(n);
        e.forEach(e => {
            var t = document.importNode(l.content, !0)
              , a = t.querySelector(m)
              , n = t.querySelector(u)
              , r = t.querySelector(d)
              , o = t.querySelector(h)
              , s = t.querySelector(w);
            a.src = e.avatarPath,
            n.textContent = e.name,
            r.textContent = i[e.hoursAgo],
            o.textContent = i[e.content],
            s.textContent = i[e.likes],
            null != c && c.appendChild(t)
        }
        )
    }
    )(),
    "step");
    var o = (e=r, t=!0) => {
        var a = new URL(window.location.href).searchParams.get(e);
        return t && (t = e,
        e = window.location.href,
        (e = new URL(e)).searchParams.delete(t),
        t = e.href,
        window.history.replaceState(window.history.state, "", t)),
        a
    }
      , g = (e, t, a="No data") => t && e[t] ? e[t] : (console.warn(`Translation for key "${t}" not found`),
    a)
      , i = async () => {
        var e = navigator;
        if (!e.userAgentData)
            return "";
        try {
            var t = ["platformVersion"];
            return (await e.userAgentData.getHighEntropyValues(t)).platformVersion
        } catch (e) {
            return console.error("Error retrieving data from navigator.userAgentData", e),
            ""
        }
    }
      , l = () => {
        if ("undefined" != typeof Intl && "function" == typeof Intl.DateTimeFormat) {
            var e = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (e)
                return e
        }
        return ""
    }
      , c = () => (new Date).getTimezoneOffset()
      , _ = t => {
        let a = new URLSearchParams;
        return Object.keys(t).forEach(e => {
            t[e] && a.set(e, t[e])
        }
        ),
        a
    }
      , s = new URL(window.location.href)
      , p = {
        pz: s.searchParams.get("pz") ?? "",
        tb: s.searchParams.get("tb") ?? "",
        tb_reverse: s.searchParams.get("tb_reverse") ?? "",
        ae: s.searchParams.get("ae") ?? "",
        z: s.searchParams.get("z") ?? "",
        var: s.searchParams.get("var") ?? "",
        ymid: s.searchParams.get("ymid")??"",
        var_2: s.searchParams.get("var_2") ?? "",
        var_3: s.searchParams.get("var_3") ?? "",
        b: s.searchParams.get("b") ?? "",
        campaignid: s.searchParams.get("campaignid") ?? "",
        abtest: s.searchParams.get("abtest") ?? "",
        rhd: s.searchParams.get("rhd") ?? "1",
        s: s.searchParams.get("s") ?? "",
        p4: s.searchParams.get("p4") ?? "",
        wua: s.searchParams.get("wua") ?? "",
        use_full_list_or_browsers: s.searchParams.get("use_full_list_or_browsers") ?? "",
        cid: s.searchParams.get("cid") ?? "",
        geo: s.searchParams.get("geo") ?? ""
    }
      , v = ({passParamToParams: e, searchParams: r, windowUrl: o}) => (e.forEach(e => {
        var {from: e, to: t, joinWith: a} = e;
        let n = Array.isArray(e) ? e.map(e => o.searchParams.get(e) ?? "").filter(Boolean).join(a ?? "") : o.searchParams.get(e) ?? "";
        n && t.forEach(e => {
            r.set(e, n)
        }
        )
    }
    ),
    r)
      , y = async ({zone: e, passParamToParams: t}) => {
        var a = l()
          , n = c()
          , r = (null == (r = document.querySelector("html")) ? void 0 : r.getAttribute("data-version")) || ""
          , r = JSON.stringify({
            dataVer: r
        })
          , r = btoa(r)
          , o = {
            pz: p.pz,
            tb: p.tb,
            tb_reverse: p.tb_reverse,
            ae: p.ae
        };
        let s = {
            p4: p.p4 ?? p.var,
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
        e && (s.zoneid = e),
        Object.entries(o).forEach( ([e,t]) => {
            t && (s[e] = t)
        }
        );
        a = _(s);
        return t ? v({
            passParamToParams: t,
            searchParams: a,
            windowUrl: new URL(window.location.href)
        }) : a
    }
      , f = (t, a) => {
        try {
            for (let e = 0; e < a; e += 1)
                window.history.pushState(null, "Please wait...", t);
            console.log(`Back initializated ${a} times with ` + t)
        } catch (e) {
            console.error("Failed to push state, error:", e)
        }
    }
      , b = async t => {
        t = null == t ? void 0 : t.back;
        if (t) {
            var a = t.currentTab;
            if (a) {
                var t = t.count ?? 3
                  , {origin: n, pathname: r} = window.location;
                let e = "" + n + r;
                e.includes("index.html") ? e = e.split("/index.html")[0] : e.endsWith("/") && (e = e.substring(0, e.length - 1));
                n = new URL(e + "/back/index.html"),
                r = await y({
                    zone: a.zoneId
                }),
                a = (a.url ? r.set("url", a.url) : a.domain && a.zoneId && (r.set("z", a.zoneId),
                r.set("domain", a.domain)),
                decodeURIComponent(n.toString() + "?" + r.toString()));
                f(a, t)
            }
        }
    }
      , P = async (e, t, a) => {
        t = new URL(t + "/afu.php"),
        e = await y({
            zone: e.toString(),
            passParamToParams: a
        }),
        a = decodeURIComponent(t.toString() + "?" + e.toString());
        return console.log("URL generated:", a),
        a
    }
      , k = (e, t) => {
        t ? (t = window.open(t, "_blank")) && (t.opener = null,
        e) && window.location.replace(e) : e && window.location.replace(e)
    }
      , S = ({url: e}) => {
        window.location.replace(e)
    }
      , T = (e, t) => {
        console.error(`${t || "Some exit"} was supposed to work, but some data about this type of exit was missed`, e)
    }
      , A = async (t, e, a=!0) => {
        var n = t[e].currentTab;
        if (console.log(e + " worked", t),
        n) {
            let e;
            if (n.zoneId && n.domain)
                return e = await P(n.zoneId, n.domain),
                a && b(t),
                S({
                    url: e
                });
            if (n.url)
                return e = n.url,
                a && b(t),
                S({
                    url: e
                })
        }
        T(n, e)
    }
      , E = async (a, n) => {
        var r = a[n];
        if (console.log(n + " worked", a),
        r) {
            var {currentTab: o, newTab: s} = r;
            let e;
            o && (o.zoneId && o.domain ? e = await P(o.zoneId, o.domain) : o.url ? e = o.url : T(r, n));
            let t;
            s && (s.zoneId && s.domain ? t = await P(s.zoneId, s.domain) : s.url ? t = s.url : T(r, n)),
            b(a),
            void k(e, t)
        } else
            T(r, n)
    }
      , L = async (e, t, a=r) => {
        var n = new URL(window.location.href);
        n.searchParams.append(a, t.toString()),
        E({
            ...e,
            tabUnderClick: {
                ...e.tabUnderClick,
                newTab: {
                    url: n.toString()
                }
            }
        }, "tabUnderClick")
    }
      , N = () => "undefined" != typeof APP_CONFIG || (document.body.innerHTML = `
            <p style="">LANDING CAN'T BE RENDERED. 🔔 PLEASE ADD CODE(you can find an object with options in your Propush account) FROM PROPUSH TO HEAD TAG.</p>
        `,
    !1)
      , z = ["currentTab", "newTab"]
      , C = ["zoneId", "url"]
      , I = r => {
        if (N()) {
            let {domain: s, videoCount: e, prizeName: t, prizeImg: a, ...n} = r;
            return {
                videoCount: e,
                prizeName: t,
                prizeImg: a,
                ...Object.entries(n).reduce( (e, [t,a]) => {
                    var n, [t,r,o] = t.split("_");
                    return t && (z.includes(r) ? (n = r,
                    C.includes(o) && (e[t] = {
                        ...e[t],
                        [n]: {
                            domain: "zoneId" === o ? s : void 0,
                            [o]: a
                        }
                    })) : C.includes(r) ? (n = r,
                    e[t] = {
                        ...e[t],
                        currentTab: {
                            domain: "zoneId" === n ? s : void 0,
                            [n]: a
                        }
                    }) : (o = r,
                    e[t] = {
                        ...e[t],
                        [o]: a
                    })),
                    e
                }
                , {})
            }
        }
    }
    ;
    var x, j = async () => {
        var e = (e => {
            let t = e.replace(/\/\*[\s\S]*?\*\//g, "");
            return t = t.replace(/\/\/.*$/gm, "")
        }
        )(await (await fetch("./survey.jsonc")).text())
          , e = JSON.parse(e);
        if (null != e && e.length)
            return e;
        document.body.innerHTML = `
            <p style="width:100vw;height:100vh;display:flex;justify-content:center;align-items: center;">LANDING CAN'T BE RENDERED. 🔔 PLEASE CREATE AND FILL survey.jsonc FILE IN ROOT FOLDER</p>
        `
    }
    , D = {
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
    }, R = a => {
        document.querySelectorAll(D.header).forEach( (e, t) => {
            e.classList.contains(D.currentClass) && e.classList.remove(D.currentClass),
            a === t && e.classList.add(D.currentClass)
        }
        )
    }
    , q = ((async () => {
        let m = await j()
          , u = I(APP_CONFIG);
        if (console.log(u),
        m && u) {
            let i = []
              , r = document.querySelector(D.surveyContainer)
              , e = o()
              , l = () => {
                if (i.length) {
                    var a = m.length - i.length;
                    let t = i.shift();
                    if (e) {
                        var n = Number(e);
                        if (a < n)
                            for (let e = 0; e < n - a - 1; e++)
                                t = i.shift()
                    }
                    r.innerHTML = "",
                    r.append(t)
                }
            }
              , c = () => {
                R(1);
                var e = document.querySelector(D.progressStepTemplate)
                  , e = document.importNode(e.content, !0);
                let t = e.querySelector(D.progressBar);
                r.innerHTML = "",
                r.append(e),
                setTimeout( () => {
                    t.style.transition = "width 3000ms linear",
                    t.style.width = "100%"
                }
                , 0),
                setTimeout( () => {
                    l(),
                    R(2)
                }
                , 3e3)
            }
            ;
            if (m && m.length) {
                let o = document.querySelector(D.step)
                  , s = await t();
                m.forEach( (e, t) => {
                    var a = document.importNode(o.content, !0)
                      , n = a.querySelector(D.stepQuestion);
                    let r = a.querySelector(D.stepAnswers);
                    if (n.textContent = g(s, e.question, ""),
                    null == (n = e.answers) || !n.length)
                        return console.error("No answers in some option of survey.jsonc");
                    t === m.length - 1 && a.querySelector(D.stepContainer).classList.add(D.stepFinalClass),
                    e.answers.forEach(e => {
                        var t = document.querySelector(D.answerTemplate)
                          , t = (e.text || console.error("Some question answer missed text field in survey.jsonc"),
                        document.importNode(t.content, !0))
                          , a = t.querySelector(D.answerLink);
                        a.textContent = g(s, e.text, ""),
                        r.append(t);
                        let n = e.exit;
                        a.addEventListener("click", e => {
                            e.preventDefault(),
                            ( ({actionType: t, config: a, onNextStep: n, onProgressStart: r, nextStepNumber: o, customActions: s}) => {
                                if (a && t) {
                                    r = {
                                        nextStep: n,
                                        progress: r,
                                        tabUnderClick: () => {
                                            null != n && n(),
                                            L(a, o)
                                        }
                                        ,
                                        ...s
                                    };
                                    let e = t in r ? r[t] : void 0;
                                    (e = e || ( () => {
                                        null != n && n(),
                                        null != E && E(a, t)
                                    }
                                    ))()
                                }
                            }
                            )({
                                config: u,
                                actionType: n,
                                nextStepNumber: m.length - i.length + 1,
                                onNextStep: l,
                                onProgressStart: c
                            })
                        }
                        )
                    }
                    ),
                    i.push(a)
                }
                ),
                l()
            }
        }
    }
    )(),
    (async () => {
        let s = I(APP_CONFIG);
        if (s) {
            var i = null == s ? void 0 : s.autoexit;
            if (null != i && i.currentTab) {
                let e = i.timeToRedirect ?? 90
                  , t = !0
                  , a = !1
                  , n = function() {
                    "visible" === document.visibilityState ? a && A(s, "autoexit") : t = !1
                }
                  , r = () => (document.addEventListener("visibilitychange", n),
                setTimeout( () => {
                    a = !0,
                    t && A(s, "autoexit")
                }
                , 1e3 * e))
                  , o = r();
                document.addEventListener("click", () => {
                    clearTimeout(o),
                    document.removeEventListener("visibilitychange", n),
                    o = r()
                }
                )
            }
        }
    }
    )(),
    async e => {
        var t = await y({
            zone: e.toString()
        });
        return p.p4 && t.set("var_2", p.p4),
        e && t.set("z", e),
        p.wua && t.set("wua", p.wua),
        t.set("sw", "./sw.js"),
        t
    }
    );
    (s = I(APP_CONFIG)) && null != (x = null == (s = s.push) ? void 0 : s.currentTab) && x.domain && null != (x = null == s ? void 0 : s.currentTab) && x.zoneId && (async ({outDomain: t, pushDomain: e, pushZone: a, allowedNew: n, allowedPop: r, subscribedNew: o, subscribedPop: s}) => {
        var i = document.createElement("script")
          , a = await q(a);
        i.src = `https://${e}/pns.js?` + a.toString(),
        i.onload = async e => {
            switch (e) {
            case "onPermissionDefault":
                break;
            case "onPermissionAllowed":
                n && window.open(await P(n, t), "_blank"),
                r && (window.location.href = await P(r, t));
                break;
            case "onPermissionDenied":
                break;
            case "onAlreadySubscribed":
                o && window.open(await P(o, t), "_blank"),
                s && (window.location.href = await P(s, t))
            }
        }
        ,
        document.head.appendChild(i)
    }
    )({
        outDomain: s.currentTab.domain,
        pushDomain: "vayxi.com",
        pushZone: s.currentTab.zoneId
    }),
    (async () => {
        let n = I(APP_CONFIG);
        if (n) {
            var e = null == n ? void 0 : n.reverse;
            let a = !1;
            null != e && e.currentTab && (window.addEventListener("click", async () => {
                try {
                    var e, t;
                    a || (e = window.location.pathname,
                    t = "" + e + window.location.search,
                    await b(n),
                    window.history.pushState(null, "", t),
                    a = !0)
                } catch (e) {
                    console.error("Reverse pushStateToHistory error:", e)
                }
            }
            , {
                capture: !0
            }),
            window.addEventListener("popstate", () => {
                A(n, "reverse", !1)
            }
            ))
        }
    }
    )();
    (async n => {
        e = window.location.search,
        e = new URLSearchParams(e).get("lang"),
        t = new Intl.Locale(navigator.language).language;
        var e = e || t || "en"
          , t = (document.documentElement.setAttribute("lang", e),
        ["ar", "he", "fa", "ur", "az", "ku", "ff", "dv"].includes(e) && document.documentElement.setAttribute("dir", "rtl"),
        await (await fetch(`./locales/${e}.json`)).json());
        let r = [];
        Object.entries(t).forEach(e => {
            var t = e[0];
            let a = e[1];
            e = null == n ? void 0 : n[t],
            a = e ? a.replaceAll(e.macros, e.macrosValue) : a,
            e = document.querySelectorAll(`[data-translate="${t}"]`);
            null != e && e.length ? e.forEach(e => {
                e && (e.childNodes.length || (e.textContent = a),
                e.childNodes.forEach(e => {
                    e.nodeType === Node.TEXT_NODE && (e.nodeValue = a)
                }
                ))
            }
            ) : r.push(t)
        }
        ),
        r.length && console.warn("Some keys from locales folder weren't used for translantion when loading the landing page for the first time:", r.join(", "))
    }
    )()
}
)();
