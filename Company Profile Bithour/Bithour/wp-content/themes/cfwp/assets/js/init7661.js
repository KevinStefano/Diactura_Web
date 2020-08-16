function viewport() {
    var e = window,
        t = "inner";
    return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), {
        width: e[t + "Width"]
    }
}
if (jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        easeOutCubic: function (e, t, i, r, n) {
            return r * ((t = t / n - 1) * t * t + 1) + i
        },
        easeInOutCubic: function (e, t, i, r, n) {
            return (t /= n / 2) < 1 ? r / 2 * t * t * t + i : r / 2 * ((t -= 2) * t * t + 2) + i
        }
    }), function (A) {
        var r = "columnizer-original-dom";
        A.fn.columnize = function (O) {
            this.each(function () {
                var e = A(this);
                e.data(r, e.clone(!0, !0))
            }), this.cols = [], this.offset = 0, this.before = [], this.lastOther = 0, this.prevMax = 0, this.debug = 0, this.setColumnStart = null;
            var a = {
                width: 400,
                columns: 2,
                buildOnce: !1,
                overflow: !1,
                doneFunc: function () {},
                target: !1,
                ignoreImageLoading: !(this.elipsisText = ""),
                columnFloat: "left",
                lastNeverTallest: !0,
                accuracy: 1,
                precise: !1,
                manualBreaks: !1,
                disableSingle: !1,
                cssClassPrefix: "",
                elipsisText: "...",
                debug: 0
            };
            O = A.extend(a, O);
            var t = new Array;

            function c(e) {
                for (i = 0; i < t.length; i++) e.is("table") && (0 == e.children("tfoot").length && e.hasClass(t[i].tableID) && A(t[i].tfoot).clone().prependTo(e), 0 == e.children("thead").length && e.hasClass(t[i].tableID) && A(t[i].thead).clone().prependTo(e)), e.find("table ." + t[i].tableID).each(function () {
                    0 == A(this).children("tfoot").length && A(t[i].tfoot).clone().prependTo(this), 0 == A(this).children("thead").length && A(t[i].thead).clone().prependTo(this)
                })
            }

            function L(t, i) {
                try {
                    t.append(i)
                } catch (e) {
                    t[0].appendChild(i[0])
                }
            }
            return A("table").each(function () {
                A(this).hasClass("tableSaved") || (A(this).addClass("tableSaved"), A(this).addClass("tableID-" + t.length), t.push({
                    tableID: "tableID-" + t.length,
                    thead: A(this).find("thead:first").clone(),
                    tfoot: A(this).find("tfoot:first").clone()
                }))
            }), "string" == typeof O.width && (O.width = parseInt(O.width, 10), isNaN(O.width) && (O.width = a.width)), "function" == typeof O.setColumnStart && (this.setColumnStart = O.setColumnStart), "string" == typeof O.elipsisText && (this.elipsisText = O.elipsisText), O.debug && (this.debug = O.debug), O.setWidth || (O.precise ? O.setWidth = function (e) {
                return 100 / e
            } : O.setWidth = function (e) {
                return Math.floor(100 / e)
            }), this.each(function () {
                var w = O.target ? A(O.target) : A(this),
                    b = A(this).height(),
                    S = A("<div></div>"),
                    C = 0,
                    E = O.manualBreaks,
                    r = a.cssClassPrefix;
                "string" == typeof O.cssClassPrefix && (r = O.cssClassPrefix);
                var e, t;
                if (L(S, A(this).contents().clone(!0)), !O.ignoreImageLoading && !O.target && !w.data("imageLoaded") && (w.data("imageLoaded", !0), 0 < A(this).find("img").length)) {
                    var i = (e = A(this), t = S, function () {
                        e.data("firstImageLoaded") || (e.data("firstImageLoaded", "true"), L(e.empty(), t.children().clone(!0)), e.columnize(O))
                    });
                    return A(this).find("img").one("load", i), void A(this).find("img").one("abort", i)
                }

                function R(e, t) {
                    var i = t ? "." : "";
                    return r.length ? i + r + "-" + e : i + e
                }

                function D(e, t, i, r) {
                    for (;
                        (E || i.height() < r) && t[0].childNodes.length;) {
                        var n = t[0].childNodes[0];
                        if (A(n).find(R("columnbreak", !0)).length) return;
                        if (A(n).hasClass(R("columnbreak"))) return;
                        L(e, A(n))
                    }
                    if (0 !== e[0].childNodes.length) {
                        var a = e[0].childNodes,
                            o = a[a.length - 1];
                        e[0].removeChild(o);
                        var s = A(o);
                        if (3 == s[0].nodeType) {
                            var l, c = s[0].nodeValue,
                                d = O.width / 18;
                            O.accuracy && (d = O.accuracy);
                            for (var h = null; i.height() < r && c.length;) {
                                var f = c.indexOf(" ", d);
                                l = -1 != f ? c.substring(0, f) : c, h = document.createTextNode(l), L(e, A(h)), c = c.length > d && -1 != f ? c.substring(f) : ""
                            }
                            if (i.height() >= r && null !== h && (e[0].removeChild(h), c = h.nodeValue + c), !c.length) return;
                            s[0].nodeValue = c
                        }
                        return t.contents().length ? t.prepend(s) : L(t, s), 3 == s[0].nodeType
                    }
                }

                function P(e, t, i, r) {
                    if (e.contents(":last").find(R("columnbreak", !0)).length) c(t);
                    else if (e.contents(":last").hasClass(R("columnbreak"))) c(t);
                    else {
                        if (t.contents().length) {
                            var n = t.contents(":first");
                            if (void 0 === n.get(0) || 1 != n.get(0).nodeType) return;
                            var a = n.clone(!0);
                            if (n.hasClass(R("columnbreak"))) L(e, a), n.remove();
                            else if (E) L(e, a), n.remove();
                            else if (1 == a.get(0).nodeType && !a.hasClass(R("dontend")))
                                if (L(e, a), a.is("img") && i.height() < r + 20) n.remove();
                                else if (n.hasClass(R("dontsplit")) && i.height() < r + 20) n.remove();
                            else if (a.is("img") || n.hasClass(R("dontsplit"))) a.remove();
                            else {
                                if (a.empty(), D(a, n, i, r)) n.addClass(R("split"));
                                else {
                                    if (n.addClass(R("split")), "OL" == n.get(0).tagName) {
                                        var o = a.get(0).childElementCount + a.get(0).start;
                                        n.attr("start", o + 1)
                                    }
                                    n.children().length && P(a, n, i, r)
                                }
                                if (0 === a.get(0).childNodes.length) a.remove(), n.removeClass(R("split"));
                                else if (1 == a.get(0).childNodes.length) {
                                    var s = a.get(0).childNodes[0];
                                    if (3 == s.nodeType) {
                                        var l = s.nodeValue;
                                        /\S/.test(l) || (a.remove(), n.removeClass(R("split")))
                                    }
                                }
                            }
                        }
                        c(t)
                    }
                }

                function F(e) {
                    return 3 == e.nodeType ? !!/^\s+$/.test(e.nodeValue) && (!!e.previousSibling && F(e.previousSibling)) : 1 == e.nodeType && (!!A(e).hasClass(R("dontend")) || 0 !== e.childNodes.length && F(e.childNodes[e.childNodes.length - 1]))
                }

                function n() {
                    if (C != w.width()) {
                        C = w.width();
                        var e = Math.round(w.width() / O.width),
                            t = O.width,
                            i = O.height;
                        if (O.columns && (e = O.columns), E && (e = S.find(R("columnbreak", !0)).length + 1, t = !1), e <= 1 && !O.disableSingle) return function () {
                            if (!w.data("columnized") || 1 != w.children().length) {
                                if (w.data("columnized", !0), w.data("columnizing", !0), w.empty(), w.append(A("<div class='" + R("first") + " " + R("last") + " " + R("column") + " ' style='width:100%; float: " + O.columnFloat + ";'></div>")), $col = w.children().eq(w.children().length - 1), $destroyable = S.clone(!0), O.overflow) {
                                    for (targetHeight = O.overflow.height, D($col, $destroyable, $col, targetHeight), $destroyable.contents().find(":first-child").hasClass(R("dontend")) || P($col, $destroyable, $col, targetHeight); $col.contents(":last").length && F($col.contents(":last").get(0));) {
                                        var e = $col.contents(":last");
                                        e.remove(), $destroyable.prepend(e)
                                    }
                                    for (var t = "", i = document.createElement("DIV"); 0 < $destroyable[0].childNodes.length;) {
                                        var r = $destroyable[0].childNodes[0];
                                        if (r.attributes)
                                            for (var n = 0; n < r.attributes.length; n++) 0 === r.attributes[n].nodeName.indexOf("jQuery") && r.removeAttribute(r.attributes[n].nodeName);
                                        i.innerHTML = "", i.appendChild($destroyable[0].childNodes[0]), t += i.innerHTML
                                    }
                                    A(O.overflow.id)[0].innerHTML = t
                                } else L($col, $destroyable.contents());
                                w.data("columnizing", !1), O.overflow && O.overflow.doneFunc && O.overflow.doneFunc(), O.doneFunc()
                            }
                        }();
                        if (!w.data("columnizing")) {
                            w.data("columnized", !0), w.data("columnizing", !0), w.empty(), w.append(A("<div style='width:" + O.setWidth(e) + "%; float: " + O.columnFloat + ";'></div>")), L(c = w.children(":last"), S.clone()), b = c.height(), w.empty();
                            var r = b / e,
                                n = 3,
                                a = !1;
                            O.overflow ? (n = 1, r = O.overflow.height) : i && t && (n = 1, r = i, a = !0);
                            for (var o = 0; o < n && o < 20; o++) {
                                var s, l, c, d;
                                w.empty();
                                try {
                                    s = S.clone(!0)
                                } catch (e) {
                                    s = S.clone()
                                }
                                s.css("visibility", "hidden");
                                for (var h = 0; h < e; h++) l = 0 === h ? R("first") : "", l += " " + R("column"), l = h == e - 1 ? R("last") + " " + l : l, w.append(A("<div class='" + l + "' style='width:" + O.setWidth(e) + "%; float: " + O.columnFloat + ";'></div>"));
                                for (h = 0; h < e - (O.overflow ? 0 : 1) || a && s.contents().length;) {
                                    for (w.children().length <= h && w.append(A("<div class='" + l + "' style='width:" + O.setWidth(e) + "%; float: " + O.columnFloat + ";'></div>")), c = w.children().eq(h), a && c.width(t + "px"), D(c, s, c, r), P(c, s, c, r); c.contents(":last").length && F(c.contents(":last").get(0));)(d = c.contents(":last")).remove(), s.prepend(d);
                                    h++, 0 === c.contents().length && s.contents().length ? c.append(s.contents(":first")) : h != e - (O.overflow ? 0 : 1) || O.overflow || s.find(R("columnbreak", !0)).length && e++
                                }
                                if (O.overflow && !a) {
                                    if (document.all && -1 != navigator.appVersion.indexOf("MSIE 7.")) {
                                        for (var f = "", u = document.createElement("DIV"); 0 < s[0].childNodes.length;) {
                                            var m = s[0].childNodes[0];
                                            for (h = 0; h < m.attributes.length; h++) 0 === m.attributes[h].nodeName.indexOf("jQuery") && m.removeAttribute(m.attributes[h].nodeName);
                                            u.innerHTML = "", u.appendChild(s[0].childNodes[0]), f += u.innerHTML
                                        }
                                        A(O.overflow.id)[0].innerHTML = f
                                    } else A(O.overflow.id).empty().append(s.contents().clone(!0))
                                } else if (a) w.children().each(function (e) {
                                    (c = w.children().eq(e)).width(t + "px"), 0 === e ? c.addClass(R("first")) : e == w.children().length - 1 ? c.addClass(R("last")) : (c.removeClass(R("first")), c.removeClass(R("last")))
                                }), w.width(w.children().length * t + "px");
                                else {
                                    c = w.children().eq(w.children().length - 1), s.contents().each(function () {
                                        c.append(A(this))
                                    });
                                    c.height();
                                    var v = 0,
                                        g = 1e7,
                                        p = 0,
                                        y = !1,
                                        T = 0;
                                    w.children().each(function (r) {
                                        return function (e) {
                                            var t = r.children().eq(e);
                                            if (!t.children(":last").find(R("columnbreak", !0)).length) {
                                                var i = t.height();
                                                y = !1, v += i, p < i && (p = i, y = !0), i < g && (g = i), T++
                                            }
                                        }
                                    }(w));
                                    var x = v / T;
                                    0 === v ? o = n : O.lastNeverTallest && y ? (r += 30, o == n - 1 && n++) : 30 < p - g ? r = 30 + x : 20 < Math.abs(x - r) ? r = x : o = n
                                }
                                w.append(A("<br style='clear:both;'>"))
                            }
                            w.find(R("column", !0)).find(":first" + R("removeiffirst", !0)).remove(), w.find(R("column", !0)).find(":last" + R("removeiflast", !0)).remove(), w.find(R("split", !0)).find(":first" + R("removeiffirst", !0)).remove(), w.find(R("split", !0)).find(":last" + R("removeiflast", !0)).remove(), w.data("columnizing", !1), O.overflow && O.overflow.doneFunc(), O.doneFunc()
                        }
                    }
                }
                w.empty(), n(), O.buildOnce || A(window).on("resize", function () {
                    O.buildOnce || (w.data("timeout") && clearTimeout(w.data("timeout")), w.data("timeout", setTimeout(n, 1500)))
                })
            })
        }, A.fn.uncolumnize = function () {
            this.each(function () {
                var e, t = A(this);
                (e = t.data(r)) && t.replaceWith(e)
            })
        }, A.fn.renumberByJS = function (e, t, i, r) {
            if (this.setList = function (e, t, i) {
                    var r, n = this.before.parents();
                    if ((r = A(e[this.offset - 1]).find(">*")).last()[0].tagName != i.toUpperCase()) return 0;
                    r = r.length;
                    var a, o = 1;
                    if (o = this.lastOther <= 0 ? this.before.children().length + 1 : A(n[this.lastOther]).children().length + 1, A(e[this.offset]).find(i + ":first li.split").length) {
                        var s = A(e[this.offset - 1]).find(i + ":last li:last");
                        if ("" !== this.elipsisText && !A(e[this.offset - 1]).find(i + ":last ~ div").length && !A(e[this.offset - 1]).find(i + ":last ~ p").length && 0 == A(s).find("ul, ol, dl").length) {
                            var l = s.last().text(),
                                c = l.length;
                            ";" == l.substring(c - 1) ? l.substring(c - 4) != this.elipsisText + ";" && (l = l.substring(0, c - 1) + this.elipsisText + ";") : l.substring(c - 3) != this.elipsisText && (l += this.elipsisText), s.last().text(l)
                        }
                        0 == A(e[this.offset]).find(i + ":first >li.split >" + i).length && o--
                    }(1 == r && (o += this.prevMax), 1 < this.nest) ? (o--, 0 < (a = A(e[this.offset - 1]).find(i + ":first li.split:first")).length && o--, (a = A(e[this.offset]).find(i + ":first li:first").clone()).children().remove(), 0 < A.trim(a.text()).length && (o++, 0 == A(e[this.offset - 1]).find(">" + i + ":last ").children().length && o--)) : 0 < (a = A(e[this.offset]).find(i + ":first li:first " + i + ".split li.split")).length && o--;
                    return 0 < o && ("function" == typeof this.setColumnStart ? this.setColumnStart(t, o) : t.attr("start", o)), 0
                }, void 0 === i && (i = !1), void 0 === r && (r = !1), !i && !r) throw "renumberByJS(): Bad param, must pass an id or a class";
            var n = "";
            this.prevMax = 1, n = r ? "." + r : "#" + i;
            var a = e.toLowerCase(),
                o = e.toUpperCase();
            for (this.cols = A(n), this.before = A(this.cols[0]).find(a + ":last"), this.prevMax = this.before.children().length, this.offset = 1; this.offset < this.cols.length; this.offset++)
                if (this.offset % t != 0) {
                    if (this.before = A(this.cols[this.offset - 1]).find(a + ":last"), this.before.length) {
                        var s = A(this.cols[this.offset]).find(a + ":first");
                        if (A(this.cols[this.offset]).find("*:first")[0] !== s[0]) continue;
                        var l = this.before.parents();
                        this.lastOther = 0;
                        for (; this.lastOther < l.length; this.lastOther++)
                            if (l[this.lastOther].tagName != o && "LI" != l[this.lastOther].tagName) {
                                this.lastOther--;
                                break
                            } this.nest = 1, A(this.cols[this.offset]).find(">" + a + ":first li " + a + ":first").length && (this.nest = 2), this.setList(this.cols, s, a), this.lastOther--, (s = A(this.cols[this.offset]).find(a + ":first li " + a + ":first")).length && (this.before = A(this.cols[this.offset - 1]).find(">" + a + ":last li " + a + ":last"), this.prevMax = 0, this.nest = 1, this.setList(this.cols, s, a));
                        var c = A(this.cols[this.offset - 1]).find(">" + a + ":last");
                        this.prevMax = c.children().length
                    }
                } else this.prevMax = 1;
            return 0
        }
    }(jQuery), !$("html").hasClass("ie11")) {
    var canvas = $("#interactive-bgr canvas").get(0),
        canvasInitialized = !1;
    canvas.style.visibility = "hidden", resizeCanvas();
    var config = {
        SIM_RESOLUTION: 32,
        DYE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1,
        VELOCITY_DISSIPATION: .2,
        PRESSURE: .8,
        PRESSURE_ITERATIONS: 2,
        CURL: 0,
        SPLAT_RADIUS: .65,
        SPLAT_FORCE: 676,
        SHADING: !1,
        COLORFUL: !0,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: !1,
        BACK_COLOR: {
            r: 1,
            g: 1,
            b: 1
        },
        TRANSPARENT: !1,
        BLOOM: !0,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: .43,
        BLOOM_THRESHOLD: .21,
        BLOOM_SOFT_KNEE: .7,
        SUNRAYS: !0,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1
    };

    function pointerPrototype() {
        this.id = -1, this.texcoordX = 0, this.texcoordY = 0, this.prevTexcoordX = 0, this.prevTexcoordY = 0, this.deltaX = 0, this.deltaY = 0, this.down = !1, this.moved = !1, this.color = [30, 0, 300]
    }
    var pointers = [],
        splatStack = [];
    pointers.push(new pointerPrototype);
    var ref = getWebGLContext(canvas),
        gl = ref.gl,
        ext = ref.ext;

    function getWebGLContext(e) {
        var t, i, r = {
                alpha: !1,
                depth: !1,
                stencil: !1,
                antialias: !1,
                preserveDrawingBuffer: !1
            },
            n = e.getContext("webgl2", r),
            a = !!n;
        a || (n = e.getContext("webgl", r) || e.getContext("experimental-webgl", r)), i = a ? (n.getExtension("EXT_color_buffer_float"), n.getExtension("OES_texture_float_linear")) : (t = n.getExtension("OES_texture_half_float"), n.getExtension("OES_texture_half_float_linear")), n.clearColor(0, 0, 0, 1);
        var o, s, l, c = a ? n.HALF_FLOAT : t.HALF_FLOAT_OES;
        return l = a ? (o = getSupportedFormat(n, n.RGBA16F, n.RGBA, c), s = getSupportedFormat(n, n.RG16F, n.RG, c), getSupportedFormat(n, n.R16F, n.RED, c)) : (o = getSupportedFormat(n, n.RGBA, n.RGBA, c), s = getSupportedFormat(n, n.RGBA, n.RGBA, c), getSupportedFormat(n, n.RGBA, n.RGBA, c)), {
            gl: n,
            ext: {
                formatRGBA: o,
                formatRG: s,
                formatR: l,
                halfFloatTexType: c,
                supportLinearFiltering: i
            }
        }
    }

    function getSupportedFormat(e, t, i, r) {
        if (!supportRenderTextureFormat(e, t, i, r)) switch (t) {
            case e.R16F:
                return getSupportedFormat(e, e.RG16F, e.RG, r);
            case e.RG16F:
                return getSupportedFormat(e, e.RGBA16F, e.RGBA, r);
            default:
                return null
        }
        return {
            internalFormat: t,
            format: i
        }
    }

    function supportRenderTextureFormat(e, t, i, r) {
        var n = e.createTexture();
        e.bindTexture(e.TEXTURE_2D, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, i, r, null);
        var a = e.createFramebuffer();
        return e.bindFramebuffer(e.FRAMEBUFFER, a), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) == e.FRAMEBUFFER_COMPLETE
    }

    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent)
    }

    function framebufferToTexture(e) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, e.fbo);
        var t = e.width * e.height * 4,
            i = new Float32Array(t);
        return gl.readPixels(0, 0, e.width, e.height, gl.RGBA, gl.FLOAT, i), i
    }

    function normalizeTexture(e, t, i) {
        for (var r = new Uint8Array(e.length), n = 0, a = i - 1; 0 <= a; a--)
            for (var o = 0; o < t; o++) {
                var s = a * t * 4 + 4 * o;
                r[s] = 255 * clamp01(e[n + 0]), r[1 + s] = 255 * clamp01(e[n + 1]), r[2 + s] = 255 * clamp01(e[n + 2]), r[3 + s] = 255 * clamp01(e[n + 3]), n += 4
            }
        return r
    }

    function clamp01(e) {
        return Math.min(Math.max(e, 0), 1)
    }
    isMobile() && (config.DYE_RESOLUTION = 512), ext.supportLinearFiltering || (config.DYE_RESOLUTION = 512, config.SHADING = !1, config.BLOOM = !1, config.SUNRAYS = !1);
    var Material = function (e, t) {
        this.vertexShader = e, this.fragmentShaderSource = t, this.programs = [], this.activeProgram = null, this.uniforms = []
    };
    Material.prototype.setKeywords = function (e) {
        for (var t = 0, i = 0; i < e.length; i++) t += hashCode(e[i]);
        var r = this.programs[t];
        if (null == r) {
            var n = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, e);
            r = createProgram(this.vertexShader, n), this.programs[t] = r
        }
        r != this.activeProgram && (this.uniforms = getUniforms(r), this.activeProgram = r)
    }, Material.prototype.bind = function () {
        gl.useProgram(this.activeProgram)
    };
    var Program = function (e, t) {
        this.uniforms = {}, this.program = createProgram(e, t), this.uniforms = getUniforms(this.program)
    };

    function createProgram(e, t) {
        var i = gl.createProgram();
        if (gl.attachShader(i, e), gl.attachShader(i, t), gl.linkProgram(i), !gl.getProgramParameter(i, gl.LINK_STATUS)) throw gl.getProgramInfoLog(i);
        return i
    }

    function getUniforms(e) {
        for (var t = [], i = gl.getProgramParameter(e, gl.ACTIVE_UNIFORMS), r = 0; r < i; r++) {
            var n = gl.getActiveUniform(e, r).name;
            t[n] = gl.getUniformLocation(e, n)
        }
        return t
    }

    function compileShader(e, t, i) {
        t = addKeywords(t, i);
        var r = gl.createShader(e);
        if (gl.shaderSource(r, t), gl.compileShader(r), !gl.getShaderParameter(r, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(r);
        return r
    }

    function addKeywords(e, t) {
        if (null == t) return e;
        var i = "";
        return t.forEach(function (e) {
            i += "#define " + e + "\n"
        }), i + e
    }
    Program.prototype.bind = function () {
        gl.useProgram(this.program)
    };
    var dye, velocity, divergence, curl, pressure, bloom, sunrays, sunraysTemp, baseVertexShader = compileShader(gl.VERTEX_SHADER, "\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),
        blurVertexShader = compileShader(gl.VERTEX_SHADER, "\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        float offset = 1.33333333;\n        vL = vUv - texelSize * offset;\n        vR = vUv + texelSize * offset;\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),
        blurShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;\n        sum += texture2D(uTexture, vL) * 0.35294117;\n        sum += texture2D(uTexture, vR) * 0.35294117;\n        gl_FragColor = sum;\n    }\n"),
        copyShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        gl_FragColor = texture2D(uTexture, vUv);\n    }\n"),
        clearShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n"),
        colorShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n\n    uniform vec4 color;\n\n    void main () {\n        gl_FragColor = color;\n    }\n"),
        checkerboardShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float aspectRatio;\n\n    #define SCALE 25.0\n\n    void main () {\n        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));\n        float v = mod(uv.x + uv.y, 2.0);\n        v = v * 0.1 + 0.8;\n        gl_FragColor = vec4(vec3(v), 1.0);\n    }\n"),
        displayShaderSource = "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform sampler2D uBloom;\n    uniform sampler2D uSunrays;\n    uniform sampler2D uDithering;\n    uniform vec2 ditherScale;\n    uniform vec2 texelSize;\n\n    vec3 linearToGamma (vec3 color) {\n        color = max(color, vec3(0));\n        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n    }\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n\n    #ifdef SHADING\n        vec3 lc = texture2D(uTexture, vL).rgb;\n        vec3 rc = texture2D(uTexture, vR).rgb;\n        vec3 tc = texture2D(uTexture, vT).rgb;\n        vec3 bc = texture2D(uTexture, vB).rgb;\n\n        float dx = length(rc) - length(lc);\n        float dy = length(tc) - length(bc);\n\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        c *= diffuse;\n    #endif\n\n    #ifdef BLOOM\n        vec3 bloom = texture2D(uBloom, vUv).rgb;\n    #endif\n\n    #ifdef SUNRAYS\n        float sunrays = texture2D(uSunrays, vUv).r;\n        c *= sunrays;\n    #ifdef BLOOM\n        bloom *= sunrays;\n    #endif\n    #endif\n\n    #ifdef BLOOM\n        float noise = texture2D(uDithering, vUv * ditherScale).r;\n        noise = noise * 2.0 - 1.0;\n        bloom += noise / 255.0;\n        bloom = linearToGamma(bloom);\n        c += bloom;\n    #endif\n\n        float a = max(c.r, max(c.g, c.b));\n        gl_FragColor = vec4(c, a);\n    }\n",
        bloomPrefilterShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform vec3 curve;\n    uniform float threshold;\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n        float br = max(c.r, max(c.g, c.b));\n        float rq = clamp(br - curve.x, 0.0, curve.y);\n        rq = curve.z * rq * rq;\n        c *= max(rq, br - threshold) / max(br, 0.0001);\n        gl_FragColor = vec4(c, 0.0);\n    }\n"),
        bloomBlurShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 sum = vec4(0.0);\n        sum += texture2D(uTexture, vL);\n        sum += texture2D(uTexture, vR);\n        sum += texture2D(uTexture, vT);\n        sum += texture2D(uTexture, vB);\n        sum *= 0.25;\n        gl_FragColor = sum;\n    }\n"),
        bloomFinalShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform float intensity;\n\n    void main () {\n        vec4 sum = vec4(0.0);\n        sum += texture2D(uTexture, vL);\n        sum += texture2D(uTexture, vR);\n        sum += texture2D(uTexture, vT);\n        sum += texture2D(uTexture, vB);\n        sum *= 0.25;\n        gl_FragColor = sum * intensity;\n    }\n"),
        sunraysMaskShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 c = texture2D(uTexture, vUv);\n        float br = max(c.r, max(c.g, c.b));\n        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);\n        gl_FragColor = c;\n    }\n"),
        sunraysShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float weight;\n\n    #define ITERATIONS 16\n\n    void main () {\n        float Density = 0.3;\n        float Decay = 0.95;\n        float Exposure = 0.7;\n\n        vec2 coord = vUv;\n        vec2 dir = vUv - 0.5;\n\n        dir *= 1.0 / float(ITERATIONS) * Density;\n        float illuminationDecay = 1.0;\n\n        float color = texture2D(uTexture, vUv).a;\n\n        for (int i = 0; i < ITERATIONS; i++)\n        {\n            coord -= dir;\n            float col = texture2D(uTexture, coord).a;\n            color += col * illuminationDecay * weight;\n            illuminationDecay *= Decay;\n        }\n\n        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);\n    }\n"),
        splatShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n"),
        advectionShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n\n    void main () {\n    #ifdef MANUAL_FILTERING\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        vec4 result = bilerp(uSource, coord, dyeTexelSize);\n    #else\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        vec4 result = texture2D(uSource, coord);\n    #endif\n        float decay = 1.0 + dissipation * dt;\n        gl_FragColor = result / decay;\n    }", ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]),
        divergenceShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n"),
        curlShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n"),
        vorticityShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n\n        vec2 vel = texture2D(uVelocity, vUv).xy;\n        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n    }\n"),
        pressureShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n"),
        gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"),
        blit = (gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()), gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW), gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()), gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW), gl.vertexAttribPointer(0, 2, gl.FLOAT, !1, 0, 0), gl.enableVertexAttribArray(0), function (e) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, e), gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
        }),
        bloomFramebuffers = [],
        ditheringTexture = createTextureAsync(themeUrl + "/assets/img/noise.png"),
        blurProgram = new Program(blurVertexShader, blurShader),
        copyProgram = new Program(baseVertexShader, copyShader),
        clearProgram = new Program(baseVertexShader, clearShader),
        colorProgram = new Program(baseVertexShader, colorShader),
        checkerboardProgram = new Program(baseVertexShader, checkerboardShader),
        bloomPrefilterProgram = new Program(baseVertexShader, bloomPrefilterShader),
        bloomBlurProgram = new Program(baseVertexShader, bloomBlurShader),
        bloomFinalProgram = new Program(baseVertexShader, bloomFinalShader),
        sunraysMaskProgram = new Program(baseVertexShader, sunraysMaskShader),
        sunraysProgram = new Program(baseVertexShader, sunraysShader),
        splatProgram = new Program(baseVertexShader, splatShader),
        advectionProgram = new Program(baseVertexShader, advectionShader),
        divergenceProgram = new Program(baseVertexShader, divergenceShader),
        curlProgram = new Program(baseVertexShader, curlShader),
        vorticityProgram = new Program(baseVertexShader, vorticityShader),
        pressureProgram = new Program(baseVertexShader, pressureShader),
        gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader),
        displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers() {
        var e = getResolution(config.SIM_RESOLUTION),
            t = getResolution(config.DYE_RESOLUTION),
            i = ext.halfFloatTexType,
            r = ext.formatRGBA,
            n = ext.formatRG,
            a = ext.formatR,
            o = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        dye = null == dye ? createDoubleFBO(t.width, t.height, r.internalFormat, r.format, i, o) : resizeDoubleFBO(dye, t.width, t.height, r.internalFormat, r.format, i, o), velocity = null == velocity ? createDoubleFBO(e.width, e.height, n.internalFormat, n.format, i, o) : resizeDoubleFBO(velocity, e.width, e.height, n.internalFormat, n.format, i, o), divergence = createFBO(e.width, e.height, a.internalFormat, a.format, i, gl.NEAREST), curl = createFBO(e.width, e.height, a.internalFormat, a.format, i, gl.NEAREST), pressure = createDoubleFBO(e.width, e.height, a.internalFormat, a.format, i, gl.NEAREST), initBloomFramebuffers(), initSunraysFramebuffers()
    }

    function initBloomFramebuffers() {
        var e = getResolution(config.BLOOM_RESOLUTION),
            t = ext.halfFloatTexType,
            i = ext.formatRGBA,
            r = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        bloom = createFBO(e.width, e.height, i.internalFormat, i.format, t, r);
        for (var n = bloomFramebuffers.length = 0; n < config.BLOOM_ITERATIONS; n++) {
            var a = e.width >> n + 1,
                o = e.height >> n + 1;
            if (a < 2 || o < 2) break;
            var s = createFBO(a, o, i.internalFormat, i.format, t, r);
            bloomFramebuffers.push(s)
        }
    }

    function initSunraysFramebuffers() {
        var e = getResolution(config.SUNRAYS_RESOLUTION),
            t = ext.halfFloatTexType,
            i = ext.formatR,
            r = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        sunrays = createFBO(e.width, e.height, i.internalFormat, i.format, t, r), sunraysTemp = createFBO(e.width, e.height, i.internalFormat, i.format, t, r)
    }

    function createFBO(e, t, i, r, n, a) {
        gl.activeTexture(gl.TEXTURE0);
        var o = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, o), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, a), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, a), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.texImage2D(gl.TEXTURE_2D, 0, i, e, t, 0, r, n, null);
        var s = gl.createFramebuffer();
        return gl.bindFramebuffer(gl.FRAMEBUFFER, s), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, o, 0), gl.viewport(0, 0, e, t), gl.clear(gl.COLOR_BUFFER_BIT), {
            texture: o,
            fbo: s,
            width: e,
            height: t,
            texelSizeX: 1 / e,
            texelSizeY: 1 / t,
            attach: function (e) {
                return gl.activeTexture(gl.TEXTURE0 + e), gl.bindTexture(gl.TEXTURE_2D, o), e
            }
        }
    }

    function createDoubleFBO(e, t, i, r, n, a) {
        var o = createFBO(e, t, i, r, n, a),
            s = createFBO(e, t, i, r, n, a);
        return {
            width: e,
            height: t,
            texelSizeX: o.texelSizeX,
            texelSizeY: o.texelSizeY,
            get read() {
                return o
            },
            set read(e) {
                o = e
            },
            get write() {
                return s
            },
            set write(e) {
                s = e
            },
            swap: function () {
                var e = o;
                o = s, s = e
            }
        }
    }

    function resizeFBO(e, t, i, r, n, a, o) {
        var s = createFBO(t, i, r, n, a, o);
        return copyProgram.bind(), gl.uniform1i(copyProgram.uniforms.uTexture, e.attach(0)), blit(s.fbo), s
    }

    function resizeDoubleFBO(e, t, i, r, n, a, o) {
        return e.width == t && e.height == i || (e.read = resizeFBO(e.read, t, i, r, n, a, o), e.write = createFBO(t, i, r, n, a, o), e.width = t, e.height = i, e.texelSizeX = 1 / t, e.texelSizeY = 1 / i), e
    }

    function createTextureAsync(e) {
        var t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));
        var i = {
                texture: t,
                width: 1,
                height: 1,
                attach: function (e) {
                    return gl.activeTexture(gl.TEXTURE0 + e), gl.bindTexture(gl.TEXTURE_2D, t), e
                }
            },
            r = new Image;
        return r.onload = function () {
            i.width = r.width, i.height = r.height, gl.bindTexture(gl.TEXTURE_2D, t), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, r)
        }, r.src = e, i
    }

    function updateKeywords() {
        var e = [];
        config.SHADING && e.push("SHADING"), config.BLOOM && e.push("BLOOM"), config.SUNRAYS && e.push("SUNRAYS"), displayMaterial.setKeywords(e)
    }
    updateKeywords(), initFramebuffers();
    var lastUpdateTime = Date.now(),
        colorUpdateTimer = 0;

    function update() {
        var e = calcDeltaTime();
        resizeCanvas() && initFramebuffers(), updateColors(e), applyInputs(), config.PAUSED || step(e), render(null), requestAnimationFrame(update)
    }

    function calcDeltaTime() {
        var e = Date.now(),
            t = (e - lastUpdateTime) / 1e3;
        return t = Math.min(t, .016666), lastUpdateTime = e, t
    }

    function resizeCanvas() {
        var e = scaleByPixelRatio(canvas.clientWidth),
            t = scaleByPixelRatio(canvas.clientHeight);
        return (canvas.width != e || canvas.height != t) && (canvas.width = e, canvas.height = t, !0)
    }

    function updateColors(e) {
        config.COLORFUL && 1 <= (colorUpdateTimer += e * config.COLOR_UPDATE_SPEED) && (colorUpdateTimer = wrap(colorUpdateTimer, 0, 1), pointers.forEach(function (e) {
            e.color = generateColor()
        }))
    }

    function applyInputs() {
        0 < splatStack.length && multipleSplats(splatStack.pop()), pointers.forEach(function (e) {
            e.moved && (e.moved = !1, splatPointer(e))
        })
    }

    function step(e) {
        gl.disable(gl.BLEND), gl.viewport(0, 0, velocity.width, velocity.height), curlProgram.bind(), gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0)), blit(curl.fbo), vorticityProgram.bind(), gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0)), gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1)), gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL), gl.uniform1f(vorticityProgram.uniforms.dt, e), blit(velocity.write.fbo), velocity.swap(), divergenceProgram.bind(), gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0)), blit(divergence.fbo), clearProgram.bind(), gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0)), gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE), blit(pressure.write.fbo), pressure.swap(), pressureProgram.bind(), gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        for (var t = 0; t < config.PRESSURE_ITERATIONS; t++) gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1)), blit(pressure.write.fbo), pressure.swap();
        gradienSubtractProgram.bind(), gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0)), gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1)), blit(velocity.write.fbo), velocity.swap(), advectionProgram.bind(), gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY), ext.supportLinearFiltering || gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
        var i = velocity.read.attach(0);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, i), gl.uniform1i(advectionProgram.uniforms.uSource, i), gl.uniform1f(advectionProgram.uniforms.dt, e), gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION), blit(velocity.write.fbo), velocity.swap(), gl.viewport(0, 0, dye.width, dye.height), ext.supportLinearFiltering || gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY), gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0)), gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1)), gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION), blit(dye.write.fbo), dye.swap()
    }

    function render(e) {
        config.BLOOM && applyBloom(dye.read, bloom), config.SUNRAYS && (applySunrays(dye.read, dye.write, sunrays), blur(sunrays, sunraysTemp, 1)), null != e && config.TRANSPARENT ? gl.disable(gl.BLEND) : (gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA), gl.enable(gl.BLEND));
        var t = null == e ? gl.drawingBufferWidth : e.width,
            i = null == e ? gl.drawingBufferHeight : e.height;
        gl.viewport(0, 0, t, i);
        var r = null == e ? null : e.fbo;
        config.TRANSPARENT || drawColor(r, normalizeColor(config.BACK_COLOR)), null == e && config.TRANSPARENT && drawCheckerboard(r), drawDisplay(r, t, i)
    }

    function drawColor(e, t) {
        colorProgram.bind(), gl.uniform4f(colorProgram.uniforms.color, t.r, t.g, t.b, 1), blit(e)
    }

    function drawCheckerboard(e) {
        checkerboardProgram.bind(), gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, canvas.width / canvas.height), blit(e)
    }

    function drawDisplay(e, t, i) {
        if (displayMaterial.bind(), config.SHADING && gl.uniform2f(displayMaterial.uniforms.texelSize, 1 / t, 1 / i), gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0)), config.BLOOM) {
            gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1)), gl.uniform1i(displayMaterial.uniforms.uDithering, ditheringTexture.attach(2));
            var r = getTextureScale(ditheringTexture, t, i);
            gl.uniform2f(displayMaterial.uniforms.ditherScale, r.x, r.y)
        }
        config.SUNRAYS && gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3)), blit(e)
    }

    function applyBloom(e, t) {
        if (!(bloomFramebuffers.length < 2)) {
            var i = t;
            gl.disable(gl.BLEND), bloomPrefilterProgram.bind();
            var r = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 1e-4,
                n = config.BLOOM_THRESHOLD - r,
                a = 2 * r,
                o = .25 / r;
            gl.uniform3f(bloomPrefilterProgram.uniforms.curve, n, a, o), gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD), gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, e.attach(0)), gl.viewport(0, 0, i.width, i.height), blit(i.fbo), bloomBlurProgram.bind();
            for (var s = 0; s < bloomFramebuffers.length; s++) {
                var l = bloomFramebuffers[s];
                gl.uniform2f(bloomBlurProgram.uniforms.texelSize, i.texelSizeX, i.texelSizeY), gl.uniform1i(bloomBlurProgram.uniforms.uTexture, i.attach(0)), gl.viewport(0, 0, l.width, l.height), blit(l.fbo), i = l
            }
            gl.blendFunc(gl.ONE, gl.ONE), gl.enable(gl.BLEND);
            for (var c = bloomFramebuffers.length - 2; 0 <= c; c--) {
                var d = bloomFramebuffers[c];
                gl.uniform2f(bloomBlurProgram.uniforms.texelSize, i.texelSizeX, i.texelSizeY), gl.uniform1i(bloomBlurProgram.uniforms.uTexture, i.attach(0)), gl.viewport(0, 0, d.width, d.height), blit(d.fbo), i = d
            }
            gl.disable(gl.BLEND), bloomFinalProgram.bind(), gl.uniform2f(bloomFinalProgram.uniforms.texelSize, i.texelSizeX, i.texelSizeY), gl.uniform1i(bloomFinalProgram.uniforms.uTexture, i.attach(0)), gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY), gl.viewport(0, 0, t.width, t.height), blit(t.fbo)
        }
    }

    function applySunrays(e, t, i) {
        gl.disable(gl.BLEND), sunraysMaskProgram.bind(), gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, e.attach(0)), gl.viewport(0, 0, t.width, t.height), blit(t.fbo), sunraysProgram.bind(), gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT), gl.uniform1i(sunraysProgram.uniforms.uTexture, t.attach(0)), gl.viewport(0, 0, i.width, i.height), blit(i.fbo)
    }

    function blur(e, t, i) {
        blurProgram.bind();
        for (var r = 0; r < i; r++) gl.uniform2f(blurProgram.uniforms.texelSize, e.texelSizeX, 0), gl.uniform1i(blurProgram.uniforms.uTexture, e.attach(0)), blit(t.fbo), gl.uniform2f(blurProgram.uniforms.texelSize, 0, e.texelSizeY), gl.uniform1i(blurProgram.uniforms.uTexture, t.attach(0)), blit(e.fbo)
    }

    function splatPointer(e) {
        var t = e.deltaX * config.SPLAT_FORCE,
            i = e.deltaY * config.SPLAT_FORCE;
        splat(e.texcoordX, e.texcoordY, t, i, e.color)
    }

    function multipleSplats(e) {
        for (var t = 0; t < e; t++) {
            var i = generateColor();
            i.r *= 10, i.g *= 10, i.b *= 10, splat(Math.random(), Math.random(), 1e3 * (Math.random() - .5), 1e3 * (Math.random() - .5), i)
        }
    }

    function subtleMultipleSplats(e) {
        for (var t = 0; t < e; t++) {
            var i = generateColor();
            i.r *= 4, i.g *= 4, i.b *= 4, splat(Math.random(), Math.random(), 50 * (Math.random() - .5), 50 * (Math.random() - .5), i)
        }
    }

    function splat(e, t, i, r, n) {
        gl.viewport(0, 0, velocity.width, velocity.height), splatProgram.bind(), gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0)), gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height), gl.uniform2f(splatProgram.uniforms.point, e, t), gl.uniform3f(splatProgram.uniforms.color, i, r, 0), gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100)), blit(velocity.write.fbo), velocity.swap(), gl.viewport(0, 0, dye.width, dye.height), gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0)), gl.uniform3f(splatProgram.uniforms.color, n.r, n.g, n.b), blit(dye.write.fbo), dye.swap()
    }

    function correctRadius(e) {
        var t = canvas.width / canvas.height;
        return 1 < t && (e *= t), e
    }

    function updatePointerDownData(e, t, i, r) {
        e.id = t, e.down = !0, e.moved = !1, e.texcoordX = i / canvas.width, e.texcoordY = 1 - r / canvas.height, e.prevTexcoordX = e.texcoordX, e.prevTexcoordY = e.texcoordY, e.deltaX = 0, e.deltaY = 0, e.color = generateColor()
    }

    function updatePointerMoveData(e, t, i) {
        e.prevTexcoordX = e.texcoordX, e.prevTexcoordY = e.texcoordY, e.texcoordX = t / canvas.width, e.texcoordY = 1 - i / canvas.height, e.deltaX = correctDeltaX(e.texcoordX - e.prevTexcoordX), e.deltaY = correctDeltaY(e.texcoordY - e.prevTexcoordY), e.moved = 0 < Math.abs(e.deltaX) || 0 < Math.abs(e.deltaY)
    }

    function updatePointerUpData(e) {
        e.down = !1
    }

    function correctDeltaX(e) {
        var t = canvas.width / canvas.height;
        return t < 1 && (e *= t), e
    }

    function correctDeltaY(e) {
        var t = canvas.width / canvas.height;
        return 1 < t && (e /= t), e
    }

    function generateColor() {
        var e = HSVtoRGB(Math.random(), 1, 1);
        return e.r *= .15, e.g *= .15, e.b *= .15, e
    }

    function HSVtoRGB(e, t, i) {
        var r, n, a, o, s, l, c, d;
        switch (l = i * (1 - t), c = i * (1 - (s = 6 * e - (o = Math.floor(6 * e))) * t), d = i * (1 - (1 - s) * t), o % 6) {
            case 0:
                r = i, n = d, a = l;
                break;
            case 1:
                r = c, n = i, a = l;
                break;
            case 2:
                r = l, n = i, a = d;
                break;
            case 3:
                r = l, n = c, a = i;
                break;
            case 4:
                r = d, n = l, a = i;
                break;
            case 5:
                r = i, n = l, a = c
        }
        return {
            r: r,
            g: 0 * n,
            b: a
        }
    }

    function normalizeColor(e) {
        return {
            r: e.r / 255,
            g: e.g / 255,
            b: e.b / 255
        }
    }

    function wrap(e, t, i) {
        var r = i - t;
        return 0 == r ? t : (e - t) % r + t
    }

    function getResolution(e) {
        var t = gl.drawingBufferWidth / gl.drawingBufferHeight;
        t < 1 && (t = 1 / t);
        var i = Math.round(e),
            r = Math.round(e * t);
        return gl.drawingBufferWidth > gl.drawingBufferHeight ? {
            width: r,
            height: i
        } : {
            width: i,
            height: r
        }
    }

    function getTextureScale(e, t, i) {
        return {
            x: t / e.width,
            y: i / e.height
        }
    }

    function scaleByPixelRatio(e) {
        return Math.floor(+e)
    }

    function hashCode(e) {
        if (0 == e.length) return 0;
        for (var t = 0, i = 0; i < e.length; i++) t = (t << 5) - t + e.charCodeAt(i), t |= 0;
        return t
    }
    $("html").hasClass("mobile") || update(), document.addEventListener("mousedown", function (e) {
        var t = scaleByPixelRatio(e.clientX),
            i = scaleByPixelRatio(e.clientY),
            r = pointers.find(function (e) {
                return -1 == e.id
            });
        null == r && (r = new pointerPrototype), updatePointerDownData(r, -1, t, i)
    }), document.addEventListener("mousemove", function (e) {
        canvasInitialized && updatePointerMoveData(pointers[0], scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY))
    }), window.addEventListener("mouseup", function () {
        updatePointerUpData(pointers[0])
    }), document.addEventListener("touchstart", function (e) {
        for (var t = e.targetTouches; t.length >= pointers.length;) pointers.push(new pointerPrototype);
        for (var i = 0; i < t.length; i++) {
            var r = scaleByPixelRatio(t[i].pageX),
                n = scaleByPixelRatio(t[i].clientY);
            updatePointerDownData(pointers[i + 1], t[i].identifier, r, n)
        }
    }), document.addEventListener("touchmove", function (e) {
        for (var t = e.targetTouches, i = 0; i < t.length; i++) {
            var r = pointers[i + 1];
            if (r.down) updatePointerMoveData(r, scaleByPixelRatio(t[i].pageX), scaleByPixelRatio(t[i].clientY))
        }
    }, !1), document.addEventListener("touchend", function (e) {
        function t(t) {
            var e = pointers.find(function (e) {
                return e.id == i[t].identifier
            });
            null != e && updatePointerUpData(e)
        }
        for (var i = e.changedTouches, r = 0; r < i.length; r++) t(r)
    })
}
google.maps.Map.prototype.setCenterWithOffset = function (i, r, n) {
    var a = this,
        e = new google.maps.OverlayView;
    e.onAdd = function () {
        var e = this.getProjection(),
            t = e.fromLatLngToContainerPixel(i);
        t.x = t.x + r, t.y = t.y + n, a.panTo(e.fromContainerPixelToLatLng(t))
    }, e.draw = function () {
        this.getPanes().markerLayer.id = "marker"
    }, e.setMap(this)
};
var cf = {
    windowW: 0,
    windowH: $(window).height(),
    html: $("html"),
    body: $("body"),
    device: null,
    distanceFromTop: 0,
    lastDistanceFromTop: 0,
    resizeTimeout: null,
    navOpened: !1,
    activeSection: $(".hero"),
    mapViewed: !1,
    fancyboxOpened: !1,
    mapInitialized: !1,
    inactivityInterval: null,
    clonedFooter: !1,
    init: function () {
        var t = null,
            i = null;
        bodymovin.loadAnimation({
            container: document.getElementById("loader"),
            renderer: "svg",
            loop: !0,
            autoplay: !0,
            path: themeUrl + "/assets/js/loader.json"
        }).setSpeed(1.5), cf.body.preloading({
            beforeComplete: function () {
                var e = $("#map");
                e.length && (e.parent().show(), cf.common.map.init(), cf.common.map.resize(), "mobile" != cf.device && e.parent().hide(), cf.mapInitialized = !0), t = setTimeout(function () {
                    cf.body.addClass("init-anim"), $(".hero").addClass("active"), window.location.hash && $("section").each(function () {
                        var e = $(this),
                            t = "#" + e.data("hash");
                        if (null != t && window.location.hash == t) {
                            var i = e.index();
                            return "mobile" != cf.device ? $(".side-nav").children().eq(i).find("a").trigger("click") : $("html, body").stop().animate({
                                scrollTop: e.offset().top
                            }, 2e3, "easeInOutCubic"), !1
                        }
                    }), clearTimeout(t), t = null
                }, 500), cf.html.hasClass("ie11") || cf.html.hasClass("edge") || (i = setTimeout(function () {
                    bodymovin.loadAnimation({
                        container: document.getElementById("light-logo"),
                        renderer: "svg",
                        loop: !1,
                        autoplay: !0,
                        path: themeUrl + "/assets/js/logo-white.json"
                    }), bodymovin.loadAnimation({
                        container: document.getElementById("dark-logo"),
                        renderer: "svg",
                        loop: !1,
                        autoplay: !0,
                        path: themeUrl + "/assets/js/logo-black.json"
                    });
                    clearTimeout(i), i = null
                }, 1e3)), "mobile" == cf.device || cf.html.hasClass("ie11") || (canvas.style.visibility = "visible", canvasInitialized = !0, multipleSplats(parseInt(5 * Math.random()) + 5))
            },
            onComplete: function () {
                "mobile" == cf.device && (update(), canvas.style.visibility = "visible", canvasInitialized = !0, multipleSplats(parseInt(5 * Math.random()) + 5)), cf.html.hasClass("ie11") || cf.common.inactivityTime()
            }
        }), cf.html.hasClass("desktop") ? cf.device = "desktop" : cf.html.hasClass("tablet") ? cf.device = "tablet" : cf.html.hasClass("mobile") && (cf.device = "mobile"), "desktop" == cf.device ? this.desktop.init() : this.handheld.init()
    },
    transformSetter: function (e, t, i, r) {
        return {
            "-webkit-transform": "translateX(" + e + ") translateY(" + t + ") translateZ(0px) rotate(0deg) scale(" + i + ", " + r + ")",
            "-moz-transform": "translateX(" + e + ") translateY(" + t + ") translateZ(0px) rotate(0deg) scale(" + i + ", " + r + ")",
            transform: "translateX(" + e + ") translateY(" + t + ") translateZ(0px) rotate(0deg) scale(" + i + ", " + r + ")"
        }
    },
    transitionSetter: function (e, t, i, r) {
        return {
            "-webkit-transition": e + " " + t + " " + i + " " + r,
            "-moz-transition": e + " " + t + " " + i + " " + r,
            "-o-transition": e + " " + t + " " + i + " " + r,
            "-ms-transition": e + " " + t + " " + i + " " + r,
            transition: e + " " + t + " " + i + " " + r
        }
    },
    delaySetter: function (e) {
        return {
            "-webkit-transition-delay": e + "ms",
            "-moz-transition-delay": e + "ms",
            "-ms-transition-delay": e + "ms",
            "-o-transition-delay": e + "ms",
            "transition-delay": e + "ms"
        }
    },
    splitLines: function (e, i) {
        e.find("tspan").each(function () {
            $(this).css("display", "").replaceWith(this.childNodes)
        });
        e.text();
        var t = e.html().split(" ").join(' </tspan><tspan x="0">'),
            r = '<tspan x="0">'.concat(t, "</tspan>");
        e.html(r);
        var n, a = e.find("tspan:first-child").position().top;
        e.find("tspan").each(function (e) {
            var t = $(this);
            t.attr("dY", i), n = t.position().top, 0 != e && (n == a && (t.prepend(t.prev().text() + " "), t.prev().remove()), a = n)
        }), e.find("tspan").css("display", "block"), e.find("tspan:empty").remove()
    },
    snap: {
        init: function () {
            var n = $(".side-nav"),
                s = $("section"),
                l = ($(".bgrs"), !1),
                a = null,
                o = null;

            function c(i, r) {
                cf.html.hasClass("ie11") || multipleSplats(parseInt(+Math.random()) + 2), l = !0, (cf.activeSection = r).show(), r.hasClass("light") && r.hasClass("simple") || r.hasClass("with-auto-height") || r.hasClass("with-slider") && r.hasClass("light") || r.hasClass("with-sub-elements") && r.hasClass("light") ? (cf.html.hasClass("ie11") || (TweenLite.to(config.BACK_COLOR, .5, {
                    r: 246,
                    ease: Linear.easeNone
                }), TweenLite.to(config.BACK_COLOR, .5, {
                    g: 246,
                    ease: Linear.easeNone
                }), TweenLite.to(config.BACK_COLOR, .5, {
                    b: 246,
                    ease: Linear.easeNone
                }), TweenLite.to(config, .5, {
                    BLOOM_INTENSITY: 0,
                    ease: Linear.easeNone
                })), $("#interactive-bgr .overlay").removeClass("semidark").addClass("light")) : r.hasClass("simple") && r.hasClass("with-bgr") ? (TweenLite.to(config, .5, {
                    BLOOM_INTENSITY: 0,
                    ease: Linear.easeNone
                }), $("#interactive-bgr .overlay").removeClass("light").addClass("semidark")) : (cf.html.hasClass("ie11") || (TweenLite.to(config.BACK_COLOR, .5, {
                    r: 1,
                    ease: Linear.easeNone
                }), TweenLite.to(config.BACK_COLOR, .5, {
                    g: 1,
                    ease: Linear.easeNone
                }), TweenLite.to(config.BACK_COLOR, .5, {
                    b: 1,
                    ease: Linear.easeNone
                }), TweenLite.to(config, .5, {
                    BLOOM_INTENSITY: .2,
                    ease: Linear.easeNone
                })), $("#interactive-bgr .overlay").removeClass("semidark").removeClass("light")), o = r.index() > i.index() ? (i.find("article").children().each(function () {
                    var e = $(this);
                    e.css(cf.delaySetter(e.data("delay-up")))
                }), r.find("article").children().each(function () {
                    var e = $(this);
                    e.css(cf.delaySetter(e.data("delay-anim-up")))
                }), setTimeout(function () {
                    if (r.addClass("active").removeClass("down up"), i.hasClass("hero") || i.hasClass("simple")) {
                        var e = i.find("article").position().top + i.find("article").outerHeight();
                        i.find("article").children().css(cf.transformSetter("0px", -e + "px", 1, 1))
                    }
                    if (i.hasClass("with-sub-elements") && i.find(".holder").length) {
                        e = i.find(".holder").position().top + 1.5 * i.find(".holder").outerHeight();
                        i.find(".holder").css(cf.transformSetter("0px", -e + "px", 1, 1))
                    }(r.hasClass("hero") || r.hasClass("simple")) && r.find("article").children().css(cf.transformSetter("0px", "0px", 1, 1)), r.hasClass("with-sub-elements") && r.find(".holder").length && r.find(".holder").css(cf.transformSetter("0px", "-50%", 1, 1)), i.addClass("up");
                    for (var t = i.index() + 1; t < r.index(); t++) {
                        if (s.eq(t).addClass("up").removeClass("down"), s.eq(t).hasClass("hero") || s.eq(t).hasClass("simple")) {
                            s.eq(t).show();
                            e = i.find("article").position().top + i.find("article").outerHeight();
                            s.eq(t).find("article").children().css(cf.transformSetter("0px", -e + "px", 1, 1)), s.eq(t).hide()
                        }
                        if (s.eq(t).hasClass("with-sub-elements") && s.eq(t).find(".holder").length) {
                            s.eq(t).show();
                            e = s.eq(t).find(".holder").position().top + 1.5 * s.eq(t).find(".holder").outerHeight();
                            s.eq(t).find(".holder").css(cf.transformSetter("0px", -e + "px", 1, 1)), s.eq(t).hide()
                        }
                    }
                    clearTimeout(o), o = null
                }, 50)) : (i.find("article").children().each(function () {
                    var e = $(this);
                    e.css(cf.delaySetter(e.data("delay-down")))
                }), r.find("article").children().each(function () {
                    var e = $(this);
                    e.css(cf.delaySetter(e.data("delay-anim-down")))
                }), setTimeout(function () {
                    r.addClass("active").removeClass("down up"), i.hasClass("with-sub-elements") && i.find(".holder").length && i.find(".holder").css(cf.transformSetter("0px", "calc(-50% + 100px)", 1, 1)), (i.hasClass("hero") || i.hasClass("simple")) && i.find("article").children().css(cf.transformSetter("0px", "100px", 1, 1)), (r.hasClass("hero") || r.hasClass("simple")) && r.find("article").children().css(cf.transformSetter("0px", "0px", 1, 1)), r.hasClass("with-sub-elements") && r.find(".holder").length && r.find(".holder").css(cf.transformSetter("0px", "-50%", 1, 1)), i.addClass("down");
                    for (var e = s.length - 1; e > r.index(); e--) s.eq(e).addClass("down").removeClass("up"), (s.eq(e).hasClass("hero") || s.eq(e).hasClass("simple")) && s.eq(e).find("article").children().css(cf.transformSetter("0px", "100pxpx", 1, 1)), s.eq(e).hasClass("with-sub-elements") && s.eq(e).find(".holder").length && s.eq(e).find(".holder").css(cf.transformSetter("0px", "calc(-50% + 100px)", 1, 1));
                    clearTimeout(o), o = null
                }, 50)), a = setTimeout(function () {
                    l = !1, i.removeClass("active").hide(), cf.body.removeClass("switching"), n.children().removeClass("faded"), clearTimeout(a), a = null
                }, r.hasClass("footer") ? 1200 : 1600), n.children().removeClass("active").eq(r.index()).addClass("active"), n.children().eq(i.index()).addClass("faded"), cf.body.addClass("switching"), "dark" == r.data("header-color") ? $("header").addClass("dark") : $("header").removeClass("dark"), "dark" == r.data("side-nav-color") ? n.addClass("dark") : n.removeClass("dark"), r.hasClass("with-bgr") && r.hasClass("bgr-revealed") && viewport().width <= 1024 && n.addClass("dark")
            }

            function d(e, t) {
                if (cf.html.hasClass("ie11") || multipleSplats(parseInt(+Math.random()) + 2), l = !0, cf.body.addClass("switching"), $(".side-nav li").eq(t.parents("section").index()).find("a svg ellipse").css({
                        strokeDashoffset: 360 - t.index() / (t.parents("ol").children().length - 1) * 63
                    }), e.index() < t.index()) {
                    e.removeClass("active").addClass("up");
                    for (var i = 0; i < t.index(); i++) e.parents("section").find(".pagination strong span").eq(i).removeClass("down").addClass("up"), e.parent().children().eq(i).removeClass("down").addClass("up")
                } else {
                    e.removeClass("active").addClass("down");
                    for (i = t.index() + 1; i < e.parent().children().length; i++) e.parents("section").find(".pagination strong span").eq(i).removeClass("up").addClass("down"), e.parent().children().eq(i).removeClass("up").addClass("down")
                }
                if (e.index() < t.index() ? e.parents("section").find(".pagination strong span").eq(e.index()).removeClass("active").addClass("up") : e.parents("section").find(".pagination strong span").eq(e.index()).removeClass("active").addClass("down"), e.parents("section").find(".pagination strong span").eq(t.index()).addClass("active").removeClass("up down"), t.addClass("active").removeClass("up down"), viewport().width <= 768 && t.parents("section").hasClass("wide-text")) {
                    var r = t.find("p").data("height");
                    e.find("p").css("height", "0px"), t.find("p").css("height", r)
                }
                a = setTimeout(function () {
                    cf.body.removeClass("switching"), clearTimeout(a), a = null, l = !1
                }, 1600)
            }

            function h(e, t) {
                cf.html.hasClass("ie11") || multipleSplats(parseInt(+Math.random()) + 2), l = !0, cf.body.addClass("switching"), e.find(".bgr, .holder, .box").css(cf.delaySetter(0)), "down" == t ? (e.addClass("bgr-revealed"), $(".side-nav li").eq(e.index()).find("a svg ellipse").css({
                    strokeDashoffset: 328.5
                }), viewport().width <= 1024 && n.addClass("dark")) : (e.removeClass("bgr-revealed"), $(".side-nav li").eq(e.index()).find("a svg ellipse").css({
                    strokeDashoffset: 360
                }), n.removeClass("dark")), a = setTimeout(function () {
                    cf.body.removeClass("switching"), e.find(".bgr, .holder, .box").css({
                        "-webkit-transition-delay": "",
                        "-moz-transition-delay": "",
                        "-ms-transition-delay": "",
                        "-o-transition-delay": "",
                        "transition-delay": ""
                    }), clearTimeout(a), a = null, l = !1
                }, 1600)
            }
            $("section").each(function () {
                var e = $(this);
                e.hasClass("hero") ? e.show() : e.hide()
            }), "mobile" != cf.device && $(".with-auto-height").length && (document.getElementsByClassName("with-auto-height")[0].addEventListener("scroll", function (e) {
                if (l) return e.preventDefault(), e.stopPropagation(), !1
            }, {
                passive: !1
            }), document.getElementsByClassName("with-auto-height")[0].addEventListener("mousewheel", function (e) {
                if (l) return e.preventDefault(), e.stopPropagation(), !1
            }, {
                passive: !1
            }), document.getElementsByClassName("with-auto-height")[0].addEventListener("touchmove", function (e) {
                if (l) return e.preventDefault(), e.stopPropagation(), !1
            }, {
                passive: !1
            })), $(".with-sub-elements .ordered-list li span").click(function () {
                var e = $(this);
                l || e.parent().hasClass("active") || d($("section.active").find(".ordered-list li.active"), e.parent())
            });
            var i, r = !0,
                f = !1;
            $(window).on("mousewheel wheel", function (e) {
                if (!cf.mapViewed && !$(".nav-trigger").hasClass("close-btn")) {
                    var t = $("section.active");
                    i && clearTimeout(i), i = setTimeout(function () {
                        $(this).trigger("scrollFinished")
                    }, 55), 0 < e.originalEvent.deltaY ? t.index() < s.length - 1 && !l && !cf.navOpened && (t.hasClass("with-auto-height") && t.scrollTop() < t.find(".holder").outerHeight() - cf.windowH || t.hasClass("with-auto-height") && t.scrollTop() >= t.find(".holder").outerHeight() - cf.windowH && !f || (t.hasClass("with-sub-elements") && t.find(".ordered-list li p").length && !t.hasClass("imgs-list") && !t.find(".ordered-list li.active").is(":last-child") ? d(t.find(".ordered-list li.active"), t.find(".ordered-list li.active").next()) : t.hasClass("with-bgr") && !t.hasClass("bgr-revealed") ? h(t, "down") : c(t, t.next()))) : 0 < t.index() && !l && !cf.navOpened && (t.hasClass("with-auto-height") && 0 < t.scrollTop() || t.hasClass("with-auto-height") && t.scrollTop() <= 0 && !r || (t.hasClass("with-sub-elements") && t.find(".ordered-list li p").length && !t.hasClass("imgs-list") && !t.find(".ordered-list li.active").is(":first-child") ? d(t.find(".ordered-list li.active"), t.find(".ordered-list li.active").prev()) : t.hasClass("with-bgr") && t.hasClass("bgr-revealed") ? h(t, "up") : c(t, t.prev()))), t.hasClass("with-auto-height") && !l && (f = r = !1)
                }
            }), $(window).on("scrollFinished", function () {
                var e = $("section.active");
                e.hasClass("with-auto-height") && (e.scrollTop() <= 0 ? r = !(f = !1) : e.scrollTop() >= e.find(".holder").outerHeight() - cf.windowH && (r = !(f = !0)))
            }), $(document).keydown(function (e) {
                if (!cf.mapViewed && !$(".nav-trigger").hasClass("close-btn")) {
                    var t = $("section.active");
                    0 != e.keyCode && 32 != e.keyCode && 40 != e.keyCode || cf.mapViewed ? 38 == e.keyCode && 0 < t.index() && !l && !cf.navOpened && (t.hasClass("with-auto-height") && 0 < t.scrollTop() || (t.hasClass("with-sub-elements") && t.find(".ordered-list li p").length && !t.hasClass("imgs-list") && !t.find(".ordered-list li.active").is(":first-child") ? d(t.find(".ordered-list li.active"), t.find(".ordered-list li.active").prev()) : t.hasClass("with-bgr") && t.hasClass("bgr-revealed") ? h(t, "up") : c(t, t.prev()))) : t.index() < s.length - 1 && !l && !cf.navOpened && (t.hasClass("with-auto-height") && t.scrollTop() < t.find(".holder").outerHeight() - cf.windowH || (t.hasClass("with-sub-elements") && t.find(".ordered-list li p").length && !t.hasClass("imgs-list") && !t.find(".ordered-list li.active").is(":last-child") ? d(t.find(".ordered-list li.active"), t.find(".ordered-list li.active").next()) : t.hasClass("with-bgr") && !t.hasClass("bgr-revealed") ? h(t, "down") : c(t, t.next())))
                }
            }), cf.body.swipe({
                swipe: function (e, t, i, r, n, a) {
                    var o = $("section.active");
                    "up" == t ? !(o.index() < s.length - 1) || l || cf.navOpened || $(".nav-trigger").hasClass("close-btn") || cf.mapViewed || o.hasClass("with-auto-height") && o.scrollTop() < o.find(".holder").outerHeight() - cf.windowH || (o.hasClass("with-sub-elements") && o.find(".ordered-list li p").length && !o.hasClass("imgs-list") && !o.find(".ordered-list li.active").is(":last-child") ? d(o.find(".ordered-list li.active"), o.find(".ordered-list li.active").next()) : o.hasClass("with-bgr") && !o.hasClass("bgr-revealed") ? h(o, "down") : c(o, o.next())) : "down" == t && (!(0 < o.index()) || l || cf.navOpened || $(".nav-trigger").hasClass("close-btn") || cf.mapViewed || o.hasClass("with-auto-height") && 0 < o.scrollTop() || (o.hasClass("with-sub-elements") && o.find(".ordered-list li p").length && !o.hasClass("imgs-list") && !o.find(".ordered-list li.active").is(":first-child") ? d(o.find(".ordered-list li.active"), o.find(".ordered-list li.active").prev()) : o.hasClass("with-bgr") && o.hasClass("bgr-revealed") ? h(o, "up") : c(o, o.prev())))
                }
            }), $(".scroll-indicator").click(function (e) {
                e.preventDefault(), c($("section.active"), $("section.active").next())
            }), n.find("a").click(function (e) {
                e.preventDefault();
                var t = $(this).parent();
                t.hasClass("active") || l || (cf.mapViewed && (s.removeClass("map-viewed"), $(".hide-map-btn").trigger("click")), c($("section.active"), s.eq(t.index())))
            })
        },
        resize: function () {
            var r = null;
            $(".with-sub-elements").each(function () {
                var i = $(this),
                    e = !i.hasClass("active");
                i.hasClass("with-imgs-list") || (e && i.show(), i.find("p").each(function () {
                    var e = $(this);
                    e.css(cf.transitionSetter("none", "", "", "")).removeAttr("style");
                    var t = e.height();
                    e.attr("data-height", t), viewport().width <= 768 && i.hasClass("wide-text") ? e.parents("li").hasClass("active") ? e.height(t) : e.height(0) : e.removeAttr("style"), r = setTimeout(function () {
                        e.css(cf.transitionSetter("", "", "", "")), clearTimeout(r), r = null
                    }, 50)
                })), e && i.hide()
            }), $(".with-box.with-bgr").hasClass("active") && $(".with-box.with-bgr.active").hasClass("bgr-revealed") && viewport().width <= 1024 && $(".side-nav").addClass("dark")
        }
    },
    common: {
        outlinedTexts: [],
        animatedOffsets: [],
        parallaxOffsets: [],
        parallaxPosition: function (e, t) {
            var i = e.data("speed"),
                r = this.parallaxOffsets[t].top < cf.windowH ? cf.windowH - this.parallaxOffsets[t].top : 0,
                n = i * (this.parallaxOffsets[t].top - cf.lastDistanceFromTop - cf.windowH + r);
            (i < 0 && n < 0 || 0 < i && 0 < n) && (n = 0), e.css(cf.transformSetter("0px", n + "px", 1, 1))
        },
        inactivityTime: function () {
            function e() {
                subtleMultipleSplats(parseInt(20 * Math.random()) + 5)
            }

            function t() {
                clearInterval(cf.inactivityInterval), cf.inactivityInterval = setInterval(e, 6e3)
            }
            window.onmousemove = t, window.onmousedown = t, window.ontouchstart = t, window.onclick = t, window.onkeypress = t, window.onblur = function () {
                clearInterval(cf.inactivityInterval)
            }, window.onfocus = t, window.addEventListener("scroll", t, !0), window.addEventListener("mousewheel", t, !0), window.addEventListener("wheel", t, !0)
        },
        preventOneWordPerRow: function (e, t) {
            for (var i = document.querySelectorAll(e), r = 0; r < i.length; ++r)
                if (!$(i[r]).parents(".info-box").length) {
                    var n = i[r].innerHTML.split(" "),
                        a = n.splice(-t, t).join("&nbsp;"),
                        o = n.join(" ");
                    i[r].innerHTML = o + " " + a
                }
        },
        slider: {
            init: function () {
                $.fn.chunk = function (e) {
                    for (var t = [], i = 0; i < this.length; i += e) t.push(this.slice(i, i + e));
                    return this.pushStack(t, "chunk", e)
                }, $(".with-sub-elements.smaller-font ol").each(function () {
                    var e = $(this);
                    e.addClass("slider"), e.children("li").each(function (e) {
                        var t = $(this),
                            i = t.index() + 1;
                        t.children().attr("title", i < 10 ? "0" + i : i)
                    }), e.children("li").chunk(3).wrap('<div class="slide" />'), e.children(":first-child").addClass("active")
                }), $(".imgs-list").each(function () {
                    var e = $(this);
                    e.addClass("slider"), e.children("li").chunk(12).wrap('<div class="slide" />'), e.children(":first-child").addClass("active")
                }), $(".slider").each(function () {
                    var e = $(this),
                        t = e.find(".slide");
                    t.eq(0).addClass("active"), t.length < 2 && e.next().hide()
                }), $(".slider-nav li.prev").addClass("disabled"), $(".slider-nav li.next").addClass("active"), cf.body.on("click", ".slider-nav li a", function (e) {
                    e.preventDefault();
                    var t = $(this).parent(),
                        i = t.parents(".slider-nav").prev(),
                        r = t.parents(".slider-nav").prev().find(".slide.active");
                    t.hasClass("disabled") || (r.removeClass("active"), t.hasClass("prev") ? (t.removeClass("active").prev().removeClass("disabled").addClass("active"), 1 == r.index() && t.addClass("disabled"), r.prev().addClass("active")) : (t.next().removeClass("disabled"), r.index() == i.children().length - 2 && (t.addClass("disabled").removeClass("active"), t.next().addClass("active")), r.next().addClass("active")), "mobile" == cf.device && t.parents(".with-slider").length && (i.height(i.find(".active").height()), $("html, body").stop().animate({
                        scrollTop: t.parents("section").offset().top - 84
                    }, 1e3, "easeInOutCubic")))
                }), $(".slider").swipe({
                    swipe: function (e, t, i, r, n, a) {
                        "left" == t ? $(this).parent().find(".slider-nav li.next a").trigger("click") : "right" == t && $(this).parent().find(".slider-nav li.prev a").trigger("click")
                    }
                }), "desktop" == cf.device && $(".slider-nav li.prev").hover(function () {
                    $(this).prev().addClass("inactive")
                }, function () {
                    $(this).prev().removeClass("inactive")
                })
            },
            resize: function () {
                $(".slider").each(function () {
                    var e = $(this),
                        t = e.children(),
                        i = 0,
                        r = !1;
                    e.css("height", ""), e.parents("section").hasClass("active") || (r = !0, e.parents("section").show()), t.each(function () {
                        var e = $(this);
                        i < e.height() && (i = e.height())
                    }), "mobile" == cf.device && e.parents(".with-slider").length ? e.height(e.find(".slide.active").height()) : e.height(i), r && e.parents("section").hide()
                }), $(".with-slider").each(function () {
                    var e = $(this),
                        t = !1;
                    e.is(":hidden") && (e.show(), t = !0), e.css(cf.transitionSetter("none", "", "", "")), e.find(".holder").css(cf.transitionSetter("none", "", "", "")), e.find(".slider").css(cf.transitionSetter("none", "", "", "")), e.find(".slide").css(cf.transitionSetter("none", "", "", "")), 768 < viewport().width && e.find(".holder").outerHeight() > .65 * cf.windowH ? e.addClass("with-columns").find(".text-holder").columnize() : e.removeClass("with-columns"), t && e.hide(), prepTimeout = setTimeout(function () {
                        e.css(cf.transitionSetter("", "", "", "")), e.find(".holder").css(cf.transitionSetter("", "", "", "")), e.find(".slider").css(cf.transitionSetter("", "", "", "")), e.find(".slide").css(cf.transitionSetter("", "", "", "")), clearTimeout(prepTimeout), prepTimeout = null
                    }, 50)
                }), $(".slider").each(function () {
                    var e = $(this),
                        t = e.children(),
                        i = 0,
                        r = !1;
                    e.css("height", ""), e.parents("section").hasClass("active") || (r = !0, e.parents("section").show()), t.each(function () {
                        var e = $(this);
                        i < e.height() && (i = e.height())
                    }), "mobile" == cf.device && e.parents(".with-slider").length ? e.height(e.find(".slide.active").height()) : e.height(i), r && e.parents("section").hide()
                })
            }
        },
        svgWH: function (e, t) {
            var i = document.createElement("div");
            i.style.position = "absolute", i.style.visibility = "hidden", i.style.height = "auto", i.style.width = "auto", i.style.whiteSpace = "nowrap", i.style.fontSize = t, i.style.lineHeight = t, i.innerHTML = e, document.body.appendChild(i);
            var r = {
                w: i.clientWidth,
                h: i.clientHeight
            };
            return document.body.removeChild(i), r
        },
        map: {
            mapOptions: {},
            map: null,
            init: function () {
                this.mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(38.78609, -77.01528),
                    disableDefaultUI: !0,
                    styles: [{
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [{
                            saturation: 36
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 40
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }, {
                            weight: 1.2
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "landscape.man_made",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#090b0e"
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        featureType: "poi.park",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#353535"
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "all",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#0cc3fb"
                        }, {
                            lightness: 17
                        }, {
                            weight: "0.85"
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#f380f9"
                        }, {
                            lightness: 29
                        }, {
                            weight: "0.85"
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "all",
                        stylers: [{
                            weight: "0"
                        }, {
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 18
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry.stroke",
                        stylers: [{
                            weight: "1"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "all",
                        stylers: [{
                            visibility: "simplified"
                        }, {
                            weight: "0"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry.fill",
                        stylers: [{
                            weight: "0"
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 19
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#0f252e"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#4b4b4b"
                        }]
                    }]
                };
                var e = document.getElementById("map");
                this.map = new google.maps.Map(e, cf.common.map.mapOptions);
                new google.maps.Marker({
                    map: cf.common.map.map,
                    position: cf.common.map.map.getCenter(),
                    icon: {
                        url: themeUrl + "/assets/img/pin.png",
                        size: new google.maps.Size(33, 44),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16.5, 22)
                    }
                }), $(".hide-map-btn");
                $(".view-map-btn").click(function (e) {
                    e.preventDefault();
                    var t = $(this);
                    $(".nav-trigger").addClass("close-btn"), t.parents("section").addClass("map-viewed"), $(".side-nav").css("opacity", "0"), $(".nav-trigger").addClass("close-btn"), cf.common.map.map.setCenterWithOffset(cf.common.map.mapOptions.center, 0, 0), prepTimeout = setTimeout(function () {
                        $(".side-nav").hide(), clearTimeout(prepTimeout), prepTimeout = null
                    }, 1e3), cf.mapViewed = !0, "mobile" == cf.device && ($("html, body").stop().animate({
                        scrollTop: t.parents("section").offset().top + t.parents("section").height() / 2 - cf.windowH / 2
                    }, 1e3, "easeOutCubic"), cf.body.addClass("sticky-header").removeClass("header-up"))
                })
            },
            resize: function () {
                cf.mapViewed ? this.map.setCenterWithOffset(cf.common.map.mapOptions.center, 0, 0) : this.map.setCenterWithOffset(cf.common.map.mapOptions.center, -cf.windowW / 2.5, 0)
            }
        },
        init: function () {
            if ("mobile" != cf.device) {
                var e = $('<ul class="side-nav" />').insertAfter("#sections-holder"),
                    t = $("section");
                if (1 < t.length)
                    for (var i = 0; i < t.length; i++) $('<li><a href="#"><svg class="circle" xmlns="http://www.w3.org/2000/svg"><g><ellipse ry="10" rx="10" cy="14" cx="14" stroke-width="2"></ellipse></g></svg></a></li>').appendTo(e);
                e.children("li:first-child").addClass("active")
            }
            $(".footer .middle a").each(function () {
                var e = $(this),
                    t = e.text();
                e.wrapInner('<span><i data-title="' + t + '" /></span>')
            }), $(".footer-nav li a").click(function (e) {
                var t = $(this),
                    i = t.attr("href").split("#")[0],
                    r = t.attr("href").split("#")[1];
                if (i == window.location.href.split("#")[0])
                    if (e.preventDefault(), null != r) {
                        var n = $('section[data-hash="' + r + '"]');
                        "mobile" != cf.device ? $(".side-nav").children().eq(n.index()).find("a").trigger("click") : $("html, body").stop().animate({
                            scrollTop: n.offset().top - 84
                        }, 2e3, "easeInOutCubic")
                    } else "mobile" != cf.device ? $(".side-nav").children().eq(0).find("a").trigger("click") : $("html, body").stop().animate({
                        scrollTop: "0"
                    }, 2e3, "easeInOutCubic")
            }), $(".simple").each(function () {
                $(this).find("p").wrapAll('<div class="text-wrapper"><div class="text-holder" /></div>')
            }), $(".footer .navs ul li a, .info-box ul li a").each(function () {
                var e = $(this),
                    t = e.text();
                e.wrapInner('<span><i data-title="' + t + '" /></span>')
            }), $("article").each(function () {
                for (var e = $(this).children(), t = 0, i = 0; t < e.length; t++, i += 100) {
                    var r = $(this);
                    r.parents(".simple").length, e.eq(t).attr("data-delay-up", i), e.eq(t).attr("data-delay-anim-up", i + 450), r.parents(".hero").length && e.eq(t).css(cf.delaySetter(i))
                }
                for (t = e.length - 1, i = 0; 0 <= t; t--, i += 100) e.eq(t).attr("data-delay-down", i), e.eq(t).attr("data-delay-anim-down", i + 450)
            }), this.preventOneWordPerRow("#sections-holder p", 2), ($(".slider").length || $(".with-sub-elements.smaller-font").length) && this.slider.init(), cf.html.hasClass("ie11") || $(".outlined").each(function () {
                var e = $(this),
                    t = e.clone(!0, !0);
                $(t).insertBefore(e)
            }), $(".outlined text").each(function () {
                var e = $(this);
                cf.common.outlinedTexts.push(e.text())
            });
            var r = $(".main-nav-holder"),
                n = null,
                a = null,
                o = null;
            if ($(".nav-trigger").click(function (e) {
                    e.preventDefault(), $(this).hasClass("close-btn") ? cf.mapViewed ? ($(".view-map-btn").parents("section").removeClass("map-viewed"), $(".side-nav").show(), $(".nav-trigger").removeClass("close-btn"), a = setTimeout(function () {
                        $(".side-nav").css("opacity", "1"), clearTimeout(a), a = null
                    }, 50), o = setTimeout(function () {
                        cf.mapViewed = !1, clearTimeout(o), o = null
                    }, 1e3)) : $.fancybox.getInstance().close() : (null != n && (clearTimeout(n), n = null), n = cf.navOpened ? ($(this).removeClass("close"), cf.navOpened = !1, cf.body.removeClass("nav-opened"), setTimeout(function () {
                        r.hide(), clearTimeout(n), n = null
                    }, 1e3)) : (cf.navOpened = !0, r.show(), setTimeout(function () {
                        cf.body.addClass("nav-opened"), clearTimeout(n), n = null
                    }, 50)))
                }), window.addEventListener("scroll", function (e) {
                    if (cf.html.hasClass("landscape") && "mobile" == cf.device || cf.navOpened) return e.preventDefault(), e.stopPropagation(), !1
                }, {
                    passive: !1
                }), window.addEventListener("mousewheel", function (e) {
                    if (cf.html.hasClass("landscape") && "mobile" == cf.device || cf.navOpened) return e.preventDefault(), e.stopPropagation(), !1
                }, {
                    passive: !1
                }), window.addEventListener("touchmove", function (e) {
                    if (cf.html.hasClass("landscape") && "mobile" == cf.device || cf.navOpened) return e.preventDefault(), e.stopPropagation(), !1
                }, {
                    passive: !1
                }), $("input").focus(function () {
                    $(this).parents("li").addClass("focused").removeClass("filled")
                }).blur(function () {
                    $(this).val() ? $(this).parents("li").addClass("filled").removeClass("focused") : $(this).parents("li").removeClass("focused").removeClass("filled")
                }), $(".wpcf").length) {
                var s = document.querySelector(".wpcf7");
                s.addEventListener("wpcf7invalid", function (e) {
                    $(".wpcf7 ul li").removeClass("with-error"), $(".wpcf7-not-valid-tip").parents("li").addClass("with-error")
                }, !1), s.addEventListener("wpcf7submit wpcf7mailsent wpcf7mailfailed", function (e) {
                    $(".wpcf7 ul li").removeClass("with-error")
                }, !1)
            }
            if ($(".with-box").each(function () {
                    var e = $(this);
                    e.hasClass("alt-outro-anim") && $('<div class="box-bgr" />').prependTo(e)
                }), $(".ordered-list").each(function () {
                    var e = $(this);
                    e.find("p").length || e.find("li").removeClass("active")
                }), $(".with-sub-elements").not(".with-imgs-list").each(function () {
                    var e = $(this),
                        t = e.find(".ordered-list li"),
                        i = t.length < 10 ? "0" + t.length : t.length;
                    if (e.find("ol li p").length) {
                        $('<div class="pagination"><strong /><em>/' + i + "</em></div>").appendTo(e);
                        for (var r = 1; r <= t.length; r++) {
                            var n = r < 10 ? "0" + r : r;
                            1 == r ? $('<span class="active">' + n + "</span>").appendTo(e.find(".pagination strong")) : $("<span>" + n + "</span>").appendTo(e.find(".pagination strong"))
                        }
                    }
                }), this.resize(), "mobile" != cf.device) {
                var l;
                $("section").each(function (e) {
                    $(this).hasClass("with-auto-height") && $(".side-nav li").eq(e).find("ellipse").css(cf.transitionSetter("none", "", "", ""))
                }), void 0 === l && function e() {
                    var t = $(".with-auto-height");
                    cf.distanceFromTop = t.scrollTop();
                    1 <= Math.abs(cf.lastDistanceFromTop - cf.distanceFromTop) && (dY = cf.distanceFromTop - cf.lastDistanceFromTop, cf.lastDistanceFromTop += dY / 10, $(".side-nav li").eq(t.index()).find("a svg ellipse").css({
                        strokeDashoffset: 360 - cf.lastDistanceFromTop / (t.find(".holder").outerHeight() - cf.windowH) * 63
                    }), $(".parallax").each(function (e) {
                        var t = $(this);
                        cf.common.parallaxOffsets[e].top - cf.distanceFromTop < cf.windowH && cf.distanceFromTop - (cf.common.parallaxOffsets[e].top + cf.common.parallaxOffsets[e].height) <= 0 && cf.common.parallaxPosition(t, e)
                    }), $(".animated").each(function (e) {
                        var t = $(this),
                            i = cf.windowH;
                        cf.common.animatedOffsets[e].top - cf.distanceFromTop < i && t.addClass("in-view")
                    }));
                    l = requestAnimationFrame(e)
                }()
            }
        },
        resize: function () {
            this.animatedOffsets = [], this.parallaxOffsets = [], $(".parallax, .animated").each(function (e) {
                var t = !1,
                    i = $(this);
                i.parents("section").is(":hidden") && (i.parents("section").show(), t = !0);
                var r = {
                    top: i.offset().top,
                    height: i.outerHeight()
                };
                i.hasClass("parallax") ? cf.common.parallaxOffsets.push(r) : cf.common.animatedOffsets.push(r), i.hasClass("animated") && i.offset().top - cf.distanceFromTop < cf.windowH && i.addClass("in-view"), t && i.parents("section").hide()
            });
            var e = null;
            if (e = setTimeout(function () {
                    $(".slider").length && cf.common.slider.resize(), clearTimeout(e), e = null
                }, 500), "mobile" != cf.device) {
                var t = $(".footer"),
                    i = !1;
                if (footerNav = t.find(".footer-nav"), t.is(":hidden") && (t.show(), i = !0), footerNav.removeAttr("style").children().removeAttr("style"), cf.clonedFooter) {
                    var r = footerNav.children().eq(2).clone(!0, !0),
                        n = footerNav.children().eq(3).clone(!0, !0);
                    $(r).insertAfter(footerNav.children(":first-child")), $(n).insertBefore(footerNav.children(":last-child")), footerNav.children().eq(3).remove(), footerNav.children().eq(3).remove(), cf.clonedFooter = !1
                }
                if (!(1024 < viewport().width))
                    if (footerNav.css({
                            display: "block",
                            overflow: "hidden"
                        }).children().css({
                            float: "left"
                        }), 768 < viewport().width) {
                        for (var a = 0, o = 0; o < 5; o++) a += footerNav.children().eq(o).outerWidth();
                        footerNav.children().css({
                            marginRight: Math.floor((footerNav.width() - a) / 4)
                        }), footerNav.children(":nth-child(5n)").css("margin-right", "")
                    } else {
                        if (!cf.clonedFooter) {
                            r = footerNav.children().eq(2).clone(!0, !0), n = footerNav.children().eq(3).clone(!0, !0);
                            $(r).insertAfter(footerNav.children(":first-child")), $(n).insertBefore(footerNav.children(":last-child")), footerNav.children().eq(3).remove(), footerNav.children().eq(3).remove(), cf.clonedFooter = !0
                        }
                        footerNav.children().eq(0).css("margin-bottom", "10px"), footerNav.children(":nth-child(2), :nth-child(5)").css("clear", "left"), footerNav.children(":nth-child(3), :nth-child(4)").css(cf.transformSetter("0px", "-29px", 1, 1));
                        for (a = 0, o = 1; o < 4; o++) a += footerNav.children().eq(o).width();
                        footerNav.children(":nth-child(1), :nth-child(2), :nth-child(3)").css({
                            marginRight: Math.floor((footerNav.width() - a) / 2) - 2
                        });
                        var s = footerNav.children(":nth-child(2)").outerWidth(!0) - footerNav.children(":nth-child(5)").width();
                        footerNav.children(":nth-child(5)").css("margin-right", Math.floor(s))
                    } i && t.hide()
            }
            "mobile" != cf.device && ($("section .holder").each(function () {
                var e = $(this);
                e.parents(".bottom").length || e.css("height", cf.windowH)
            }), cf.snap.resize()), "mobile" != cf.device && ($(".with-columns .text-holder").uncolumnize(), $(".with-columns").removeClass("with-columns"), $(".simple, .with-box").each(function () {
                var e = $(this),
                    t = !1,
                    i = null;
                e.is(":hidden") && (e.show(), t = !0), e.is(".with-box") && (e.css(cf.transitionSetter("none", "", "", "")), e.find(".holder").css(cf.transitionSetter("none", "", "", "")), e.find(".box").css(cf.transitionSetter("none", "", "", ""))), e.find(".text-wrapper").css(cf.transitionSetter("none", "", "", "")), e.is(".with-box") && e.find("article").outerHeight() > e.find(".box").height() - 115 || e.is(".simple") && e.find("article").outerHeight() > .75 * cf.windowH && 768 < viewport().width ? (e.addClass("with-columns"), e.find(".text-holder").columnize()) : e.removeClass("with-columns"), t && e.hide(), i = setTimeout(function () {
                    e.is(".with-box") && (e.css(cf.transitionSetter("", "", "", "")), e.find(".holder").css(cf.transitionSetter("", "", "", "")), e.find(".box").css(cf.transitionSetter("", "", "", ""))), e.find(".text-wrapper").css(cf.transitionSetter("", "", "", "")), clearTimeout(i), i = null
                }, 50)
            })), 768 < viewport().width ? $(".with-imgs-list").each(function () {
                var e = $(this),
                    t = e.find(".holder");
                sliderNav = e.find(".slider-nav"), article = e.find("article"), i = !1, e.is(":hidden") && (e.show(), i = !0), sliderNav.css({
                    left: 768 < viewport().width ? t.width() - article.offset().left - sliderNav.width() - 100 : ""
                }), i && e.hide()
            }) : $(".with-imgs-list .slider-nav").removeAttr("style"), $(".main-nav").width(cf.windowW), $("#map").length && cf.mapInitialized && cf.common.map.resize(), cf.html.hasClass("ie11") || $(".outlined text").each(function () {
                if ((e = $(this)).parents(".cta-btn").length) {
                    var e, t = (i = (e = $(this)).parents("svg")).css("font-size");
                    e.attr("font-size", Math.ceil(t)).attr("y", Math.ceil(t)), i.width(1.05 * cf.common.svgWH(e.context.textContent, Math.ceil(t)).w).height(1.25 * cf.common.svgWH(e.context.textContent, Math.ceil(t)).h)
                } else {
                    t = (i = e.parents("svg")).css("font-size");
                    var i, r = !1;
                    e.parents(".main-nav-holder").is(":hidden") && (r = !0, e.parents(".main-nav-holder").show()), e.parents("section").hasClass("active") || (r = !0, e.parents("section").show());
                    var n = "mobile" != cf.device ? e.parents(".holder").width() - 50 : e.parents("span").length ? e.parents("span").width() : e.parents("a").width();
                    e.attr("font-size", Math.ceil(parseInt(t)));
                    var a = document.createElement("div");
                    a.style.position = "absolute", a.style.visibility = "hidden", a.style.height = "auto", a.style.width = "auto", a.style.maxWidth = n + "px", a.style.fontSize = Math.ceil(parseInt(t)) + "px", a.style.fontFamily = "Proxima Nova Bold", a.style.lineHeight = 1.15 * Math.ceil(parseInt(t)) + "px", a.innerHTML = cf.common.outlinedTexts[e.index(".outlined text")], document.body.appendChild(a), cf.splitLines($(a), 1.15 * Math.ceil(parseInt(t))), e.html($(a).html()), i.width(1.05 * $(a).width()), i.height(1.2 * $(a).height()), document.body.removeChild(a), r && e.parents("section, .main-nav-holder").hide()
                }
            })
        }
    },
    desktop: {
        init: function () {
            cf.common.init(), cf.snap.init();
            var t = $(".cursor");
            $(document).mousemove(function (e) {
                t.show().css({
                    left: e.clientX - 72,
                    top: e.clientY - 72
                })
            }).mouseleave(function () {
                t.hide()
            }), $(".imgs-list li a, .with-sub-elements .ordered-list li a, .with-sub-elements .ordered-list li span, .side-nav, .nav-trigger, .info-box a, .btn, .cta-btn, .ordered-list a, button, .footer a, input, header .logo, .with-auto-height a").mouseenter(function () {
                t.addClass("over-link")
            }).mouseleave(function () {
                t.removeClass("over-link")
            }), cf.html.hasClass("ie11") && $(".ordered-list svg").each(function () {
                var e = $(this),
                    t = e.text();
                e.parent().text(t).children("svg").remove()
            }), this.resize()
        },
        resize: function () {}
    },
    handheld: {
        init: function () {
            if (cf.common.init(), "tablet" == cf.device && cf.snap.init(), this.resize(), "mobile" == cf.device) {
                var t;
                void 0 === t && ! function e() {
                    cf.distanceFromTop = $(window).scrollTop();
                    cf.distanceFromTop != cf.lastDistanceFromTop && (cf.mapViewed ? cf.body.addClass("sticky-header").removeClass("header-up") : (cf.distanceFromTop > cf.lastDistanceFromTop && 0 < cf.distanceFromTop ? cf.body.addClass("header-up") : cf.body.removeClass("header-up"), cf.distanceFromTop <= 0 ? cf.body.removeClass("sticky-header").removeClass("header-up") : cf.body.addClass("sticky-header")), cf.lastDistanceFromTop = cf.distanceFromTop);
                    t = requestAnimationFrame(e)
                }()
            }
        },
        resize: function () {
            "tablet" == cf.device && cf.snap.resize()
        }
    },
    resize: function () {
        "desktop" != this.device && this.windowW == viewport().width || (null != this.resizeTimeout && (clearTimeout(this.resizeTimeout), this.resizeTimeout = null), this.resizeTimeout = setTimeout(function () {
            cf.windowW = viewport().width, cf.windowH = $(window).height(), cf.common.resize(), "desktop" == cf.device ? cf.desktop.resize() : cf.handheld.resize(), clearTimeout(cf.resizeTimeout), cf.resizeTimeout = null
        }, 1e3))
    }
};
$(window).resize(function () {
    cf.resize()
}), cf.init(), cf.resize();