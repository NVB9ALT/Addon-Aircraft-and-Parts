geofs.addonAircraft = {};
document.querySelectorAll('[data-aircraft]').forEach(function(e){
   var elemName = e.outerText;
    if (elemName.includes("Su-35")) {
	    e.innerHTML = '<img src="images/planes/su35.png">Sukhoi Su-35 Flanker-E<div data-aircraft="18" data-livery="0"><img src="images/planes/su35_0.png">Akula 35</div><div data-aircraft="18" data-livery="2"><img src="images/planes/su35_2.png">Russia Bort 06</div><div data-aircraft="18" data-livery="3"><img src="images/planes/su35_3.png">Russia Bort 901</div>';
    }
});
//-----F/A-18C Hornet-----------------------------------------------------------------------------------------------------
//adding the button
geofs.addonAircraft.runFA18 = function(){
   console.log("Loading F/A-18C. Model credit cs09736. Model loaded under CC Attribution Share-Alike Liscense.")
   geofs.aircraft.instance.change(18, 4)
}
f18Li = document.createElement("li");
f18Li.innerHTML = '<div><img src="https://w7.pngwing.com/pngs/871/313/png-transparent-boeing-f-a-18e-f-super-hornet-mcdonnell-douglas-f-a-18-hornet-battlefield-3-rogerson-aircraft-corporation-airplane-boeing-767-video-game-fighter-aircraft-airplane.png">F/A-18C Hornet</div>';
f18Li.addEventListener("click", geofs.addonAircraft.runFA18);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f18Li)

geofs.f18instruments = new Boolean(0)
//the actual implementation lol:
function runHornet() {
   if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 4) {
//removing the thrust vectoring
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
//flight control system
   if (geofs.animation.values.cobraMode == 1) {
geofs.aircraft.instance.definition.parts[2].area = 30
geofs.aircraft.instance.definition.parts[12].stalls = true
geofs.aircraft.instance.definition.parts[13].stalls = true
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.accZ >= 30) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
}
   } else {
geofs.aircraft.instance.definition.parts[2].area = 17
geofs.aircraft.instance.definition.parts[12].stalls = false
geofs.aircraft.instance.definition.parts[13].stalls = false
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.accZ >= 50) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
}
   }
//making the LERX stall like a delta wing (bc it kinda is)
geofs.aircraft.instance.definition.parts[2].stallIncidence = 25
geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 70
//The actual wings have delayed lift loss, because the leading edge vortex streaming off the LERX
//sticks to the wing and maintains the pressure differential
geofs.aircraft.instance.definition.parts[3].stallIncidence = 25
geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[3].area = 15
geofs.aircraft.instance.definition.parts[4].stallIncidence = 25
geofs.aircraft.instance.definition.parts[4].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[4].area = 15
//Tuning the stabilizer area
geofs.aircraft.instance.definition.parts[11].area = 3
//Adjusting engine power
geofs.aircraft.instance.engines[0].thrust = 50000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 87000
geofs.aircraft.instance.engines[1].thrust = 50000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 87000
//Stuff from aircraft-fixes.js
   geofs.aircraft.instance.definition.parts[46].animations[2] = {};
	geofs.aircraft.instance.definition.parts[46].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[46].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[46].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[46].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[46].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[46].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
   geofs.aircraft.instance.definition.parts[51].animations[2] = {};
	geofs.aircraft.instance.definition.parts[51].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[51].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[51].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[51].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[51].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[51].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
//Maintaining 1:1 TWR
geofs.aircraft.instance.definition.mass = 17000
audio.soundplayer.setRate(geofs.aircraft.instance.definition.sounds[3].id, 0.5) //Sound pitch modification
//Replacing the tires lol
geofs.aircraft.instance.definition.contactProperties = {
        "wheel": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
        	"rollingFriction": 0.00001,
            "damping": 1
        },
        "frame": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
	    "airfoil": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
        "hook": {
            "frictionCoef": 2,
            "dynamicFriction": 0.01,
            "damping": 1
        }
    };
//Adding the airbrake
geofs.aircraft.instance.definition.airbrakesTravelTime = 1;
geofs.aircraft.instance.definition.instruments.spoilers = "";
geofs.aircraft.instance.definition.instruments.correctHUD = {
            "cockpit": {
                "position": [-0.01, 8.3, 1.23],
                "scale": 0.4
            },
            "animations": [
                {"value": "view", "type": "show", "eq": "cockpit"}
            ]
	}
if (geofs.f18instruments == 0) {
   instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.f18instruments = 1
}
setTimeout(() => {
   geofs.addonAircraft.isFA18 = 1
},5000)
setTimeout(() => {
   	 geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
   	 geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	 geofs.aircraft.instance.definition.parts[50].animations[0].gt = 100000
	 geofs.aircraft.instance.definition.parts[55].animations[0].gt = 100000
},10000)
   } else {
geofs.addonAircraft.isFA18 = 0
geofs.f18instruments = 0
   }
}
checkRunHornetInterval = setInterval(function(){runHornet()},100)

//-----Mig-17 Fresco-----------------------------------------------------------------------------------------------------
geofs.addonAircraft.isMig17 = 0
geofs.addonAircraft.runMiG17 = function(){
   console.log("Loading MiG-17. Model credit manilov.ap")
}
mig17Li = document.createElement("li");
mig17Li.innerHTML = '<div><img src="https://finescale.com/~/media/images/workbench-reviews/2020/february-2020/fsmwb1219_zvezda_mig17_01.jpg">Mikoyan-Gurevich MiG-17 "Fresco"</div>';
mig17Li.addEventListener("click", geofs.addonAircraft.runMiG17);
//this works actually
mig17Li.setAttribute("data-aircraft", 3)
mig17Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(mig17Li)
function runMiG17() {
   if (geofs.aircraft.instance.id == 3 && geofs.aircraft.instance.liveryId == 1) {
geofs.aircraft.instance.definition.parts[3].area = 3
geofs.aircraft.instance.definition.parts[4].area = 3
geofs.aircraft.instance.definition.parts[8].liftFactor = 7
geofs.aircraft.instance.definition.parts[9].liftFactor = 7
geofs.aircraft.instance.definition.parts[8].dragFactor = 1
geofs.aircraft.instance.definition.parts[9].dragFactor = 1
geofs.aircraft.instance.definition.parts[16].liftFactor = 8
geofs.aircraft.instance.engines[0].thrust = 15000
geofs.aircraft.instance.engines[1].thrust = 15000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 20000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 20000
   if (geofs.animation.values.view == "cockpit") {
geofs.aircraft.instance.cockpitSetup.parts[1].object3d.model._model.color.alpha = 0
   }
setTimeout(() => {
   geofs.addonAircraft.isMig17 = 1
},5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
},10000)
   } else {
geofs.addonAircraft.isMig17 = 0
   }
}
mig17Int = setInterval(function(){runMiG17()},100)

//-----Su-27 Flanker (the OG one)---------------------------------------------------------------------------------------
geofs.addonAircraft.isSu27 = new Boolean(0)
geofs.debug.su27Instruments = new Boolean(0)
geofs.addonAircraft.runSu27 = function(){
   geofs.aircraft.instance.change(18, 1)
}
flankerLi = document.createElement("li");
flankerLi.innerHTML = '<div><img src="images/planes/su35_1.png">Sukhoi Su-27 Flanker</div>';
flankerLi.addEventListener("click", geofs.addonAircraft.runSu27);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(flankerLi)
function runSu27() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 1) {
geofs.addonAircraft.isSu27 = 1
geofs.aircraft.instance.definition.airbrakesTravelTime = 1
geofs.aircraft.instance.definition.accessoriesTravelTime = 0.1
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
geofs.aircraft.instance.engines[0].thrust = 60000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 80000
geofs.aircraft.instance.engines[1].thrust = 60000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 80000
   geofs.aircraft.instance.definition.parts[46].animations[2] = {};
	geofs.aircraft.instance.definition.parts[46].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[46].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[46].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[46].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[46].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[46].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
   geofs.aircraft.instance.definition.parts[51].animations[2] = {};
	geofs.aircraft.instance.definition.parts[51].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[51].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[51].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[51].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[51].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[51].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
	geofs.aircraft.instance.definition.parts[48].animations[0].gt = 9100
	geofs.aircraft.instance.definition.parts[53].animations[0].gt = 9100
if (geofs.debug.su27Instruments == 0) {
geofs.aircraft.instance.setup.instruments = {
        "cdi": "",
        "compass": "",
        "airspeedSupersonic": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
		"brakes": "",		
		"gear": "",
		"flaps": "",
		"spoilers": ""
}
instruments.init(geofs.aircraft.instance.setup.instruments)
geofs.debug.su27Instruments = 1
}
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 7.5
} else if (geofs.animation.values.accZ >= 60) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.5
}
if (geofs.animation.values.cobraMode == 1) {
   geofs.aircraft.instance.definition.parts[2].area = 30
} else {
   geofs.aircraft.instance.definition.parts[2].area = 10
}
   } else {
geofs.debug.su27Instruments = 0
geofs.addonAircraft.isSu27 = 0
	}
};
Su27Int = setInterval(function(){runSu27()},100)
//clearInterval(Su27Int)
//-----E-7 Wedgetail AEW&C------------------------------------------------------------------------------------------------
geofs.addonAircraft.isE7 = 0
geofs.addonAircraft.runE7 = function(){
   console.log("Loading E-7 Wedgetail AEW&C.")
}
e7Li = document.createElement("li");
e7Li.innerHTML = '<div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/B737_AEW%26C_Wedgetail_cut_model.PNG/220px-B737_AEW%26C_Wedgetail_cut_model.PNG">E-7 Wedgetail AEW&C</div>';
e7Li.addEventListener("click", geofs.addonAircraft.runE7);
//this works actually
e7Li.setAttribute("data-aircraft", 3292)
e7Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(e7Li)
function runE7Wedgetail() {
   if (geofs.aircraft.instance.id == 3292 && geofs.aircraft.instance.liveryId == 1) {
geofs.addonAircraft.isE7 = 1
geofs.aircraft.instance.definition.mass = 75000
   } else {
geofs.addonAircraft.isE7 = 0
	}
}
e7int = setInterval(function(){runE7Wedgetail()},100)
//-----MiG-21 Fishbed-----------------------------------------------------------------------------------------------------
geofs.addonAircraft.runMig21 = function(){
	console.log("Loading MiG-21 Fishbed. Model credit manilov.ap.")
	controls.optionalAnimatedPart.target = 1
}
mig21Li = document.createElement("li");
mig21Li.innerHTML = '<div><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/russian-fighter-mig-21-fishbed-jet-q1ylV3E-600.jpg">Mikoyan-Gurevich MiG-21 "Fishbed"</div>';
mig21Li.addEventListener("click", geofs.addonAircraft.runMig21);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(mig21Li)
mig21Li.setAttribute("data-aircraft", 7)
mig21Li.setAttribute("data-livery", 1)

geofs.mig21instruments = new Boolean(0)
//clearInterval(mig21Interval)
function runMiG21() {
if (geofs.aircraft.instance.id == 7 && geofs.aircraft.instance.liveryId == 1) {
	geofs.aircraft.instance.definition.parts[2].area = 7
	geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 90
	geofs.aircraft.instance.definition.parts[3].area = 7
	geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 90
	geofs.aircraft.instance.definition.parts[6].area = 1
if (geofs.animation.values.kias >= 150 && geofs.animation.values.kias <= 225) {
	geofs.aircraft.instance.definition.parts[7].area = 4
	geofs.aircraft.instance.definition.parts[8].area = 4
} else {
	geofs.aircraft.instance.definition.parts[7].area = 2
	geofs.aircraft.instance.definition.parts[8].area = 2
}
if (geofs.animation.values.aoa > 15) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.aoa > 5) {
   geofs.aircraft.instance.definition.dragFactor = 3
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.4
}
	geofs.aircraft.instance.definition.mass = 21000
	geofs.aircraft.instance.engine.thrust = 40000
if (controls.optionalAnimatedPart.target == 0) {
	geofs.aircraft.instance.engine.afterBurnerThrust = 90000
} else {
   geofs.aircraft.instance.engine.afterBurnerThrust = 70000
}
	geofs.aircraft.instance.definition.parts[12].liftFactor = 5
geofs.aircraft.instance.setup.instruments = {
        "cdi": "",
        "compass": "",
        "airspeedSupersonic": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
		"brakes": "",		
		"gear": "",
		"flaps": "",
		"spoilers": ""
}
if (geofs.mig21instruments == 0) {
   instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.mig21instruments = 1
}
setTimeout(() => {
   geofs.addonAircraft.isMiG21 = 1
 },5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations[0] = {"type": "hide", "value": "rpm", "gt": -1}
	geofs.aircraft.instance.definition.parts[41].animations[0].gt = 100000
 },10000)
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	geofs.camera.currentDefinition.position[2] = geofs.aircraft.instance.definition.cameras.cockpit.position[2] - 0.15
   }
} else {
   geofs.addonAircraft.isMiG21 = 0
	geofs.mig21instruments = 0
}
}
mig21Interval = setInterval(function(){runMiG21()},100)
//-----Morane-Saulneir "G"-----------------------------------------------------------------------------------------------------
geofs.addonAircraft.isMsG = 0
geofs.addonAircraft.runMsG = function(){
   console.log("Loading Morane-Saulnier G. Model credit manilov.ap")
}
MsGLi = document.createElement("li");
MsGLi.innerHTML = '<div>Morane-Saulnier Type G</div>';
MsGLi.addEventListener("click", geofs.addonAircraft.runMsG);
MsGLi.setAttribute("data-aircraft", 8)
MsGLi.setAttribute("data-livery", 3)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(MsGLi)
function runMsG() {
if (geofs.aircraft.instance.id == 8 && geofs.aircraft.instance.liveryId == 3) {
	geofs.aircraft.instance.definition.parts[4].area = 3
	geofs.aircraft.instance.definition.parts[5].area = 3
	geofs.aircraft.instance.definition.parts[6].area = 3
	geofs.aircraft.instance.definition.parts[7].area = 3
	geofs.aircraft.instance.definition.mass = 300
	geofs.aircraft.instance.definition.parts[30].thrust = 1500
	geofs.aircraft.instance.definition.parts[8].area = 0.069
	geofs.aircraft.instance.definition.parts[9].area = 0.069
	geofs.aircraft.instance.definition.parts[10].area = 0.2
	geofs.aircraft.instance.definition.parts[11].area = 0.2
	geofs.aircraft.instance.definition.dragFactor = 0.7
	geofs.aircraft.instance.definition.autopilot = false
   geofs.addonAircraft.isMSG = 1
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
	if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	}
} else {
geofs.addonAircraft.isMSG = 0	
}
}
msgInterval = setInterval(function(){runMsG()},100)
//----- F-117 -------------------------------------------------------------------------------------------------------------
geofs.addonAircraft.isF117 = 0;
geofs.debug.F117Instruments = 0;
geofs.addonAircraft.runF117 = function(){
   console.log("Loading F-117. Model credit manilov.ap")
}
f117Li = document.createElement("li");
f117Li.innerHTML = '<div><img src="https://cdn.shopify.com/s/files/1/0277/5197/2966/products/HA5807-3_1200x789.jpg">Lockheed F-117 "Nighthawk"</div>';
f117Li.addEventListener("click", geofs.addonAircraft.runF117);
//this works actually
f117Li.setAttribute("data-aircraft", 5)
f117Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f117Li)
function runF117() {
   if (geofs.aircraft.instance.id == 5 && geofs.aircraft.instance.liveryId == 1) {
	//Remove lights
	geofs.aircraft.instance.definition.parts[46].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[46].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[45].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[45].animations[0].lt = -1
	geofs.aircraft.instance.definition.parts[47].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[47].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[48].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[48].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[8].area = 5
setTimeout(() => {
	geofs.addonAircraft.isF117 = 1
},5000)
setTimeout(() => {
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
}, 10000)
   //Wing area adjustment
	geofs.aircraft.instance.definition.parts[2].area = 4
	geofs.aircraft.instance.definition.parts[5].area = 4
	//Drag increase (flat panels = draggy airplane)
	geofs.aircraft.instance.definition.dragFactor = 0.5
	//Boost thrust to compensate for rise in dragFactor
	geofs.aircraft.instance.engines[0].thrust = 20000
	geofs.aircraft.instance.engines[1].thrust = 20000
	//remove flaps
	geofs.aircraft.instance.definition.flapsPositions = [0.01, 0.02, 0.03, 0.04, 0.05]
if (geofs.debug.F117Instruments == 0) {
	geofs.aircraft.instance.definition.instruments = {
        "hsi": "",
        "compass": "",
        "airspeedJet": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
        "brakes": "",
        "gear": ""
}
	instruments.init(geofs.aircraft.instance.definition.instruments)
	geofs.debug.F117Instruments = 1
}
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	geofs.camera.currentDefinition.position[0] = geofs.aircraft.instance.definition.cameras.cockpit.position[0] + 0.35
	geofs.camera.currentDefinition.position[1] = geofs.aircraft.instance.definition.cameras.cockpit.position[1] - 0.2
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Stealth technology goes here (haven't been able to develop it)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   } else {
geofs.debug.F117Instruments = 0
geofs.addonAircraft.isF117 = 0
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Stealth technology goes here (haven't been able to develop it)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	}
}
f117Int = setInterval(function(){runF117()},100)
