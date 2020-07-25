const uid_key = "uid"   // uid key for generating the sequential registration number
const uid_prefix = "UID-"   // uid prefix
const uid_length = 5    // uid digit length
const _max_responses = 99999 // max reseponses allowed
const _relations = "Relations"
const _regions = "Regions"
const _provinces = "Provinces"
const _cities = "Cities"
const _hospitals = "Hospitals"
const _sep = ","

function onOpen(e){
    let ui = SpreadsheetApp.getUi()
    ui.createMenu("App")
        .addItem("Open form", "openWebApp")
        .addItem("Reset form", "resetForm")
        .addToUi()
}


/**
 * insert the html file into another html file
 * @param {string} filename 
 */
function include(filename){
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent()
}

/**
 * standard function for deploying a apps script project as an web app
 * @param {event object} e 
 */
function doGet(e){
    let title = "Custom Form for Fitri"
    let template = HtmlService.createTemplateFromFile("index.html")
    let htmlOuput = template.evaluate()
    htmlOuput
      .addMetaTag("viewport", "width=device-width,initial-scale=1,minimal-ui")
      .setTitle(title)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    return htmlOuput   
}

/**
 * find sheet by name from current spreadsheet and create a new one if it's not found
 * @param {string} sheetname 
 */
function getSheetByName(sheetname){
    let ss = SpreadsheetApp.getActive()
    let ws = ss.getSheetByName(sheetname)
    if ( !ws ){
        ws = ss.insertSheet(sheetname)
    }
    return ws
}

/**
 * save response to sheet and return a registration number
 * @param {stringfied JSON object} data 
 */
function saveDataToSheet(data){
    let uid = createUid()
    if (Number(uid) > _max_responses){
        return `Sorry, your response reached the limit of ${_max_responses}.`
    }else{
        let {sheetname, values, headers} = JSON.parse(data)
        values = [new Date()].concat(values)
        headers = ["Timestamp"].concat(headers)
        
        let ws = getSheetByName(sheetname)
        headers.push("Registration number")
        values.push("'" + uid)
        
        ws.getRange(1, 1, 1, headers.length).setValues([headers])
        ws.appendRow(values)
        return uid
    }
    
}


function createUid(){
    let props = PropertiesService.getScriptProperties()
    let id = props.getProperty(uid_key)
    if (id === null){
        id = 1
    }
    id = Number(id)
    let uid = (10 ** uid_length + id).toString().slice(1)
    uid = uid_prefix + uid
    id ++
    props.setProperty(uid_key, id)
    console.log(uid)
    return uid
}


function resetForm(){
    let props = PropertiesService.getScriptProperties()
    props.deleteProperty(uid_key)
}


function openWebApp(){
    let url = ScriptApp.getService().getUrl()
    let html = `<script>window.open("${url}");google.script.host.close();<\/script>`
    let userInterface = HtmlService.createHtmlOutput(html).setTitle("Opening the web app...")
    SpreadsheetApp.getActive().show(userInterface)
}

function getAppData(){
    let ws = SpreadsheetApp.getActive().getSheetByName(_relations)
    let values = ws.getDataRange().getValues()
    
    let regions = []
    let rObject = {}
    
    let provinces = []
    let pObject = {}
    
    let cities = []
    let cObject = {}
    
    let hospitals = []
    let hObject = {}
    
    
    values.forEach(([region, province, city, hospital], i)=>{
        if (i > 0){
            region = region.trim()
            province = province.trim()
            city = city.trim()
            hospital = hospital.trim()
            
            let rKey = region.toLowerCase().replace(" ", "-")
            let pKey = rKey + "_" + province.toLowerCase().replace(" ", "-")
            let cKey = pKey + "_" + city.toLowerCase().replace(" ", "-")
            let hKey = cKey + "_" + hospital.toLowerCase().replace(" ", "-")
            rObject[rKey] = {name: region, id: rKey}
            pObject[pKey] = {name: province, id: pKey, parent: rKey}
            cObject[cKey] = {name: city, id: cKey, parent: pKey}
            hObject[hKey] = {name: city, id: hKey, parent: cKey}
        }
    })
    return JSON.stringify({rObject, pObject, cObject, hObject})
}
