import {AdjustMonsterLevel} from "./AdjustMonsterLevel"
import {Setting} from "./Keys"
import {localize} from "./Utils";
Hooks.on('init', async function () {
    await game["settings"].register( Setting.namespace, Setting.expandFoldout, {
        scope: 'client',
        config: false,
        requiresReload: false,
        type: Boolean,
        default: false
    });
    await game["settings"].register( Setting.namespace, Setting.testMode, {
        name: 'PF2EADJUSTMONSTERLEVEL.SETTINGS.testModeLabel',
        hint: 'PF2EADJUSTMONSTERLEVEL.SETTINGS.testModeHint',
        scope: 'client',
        config: true,
        requiresReload: false,
        type: Boolean,
        default: false
    });
})

Hooks.on("renderActorSheet", async function (sheet, html) {
    let actor = sheet.object
    if (actor?.type !== "npc") {
        return;
    }
    if(!actor.canUserModify(game["user"], "update")) {
        return;
    }
    let element = html.find(".adjustment-select");
    let button = $(`<a class="adjustment trait" style>${localize("PF2EADJUSTMONSTERLEVEL.ACTORSHEET.buttonlabel")}</a>`);
    button.on("click", () => {
        new AdjustMonsterLevel(actor).render(true)
    })
    element.after(button);
})