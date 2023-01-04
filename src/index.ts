import {AdjustMonsterLevel} from "./AdjustMonsterLevel"
Hooks.on('init', async function () {
    await game["settings"].register("foundryvtt-pf2e-adjust-monster-level", "roadmaps", {
        scope: 'world',
        config: false,
        type: Object,
        default: {}
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
    let button = $(`<a class="adjustment trait" style>Adjust Level</a>`);
    button.on("click", () => {
        new AdjustMonsterLevel(actor).render(true)
    })
    element.after(button);
})