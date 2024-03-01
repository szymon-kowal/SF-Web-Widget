!(function () {
    "use strict";
    function d(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
    }
    function y(e, t) {
        var n =
            ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
        if (!n) {
            if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                    if (e) {
                        if ("string" == typeof e) return d(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                            "Object" === n &&
                                e.constructor &&
                                (n = e.constructor.name),
                            "Map" === n || "Set" === n
                                ? Array.from(e)
                                : "Arguments" === n ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        n
                                    )
                                  ? d(e, t)
                                  : void 0
                        );
                    }
                })(e)) ||
                (t && e && "number" == typeof e.length)
            ) {
                n && (e = n);
                var r = 0,
                    a = function () {};
                return {
                    s: a,
                    n: function () {
                        return r >= e.length
                            ? { done: !0 }
                            : { done: !1, value: e[r++] };
                    },
                    e: function (e) {
                        throw e;
                    },
                    f: a,
                };
            }
            throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
        }
        var o,
            i = !0,
            l = !1;
        return {
            s: function () {
                n = n.call(e);
            },
            n: function () {
                var e = n.next();
                return (i = e.done), e;
            },
            e: function (e) {
                (l = !0), (o = e);
            },
            f: function () {
                try {
                    i || null == n.return || n.return();
                } finally {
                    if (l) throw o;
                }
            },
        };
    }
    var f = "beforeend",
        m = "__toolbar-item",
        c = function (t, e, n, r) {
            var a = document.createElement("select");
            (a.dataset.commandId = t),
                (a.className = m),
                (a.title = e),
                a.addEventListener("change", function (e) {
                    return r(t, e.target.options[e.target.selectedIndex].value);
                });
            var o,
                i,
                l,
                d,
                c,
                s = y(n);
            try {
                for (s.s(); !(o = s.n()).done; ) {
                    var u = o.value;
                    a.insertAdjacentElement(
                        f,
                        ((i = u.value),
                        (l = u.text),
                        (d = u.selected),
                        (c = void 0),
                        ((c = document.createElement("option")).innerText = l),
                        i && c.setAttribute("value", i),
                        d && c.setAttribute("selected", d),
                        c)
                    );
                }
            } catch (e) {
                s.e(e);
            } finally {
                s.f();
            }
            return a;
        },
        s = function (e, t, n, r) {
            var a = document.createElement("button");
            return (
                (a.dataset.commandId = e),
                (a.className = m),
                (a.title = t),
                (a.type = "button"),
                a.insertAdjacentElement(f, n),
                a.addEventListener("click", function () {
                    return r(e);
                }),
                a
            );
        },
        u = function (e) {
            var t = document.createElement("i");
            return (t.className = e), t;
        },
        v = "no",
        p = function () {
            var e = document.createElement("span");
            return (e.className = "__toolbar-separator"), e;
        },
        r = function (e, t) {
            var n,
                r,
                a,
                o,
                i,
                l = document.createElement("div");
            return (
                (l.className = "__toolbar"),
                e.formatblock !== v &&
                    l.insertAdjacentElement(
                        f,
                        c(
                            "formatblock",
                            "Styles",
                            [
                                { value: "h1", text: "Title 1" },
                                { value: "h2", text: "Title 2" },
                                { value: "h3", text: "Title 3" },
                                { value: "h4", text: "Title 4" },
                                { value: "h5", text: "Title 5" },
                                { value: "h6", text: "Title 6" },
                                { value: "p", text: "Paragraph", selected: !0 },
                                { value: "pre", text: "Preformatted" },
                            ],
                            t
                        )
                    ),
                e.fontname !== v &&
                    l.insertAdjacentElement(
                        f,
                        c(
                            "fontname",
                            "Font",
                            [
                                { value: "serif", text: "Serif", selected: !0 },
                                { value: "sans-serif", text: "Sans Serif" },
                                { value: "monospace", text: "Monospace" },
                                { value: "cursive", text: "Cursive" },
                                { value: "fantasy", text: "Fantasy" },
                            ],
                            t
                        )
                    ),
                e.bold !== v &&
                    l.insertAdjacentElement(
                        f,
                        s("bold", "Bold", u("fas fa-bold"), t)
                    ),
                e.italic !== v &&
                    l.insertAdjacentElement(
                        f,
                        s("italic", "Italic", u("fas fa-italic"), t)
                    ),
                e.underline !== v &&
                    l.insertAdjacentElement(
                        f,
                        s("underline", "Underline", u("fas fa-underline"), t)
                    ),
                e.forecolor !== v &&
                    l.insertAdjacentElement(
                        f,
                        ((n = "forecolor"),
                        (r = "Text color"),
                        (a = "color"),
                        (o = t),
                        ((i =
                            document.createElement("input")).dataset.commandId =
                            n),
                        (i.className = m),
                        (i.title = r),
                        (i.type = a),
                        i.addEventListener("change", function (e) {
                            return o(n, e.target.value);
                        }),
                        i)
                    ),
                l.insertAdjacentElement(f, p()),
                e.justifyleft !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "justifyleft",
                            "Left align",
                            u("fas fa-align-left"),
                            t
                        )
                    ),
                e.justifycenter !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "justifycenter",
                            "Center align",
                            u("fas fa-align-center"),
                            t
                        )
                    ),
                e.justifyright !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "justifyright",
                            "Right align",
                            u("fas fa-align-right"),
                            t
                        )
                    ),
                l.insertAdjacentElement(f, p()),
                e.insertorderedlist !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "insertorderedlist",
                            "Numbered list",
                            u("fas fa-list-ol"),
                            t
                        )
                    ),
                e.insertunorderedlist !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "insertunorderedlist",
                            "Bulleted list",
                            u("fas fa-list-ul"),
                            t
                        )
                    ),
                e.outdent !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "outdent",
                            "Decrease indent",
                            u("fas fa-indent fa-flip-horizontal"),
                            t
                        )
                    ),
                e.indent !== v &&
                    l.insertAdjacentElement(
                        f,
                        s("indent", "Increase indent", u("fas fa-indent"), t)
                    ),
                l.insertAdjacentElement(f, p()),
                e.removeFormat !== v &&
                    l.insertAdjacentElement(
                        f,
                        s(
                            "removeFormat",
                            "Clear formatting",
                            u("fas fa-eraser"),
                            t
                        )
                    ),
                l
            );
        },
        e = function (n) {
            n.setAttribute("contentEditable", !0), (n.className = "__editor");
            var e = function (e, t) {
                document.execCommand(e, !1, t), n.focus();
            };
            e("defaultParagraphSeparator", "p");
            var p = r(n.dataset, e);
            n.insertAdjacentElement("beforebegin", p);
            var t = function () {
                var r,
                    t = y(p.querySelectorAll("select[data-command-id]"));
                try {
                    var e = function () {
                        var e = r.value,
                            t = document.queryCommandValue(e.dataset.commandId),
                            n = Array.from(e.options).find(function (e) {
                                return e.value === t;
                            });
                        e.selectedIndex = n ? n.index : -1;
                    };
                    for (t.s(); !(r = t.n()).done; ) e();
                } catch (e) {
                    t.e(e);
                } finally {
                    t.f();
                }
                var n,
                    a = y(p.querySelectorAll("button[data-command-id]"));
                try {
                    for (a.s(); !(n = a.n()).done; ) {
                        var o = n.value,
                            i = document.queryCommandState(o.dataset.commandId);
                        o.classList.toggle("active", i);
                    }
                } catch (e) {
                    a.e(e);
                } finally {
                    a.f();
                }
                var l,
                    d,
                    c,
                    s,
                    u,
                    f = y(p.querySelectorAll("input[data-command-id]"));
                try {
                    for (f.s(); !(l = f.n()).done; ) {
                        var m = l.value,
                            v = document.queryCommandValue(m.dataset.commandId);
                        m.value =
                            ((u = void 0),
                            (d = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(v)),
                            (c = parseInt(d[2])),
                            (s = parseInt(d[3])),
                            (u = parseInt(d[4]) | (s << 8) | (c << 16)),
                            d[1] + "#" + u.toString(16).padStart(6, "0"));
                    }
                } catch (e) {
                    f.e(e);
                } finally {
                    f.f();
                }
            };
            n.addEventListener("keydown", t),
                n.addEventListener("keyup", t),
                n.addEventListener("click", t),
                p.addEventListener("click", t);
        };
    !(function (e, t) {
        void 0 === t && (t = {});
        var n = t.insertAt;
        if (e && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = document.createElement("style");
            (a.type = "text/css"),
                "top" === n && r.firstChild
                    ? r.insertBefore(a, r.firstChild)
                    : r.appendChild(a),
                a.styleSheet
                    ? (a.styleSheet.cssText = e)
                    : a.appendChild(document.createTextNode(e));
        }
    })(
        ".__editor {\r\n  background: #ffffff;\r\n  border: solid 1px #e0e0e0;\r\n  color: #000000;\r\n  font-family: 'serif';\r\n  margin-top: 10px;\r\n  overflow: scroll;\r\n  padding: 10px;\r\n}\r\n\r\n.__editor:focus {\r\n  outline: none;\r\n}\r\n\r\n.__toolbar {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  padding: 5px;\r\n}\r\n\r\n.__toolbar-item {\r\n  background: #ffffff;\r\n  border: 0;\r\n  border-radius: 3px;\r\n  cursor: pointer;\r\n  margin-right: 7px;\r\n  min-width: 30px;\r\n  padding: 5px;\r\n}\r\n\r\n.__toolbar-item:hover,\r\n.__toolbar-item.active {\r\n  background: #f0f0f0;\r\n}\r\n\r\n.__toolbar-separator {\r\n  border-left: solid 1px #e0e0e0;\r\n  margin-right: 7px;\r\n}\r\n\r\n.__toolbar-separator:last-child {\r\n  display: none;\r\n}\r\n"
    ),
        document.querySelectorAll("[data-tiny-editor]").forEach(e),
        (window.__tinyEditor = { transformToEditor: e });
})();
//# sourceMappingURL=bundle.js.map
