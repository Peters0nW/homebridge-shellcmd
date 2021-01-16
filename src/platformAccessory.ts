import { Service, PlatformAccessory, CharacteristicValue, CharacteristicSetCallback, CharacteristicGetCallback } from 'homebridge';

import { ExampleHomebridgePlatform } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class ExamplePlatformAccessory {
  private service: Service;

  /**
   * These are just used to create a working example
   * You should implement your own code to track the state of your accessory
   */
  private exampleStates = {
    On: false,
    Brightness: 100,
    Hue: 0,
    Saturation: 0,
  };

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Peters0nW')
      .setCharacteristic(this.platform.Characteristic.Model, 'Model-EINS')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.UUID);

    // get the LightBulb service if it exists, otherwise create a new LightBulb service
    // you can create multiple services for each accessory
    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);

    // set the service name, this is what is displayed as the default name on the Home app
    // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
    // this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);
    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb
    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .on('set', this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .on('get', this.getOn.bind(this));
    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .on('set', this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below
    this.service.getCharacteristic(this.platform.Characteristic.Hue)
      .on('set', this.setHue.bind(this));
    this.service.getCharacteristic(this.platform.Characteristic.Saturation)
      .on('set', this.setSaturation.bind(this));

      this.accessory.addService(this.platform.Service.TemperatureSensor, 'tempSensor', 'B001');

    // Example: add two "motion sensor" services to the accessory
    /*     
        const humidity-2 = this.accessory.getService('Sensor Two') ||
          this.accessory.addService(this.platform.Service.HumiditySensor, 'Sensor Two', 'RH-002');
        .)
         */
    /**
     * Updating characteristics values asynchronously.
     * 
     * Example showing how to update the state of a Characteristic asynchronously instead
     * of using the `on('get')` handlers.
     * Here we change update the motion sensor trigger states on and off every 10 seconds
     * the `updateCharacteristic` method.
     * 
     */
    /* let motionDetected = false;
    setInterval(() => {
      // EXAMPLE - inverse the trigger
      motionDetected = !motionDetected;

      // push the new value to HomeKit
      motionSensorOneService.updateCharacteristic(this.platform.Characteristic.MotionDetected, motionDetected);
      motionSensorTwoService.updateCharacteristic(this.platform.Characteristic.MotionDetected, !motionDetected);

      this.platform.log.debug('Triggering motionSensorOneService:', motionDetected);
      this.platform.log.debug('Triggering motionSensorTwoService:', !motionDetected);
    }, 20000); */
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */
  setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {

    // implement your own code to turn your device on/off
    this.exampleStates.On = value as boolean;
    this.platform.log.debug('Lampe-1 An  ->', value);
    // you must call the callback function
    this.exampleStates.On = false;
    callback(null);
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a Light bulb is on.
   * 
   * GET requests should return as fast as possbile. A long delay here will result in
   * HomeKit being unresponsive and a bad user experience in general.
   * 
   * If your device takes time to respond you should update the status of your device
   * asynchronously instead using the `updateCharacteristic` method instead.

   * @example
   * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
   */
  getOn(callback: CharacteristicGetCallback) {

    // implement your own code to check if the device is on
    const isOn = this.exampleStates.On;
    this.platform.log.debug('Lampe-2 An ->', isOn);
    // you must call the callback function
    // the first argument should be null if there were no errors
    // the second argument should be the value to return
    callback(null, isOn);
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, changing the Brightness
   */
  setBrightness(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    // implement your own code to set the brightness
    this.exampleStates.Brightness = value as number;
    this.platform.log.debug('Brightness -> ', value);

    // you must call the callback function
    callback(null);
  }

  setHue(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    // implement your own code to set the brightness
    this.exampleStates.Hue = value as number;
    this.platform.log.debug('Hue -> ', value);
    // you must call the callback function
    callback(null);
  }

  setSaturation(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    // implement your own code to set the brightness
    this.exampleStates.Saturation = value as number;
    this.platform.log.debug('Saturation -> ', value);
    // you must call the callback function
    callback(null);
  }
}
