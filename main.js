var hmdIsActive = new Boolean(0);
geofs.animation.values.hmdShow = null;
      geofs.debug.hasHMD = null;
//this is basically the 2.9 HUD, but without the attitude display.
instruments.definitions.helmetMountedDisplay = {
"overlay": {
          "url": "images/instruments/hud/frame.png",
          "size": {"x": 400, "y": 400},
          "anchor": {"x": 200, "y": 200},
          "position": {"x": window.innerWidth/2 + 200, "y": window.innerHeight/2 + 175},
          "drawOrder": 1,
          "rescale": true,
          "rescalePosition": true,
          "overlays": [
          {
            "animations": [
              {
                "type": "translateY",
                "value": "kias",
                "ratio": 2.1,
                "offset": 10,
                "min": 0,
                "max": 1200
              }
            ],
            "url": "images/instruments/hud/kias.png",
            "anchor": {"x": 0, "y": 100},
            "size": {"x": 80, "y": null},
            "position": {"x": -210, "y": 20},
            "iconFrame": {"x": 40, "y": 160},
            "drawOrder": 1
          },
          {
            "animations": [
              {
                "type": "translateY",
                "value": "altThousands",
                "ratio": 0.2385,
                "offset": 280,
                "min": 0,
                "max": 100000
              }
            ],
            "url": "images/instruments/hud/altitude.png",
            "anchor": {"x": 0, "y": 0},
            "size": {"x": 50, "y": null},
            "position": {"x": 170, "y": -150},
            "iconFrame": {"x": 32, "y": 170},
            "drawOrder": 1
          },
          {
            "animations": [
              {
                "type": "translateY",
                "value": "altThousands",
                "ratio": 0.238,
                "offset": 95,
                "min": 0,
                "max": 100000
              },
              {
                "type": "translateX",
                "value": "altTensShift",
                "ratio": -22.7,
                "min": 0,
                "max": 100000
              }
            ],
            "name": "altten",
            "url": "images/instruments/hud/altitudetens.png",
            "anchor": {"x": 0, "y": 0},
            "size": {"x": 334, "y": 200},
            "position": {"x": 155, "y": -150},
            "iconFrame": {"x": 15, "y": 170},
            "drawOrder": 1
          },
          {
            "animations": [
              {
                "type": "translateX",
                "value": "heading360",
                "ratio": -2.64,
                "offset": 12
              }
            ],
            "url": "images/instruments/hud/compass.png",
            "anchor": {"x": 0, "y": 0},
            "size": {"x": 2000, "y": null},
            "offset": {"x": 0, "y": -10},
            "position": {"x": -170, "y": -270},
            "iconFrame": {"x": 200, "y": 30},
            "drawOrder": 1
          },
          {
            "animations": [
              {
                "type": "translateY",
                "value": "machUnits",
                "ratio": 23,
                "offset": 1
              }
            ],
            "url": "images/instruments/hud/digits.png",
            "anchor": {"x": 0, "y": 0},
            "size": {"x": 11, "y": null},
            "position": {"x": -155, "y": -202},
            "iconFrame": {"x": 11, "y": 23},
            "drawOrder": 2
          },
          {
            "animations": [
              {
                "type": "translateY",
                "value": "machTenth",
                "ratio": 23,
                "offset": 1
              }
            ],
            "url": "images/instruments/hud/digits.png",
            "anchor": {"x": 0, "y": 0},
            "size": {"x": 11, "y": null},
            "position": {"x": -141, "y": -202},
            "iconFrame": {"x": 11, "y": 23},
            "drawOrder": 2
          },
          {
            "animations": [
              {
                "type": "translateY",
                "value": "machHundredth",
                "ratio": 23,
                "offset": 1
              }
            ],
            "url": "images/instruments/hud/digits.png",
            "anchor": {"x": 0, "y": 0},
            "size": {"x": 11, "y": null},
            "position": {"x": -131, "y": -202},
            "iconFrame": {"x": 11, "y": 23},
            "drawOrder": 2
          }
          ]
        }
	};
function checkIT() {
if (geofs.debug.hasHMD == 1) {
if (hmdIsActive == 0) {
geofs.aircraft.instance.setup.instruments.helmetMountedDisplay = {"animations": [{"value": "hmdShow", "type": "show", "eq": "1"}]}
instruments.init(geofs.aircraft.instance.setup.instruments)
hmdIsActive = 1
};
if (geofs.camera.definitions["cockpit"].orientations.current[0] >= 15 || geofs.camera.definitions["cockpit"].orientations.current[0] <= -15) {
   geofs.animation.values.hmdShow = 1
   } else {
	geofs.animation.values.hmdShow = 0
   }
} else {
   hmdIsActive = 0
   }
};checkITint = setInterval(function(){checkIT()},1000);

geofs.condensation = {};
let cons = true;
geofs.condensation.update = function() {
  if (cons == true) {
    cons = false;
    toggleC.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded");
  } else {
    cons = true;
    toggleC.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded is-checked")
  }
};
let elementSel = document.getElementsByClassName('geofs-preference-list')[0].getElementsByClassName('geofs-advanced')[0].getElementsByClassName('geofs-stopMousePropagation')[0];
let toggleC = document.createElement("label");
    toggleC.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded");
    toggleC.setAttribute("for", "condensation");
    toggleC.setAttribute("id", "condensation");
    toggleC.setAttribute("tabindex", "0");
    toggleC.setAttribute("dataUpgraded", ",MaterialSwitch,MaterialRipple");
    toggleC.innerHTML = '<input type="checkbox" id="condensation" class="mdl-switch__input" data-gespref="geofs.condensation.preference"><span class="mdl-switch__label">Condensation effects</span>';
elementSel.appendChild(toggleC);
toggleC.addEventListener("click", geofs.condensation.update);

geofs.addonAircraft = {};

var droptankF16 = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/370_gal_drop_tank.glb"
var su27airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/su-27_airbrake.glb"
var condensationConesLarge = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/concones.glb"
var condensationConesSmall = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/concones2.glb"
var machCone = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/shockcone.glb"
var parachute = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/parachute-proper.glb"
var rainEffect = "https://geo-fs.com/models/precipitations/rain.gltf"
var c182 = "https://geo-fs.com/models/aircraft/generics/c182/multiplayer.glb"

geofs.debug.createC182 = function() {
   geofs.debug.C182 = {};
	geofs.debug.C182.model = new geofs.api.Model(c182)
}
geofs.debug.loadC182 = function() {
   geofs.debug.C182 || geofs.debug.createC182()
	try {
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, -0.2], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.C182.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("C182 loading error. " + e)
    }
};

geofs.debug.isSu27 = new Boolean(0)
geofs.debug.su27Instruments = new Boolean(0)
geofs.debug.createF16Tank = function() {
   geofs.debug.F16Tank = {};
	geofs.debug.F16Tank.model = new geofs.api.Model(droptankF16)
}
geofs.debug.loadF16Tank = function() {
   geofs.debug.F16Tank || geofs.debug.createF16Tank()
	try {
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.F16Tank.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("F16 tank loading error. " + e)
    }
};
geofs.debug.createMachCone = function() {
   geofs.debug.machCone = {};
	geofs.debug.machCone.model = new geofs.api.Model(machCone)
}
geofs.debug.loadMachCone = function() {
   geofs.debug.machCone || geofs.debug.createMachCone()
	try {
	     geofs.debug.machCone.model._model.color.alpha = 0.9
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.machCone.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("Mach cone loading error. " + e)
    }
};
geofs.debug.createParachute = function() {
   geofs.debug.parachute = {};
	geofs.debug.parachute.model = new geofs.api.Model(parachute)
}
geofs.debug.loadParachute = function() {
   geofs.debug.parachute || geofs.debug.createParachute()
	try {
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.parachute.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("Parachute loading error. " + e)
    }
};
//M33.getOrientation(geofs.aircraft.instance.object3d._rotation) simplifies rotations into [x, y, z] but it's still orientated north - will need some algorithms to switch to aircraft-oriented.
geofs.debug.createSu27Airbrake = function() {
   geofs.debug.su27airbrake = {};
	geofs.debug.su27airbrake.model = new geofs.api.Model(su27airbrake)
}
geofs.debug.loadSu27Airbrake = function() {
   geofs.debug.su27airbrake || geofs.debug.createSu27Airbrake()
	try {
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.su27airbrake.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("Airbrake loading error. " + e)
    }
};
geofs.debug.createConConesLarge = function() {
   geofs.debug.conConeLarge = {};
	geofs.debug.conConeLarge.model = new geofs.api.Model(condensationConesLarge)
}
geofs.debug.loadConConesLarge = function() {
   geofs.debug.conConeLarge || geofs.debug.createConConesLarge()
	try {
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.conConeLarge.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("Condensation cone loading error. " + e)
    }
};
geofs.debug.createConConesSmall = function() {
   geofs.debug.conConeSmall = {};
	geofs.debug.conConeSmall.model = new geofs.api.Model(condensationConesSmall)
}
geofs.debug.loadConConesSmall = function() {
   geofs.debug.conConeSmall || geofs.debug.createConConesSmall()
	try {
        var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05], geofs.aircraft.instance.llaLocation)),
            d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
        geofs.debug.conConeSmall.model.setPositionOrientationAndScale(c, d);
    } catch (e) {
	    throw("Condensation cone loading error. " + e)
    }
};
geofs.debug.update = function (a) {
    geofs.debug.fps = exponentialSmoothing("fps", 1e3 / a).toPrecision(2);
    if (geofs.debugOn) {
        if ((a = $(".debugPointName")[0])) {
            a = a.value;
            var b = geofs.aircraft.instance.parts[a],
                c = instruments.list[a];
            if (b) {
                var d = $(".debugCollisionPointIndex")[0].value;
                d
                    ? ((d = b.collisionPoints[parseInt(d)] || b.points[d]), geofs.debug.placeAxis(b.object3d.getWorldFrame(), d.worldPosition))
                    : ($(".debugShowForceSource")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.forceSourcePoint.worldPosition),
                      $(".debugShowForceDirection")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.forceDirection.worldPosition),
                      $(".debugShowLocalPosition")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.object3d.worldPosition),
                      $(".debugShowsuspensionOrigin")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.suspensionOrigin.worldPosition));
                $(".debugPartData").html("Node Origin: " + b.object3d._nodeOrigin);
            }
            c && c.definition.cockpit && ((b = c.definition.cockpit.position), geofs.debug.placeAxis(geofs.aircraft.instance.object3d.getWorldFrame(), b.worldPosition));
            "camera" == a && ((b = geofs.aircraft.instance.definition.camera.cockpit), geofs.aircraft.instance.object3d.setVectorWorldPosition(b), geofs.debug.placeAxis(geofs.aircraft.instance.object3d.getWorldFrame(), b.worldPosition));
        }
        geofs.debug.placingObjectId = $(".objectId").val();
        geofs.debug.placingObjectId &&
            $(".geofs-debugObjectLlaHtr").text(geofs.objects.getLla(geofs.debug.placingObjectId) + " " + geofs.objects.getHtr(geofs.debug.placingObjectId) + " " + geofs.objects.getScale(geofs.debug.placingObjectId));
    }
  if (geofs.aircraft.instance.id == 7) {
     geofs.debug.loadF16Tank()
  }
	 // brake parachute
	 if (geofs.aircraft.instance.id == 7) { //compile database
  if (geofs.animation.values.airbrakesTarget > 0 && geofs.animation.values.kias >= 10 && geofs.animation.values.kias <= 200) {
geofs.debug.loadParachute()
//increase drag a lot without having it increment (somehow)
//separate function for each aircraft? would definitely be doable
geofs.aircraft.instance.definition.dragFactor = 10
  } else {
geofs.aircraft.instance.definition.dragFactor = 0.5
  }
	 }
  if (geofs.debug.isSu27 == 1 && geofs.animation.values.airbrakesTarget > 0) {
    geofs.debug.loadSu27Airbrake()
  }
  
  if (geofs.animation.values.mach > 0.95 && geofs.animation.values.mach < 1.05 && geofs.aircraft.instance.id != 2364 && cons == true) {
	 geofs.debug.loadMachCone()
  }
  if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true) {
    geofs.debug.loadConConesLarge()
  }
  if (geofs.aircraft.instance.id == 7 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true) {
    geofs.debug.loadConConesSmall()
  }
  if (geofs.aircraft.instance.id == 2857 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true) {
    geofs.debug.loadConConesSmall()
  }
  if (geofs.aircraft.instance.id == 2) {
    geofs.debug.loadC182()
	 geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.definition.parts[0].animations[0].gt = "-1"
  }
};

//New afterburner model?


//MINOR AIRCRAFT VARIATIONS:
//- Su-35 -> Su-27
document.querySelectorAll('[data-aircraft]').forEach(function(e){
   var elemName = e.outerText;
    if (elemName.includes("Su-35")) {
	    e.innerHTML = '<img src="images/planes/su35.png">Sukhoi Su-35 Flanker-E<div data-aircraft="18" data-livery="0"><img src="images/planes/su35_0.png">Akula 35</div><div data-aircraft="18" data-livery="2"><img src="images/planes/su35_2.png">Russia Bort 06</div><div data-aircraft="18" data-livery="3"><img src="images/planes/su35_3.png">Russia Bort 901</div><div data-aircraft="18" data-livery="4"><img src="images/planes/su35_4.png">Ho Ho Ho</div>';
    }
});
geofs.addonAircraft.runSu27 = function(){
   geofs.aircraft.instance.change(18, 1)
}
flankerLi = document.createElement("li");
flankerLi.innerHTML = '<div><img src="images/planes/su35_1.png">Sukhoi Su-27 Flanker</div>';
flankerLi.addEventListener("click", geofs.addonAircraft.runSu27);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(flankerLi)
//modified texture?
function runSu27() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 1) {
geofs.debug.isSu27 = 1
geofs.aircraft.instance.definition.airbrakesTravelTime = 1
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
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
   geofs.aircraft.instance.definition.dragFactor = 1.7
}
   } else {
geofs.debug.isSu27 = 0
geofs.debug.su27Instruments = 0
	}
if (geofs.aircraft.instance.id == 18 && geofs.debug.isSu27 == 0 && geofs.aircraft.instance.definition.parts[46].animations[0].ratio == 0.069) {
geofs.aircraft.instance.change(geofs.aircraft.instance.id, null, /*justReload*/ true, /*forceReset*/ false)
   }
};
Su27Int = setInterval(function(){runSu27()},1000)
//- Piper Cub -> Piper Super Cub
document.querySelectorAll('[data-aircraft]').forEach(function(e){
   var elemName = e.outerText;
    if (elemName.includes("Piper Cub")) {
  e.innerHTML = '<img src="images/planes/cub.png">Piper Cub'
    }
});
geofs.addonAircraft.runSuperCub = function(){
   geofs.aircraft.instance.change(7, 1)
}
cubLi = document.createElement("li");
cubLi.innerHTML = '<div><img src="images/planes/cub_1.png">Piper Super Cub</div>';
cubLi.addEventListener("click", geofs.addonAircraft.runSuperCub);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(cubLi)
function runSuperCub() {
//needs flaps
if (geofs.aircraft.instance.id == 1 && geofs.aircraft.instance.liveryId == 1) {
      geofs.aircraft.instance.engine.thrust = 2250
   	geofs.aircraft.instance.definition.zeroRPMAltitude = 50000
   	geofs.aircraft.instance.definition.Vspeeds.VNE = 133
   	geofs.aircraft.instance.definition.Vspeeds.VNO = 100
} else {
   if (geofs.aircraft.instance.id == 1 && geofs.aircraft.instance.definition.Vspeeds.VNE == 133) {
geofs.aircraft.instance.change(geofs.aircraft.instance.id, null, /*justReload*/ true, /*forceReset*/ false)
	}
}
};
superCubInt = setInterval(function(){runSuperCub()},1000)
//- F-16 Block 60 (the one with the most powerful engine) (same as the Super Cub. Include HMD.)
geofs.debug.b60 = null;
geofs.addonAircraft.runF16Block60 = function(){
   geofs.aircraft.instance.change(7)
	geofs.debug.b60 = 1
}
b60Li = document.createElement("li");
b60Li.innerHTML = '<div><img src="images/planes/f16.png">F-16 Block 60</div>';
b60Li.addEventListener("click", geofs.addonAircraft.runF16Block60);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(b60Li)
function superF16() {
   if (geofs.debug.b60 == 1 && geofs.aircraft.instance.id == 7) {
geofs.debug.hasHMD = 1
geofs.aircraft.instance.engine.afterBurnerThrust = 145000
geofs.aircraft.instance.engine.thrust = 77500
	} else {
geofs.debug.b60 = 0
	}
}
setInterval(function(){superF16()},100)
//F-22 HMD
function runF22HMD() {
   if (geofs.aircraft.instance.id == 2857) {
geofs.debug.hasHMD = 1
   }
}
f22hmdInterval = setInterval(function(){runF22HMD()},100)
//Su-33 (carrier-capable, add canards)
//Add cockpit texture to F-15C

//Properly fix F-14 spin glitch problem
/*
geofs.aircraft.instance.object3d.model._model.opaquePass = 1
geofs.aircraft.instance.object3d.model._model.shadows = 0
geofs.aircraft.instance.object3d.model._model._minimumPixelSize = 1000
geofs.aircraft.instance.object3d.model._model._shadows = 0
*/

//Sorta inbetween: E-7 Wedgetail (tack a 3d model on top of a P-8 Poseidon and we'll be GTG)
   //geofs.debug.loadE7Antenna()

//FULL-FLEDGED ADDON AIRCRAFT:
//Cessna 172 -> Cessna 182T (similar to the Super Cub. Add G1000 PFD.)
//   geofs.debug.loadC182()
//Mirage -> Rafale
//Su-35 -> F/A-18C (using HARV FM)
   //F-16 sounds
	//Afterburner model
	//Credit to this guy: https://sketchfab.com/cs09736
geofs.addonAircraft.runFA18 = function(){
   ui.notification.show("This aircraft has not been added yet. The button is a test.")
}
f18Li = document.createElement("li");
f18Li.innerHTML = '<div><img src="https://w7.pngwing.com/pngs/871/313/png-transparent-boeing-f-a-18e-f-super-hornet-mcdonnell-douglas-f-a-18-hornet-battlefield-3-rogerson-aircraft-corporation-airplane-boeing-767-video-game-fighter-aircraft-airplane.png">F/A-18C Hornet</div>';
f18Li.addEventListener("click", geofs.addonAircraft.runFA18);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f18Li)
//Alphajet -> Harrier
//PC-7 -> PC-9???
//Concorde -> Tu-144
//   https://geo-fs.com/models/aircraft/generics/c25a/multiplayer.glb
