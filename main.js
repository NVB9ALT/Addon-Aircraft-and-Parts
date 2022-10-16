//-----F/A-18C Hornet-----------------------------------------------------------------------------------------------------

//Stuff to do: make it a seperate button in the aircraft menu, multiplayer visibility?
//naming the thing
document.querySelectorAll('[data-aircraft]').forEach(function(e){
   var elemName = e.outerText;
    if (elemName.includes("Su-35")) {
       e.innerHTML = '<li data-aircraft="18"><img src="https://geo-fs.com/images/planes/su35.png">Sukhoi Su-35<div data-aircraft="18" data-livery="0"><img src="https://geo-fs.com/images/planes/su35_0.png">Akula 35</div><div data-aircraft="18" data-livery="1"><img src="https://geo-fs.com/images/planes/su35_1.png">Russia Bort 01</div><div data-aircraft="18" data-livery="2"><img src="https://geo-fs.com/images/planes/su35_2.png">Russia Bort 06</div><div data-aircraft="18" data-livery="3"><img src="https://geo-fs.com/images/planes/su35_3.png">Russia Bort 901</div><div data-aircraft="18" data-livery="4"><img src="https://w7.pngwing.com/pngs/871/313/png-transparent-boeing-f-a-18e-f-super-hornet-mcdonnell-douglas-f-a-18-hornet-battlefield-3-rogerson-aircraft-corporation-airplane-boeing-767-video-game-fighter-aircraft-airplane.png">F/A-18C Hornet</div></li>'
    }
});
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
   }
}
checkRunHornetInterval = setInterval(function(){runHornet()},100)

//-----Mig-17 Fresco--------------------------------------------------------------------------------------------------
//Cockpit model: Alphajet cockpit
//Base aircraft: Alphajet

//-----Su-27 Flanker (the OG one)-------------------------------------------------------------------------------------
//Already made, just have to rework implementation
