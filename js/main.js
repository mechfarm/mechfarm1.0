var clock = 1000;

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
    else { clock = clock - amount; }
    document.getElementById('clock').innerHTML = clock;
}

function copperModify(type){
    var amount = document.getElementById('copperModVal').value;
    if (type === 0) { copper = parseInt(copper) + parseInt(amount); }
    else { copper = copper - amount; }
    document.getElementById('copper_Debug').innerHTML = Math.round(copper * 100) / 100;
    document.getElementById('copper').innerHTML = Math.round(copper * 100) / 100;
}

function siliconModify(type){
    var amount = document.getElementById('siliconModVal').value;
    if (type === 0) { silicon = parseInt(silicon) + parseInt(amount); }
    else { silicon = silicon - amount; }
    document.getElementById('silicon_Debug').innerHTML = Math.round(silicon * 100) / 100;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 100) / 100;
}

function wireModify(type){
    var amount = document.getElementById('wireModVal').value;
    if (type === 0) { wire = parseInt(wire) + parseInt(amount); }
    else { wire = wire - amount; }
    document.getElementById('wire_Debug').innerHTML = Math.round(wire * 100) / 100;
    document.getElementById('wire').innerHTML = Math.round(wire * 100) / 100;
}

// END OF DEBUG CODES FOR NAVBAR

// BEGIN OF STATS CODING

function clickCopper(){
    copper += clickCopperStr;
    document.getElementById('copper').innerHTML = Math.round(copper * 100) / 100;
}

function clickSilicon(){
    silicon += clickSiliconStr;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 100) / 100;
}

function clickWire(){
    if (copper >= wireCopperCost){
        wire += clickWireStr;
        copper -= clickWireStr;
    }
    document.getElementById('wire').innerHTML = Math.round(wire * 100) / 100;
    document.getElementById('copper').innerHTML = Math.round(copper * 100) / 100;
}

function clickCircuit(){
    if (silicon >= (Math.round((circuitSiliconCost-0.1)*100)/100) && wire >= (Math.round((circuitWireCost-0.1)*100)/100)){
        circuit += clickCircuitStr;
        silicon -= clickCircuitStr;
        wire -= (circuitWireCost * clickCircuitStr)
    }
    document.getElementById('circuit').innerHTML = Math.round(circuit * 100) / 100;
    document.getElementById('wire').innerHTML = Math.round(wire * 100) / 100;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 100) / 100;
}

// END OF STATS CODING

// BEGIN OF ORE_SHOP CODING

function buyMinebot(amount) {
    if (wire >= minebotCost) {
        minebot++;
        wire = parseInt(wire) - parseInt(minebotCost);
        minebotCost = Math.floor(minebotIniCost * Math.pow(1.1,minebot))
        document.getElementById('minebot').innerHTML = minebot;
        document.getElementById('wire').innerHTML = Math.floor(wire);
        
        minebotCost = Math.floor(minebotIniCost * Math.pow(1.1,minebot));
        document.getElementById('minebotCost').innerHTML = minebotCost;
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
        updateText();
    }
}

// END OF REFINE_SHOP CODING

function debugCalc() {
    document.getElementById('copper_Debug').innerHTML = Math.round(copper * 100) / 100;
    document.getElementById('silicon_Debug').innerHTML = Math.round(silicon * 100) / 100;
    document.getElementById('wire_Debug').innerHTML = Math.round(wire * 100) / 100;
    setTimeout(debugCalc, clock);   
}

function calc(){
    wirePS = (wirebot * wirebotValue);
    copperPS = (minebot * minebotValue) - wirePS;
    
    var checkCopper = copper;
    checkCopper += copperPS;
    
    if (checkCopper <= 0) {
        copper = 0;
        wirePS = 0;
        copperPS = 0;
    }
    
    copper += copperPS;
    wire += wirePS;
    
    minebotTot = minebot * minebotValue;
    wirebotTot = wirebot * wirebotValue;
}

function updateText() {
    
    document.getElementById('copperPS').innerHTML = Math.round(copperPS * 100) / 100;
    document.getElementById('wirePS').innerHTML = Math.round(wirePS * 100) / 100;
    
    document.getElementById('copper').innerHTML = Math.round(copper * 100) / 100;
    document.getElementById('silicon').innerHTML = Math.round(silicon * 100) / 100;
    
    document.getElementById('wire').innerHTML = Math.round(wire * 100) / 100;
    document.getElementById('circuit').innerHTML = Math.round(circuit * 100) / 100;
    
    document.getElementById('minebotTot').innerHTML = Math.round(minebotTot * 100) / 100;
    document.getElementById('minebotCost').innerHTML = Math.round(minebotCost * 100) / 100;
    
    document.getElementById('wirebotTot').innerHTML = Math.round(wirebotTot * 100) / 100;
    document.getElementById('wirebotCost').innerHTML = Math.round(wirebotCost * 100) / 100;
}

function updateWindow() {
    calc();
    updateText();
    setTimeout(updateWindow, clock);
}

updateWindow();
debugCalc();