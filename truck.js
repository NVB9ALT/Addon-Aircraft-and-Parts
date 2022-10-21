geofs.addonAircraft = {}
if (geofs.aircraft.instance.id == 2) {
   geofs.addonAircraft.isTruck = 1
	setInterval(function(){if (geofs.aircraft.instance.id != 2) {geofs.addonAircraft.isTruck = 0}},100)
	//nosewheel
	geofs.aircraft.instance.definition.parts[16].animations[0].value = "roll"
	geofs.aircraft.instance.definition.parts[16].animations[0].ratio = 35
	//airfoils
	geofs.aircraft.instance.definition.parts[2].area = 0.069
	geofs.aircraft.instance.definition.parts[3].area = 0.069
	geofs.aircraft.instance.definition.parts[4].area = 0.069
	geofs.aircraft.instance.definition.parts[5].area = 3
	geofs.aircraft.instance.definition.parts[6].area = 1
	geofs.aircraft.instance.definition.parts[7].area = 1
	geofs.aircraft.instance.definition.parts[8].area = 0.069
	geofs.aircraft.instance.definition.parts[9].area = 0.069
	geofs.aircraft.instance.definition.parts[10].area = 10
   //thrust and Vspeeds
	geofs.aircraft.instance.definition.parts[19].thrust = 2000
	geofs.aircraft.instance.definition.Vspeeds = {"VS0": 0, "VS": 0, "VFE": 0, "VNO": 70, "VNE": 120}
	//yoke anims
	geofs.aircraft.instance.cockpitSetup.parts[10].animations[0].ratio = 0.0069
	geofs.aircraft.instance.cockpitSetup.parts[11].animations[0].ratio = 0.0069
	geofs.aircraft.instance.cockpitSetup.parts[16].animations[1].threshold = -1
	//CG adjust
	geofs.aircraft.instance.definition.parts[0].centerOfMass[1] = [0, 2, -2]
} else {
   throw("Please switch to a Cessna 172 before running this mod")
}
