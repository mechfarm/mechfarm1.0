var clock = 1000;
var countdown = 0;
var resellValue = 0.50;

var loadData;
var savedgame;

var minebot = 0;
var minebotCost = 5;
var minebotIniCost = 5;
var minebotValue = 0.1;
var minebotTot;

var wirebot = 0;
var wirebotCost = 10;
var wirebotIniCost = 10;
var wirebotValue = 0.1;
var wirebotTot;

var driller = 0;
var drillerWireCost = 100;
var drillerCircuitCost = 50;
var drillerValue = 0.1;
var drillerStr = 0; 
var drillerTot;
var drillerMK = 0;

var volt = 0;
var voltWireCost = 50;
var voltCircuitCost = 100;
var voltValue = 0.1;
var voltStr = 0;
var voltTot;
var voltMK = 0;

var copper = 5;
var copperPS = 0;
var clickCopperStr = 1;

var silicon = 0;
var siliconPS = 0;
var clickSiliconStr = 0.1;

var wire = 0;
var wirePS = 0;
var clickWireStr = 1; 
var wireCopperCost = 1; // copper needed for 1 wire

var circuit = 0;
var circuitPS = 0;
var clickCircuitStr = 1;
var circuitWireCost = 5; // wires needed for 1 circuit
var circuitSiliconCost = 1; // silicon needed for 1 circuit

// BEGIN DEBUG CODES FOR NAVBAR

function clockModify(type) {
    var amount = document.getElementById('clockModVal').value;
    if (type === 0) { clock = parseInt(clock) + parseInt(amount); }
    else{ clock = clock - amount; }
    document.getElementById('clock').innerHTML = clock;
}

function copperModify(type) {
    var amount = document.getElementById('copperModVal').value;
    if (type === 0) { copper = parseInt(copper) + parseInt(amount); }
    else { copper = copper - amount; }
    document.getElementById('copper_Debug').innerHTML = Math.round(copper * 10) / 10;
    document.getElementById('copper').innerHTML = Math.round(copper * 10) / 10;
}

function siliconModify(type){
    var amount = document.getElementById('siliconModVal').value;
    if (type === 0) { silicon = parseInt(silicon) + parseInt(amount); }
    else { silicon = silicon - amount; }
    document.getElementById('silicon_Debug').innerHTML = Math.round(silicon * 10) / 10;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 10) / 10;
}

function wireModify(type){
    var amount = document.getElementById('wireModVal').value;
    if (type === 0) { wire = parseInt(wire) + parseInt(amount); }
    else { wire = wire - amount; }
    document.getElementById('wire_Debug').innerHTML = Math.round(wire * 10) / 10;
    document.getElementById('wire').innerHTML = Math.round(wire * 10) / 10;
}

function circuitModify(type){
    var amount = document.getElementById('circuitModVal').value;
    if (type === 0) { circuit = parseInt(circuit) + parseInt(amount); }
    else { circuit = circuit - amount; }
    document.getElementById('circuit_Debug').innerHTML = Math.round(circuit * 10) / 10;
    document.getElementById('circuit').innerHTML = Math.round(circuit * 10) / 10;
}

// END OF DEBUG CODES FOR NAVBAR

// BEGIN OF STATS CODING

function clickCopper(){
    copper += clickCopperStr;
    document.getElementById('copper').innerHTML = Math.round(copper * 10) / 10;
}

function clickSilicon(){
    silicon += clickSiliconStr;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 10) / 10;
}

function clickWire(){
    if (copper >= wireCopperCost){
        wire += clickWireStr;
        copper -= clickWireStr;
    }
    document.getElementById('wire').innerHTML = Math.round(wire * 10) / 10;
    document.getElementById('copper').innerHTML = Math.round(copper * 10) / 10;
}

function clickCircuit() {
    if (silicon >= (Math.round((circuitSiliconCost - 0.1) * 100) / 100) && wire >= (Math.round((circuitWireCost - 0.1) * 100) / 100)) {
        circuit += clickCircuitStr;
        silicon -= clickCircuitStr;
        wire -= (circuitWireCost * clickCircuitStr)
    }
    document.getElementById('circuit').innerHTML = Math.round(circuit * 10) / 10;
    document.getElementById('wire').innerHTML = Math.round(wire * 10) / 10;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 10) / 10;
}

// END OF STATS CODING

// BEGIN OF ORE_SHOP CODING

function buyMinebot(amount) {
    if (wire >= minebotCost) {
        minebot++;
        wire = parseInt(wire) - parseInt(minebotCost);
        minebotCost = Math.floor(minebotIniCost * Math.pow(1.1,minebot))
        document.getElementsByClassName('minebot')[0].innerHTML = minebot;
        document.getElementsByClassName('minebot')[1].innerHTML = minebot;
        document.getElementById('wire').innerHTML = Math.floor(wire);
        
        minebotCost = Math.floor(minebotIniCost * Math.pow(1.1,minebot));
        document.getElementById('minebotCost').innerHTML = minebotCost;
        calc();
        updateText();
    }
}

function sellMinebot(amount) {
    if (minebot >= amount){
        minebot -= amount;
        wire += (minebotCost * resellValue);
        minebotCost = Math.floor(minebotIniCost * Math.pow(1.1,minebot));
        document.getElementById('minebotCost').innerHTML = minebotCost;
        document.getElementById('minebot').innerHTML = minebot;
        document.getElementById('wire').innerHTML = Math.floor(wire);
        calc();
        updateText();
    }
}

// END OF ORE_SHOP CODING

// BEGIN OF REFINE_SHOP CODING

function buyWirebot(amount) {
    if (copper >= wirebotCost){
        wirebot++;
        copper = parseInt(copper) - parseInt(wirebotCost);
        wirebotCost = Math.floor(wirebotIniCost * Math.pow(1.1,wirebot))
        document.getElementById('wirebot').innerHTML = wirebot;
        document.getElementById('copper').innerHTML = Math.floor(copper);
        
        wirebotCost = Math.floor(wirebotIniCost * Math.pow(1.1,wirebot));
        document.getElementById('wirebotCost').innerHTML = wirebotCost;
        calc();
        updateText();
    }
}

function sellWirebot(amount) {
    if (wirebot >= amount){
        wirebot -= amount;
        copper += (wirebotCost * resellValue);
        wirebotCost = Math.floor(wirebotIniCost * Math.pow(1.1,wirebot));
        document.getElementById('wirebotCost').innerHTML = wirebotCost;
        document.getElementById('wirebot').innerHTML = wirebot;
        document.getElementById('copper').innerHTML = Math.floor(copper);
        calc();
        updateText();
    }
}

// END OF REFINE_SHOP CODING

// BEGIN OF BUILD_SHOP CODING

function buyDriller(amount) {
    if (wire >= drillerWireCost && circuit >= drillerCircuitCost) {
        wire -= drillerWireCost;
        circuit -= drillerCircuitCost;
        driller += 1;
        drillerMK ++;
        minebotValue += drillerValue;
        
        drillerWireCost = Math.round(100 * Math.pow(1.5,driller));
        drillerCircuitCost = Math.round(50 * Math.pow(1.5,driller));
        drillerStr = Math.round(5 * Math.pow(1.2, driller));
        
        document.getElementById('drillerWireCost').innerHTML = drillerWireCost;
        document.getElementById('drillerCircuitCost').innerHTML = drillerCircuitCost;
        document.getElementById('buyDriller').innerHTML = 'Upgrade';
        document.getElementsByClassName('drillerMK')[0].innerHTML = 'MK-' + drillerMK;
        document.getElementsByClassName('drillerMK')[1].innerHTML = 'MK-' + drillerMK;
        document.getElementById('drillerStr').innerHTML = Math.round(drillerStr * 10) / 10;
        calc();
        updateText();
    }
}

function buyVolt(amount) {
    if (wire >= voltWireCost && circuit >= voltCircuitCost) {
        wire -= voltWireCost;
        circuit -= voltCircuitCost;
        volt += 1;
        voltMK ++;
        wirebotValue += voltValue;
        
        voltWireCost = Math.round(100 * Math.pow(1.5,volt));
        voltCircuitCost = Math.round(50 * Math.pow(1.5,volt));
        voltStr = Math.round(2 * Math.pow(1.2,volt));
        
        document.getElementById('voltWireCost').innerHTML = voltWireCost;
        document.getElementById('voltCircuitCost').innerHTML = voltCircuitCost;
        document.getElementById('buyVolt').innerHTML = 'Upgrade';
        document.getElementsByClassName('voltMK')[0].innerHTML = 'MK-' + voltMK;
        document.getElementsByClassName('voltMK')[1].innerHTML = 'MK-' + voltMK;
        calc();
        updateText();
    }
}

// END OF BUILD_SHOP CODING
 
function debugCalc() {
    document.getElementById('copper_Debug').innerHTML = Math.round(copper * 10) / 10;
    document.getElementById('silicon_Debug').innerHTML = Math.round(silicon * 10) / 10;
    document.getElementById('wire_Debug').innerHTML = Math.round(wire * 10) / 10;
    document.getElementById('circuit_Debug').innerHTML = Math.round(circuit * 10) / 10;
    setTimeout(debugCalc, clock);   
}

function calc(){
    wirePS = (wirebot * wirebotValue) + (voltStr);
    copperPS = (minebot * minebotValue) + (drillerStr) - wirePS;
    siliconPS = (drillerStr / 3);
    
    minebotTot = minebot * minebotValue;
    wirebotTot = wirebot * wirebotValue;
}

function execute() {
    var checkCopper = copper;
    checkCopper += copperPS;
    
   if (checkCopper < 0) {
        copper = 0;
        wirePS = 0;
        copperPS = 0;
    }
    
    copper += copperPS;
    wire += wirePS;
    silicon += siliconPS;   
}

function updateText() {
    
    document.getElementById('copperPS').innerHTML = Math.round(copperPS * 10) / 10;
    document.getElementById('wirePS').innerHTML = Math.round(wirePS * 10) / 10;
    document.getElementById('siliconPS').innerHTML = Math.round(siliconPS * 10) / 10;
    
    document.getElementById('copper').innerHTML = Math.round(copper * 10) / 10;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 10) / 10;
    
    document.getElementById('wire').innerHTML = Math.round(wire * 10) / 10;
    document.getElementById('wireCopperCost').innerHTML = Math.round(wireCopperCost * 10) / 10;
    document.getElementById('circuit').innerHTML = Math.round(circuit * 10) / 10;
    
    document.getElementById('minebotTot').innerHTML = Math.round(minebotTot * 10) / 10;
    document.getElementById('minebotCost').innerHTML = Math.round(minebotCost * 10) / 10;
    
    document.getElementsByClassName('minebot')[0].innerHTML = minebot;
    document.getElementsByClassName('minebot')[1].innerHTML = minebot;
    
    document.getElementById('wirebotTot').innerHTML = Math.round(wirebotTot * 10) / 10;
    document.getElementById('wirebotCost').innerHTML = Math.round(wirebotCost * 10) / 10;
    
    document.getElementById('drillerStr').innerHTML = Math.round(drillerStr * 10) / 10;
    document.getElementById('voltStr').innerHTML = Math.round(voltStr * 10) / 10;
}

function updateWindow() {
    calc();
    execute();
    updateText();
    save();
    setTimeout(updateWindow, clock);
}

// SAVE RELATED 

var data = {}

function save() {
        data = {
        wirebot: wirebot,
        wirebotValue: wirebotValue,
        wirebotCost: wirebotCost,

        minebot: minebot,
        minebotValue: minebotValue,
        minebotCost: minebotCost,

        volt: volt,
        voltStr: voltStr,
        voltWireCost: voltWireCost,
        voltCircuitCost: voltCircuitCost,
        voltMK: voltMK,

        driller: driller,
        drillerStr: drillerStr,
        drillerWireCost: drillerWireCost,
        drillerCircuitCost: drillerCircuitCost,
        drillerMK: drillerMK,

        copper: copper,
        silicon: silicon,
        wire: wire,
        circuit: circuit,

        clickWireStr: clickWireStr,
        clickCopperStr: clickCopperStr,
        clickCircuitStr: clickCircuitStr,
        clickSiliconStr: clickSiliconStr,

        wireCopperCost: wireCopperCost,
        circuitWireCost: circuitWireCost,
        circuitSiliconCost: circuitSiliconCost
    }
    localStorage.setItem('save',JSON.stringify(data));   
    console.log('All saved up, Captain.')
}

function load() {
    
    try {
        loadData = localStorage.getItem('save');
    } catch(err) { console.log('Fuck. Cannot load; storage corrupt or cannot access it, Captain.') }
    if (loadData){
        savedgame = JSON.parse(loadData);
        console.log('We got this far... All loaded up Captain.')
        if (typeof savedgame.wirebot != null) wirebot = savedgame.wirebot;
        if (typeof savedgame.wirebotValue != null) wirebotValue = savedgame.wirebotValue;
        if (typeof savedgame.wirebotCost != null) wirebotCost = savedgame.wirebotCost;
        if (typeof savedgame.minebot != null) minebot = savedgame.minebot;
        if (typeof savedgame.minebotValue != null) minebotValue = savedgame.minebotValue;
        if (typeof savedgame.minebotCost != null) minebotCost = savedgame.minebotCost;
        if (typeof savedgame.volt != null) volt = savedgame.volt;
        if (typeof savedgame.voltStr != null) voltStr = savedgame.voltStr;
        if (typeof savedgame.voltWireCost != null) voltWireCost = savedgame.voltWireCost;
        if (typeof savedgame.voltCircuitCost != null) voltCircuitCost = savedgame.voltCircuitCost;
        if (typeof savedgame.voltMK != null) voltMK = savedgame.voltMK;
        if (typeof savedgame.driller != null) driller = savedgame.driller;
        if (typeof savedgame.drillerStr != null) drillerStr = savedgame.drillerStr;
        if (typeof savedgame.drillerWireCost != null) drillerWireCost = savedgame.drillerWireCost
        if (typeof savedgame.drillerCircuitCost != null) drillerCircuitCost = savedgame.drillerCircuitCost;
        if (typeof savedgame.drillerMK != null) drillerMK = savedgame.drillerMK;
        if (typeof savedgame.copper != null) copper = savedgame.copper;
        if (typeof savedgame.silicon != null) silicon = savedgame.silicon;
        if (typeof savedgame.wire != null) wire = savedgame.wire;
        if (typeof savedgame.circuit != null) circuit = savedgame.circuit;
        if (typeof savedgame.clickWireStr != null) clickWireStr = savedgame.clickWireStr;
        if (typeof savedgame.clickCopperStr != null) clickCopperStr = savedgame.clickCopperStr;
        if (typeof savedgame.clickCircuitStr != null) clickCircuitStr = savedgame.clickCircuitStr;
        if (typeof savedgame.clickSiliconStr != null) clickSiliconStr = savedgame.clickSiliconStr;
        if (typeof savedgame.wireCopperCost != null) wireCopperCost = savedgame.wireCopperCost;
        if (typeof savedgame.circuitWireCost != null) circuitWireCost = savedgame.circuitWireCost;
        if (typeof savedgame.circuitSiliconCost != null) circuitSiliconCost = savedgame.circuitSiliconCost;
    }
    else { console.log('Cannot load; save file does not exists') }
}

function deleteSave() {
    localStorage.removeItem('save');
    window.location.reload();
    console.log('Deleted the save file, Captain.')
}

// END OF SAVE STUFF

load();
updateWindow();
saveCountdown();
debugCalc();
