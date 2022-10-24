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
   console.log("Loading F/A-18C. Model credit to cs09736")
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
//increasing the LERX area
geofs.aircraft.instance.definition.parts[2].area = 25
//making the LERX stall like a delta wing (bc it kinda is)
geofs.aircraft.instance.definition.parts[2].stallIncidence = 25
geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 70
//The actual wings have delayed lift loss, because the leading edge vortex streaming off the LERX
//sticks to the wing and maintains the pressure differential
geofs.aircraft.instance.definition.parts[3].stallIncidence = 25
geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[4].stallIncidence = 25
geofs.aircraft.instance.definition.parts[4].zeroLiftIncidence = 50
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
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
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

//-----Mig-17 Fresco--------------------------------------------------------------------------------------------------
geofs.addonAircraft.isMig17 = 0
geofs.addonAircraft.runMiG17 = function(){
   console.log("Loading MiG-17")
}
mig17Li = document.createElement("li");
mig17Li.innerHTML = '<div><img src="https://finescale.com/~/media/images/workbench-reviews/2020/february-2020/fsmwb1219_zvezda_mig17_01.jpg">Mikoyan-Gurevich MiG-17 Fresco</div>';
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
geofs.aircraft.instance.cockpitSetup.parts[1].object3d.model._model.color.alpha = 0
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

//-----Su-27 Flanker (the OG one)-------------------------------------------------------------------------------------
geofs.addonAircraft.isSu27 = new Boolean(0)
geofs.debug.su27Instruments = new Boolean(0)
geofs.addonAircraft.runSu27 = function(){
   geofs.aircraft.instance.change(18, 1)
	geofs.addonAircraft.isSu27 = 1
}
flankerLi = document.createElement("li");
flankerLi.innerHTML = '<div><img src="images/planes/su35_1.png">Sukhoi Su-27 Flanker</div>';
flankerLi.addEventListener("click", geofs.addonAircraft.runSu27);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(flankerLi)
function runSu27() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 1) {
geofs.aircraft.instance.definition.airbrakesTravelTime = 1
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
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.5
}
   } else {
geofs.debug.su27Instruments = 0
geofs.addonAircraft.isSu27 = 0
	}
};
Su27Int = setInterval(function(){runSu27()},100)
