import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";
import SDK from "blocksdk";

var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

let richTextEditors = [];

var editor2cfg = {};

var heroImageUrl,
    personImgUrl,
    shopImgUrl,
    competitionName,
    competitionInfo,
    competitionPrizeText,
    personInsideUrl,
    rulesNumber;

editor2cfg.toolbarfactory_mydropdown = function (cmd, suffix) {
    var editor = this; //Use this, maybe editor2 variable is not ready yet.
    var option = {};
    var inp;
    option.fillinput = function (input) {
        inp = input;
        inp.innerText = "Code Snippets";
        inp.style.overflowX = "hidden";
    };
    option.fillpanel = function (panel) {
        panel.style.padding = "8px";

        function CreateItem(name, code) {
            var div = panel.appendChild(document.createElement("div"));
            div.className = "code-snippet-item";
            div.innerText = name;
            div.onclick = function () {
                editor.insertHTML(code);
            };
        }

        CreateItem("Welcome", "<b>Welcome to our website.</b>");
        CreateItem(
            "Copyright",
            "<b>Copyright (c) MyCompany. All right reversed.</b>"
        );
    };

    var btn = editor.createToolbarDropDown(option, cmd, suffix);
    return btn;
};
editor2cfg.toolbar = "mytoolbar";
editor2cfg.toolbar_mytoolbar =
    "{bold,italic}|{fontname,fontsize}|{forecolor,backcolor}|removeformat|mydropdown" +
    "#{undo,redo,fullscreenenter,fullscreenexit,togglemore}";
editor2cfg.subtoolbar_mymenu = "inserttable,insertimage,insertcode";

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function updateSettings() {
    document.getElementById("link-input-id-0").value = heroImageUrl;
    document.getElementById("link-input-id-1").value = personImgUrl;
    document.getElementById("link-input-id-2").value = shopImgUrl;
    document.getElementById("text-input-id-0").value = competitionName;
    document.getElementById("text-input-id-1").value = competitionInfo;
    document.getElementById("text-input-id-2").value = competitionPrizeText;
    document.getElementById("number-input-id-0").value = rulesNumber;

    let rulesSDK = document.getElementById("rules-sub-container");
    document
        .getElementById("number-input-id-0")
        .addEventListener("input", function () {
            rulesSDK.innerHTML = "";
            rulesNumber = document.getElementById("number-input-id-0").value;

            for (let i = 0; i < rulesNumber; i++) {
                richTextEditors = i === 0 ? [] : richTextEditors;

                rulesSDK.innerHTML +=
                    "<div id='div_editor" +
                    (i + 1) +
                    "'><p>Tekst zasady " +
                    (i + 1) +
                    "</p></div>";
                let editor = new RichTextEditor(
                    `#div_editor${i + 1}`,
                    editor2cfg
                );
                richTextEditors.push(editor);
                console.log(richTextEditors);
            }
        });
}

function updateSite() {
    // Links
    heroImageUrl = document.getElementById("link-input-id-0").value;
    personImgUrl = document.getElementById("link-input-id-1").value;
    shopImgUrl = document.getElementById("link-input-id-2").value;
    personInsideUrl = document.getElementById("link-input-id-3").value;

    // Text
    competitionName = document.getElementById("text-input-id-0").value;
    competitionInfo = document.getElementById("text-input-id-1").value;
    competitionPrizeText = document.getElementById("text-input-id-2").value;

    //Numbers
    rulesNumber = document.getElementById("number-input-id-0").value;

    sdk.setData({
        heroImageUrl: heroImageUrl,
        personImgUrl: personImgUrl,
        shopImgUrl: shopImgUrl,
        competitionName: competitionName,
        competitionInfo: competitionInfo,
        competitionPrizeText: competitionPrizeText,
        personInsideUrl: personInsideUrl,
        rulesNumber: rulesNumber,
    });

    const dataToGive = {
        heroImageUrl: heroImageUrl,
        personImgUrl: personImgUrl,
        shopImgUrl: shopImgUrl,
        competitionName: competitionName,
        competitionInfo: competitionInfo,
        competitionPrizeText: competitionPrizeText,
        personInsideUrl: personInsideUrl,
        rulesNumber: rulesNumber,
    };

    sdk.setContent(buildSite(dataToGive));
}

sdk.getData(function (data) {
    heroImageUrl = data.heroImageUrl || "";
    personImgUrl = data.personImgUrl || "";
    shopImgUrl = data.shopImgUrl || "";
    competitionName = data.competitionName || "";
    competitionInfo = data.competitionInfo || "";
    competitionPrizeText = data.competitionPrizeText || "";
    personInsideUrl = data.personInsideUrl || "";
    rulesNumber = data.rulesNumber || "";
    updateSettings();
    updateSite();
});

document.getElementById("workspace").addEventListener("input", function () {
    debounce(updateSite, 500)();
});

function buildSite(data) {
    var template;

    const rulesTemplate =
        "<div class='rule'><div class='ruleLP'></div><div class='ruleText'></div></div>";

    let rulesOuterHTML = "";

    for (let i = 0; i < data.rulesNumber; i++) {
        rulesOuterHTML +=
            "<div class='rule' id='rule-" +
            (i + 1) +
            "'><div class='ruleLP'></div><div class='ruleText'></div></div>";
    }

    template =
        "<div class='mainSiteContainer'>" +
        "<div id='heroImageContainer' style='background-image: url(" +
        data.heroImageUrl +
        ");' class='widget widget-section'>" +
        "<div class='row'>" +
        "<div class='container'>" +
        "<div id='competitionName' class='widget widget-text'><h1><span style='text-transform: uppercase;'>" +
        data.competitionName +
        "</span></h1></div>" +
        "<div id='prizeText' class='widget widget-text'><h3>" +
        data.competitionPrizeText +
        "</h3></div>" +
        "<div id='prizeBox' class='widget widget-box'></div>" +
        "<div id='wordRedBox' class='widget widget-box'></div>" +
        "<div id='competitionInfo' class='widget widget-text'><p>" +
        data.competitionInfo +
        "</p></div>" +
        "<img id='prizeLogo' class='widget widget-image' sizes='(max-width: 763px) 119px, 192px' src='" +
        data.shopImgUrl +
        "' alt='Image' width='192' height='126' fetchpriority='high'>" +
        "<a id='hoverImage' class='widget widget-image enlarge-on-hover' href='" +
        data.personInsideUrl +
        "' aria-label='Image' subtype='popup'>" +
        "<img src='" +
        data.personImgUrl +
        "' fetchpriority='high' alt='Image' width='485' height='598' sizes='(max-width: 763px) 208px, 485px' class>" +
        "</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='rulesContainer'>" +
        rulesOuterHTML +
        "</div>" +
        "</div>";

    return template;
}
