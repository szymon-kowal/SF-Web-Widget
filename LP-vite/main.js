import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";
import SDK from "blocksdk";

var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

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
    document.getElementById("link-input-id-1").value = shopImgUrl;
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
                rulesSDK.innerHTML +=
                    "<div class='slds-form-element'>" +
                    "<div class='slds-form-element__control'>" +
                    "<div id='rich-text-" +
                    (i + 1) +
                    "' class='slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap'>" +
                    "<div role='toolbar' id='editor-" +
                    (i + 1) +
                    "' class='slds-rich-text-editor__toolbar slds-shrink-none'>" +
                    "<ul aria-label='Format text' class='slds-button-group-list'>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='0' data-command='bold'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#bold'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Bold</span>" +
                    "</button>" +
                    "</li>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#italic'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Italic</span>" +
                    "</button>" +
                    "</li>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#underline'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Underline</span>" +
                    "</button>" +
                    "</li>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#strikethrough'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Strike Through</span>" +
                    "</button>" +
                    "</li>" +
                    "</ul>" +
                    "<ul aria-label='Format body' class='slds-button-group-list'>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#richtextbulletedlist'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Bulleted List</span>" +
                    "</button>" +
                    "</li>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#richtextnumberedlist'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Numbered List</span>" +
                    "</button>" +
                    "</li>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#richtextindent'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Indent</span>" +
                    "</button>" +
                    "</li>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#richtextoutdent'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Outdent</span>" +
                    "</button>" +
                    "</li>" +
                    "</ul>" +
                    "<ul aria-label='Remove Formatting' class='slds-button-group-list'>" +
                    "<li>" +
                    "<button class='slds-button slds-button_icon slds-button_icon-border-filled' tabindex='-1'>" +
                    "<svg class='slds-button__icon' aria-hidden='true'>" +
                    "<use xlink:href='/icons/utility-sprite/svg/symbols.svg#remove_formatting'></use>" +
                    "</svg>" +
                    "<span class='slds-assistive-text'>Remove Formatting</span>" +
                    "</button>" +
                    "</li>" +
                    "</ul>" +
                    "</div>" +
                    "<div class='slds-rich-text-editor__textarea slds-grid'>" +
                    "<div aria-label='Compose text' contenteditable='true' class='slds-rich-text-area__content slds-text-color_weak slds-grow'>Treść zasady " +
                    (i + 1) +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                const editor = document.getElementById(`editor-${i + 1}`);

                editor.querySelectorAll("slds-button").forEach((button) => {
                    button.addEventListener("click", () => {
                        const command = this.getAttribute("data-command");

                        command === "bold" ? toggleBold() : null;

                        const value = this.getAttribute("data-value");
                        execCommand(command, value);
                    });
                });
            }
        });
}

function execCommand(command, value = null) {
    document.execCommand(command, false, value);
}

function toggleBold() {
    execCommand("bold");
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
