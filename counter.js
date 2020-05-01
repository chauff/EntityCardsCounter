//@ts-check

const STYLE = "5px solid "; 
const ENTCOLOR = "peachPuff";
const NOENTCOLOR = "cornflowerBlue";

/*
 * 1) retrieves the current SERP and Entity counters from local storage;
 * 2) sets the starting date for the counters if necessary
 */
function getItemCounts(item) {
    let serp = localStorage.getItem(item.serp);
    let entity = localStorage.getItem(item.entity);
    let startingDate = localStorage.getItem(item.startingDate);
    if (serp == null) {
        serp = "0"; //keeping it consistent with type of local storage
    }
    if (entity == null) {
        entity = "0";
    }
    if (startingDate == null) {
        localStorage.setItem(item.startingDate, new Date().toString());
    }
    return [Number.parseInt(serp), Number.parseInt(entity)];
}

/*
 * Writes the serp / entity counts to local storage.
 */
function setItemCounts(item, serp, entity) {
    localStorage.setItem(item.serp, serp);
    localStorage.setItem(item.entity, entity);
}

/*
 * 1) When a SERP is encountered, the current counts are retrieved from local storage.
 * 2) SERP counter is incremented.
 * 3) Check if an entity card is found (identified by a specific class name).
 * 4) Draw a colored border accordingly.
 * 5) Write updated counters to local storage.
 * 6) Write info on the console.
 */
function update(item) {

    let [serp, entity] = getItemCounts(item);
    serp++; //+1 because the script is triggered when a SERP is observed

    //entity card present?
    let whichColor = NOENTCOLOR;
    if (document.getElementsByClassName(item.className).length > 0) {
        entity++;
        whichColor = ENTCOLOR;
    }
    document.body.style.border = STYLE + whichColor;

    //write updated counts to local storage
    setItemCounts(item, serp, entity);

    //dump info on the console
    console.table({
        "SE": item.name,
        "Data collected since": localStorage.getItem(item.startingDate),
        "SERPs": serp,
        "SERPs /w entities": entity
    });
}

let googleObject = {
    name: "GOOGLE",
    serp: "googleSERP",
    entity: "googleEntity",
    startingDate: "googleStart",
    className: "knowledge-panel" //based on inspection of SERP (might change)
}

let ddgoObject = {
    name: "DUCKDUCKGO",
    serp: "ddgoSERP",
    entity: "ddgoEntity",
    startingDate: "ddgoStart",
    className: "module--about"
}

let bingObject = {
    name: "BING",
    serp: "bingSERP",
    entity: "bingEntity",
    startingDate: "bingStart",
    className: "b_entityTitle"
}

let loc = window.location.hostname.toString();

if (loc.includes("google")) {
    update(googleObject);
}

if (loc.includes("duckduckgo")) {
    update(ddgoObject);
}

if (loc.includes("bing")) {
    update(bingObject);
}
