const uid_key = "uid"   // uid key for generating the sequential registration number
const uid_prefix = ""   // uid prefix
const uid_length = 4    // uid digit length

function onOpen(e){
    let ui = SpreadsheetApp.getUi()
    ui.createMenu("CSR Form")
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
    let template = HtmlService.createTemplateFromFile("index.html")
    let htmlOuput = template.evaluate()
    htmlOuput
      .addMetaTag("viewport", "width=device-width,initial-scale=1,minimal-ui")
      .setTitle("CSR Programme")
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
    let {sheetname, values, headers} = JSON.parse(data)
    
    let ws = getSheetByName(sheetname)
    headers.push("Registration number")
    values.push("'" + uid)
    
    ws.getRange(1, 1, 1, headers.length).setValues([headers])
    ws.appendRow(values)
    
    return uid
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