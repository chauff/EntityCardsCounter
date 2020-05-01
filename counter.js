/*
 * 1) retrieves the current SERP and Entity counters from local storage;
 * 2) sets the starting date for the counters if necessary
 */
function getItemCounts(item){
    let serp = localStorage.getItem(item.serp);
    let entity = localStorage.getItem(item.entity);
    let startingDate = localStorage.getItem(item.startingDate);
    if(serp == null){
        serp = 0;
    }
    if(entity == null){
        entity = 0;
    }
    if(startingDate == null){
        localStorage.setItem(item.startingDate, new Date());
    }
    return [serp, entity];
}

/*
 * Writes the serp / entity counts to local storage.
 */
function setItemCounts(item, serp, entity){
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
function update(item){

    let [serp, entity] = getItemCounts(item);
    serp++; //+1 because the script is triggered when a SERP is observed
    
    //entity card present?
    console.log("Checking for entity card with className: "+item.className);
    console.log(document.getElementsByClassName(item.className).length);
    if(document.getElementsByClassName(item.className).length>0){
        entity++;
        document.body.style.border = "5px solid "+item.entityColor;
    }
    else {
        document.body.style.border = "5px solid "+item.serpColor;
    }
    
    //write updated counts to local storage
    setItemCounts(item, serp, entity);
    
    //a bit of info on the console
    console.table({
        "SE" : item.name,
        "Data collected since": localStorage.getItem( item.startingDate ),
        "SERPs" : serp,
        "SERPs /w entities" : entity
    });
}

let google = {
    name : "GOOGLE",
    serp : "googleSERP",
    entity : "googleEntity",
    startingDate : "googleStart",
    className : "knowledge-panel", //based on inspection of Google SERP (might change)
    entityColor : "peachPuff", //page border color to show off serp + entity observed
    serpColor : "cornflowerBlue" //page border color to show off serp but no entity observed
}

let duckduckgo = {
    name : "DUCKDUCKGO",
    serp : "ddgoSERP",
    entity : "ddgoEntity",
    startingDate : "ddgoStart",
    className : "module--about", //based on inspection of Google SERP (might change)
    entityColor : "peachPuff", //page border color to show off serp + entity observed
    serpColor : "cornflowerBlue" //page border color to show off serp but no entity observed
}

let loc = window.location.href.toString();

if(loc.includes("google")){
    window.addEventListener("load", function(){ update(google) }, false);
}

if(loc.includes("duckduckgo")){
    window.addEventListener("load", function(){ update(duckduckgo) }, false);
}
