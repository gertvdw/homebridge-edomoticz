var Constants = require('./constants.js');

module.exports = {
    eDomoticzServices: eDomoticzServices
}


function eDomoticzServices() {

}

/* Define Custom Services & Characteristics */
// PowerMeter Characteristics
eDomoticzServices.TotalConsumption = function() {
    var charUUID = 'E863F10C-079E-48FF-8F27-9C2605A29F52'; //UUID.generate('eDomoticz:customchar:TotalConsumption');
    Characteristic.call(this, 'Total Consumption', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: 'kWh'
    });
    this.value = this.getDefaultValue();
};
eDomoticzServices.TodayConsumption = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:TodayConsumption');
    Characteristic.call(this, 'Today', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: 'kWh'
    });
    this.value = this.getDefaultValue();
};
eDomoticzServices.CurrentConsumption = function() {
    var charUUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52'; //UUID.generate('eDomoticz:customchar:CurrentConsumption');
    Characteristic.call(this, 'Consumption', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: 'W'
    });
    this.value = this.getDefaultValue();
};
eDomoticzServices.GasConsumption = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:CurrentConsumption');
    Characteristic.call(this, 'Meter Total', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
// Custom SetPoint Minutes characteristic for TempOverride modes
eDomoticzServices.TempOverride = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:OverrideTime');
    Characteristic.call(this, 'Override (Mins, 0 = Auto, 481 = Permanent)', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        maxValue: 481,
        minValue: 0,
        minStep: 1,
        unit: 'mins',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
// The PowerMeter itself
eDomoticzServices.MeterDeviceService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:powermeter:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.CurrentConsumption());
    this.addOptionalCharacteristic(new eDomoticzServices.TotalConsumption());
    this.addOptionalCharacteristic(new eDomoticzServices.TodayConsumption());
};
// P1 Smart Meter -> Gas
eDomoticzServices.GasDeviceService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:gasmeter:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.GasConsumption());
};
// Usage Meter Characteristics
eDomoticzServices.CurrentUsage = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:CurrentUsage');
    Characteristic.call(this, 'Current Usage', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        unit: Characteristic.Units.PERCENTAGE,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
// The Usage Meter itself
eDomoticzServices.UsageDeviceService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:usagedevice:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.CurrentUsage());
};
// Location Meter (sensor should have 'Location' in title)
eDomoticzServices.Location = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:Location');
    Characteristic.call(this, 'Location', charUUID);
    this.setProps({
        format: Characteristic.Formats.STRING,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
eDomoticzServices.LocationService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:location:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.Location());
};
// DarkSkies WindSpeed Characteristic
eDomoticzServices.WindSpeed = function() {
    var charUUID = '9331096F-E49E-4D98-B57B-57803498FA36'; //UUID.generate('eDomoticz:customchar:WindSpeed');
    Characteristic.call(this, 'Wind Speed', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit:'m/s'
    });
    this.value = this.getDefaultValue();
};
// DarkSkies WindChill Characteristic
eDomoticzServices.WindChill = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:WindChill');
    Characteristic.call(this, 'Wind Chill', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: Characteristic.Units.CELSIUS
    });
    this.value = this.getDefaultValue();
};
// DarkSkies WindDirection Characteristic
eDomoticzServices.WindDirection = function() {
    var charUUID = '6C3F6DFA-7340-4ED4-AFFD-0E0310ECCD9E'; //UUID.generate('eDomoticz:customchar:WindDirection');
    Characteristic.call(this, 'Wind Direction', charUUID);
    this.setProps({
        format: 'string',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
// DarkSkies Virtual Wind Sensor
eDomoticzServices.WindDeviceService = function(displayName, subtype) {
    var serviceUUID = '2AFB775E-79E5-4399-B3CD-398474CAE86C'; //UUID.generate('eDomoticz:winddevice:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.WindSpeed());
    this.addOptionalCharacteristic(new eDomoticzServices.WindChill());
    this.addOptionalCharacteristic(new eDomoticzServices.WindDirection());
    this.addOptionalCharacteristic(new Characteristic.CurrentTemperature());
};
// DarkSkies Rain Characteristics
eDomoticzServices.Rainfall = function() {
    var charUUID = 'C53F35CE-C615-4AA4-9112-EBF679C5EB14'; //UUID.generate('eDomoticz:customchar:Rainfall');
    Characteristic.call(this, 'Amount today', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: 'mm'
    });
    this.value = this.getDefaultValue();
};
// DarkSkies Rain Meter itself
eDomoticzServices.RainDeviceService = function(displayName, subtype) {
    var serviceUUID = 'D92D5391-92AF-4824-AF4A-356F25F25EA1'; //UUID.generate('eDomoticz:raindevice:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.Rainfall());
};
// DarkSkies Visibility Characteristics
eDomoticzServices.Visibility = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:Visibility');
    Characteristic.call(this, 'Distance', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: 'miles'
    });
    this.value = this.getDefaultValue();
};
// DarkSkies Visibility Meter itself
eDomoticzServices.VisibilityDeviceService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:visibilitydevice:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.Visibility());
};
// DarkSkies Solar Radiation Characteristics
eDomoticzServices.SolRad = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:SolRad');
    Characteristic.call(this, 'Radiation', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        unit: 'W/m2',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
// DarkSkies Solar Radiation Meter itself
eDomoticzServices.SolRadDeviceService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:solraddevice:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.SolRad());
};
// Barometer Characteristic
eDomoticzServices.Barometer = function() {
    var charUUID = 'E863F10F-079E-48FF-8F27-9C2605A29F52';
    Characteristic.call(this, 'Pressure', charUUID);
    this.setProps({
        format: Characteristic.Formats.FLOAT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
        unit: 'hPA',
        minValue: 500,
		maxValue: 2000,
		minStep: 0.1
    });
    this.value = this.getDefaultValue();
};
// Weather Service
eDomoticzServices.WeatherService = function(displayName, subtype) {
    var serviceUUID = 'E863F001-079E-48FF-8F27-9C2605A29F52';
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new Characteristic.CurrentTemperature());
};
// DarkSkies Visibility Characteristics
eDomoticzServices.Infotext = function() {
    var charUUID = UUID.generate('eDomoticz:customchar:Infotext');
    Characteristic.call(this, 'Infotext', charUUID);
    this.setProps({
        format: 'string',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
};
// DarkSkies Visibility Meter itself
eDomoticzServices.InfotextDeviceService = function(displayName, subtype) {
    var serviceUUID = UUID.generate('eDomoticz:infotextdevice:customservice');
    Service.call(this, displayName, serviceUUID, subtype);
    this.addCharacteristic(new eDomoticzServices.Infotext());
};
/* End of Custom Services & Characteristics */