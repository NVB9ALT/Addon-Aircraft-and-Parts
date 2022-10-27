//This aircraft is still prone to the spin glitch, so it's not included in the regular addon aircraft.
geofs.addonAircraft = {}
geofs.addonAircraft.isF14A = 0
geofs.addonAircraft.F14AInstruments = 0
geofs.addonAircraft.runF14A = function(){
   console.log("Loading F-14A Tomcat. Model credit manilov.ap")
}
F14ALi = document.createElement("li");
F14ALi.innerHTML = '<div><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/f-14-airplane-tomcat-fighter-jet-ENB74k2-600.jpg">Grumman F-14A Tomcat</div>';
F14ALi.addEventListener("click", geofs.addonAircraft.runF14A);
//this works actually
F14ALi.setAttribute("data-aircraft", 2581)
F14ALi.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(F14ALi)
function runF14A() {
if (geofs.aircraft.instance.id == 2581 && geofs.aircraft.instance.liveryId == 1) {
   if (geofs.animation.values.mach >= 1.75 && geofs.animation.values.slipball <= 1.2 && geofs.animation.values.slipball >= -1.2) {
geofs.aircraft.instance.engines[0].thrust = 90000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 140000
geofs.aircraft.instance.engines[1].thrust = 90000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 140000
   } else if (geofs.animation.values.slipball <= 1.2 && geofs.animation.values.slipball >= -1.2) {
geofs.aircraft.instance.engines[0].thrust = 60000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 90000
geofs.aircraft.instance.engines[1].thrust = 60000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 90000
	}
	if (geofs.animation.values.kias > 50) {
if (geofs.animation.values.slipball >= 1.2) { //right
   geofs.aircraft.instance.engines[1].thrust = 5000
	geofs.aircraft.instance.engines[1].afterBurnerThrust = 30000
}
if (geofs.animation.values.slipball <= -1.2) { //left
   geofs.aircraft.instance.engines[0].thrust = 5000
	geofs.aircraft.instance.engines[0].afterBurnerThrust = 30000
}
	}
//add new "correctHUD" just below the orig HUD, then it's ready for release
	geofs.aircraft.instance.setup.instruments.correctHUD = {
            "cockpit": {
                "position": [0, 7.109, 1.06],
                "scale": 0.65
            },
            "animations": [
                {"value": "view", "type": "show", "eq": "cockpit"}
            ]
	}
if (geofs.addonAircraft.F14AInstruments == 0) {
	instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.addonAircraft.F14AInstruments = 1
}
setTimeout(() => {
   geofs.addonAircraft.isF14A = 1
},5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations = [];
	geofs.aircraft.instance.definition.parts[0].animations[0] = {};
	geofs.aircraft.instance.definition.parts[0].animations[0].type = "hide"
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
},10000)} else {
   geofs.addonAircraft.isF14A = 0
   geofs.addonAircraft.F14AInstruments = 0
}
}
f14aInterval = setInterval(function(){runF14A()},100)
