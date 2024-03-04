import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";
import SDK from "blocksdk";

var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

let rulesMessages = [];

var heroImageUrl,
    personImgUrl,
    shopImgUrl,
    competitionName,
    competitionInfo,
    competitionPrizeText,
    personInsideUrl,
    rulesNumber;

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
            let ruleMessage;
            rulesNumber = document.getElementById("number-input-id-0").value;

            for (let i = 0; i < rulesNumber; i++) {
                if (
                    rulesMessages.length >= i + 1 &&
                    rulesMessages[i] !== null
                ) {
                    ruleMessage = rulesMessages[i];
                } else {
                    ruleMessage = "<p>Tekst zasady " + (i + 1) + "</p>";
                }

                rulesMessages.length < rulesNumber
                    ? rulesMessages.push(null)
                    : undefined;

                rulesSDK.innerHTML +=
                    "<div data-tiny-editor " +
                    "id='div_editor" +
                    i +
                    "'>" +
                    ruleMessage +
                    "</div>";
            }

            rulesSDK.querySelectorAll("[data-tiny-editor]").forEach((e) => {
                window.__tinyEditor.transformToEditor(e);
                e.addEventListener("input", () => {
                    rulesMessages[e.id.slice(-1)] = e.innerHTML;
                });
            });
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
            "'><div class='ruleLP'>" +
            (i + 1) +
            "</div><div class='ruleBody'>" +
            (i < rulesMessages.length && rulesMessages[i] !== null
                ? rulesMessages[i]
                : "") +
            "</div></div>";
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
        "<div class='winnersTable'></div>" +
        "<div class='rulesContainer'>" +
        "<h1>Jak wziąć udział w konkursie?<br>To proste!<h1>" +
        rulesOuterHTML +
        "</div>" +
        "</div>";

    return template;
}
