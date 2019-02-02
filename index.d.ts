declare module 'react-native-ble-plx' {
  export type RefreshGattMoment = 'OnConnected';
  export type Base64 = string;
  export type UUID = string;

  /**
   * Converts UUID to full 128bit, lowercase format which should be used to compare UUID values.
   *
   * @param {UUID} uuid 16bit, 32bit or 128bit UUID.
   * @returns {UUID} 128bit lowercase UUID.
   */
  export function fullUUID(uuid: UUID): UUID;

  export const enum BleErrorCode {
    // Implementation specific errors ------------------------------------------------------------------------------------
    /**
     * This error can be thrown when unexpected error occurred and in most cases it is related to implementation bug.
     * Original message is available in {@link #bleerrorreason|reason} property.
     */
    UnknownError = 0,
    /**
     * Current promise failed to finish due to BleManager shutdown. It means that user called
     * {@link #blemanagerdestroy|manager.destroy()} function before all operations completed.
     */
    BluetoothManagerDestroyed = 1,
    /**
     * Promise was explicitly cancelled by a user with {@link #blemanagercanceltransaction|manager.cancelTransaction()}
     * function call.
     */
    OperationCancelled = 2,
    /**
     * Operation timed out and was cancelled.
     */
    OperationTimedOut = 3,
    /**
     * Native module couldn't start operation due to internal state, which doesn't allow to do that.
     */
    OperationStartFailed = 4,
    /**
     * Invalid UUIDs or IDs were passed to API call.
     */
    InvalidIdentifiers = 5,

    // Bluetooth global states -------------------------------------------------------------------------------------------
    /**
     * Bluetooth is not supported for this particular device. It may happen on iOS simulator for example.
     */
    BluetoothUnsupported = 100,
    /**
     * There are no granted permissions which allow to use BLE functionality. On Android it may require
     * android.permission.ACCESS_COARSE_LOCATION permission or android.permission.ACCESS_FINE_LOCATION permission.
     */
    BluetoothUnauthorized = 101,
    /**
     * BLE is powered off on device. All previous operations and their state is invalidated.
     */
    BluetoothPoweredOff = 102,
    /**
     * BLE stack is in unspecified state.
     */
    BluetoothInUnknownState = 103,
    /**
     * BLE stack is resetting.
     */
    BluetoothResetting = 104,
    /**
     * BLE state change failed.
     */
    BluetoothStateChangeFailed = 105,

    // Peripheral errors. ------------------------------------------------------------------------------------------------
    /**
     * Couldn't connect to specified device.
     */
    DeviceConnectionFailed = 200,
    /**
     * Device was disconnected.
     */
    DeviceDisconnected = 201,
    /**
     * Couldn't read RSSI from device.
     */
    DeviceRSSIReadFailed = 202,
    /**
     * Device is already connected. It is not allowed to connect twice to the same device.
     */
    DeviceAlreadyConnected = 203,
    /**
     * Couldn't find device with specified ID.
     */
    DeviceNotFound = 204,
    /**
     * Operation failed because device has to be connected to perform it.
     */
    DeviceNotConnected = 205,
    /**
     * Device could not change MTU value.
     */
    DeviceMTUChangeFailed = 206,

    // Services ----------------------------------------------------------------------------------------------------------
    /**
     * Couldn't discover services for specified device.
     */
    ServicesDiscoveryFailed = 300,
    /**
     * Couldn't discover included services for specified service.
     */
    IncludedServicesDiscoveryFailed = 301,
    /**
     * Service with specified ID or UUID couldn't be found. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    ServiceNotFound = 302,
    /**
     * Services were not discovered. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    ServicesNotDiscovered = 303,

    // Characteristics ---------------------------------------------------------------------------------------------------
    /**
     * Couldn't discover characteristics for specified service.
     */
    CharacteristicsDiscoveryFailed = 400,
    /**
     * Couldn't write to specified characteristic. Make sure that
     * {@link #characteristiciswritablewithresponse|characteristic.isWritableWithResponse}
     * or {@link #characteristiciswritablewithoutresponse|characteristic.isWritableWithoutResponse} is set to true.
     */
    CharacteristicWriteFailed = 401,
    /**
     * Couldn't read from specified characteristic. Make sure that
     * {@link #characteristicisreadable|characteristic.isReadable} is set to true.
     */
    CharacteristicReadFailed = 402,
    /**
     * Couldn't set notification or indication for specified characteristic. Make sure that
     * {@link #characteristicisnotifiable|characteristic.isNotifiable} or
     * {@link #characteristicisindicatable|characteristic.isIndicatable} is set to true.
     */
    CharacteristicNotifyChangeFailed = 403,
    /**
     * Characteristic with specified ID or UUID couldn't be found. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    CharacteristicNotFound = 404,
    /**
     * Characteristic were not discovered for specified service. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    CharacteristicsNotDiscovered = 405,
    /**
     * Invalid Base64 format was passed to characteristic API function call.
     */
    CharacteristicInvalidDataFormat = 406,

    // Characteristics ---------------------------------------------------------------------------------------------------
    /**
     * Couldn't discover descriptor for specified characteristic.
     */
    DescriptorsDiscoveryFailed = 500,
    /**
     * Couldn't write to specified descriptor.
     */
    DescriptorWriteFailed = 501,
    /**
     * Couldn't read from specified descriptor.
     */
    DescriptorReadFailed = 502,
    /**
     * Couldn't find specified descriptor.
     */
    DescriptorNotFound = 503,
    /**
     * Descriptors are not discovered for specified characteristic.
     */
    DescriptorsNotDiscovered = 504,
    /**
     * Invalid Base64 format was passed to descriptor API function call.
     */
    DescriptorInvalidDataFormat = 505,

    // Scanning errors ---------------------------------------------------------------------------------------------------
    /**
     * Cannot start scanning operation.
     */
    ScanStartFailed = 600,
    /**
     * Location services are disabled.
     */
    LocationServicesDisabled = 601,
  }

  export const enum BleATTErrorCode {
    /**
     * The ATT command or request successfully completed.
     */
    Success = 0,
    /**
     * The attribute handle is invalid on this device.
     */
    InvalidHandle = 1,
    /**
     * The attribute’s value cannot be read.
     */
    ReadNotPermitted = 2,
    /**
     * The attribute’s value cannot be written.
     */
    WriteNotPermitted = 3,
    /**
     * The attribute Protocol Data Unit (PDU) or “message” is invalid.
     */
    InvalidPdu = 4,
    /**
     * The attribute requires authentication before its value can be read or written.
     */
    InsufficientAuthentication = 5,
    /**
     * The attribute server does not support the request received by the client.
     */
    RequestNotSupported = 6,
    /**
     * The specified offset value was past the end of the attribute’s value.
     */
    InvalidOffset = 7,
    /**
     * The attribute requires authorization before its value can be read or written.
     */
    InsufficientAuthorization = 8,
    /**
     * The prepare queue is full, because too many prepare write requests have been queued.
     */
    PrepareQueueFull = 9,
    /**
     * The attribute is not found within the specified attribute handle range.
     */
    AttributeNotFound = 10,
    /**
     * The attribute cannot be read or written using the ATT read blob request.
     */
    AttributeNotLong = 11,
    /**
     * The encryption key size used for encrypting this link is insufficient.
     */
    InsufficientEncryptionKeySize = 12,
    /**
     * The length of the attribute’s value is invalid for the intended operation.
     */
    InvalidAttributeValueLength = 13,
    /**
     * The ATT request has encountered an unlikely error and therefore could not be completed.
     */
    UnlikelyError = 14,
    /**
     * The attribute requires encryption before its value can be read or written.
     */
    InsufficientEncryption = 15,
    /**
     * The attribute type is not a supported grouping attribute as defined by a higher-layer specification.
     */
    UnsupportedGroupType = 16,
    /**
     * Resources are insufficient to complete the ATT request.
     */
    InsufficientResources = 17,

    // Values 0x012 – 0x7F are reserved for future use.
  }

  /**
   * iOS specific error codes.
   * @name BleIOSErrorCode
   */
  export const enum BleIOSErrorCode {
    /**
     * An unknown error occurred.
     */
    Unknown = 0,
    /**
     * The specified parameters are invalid.
     */
    InvalidParameters = 1,
    /**
     * The specified attribute handle is invalid.
     */
    InvalidHandle = 2,
    /**
     * The device is not currently connected.
     */
    NotConnected = 3,
    /**
     * The device has run out of space to complete the intended operation.
     */
    OutOfSpace = 4,
    /**
     * The operation is canceled.
     */
    OperationCancelled = 5,
    /**
     * The connection timed out.
     */
    ConnectionTimeout = 6,
    /**
     * The peripheral disconnected.
     */
    PeripheralDisconnected = 7,
    /**
     * The specified UUID is not permitted.
     */
    UuidNotAllowed = 8,
    /**
     * The peripheral is already advertising.
     */
    AlreadyAdvertising = 9,
    /**
     * The connection failed.
     */
    ConnectionFailed = 10,
    /**
     * The device already has the maximum number of connections.
     */
    ConnectionLimitReached = 11,
    /**
     * Unknown device.
     */
    UnknownDevice = 12,
  }

  /**
   * Android specific error codes.
   * @name BleAndroidErrorCode
   */
  export const enum BleAndroidErrorCode {
    /**
     * The device has insufficient resources to complete the intended operation.
     */
    NoResources = 0x80,
    /**
     * Internal error occurred which may happen due to implementation error in BLE stack.
     */
    InternalError = 0x81,
    /**
     * BLE stack implementation entered illegal state and operation couldn't complete.
     */
    WrongState = 0x82,
    /**
     * BLE stack didn't allocate sufficient memory buffer for internal caches.
     */
    DbFull = 0x83,
    /**
     * Maximum number of pending operations was exceeded.
     */
    Busy = 0x84,
    /**
     * Generic BLE stack error.
     */
    Error = 0x85,
    /**
     * Command is already queued up in GATT.
     */
    CmdStarted = 0x86,
    /**
     * Illegal parameter was passed to internal BLE stack function.
     */
    IllegalParameter = 0x87,
    /**
     * Operation is pending.
     */
    Pending = 0x88,
    /**
     * Authorization failed before performing read or write operation.
     */
    AuthFail = 0x89,
    /**
     * More cache entries were loaded then expected.
     */
    More = 0x8a,
    /**
     * Invalid configuration
     */
    InvalidCfg = 0x8b,
    /**
     * GATT service already started.
     */
    ServiceStarted = 0x8c,
    /**
     * GATT link is encrypted but prone to man in the middle attacks.
     */
    EncrypedNoMitm = 0x8d,
    /**
     * GATT link is not encrypted.
     */
    NotEncrypted = 0x8e,
    /**
     * ATT command was sent but channel is congested.
     */
    Congested = 0x8f,
  }

  export interface NativeBleError {
    errorCode: BleErrorCode;
    attErrorCode?: BleATTErrorCode;
    iosErrorCode?: BleIOSErrorCode;
    androidErrorCode?: BleAndroidErrorCode;
    reason?: string;

    deviceID?: string;
    serviceUUID?: string;
    characteristicUUID?: string;
    descriptorUUID?: string;
    internalMessage?: string;
  }

  export interface BleErrorCodeMessageMapping {
    [key in BleErrorCode]: string;
  }

  export class BleError extends Error {
    /**
     * Platform independent error code. Possible values are defined in {@link BleErrorCode}.
     */
    errorCode: BleErrorCode;
    /**
     * Platform independent error code related to ATT errors.
     */
    attErrorCode?: BleATTErrorCode;
    /**
     * iOS specific error code (if not an ATT error).
     */
    iosErrorCode?: BleATTErrorCode;
    /**
     * Android specific error code (if not an ATT error).
     */
    androidErrorCode?: BleAndroidErrorCode;
    /**
     * Platform specific error message.
     */
    reason?: string;

    constructor(nativeBleError: NativeBleError | string, errorMessageMapping: BleErrorCodeMessageMapping);
  }

  export class Device {
    id: string;
    name?: string;
    rssi?: number;
    mtu: number;
    manufacturerData?: Base64;
    serviceData?: { [key in UUID]: Base64 };
    serviceUUIDs?: UUID[];
    localName?: string;
    txPowerLevel?: number;
    solicitedServiceUUIDs?: UUID[];
    isConnectable?: boolean;
    overflowServiceUUIDs?: UUID[];
  }

  export const enum ScanMode {
    /**
     * A special Bluetooth LE scan mode. Applications using this scan mode will passively listen for
     * other scan results without starting BLE scans themselves.
     */
    Opportunistic = -1,

    /**
     * Perform Bluetooth LE scan in low power mode. This is the default scan mode as it consumes the
     * least power. [default value]
     */
    LowPower = 0,

    /**
     * Perform Bluetooth LE scan in balanced power mode. Scan results are returned at a rate that
     * provides a good trade-off between scan frequency and power consumption.
     */
    Balanced = 1,

    /**
     * Scan using highest duty cycle. It's recommended to only use this mode when the application is
     * running in the foreground.
     */
    LowLatency = 2,
  }

  export const enum ScanCallbackType {
    /**
     * Trigger a callback for every Bluetooth advertisement found that matches the filter criteria.
     * If no filter is active, all advertisement packets are reported. [default value]
     */
    AllMatches = 1,

    /**
     * A result callback is only triggered for the first advertisement packet received that matches
     * the filter criteria.
     */
    FirstMatch = 2,

    /**
     * Receive a callback when advertisements are no longer received from a device that has been
     * previously reported by a first match callback.
     */
    MatchLost = 4,
  }

  export const enum LogLevel {
    /**
     * Logging in native module is disabled
     */
    None = 'None',
    /**
     * All logs in native module are shown
     */
    Verbose = 'Verbose',
    /**
     * Only debug logs and of higher importance are shown in native module.
     */
    Debug = 'Debug',
    /**
     * Only info logs and of higher importance are shown in native module.
     */
    Info = 'Info',
    /**
     * Only warning logs and of higher importance are shown in native module.
     */
    Warning = 'Warning',
    /**
     * Only error logs and of higher importance are shown in native module.
     */
    Error = 'Error',
  }

  export const enum State {
    /**
     * The current state of the manager is unknown; an update is imminent.
     */
    Unknown = 'Unknown',
    /**
     * The connection with the system service was momentarily lost; an update is imminent.
     */
    Resetting = 'Resetting',
    /**
     * The platform does not support Bluetooth low energy.
     */
    Unsupported = 'Unsupported',
    /**
     * The app is not authorized to use Bluetooth low energy.
     */
    Unauthorized = 'Unauthorized',
    /**
     * Bluetooth is currently powered off.
     */
    PoweredOff = 'PoweredOff',
    /**
     * Bluetooth is currently powered on and available to use.
     */
    PoweredOn = 'PoweredOn',
  }

  export const enum ConnectionPriority {
    /**
     * Default, recommended option balanced between power consumption and data throughput.
     */
    Balanced = 0,
    /**
     * High priority, low latency connection, which increases transfer speed at the expense of power consumption.
     */
    High = 1,
    /**
     * Low power, reduced data rate connection setup.
     */
    LowPower = 2,
  }

  export interface ScanOptions {
    /**
     * By allowing duplicates scanning records are received more frequently [iOS only]
     */
    allowDuplicates: boolean;
    /**
     * Scan mode for Bluetooth LE scan [Android only]
     */
    scanMode: ScanMode;
    /**
     * Scan callback type for Bluetooth LE scan [Android only]
     */
    callbackType: boolean;
  }

  export interface ConnectionOptions {
    /**
     * Whether to directly connect to the remote device (false) or to automatically connect as soon as the remote device
     * becomes available (true). [Android only]
     * @memberof ConnectionOptions
     * @instance
     */
    autoConnect?: boolean;

    /**
     * Whether MTU size will be negotiated to this value. It is not guaranteed to get it after connection is successful.
     *
     * @memberof ConnectionOptions
     * @instance
     */
    requestMTU?: number;

    /**
     * Whether action will be taken to reset services cache. This option may be useful when a peripheral's firmware was
     * updated and it's services/characteristics were added/removed/altered. [Android only]
     * {@link https://stackoverflow.com/questions/22596951/how-to-programmatically-force-bluetooth-low-energy-service-discovery-on-android}
     * @memberof ConnectionOptions
     * @instance
     */
    refreshGatt?: RefreshGattMoment;

    /**
     * Number of milliseconds after connection is automatically timed out. In case of race condition were connection is
     * established right after timeout event, device will be disconnected immediately. Time out may happen earlier then
     * specified due to OS specific behavior.
     *
     * @memberof ConnectionOptions
     * @instance
     */
    timeout?: number;
  }

  export class Service implements NativeService {
    /**
     * Service unique identifier
     */
    id: Identifier;
    /**
     * Service UUID
     */
    uuid: UUID;
    /**
     * Device's ID to which service belongs
     */
    deviceID: Device['id'];
    /**
     * Value indicating whether the type of service is primary or secondary.
     */
    isPrimary: boolean;

    /**
     * Private constructor used to create {@link Service} object.
     *
     * @param {NativeService} nativeService NativeService properties to be copied.
     * @param {BleManager} manager Current BleManager instance.
     * @private
     * @ignore
     */
    constructor(nativeService: NativeService, manager: BleManager);

    /**
     * {@link #blemanagercharacteristicsfordevice|bleManager.characteristicsForDevice()} with partially filled arguments.
     *
     * @returns {Promise<Array<Characteristic>>} Promise which emits array of {@link Characteristic} objects which are
     * discovered for this service.
     */
    characteristics(): Promise<Characteristic[]>;

    /**
     * {@link #blemanagerreadcharacteristicfordevice|bleManager.readCharacteristicForDevice()} with partially filled arguments.
     *
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits first {@link Characteristic} object matching specified
     * UUID path. Latest value of {@link Characteristic} will be stored inside returned object.
     */
    readCharacteristic(characteristicUUID: UUID, transactionId?: string): Promise<Characteristic>;

    /**
     * {@link #blemanagerwritecharacteristicwithresponsefordevice|bleManager.writeCharacteristicWithResponseForDevice()} with partially filled arguments.
     *
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {Base64} valueBase64 Value in Base64 format.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits first {@link Characteristic} object matching specified
     * UUID path. Latest value of characteristic may not be stored inside returned object.
     */
    writeCharacteristicWithResponse(
      characteristicUUID: UUID,
      valueBase64: Base64,
      transactionId?: string
    ): Promise<Characteristic>;

    /**
     * {@link #blemanagerwritecharacteristicwithoutresponsefordevice|bleManager.writeCharacteristicWithoutResponseForDevice()} with partially filled arguments.
     *
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {Base64} valueBase64 Value in Base64 format.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits first {@link Characteristic} object matching specified
     * UUID path. Latest value of characteristic may not be stored inside returned object.
     */
    writeCharacteristicWithoutResponse(
      characteristicUUID: UUID,
      valueBase64: Base64,
      transactionId?: string
    ): Promise<Characteristic>;

    /**
     * {@link #blemanagermonitorcharacteristicfordevice|bleManager.monitorCharacteristicForDevice()} with partially filled arguments.
     *
     * @param {UUID} characteristicUUID - {@link Characteristic} UUID.
     * @param {function(error?: BleError, characteristic?: Characteristic)} listener callback which emits
     * {@link Characteristic} objects with modified value for each notification.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Subscription} Subscription on which `remove()` function can be called to unsubscribe.
     */
    monitorCharacteristic(
      characteristicUUID: UUID,
      listener: (error?: BleError, characteristic?: Characteristic) => void,
      transactionId?: string
    ): Subscription;
  }

  /**
   * Native device object passed from BleModule.
   * @private
   */
  export interface NativeDevice {
    /**
     * Device identifier: MAC address on Android and UUID on iOS.
     * @private
     */
    id: Device['id'];
    /**
     * Device name if present
     * @private
     */
    name?: string;
    /**
     * Current Received Signal Strength Indication of device
     * @private
     */
    rssi?: number;
    /**
     * Current Maximum Transmission Unit for this device. When device is not connected
     * default value of 23 is used.
     * @private
     */
    mtu: number;

    // Advertisement

    /**
     * Device's custom manufacturer data. Its format is defined by manufacturer.
     * @private
     */
    manufacturerData?: Base64;

    /**
     * Map od service UUIDs with associated data.
     * @private
     */
    serviceData?: { [uuid: UUID]: Base64 };

    /**
     * List of available services visible during scanning.
     * @private
     */
    serviceUUIDs?: UUID[];

    /**
     * User friendly name of device.
     * @private
     */
    localName?: string;

    /**
     * Transmission power level of device.
     * @private
     */
    txPowerLevel?: number;

    /**
     * List of solicited service UUIDs.
     * @private
     */
    solicitedServiceUUIDs?: UUID[];

    /**
     * Is device connectable.
     * @private
     */
    isConnectable?: boolean;

    /**
     * List of overflow service UUIDs.
     * @private
     */
    overflowServiceUUIDs?: UUID[];
  }

  /**
   * Native service object passed from BleModule.
   * @private
   */
  export interface NativeService {
    /**
     * Service unique identifier
     * @private
     */
    id: Identifier;
    /**
     * Service UUID
     * @private
     */
    uuid: UUID;
    /**
     * Device's ID to which service belongs
     * @private
     */
    deviceID: Device['id'];
    /**
     * Value indicating whether the type of service is primary or secondary.
     * @private
     */
    isPrimary: boolean;
  }

  /**
   * Native characteristic object passed from BleModule.
   * @private
   */
  export interface NativeCharacteristic {
    /**
     * Characteristic unique identifier
     * @private
     */
    id: Identifier;
    /**
     * Characteristic UUID
     * @private
     */
    uuid: UUID;
    /**
     * Service's ID to which characteristic belongs
     * @private
     */
    serviceID: Identifier;
    /**
     * Service's UUID to which characteristic belongs
     * @private
     */
    serviceUUID: UUID;
    /**
     * Device's ID to which characteristic belongs
     * @private
     */
    deviceID: Device['id'];
    /**
     * True if characteristic can be read
     * @private
     */
    isReadable: boolean;
    /**
     * True if characteristic can be written with response
     * @private
     */
    isWritableWithResponse: boolean;
    /**
     * True if characteristic can be written without response
     * @private
     */
    isWritableWithoutResponse: boolean;
    /**
     * True if characteristic can monitor value changes.
     * @private
     */
    isNotifiable: boolean;
    /**
     * True if characteristic is monitoring value changes without ACK.
     * @private
     */
    isNotifying: boolean;
    /**
     * True if characteristic is monitoring value changes with ACK.
     * @private
     */
    isIndicatable: boolean;
    /**
     * Characteristic value if present
     * @private
     */
    value?: Base64;
  }

  /**
   * Object representing information about restored BLE state after application relaunch.
   * @private
   */
  export interface NativeBleRestoredState {
    /**
     * List of connected devices after state restoration.
     * @type {Array<NativeDevice>}
     * @instance
     * @memberof NativeBleRestoredState
     * @private
     */
    connectedPeripherals: NativeDevice[];
  }

  /**
   * Characteristic object.
   */
  export class Characteristic implements NativeCharacteristic {
    /**
     * Characteristic unique identifier
     */
    id: Identifier;
    /**
     * Characteristic UUID
     */
    uuid: UUID;
    /**
     * Service's ID to which characteristic belongs
     */
    serviceID: Identifier;
    /**
     * Service's UUID to which characteristic belongs
     */
    serviceUUID: UUID;
    /**
     * Device's ID to which characteristic belongs
     */
    deviceID: DeviceId;
    /**
     * True if characteristic can be read
     */
    isReadable: boolean;
    /**
     * True if characteristic can be written with response
     */
    isWritableWithResponse: boolean;
    /**
     * True if characteristic can be written without response
     */
    isWritableWithoutResponse: boolean;
    /**
     * True if characteristic can monitor value changes.
     */
    isNotifiable: boolean;
    /**
     * True if characteristic is monitoring value changes without ACK.
     */
    isNotifying: boolean;
    /**
     * True if characteristic is monitoring value changes with ACK.
     */
    isIndicatable: boolean;
    /**
     * Characteristic value if present
     */
    value?: Base64;

    /**
     * Private constructor used to create instance of {@link Characteristic}.
     * @param {NativeCharacteristic} nativeCharacteristic NativeCharacteristic
     * @param {BleManager} manager BleManager
     * @private
     */
    constructor(nativeCharacteristic: NativeCharacteristic, manager: BleManager);

    /**
     * {@link #blemanagerreadcharacteristicfordevice|bleManager.readCharacteristicForDevice()} with partially filled arguments.
     *
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits this {@link Characteristic}. Latest value will be stored
     * inside returned object.
     */
    read(transactionId?: string): Promise<Characteristic>;

    /**
     * {@link #blemanagerwritecharacteristicwithresponsefordevice|bleManager.writeCharacteristicWithResponseForDevice()} with partially filled arguments.
     *
     * @param {Base64} valueBase64 Value in Base64 format.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits this {@link Characteristic}. Latest value may
     * not be stored inside returned object.
     */
    writeWithResponse(valueBase64: Base64, transactionId?: string): Promise<Characteristic>;

    /**
     * {@link #blemanagerwritecharacteristicwithoutresponsefordevice|bleManager.writeCharacteristicWithoutResponseForDevice()} with partially filled arguments.
     *
     * @param {Base64} valueBase64 Value in Base64 format.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits this {@link Characteristic}. Latest value may
     * not be stored inside returned object.
     */
    writeWithoutResponse(valueBase64: Base64, transactionId?: string): Promise<Characteristic>;

    /**
     * {@link #blemanagermonitorcharacteristicfordevice|bleManager.monitorCharacteristicForDevice()} with partially filled arguments.
     *
     * @param {function(error?: BleError, characteristic?: Characteristic)} listener callback which emits
     * this {@link Characteristic} with modified value for each notification.
     * @param {?TransactionId} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|bleManager.cancelTransaction()} function.
     * @returns {Subscription} Subscription on which `remove()` function can be called to unsubscribe.
     */
    monitor(
      listener: (error?: BleError, characteristic?: Characteristic) => void,
      transactionId?: string
    ): Subscription;
  }

  export class BleManager {
    /**
     * Destroys {@link BleManager} instance. A new instance needs to be created to continue working with
     * this library. All operations which were in progress completes with
     * {@link #bleerrorcodebluetoothmanagerdestroyed|BluetoothManagerDestroyed} error code.
     */
    destroy(): void;

    // Mark: Common ------------------------------------------------------------------------------------------------------

    /**
     * Sets new log level for native module's logging mechanism.
     * @param {LogLevel} logLevel New log level to be set.
     */
    setLogLevel(logLevel: LogLevel);

    /**
     * Get current log level for native module's logging mechanism.
     * @returns {Promise<LogLevel>} Current log level.
     */
    logLevel(): Promise<LogLevel>;

    /**
     * Cancels pending transaction.
     *
     * Few operations such as monitoring characteristic's value changes can be cancelled by a user. Basically every API
     * entry which accepts `transactionId` allows to call `cancelTransaction` function. When cancelled operation is a
     * promise or a callback which registers errors, {@link #bleerror|BleError} with error code
     * {@link #bleerrorcodeoperationcancelled|OperationCancelled} will be emitted in that case. Cancelling transaction
     * which doesn't exist is ignored.
     *
     * @example
     * const transactionId = 'monitor_battery';
     *
     * // Monitor battery notifications
     * manager.monitorCharacteristicForDevice(
     *   device.id, '180F', '2A19',
     *   (error, characteristic) => {
     *   // Handle battery level changes...
     * }, transactionId);
     *
     * // Cancel after specified amount of time
     * setTimeout(() => manager.cancelTransaction(transactionId), 2000);
     *
     * @param {string} transactionId Id of pending transactions.
     */
    cancelTransaction(transactionId: string): void;

    // Mark: Monitoring state --------------------------------------------------------------------------------------------

    /**
     * Enable Bluetooth. This function blocks until BLE is in PoweredOn state. [Android only]
     *
     * @param {?string} transactionId Transaction handle used to cancel operation
     * @returns {Promise<BleManager>} Promise completes when state transition was successful.
     */
    enable(transactionId?: string): Promise<BleManager>;

    /**
     * Disable Bluetooth. This function blocks until BLE is in PoweredOff state. [Android only]
     *
     * @param {?string} transactionId Transaction handle used to cancel operation
     * @returns {Promise<BleManager>} Promise completes when state transition was successful.
     */
    disable(transactionId?: string): Promise<BleManager>;

    /**
     * Current, global {@link State} of a {@link BleManager}. All APIs are working only when active state
     * is "PoweredOn".
     *
     * @returns {Promise<State>} Promise which emits current state of BleManager.
     */
    state(): Promise<State> {
      return this._callPromise(BleModule.state());
    }

    /**
     * Notifies about {@link State} changes of a {@link BleManager}.
     *
     * @example
     * const subscription = this.manager.onStateChange((state) => {
     *      if (state === 'PoweredOn') {
     *          this.scanAndConnect();
     *          subscription.remove();
     *      }
     *  }, true);
     *
     * @param {function(newState: State)} listener Callback which emits state changes of BLE Manager.
     * Look at {@link State} for possible values.
     * @param {boolean} [emitCurrentState=false] If true, current state will be emitted as well. Defaults to false.
     *
     * @returns {Subscription} Subscription on which `remove()` function can be called to unsubscribe.
     */
    onStateChange(listener: (newState: State) => void, emitCurrentState: boolean = false): Subscription;

    // Mark: Scanning ----------------------------------------------------------------------------------------------------

    /**
     * Starts device scanning. When previous scan is in progress it will be stopped before executing this command.
     *
     * @param {?Array<UUID>} UUIDs Array of strings containing {@link UUID}s of {@link Service}s which are registered in
     * scanned {@link Device}. If `null` is passed, all available {@link Device}s will be scanned.
     * @param {?ScanOptions} options Optional configuration for scanning operation.
     * @param {function(error?: BleError, scannedDevice: ?Device)} listener Function which will be called for every scanned
     * {@link Device} (devices may be scanned multiple times). It's first argument is potential {@link Error} which is set
     * to non `null` value when scanning failed. You have to start scanning process again if that happens. Second argument
     * is a scanned {@link Device}.
     */
    startDeviceScan(
      UUIDs: UUID[] | null,
      options: Partial<ScanOptions>,
      listener: (error?: BleError, scannedDevice?: Device) => void
    ): void;

    /**
     * Stops {@link Device} scan if in progress.
     */
    stopDeviceScan(): void;

    /**
     * Request a connection parameter update. This functions may update connection parameters on Android API level 21 or
     * above.
     *
     * @param {Device['id']} deviceIdentifier Device identifier.
     * @param {ConnectionPriority} connectionPriority: Connection priority.
     * @param {?string} transactionId Transaction handle used to cancel operation.
     * @returns {Promise<Device>} Connected device.
     */
    requestConnectionPriorityForDevice(
      deviceIdentifier: Device['id'],
      connectionPriority: ConnectionPriority,
      transactionId?: string
    ): Promise<Device>;

    /**
     * Reads RSSI for connected device.
     *
     * @param {Device['id']} deviceIdentifier Device identifier.
     * @param {?string} transactionId Transaction handle used to cancel operation
     * @returns {Promise<Device>} Connected device with updated RSSI value.
     */
    readRSSIForDevice(deviceIdentifier: Device['id'], transactionId?: string): Promise<Device>;

    /**
     * Request new MTU value for this device. This function currently is not doing anything
     * on iOS platform as MTU exchange is done automatically.
     * @param {Device['id']} deviceIdentifier Device identifier.
     * @param {number} mtu New MTU to negotiate.
     * @param {?string} transactionId Transaction handle used to cancel operation
     * @returns {Promise<Device>} Device with updated MTU size. Default value is 23.
     */
    requestMTUForDevice(deviceIdentifier: Device['id'], mtu: number, transactionId?: string): Promise<Device>;

    // Mark: Connection management ---------------------------------------------------------------------------------------

    /**
     * Returns a list of known devices by their identifiers.
     * @param {Array<Device['id']>} deviceIdentifiers List of device identifiers.
     * @returns {Promise<Array<Device>>} List of known devices by their identifiers.
     */
    devices(deviceIdentifiers: Array<Device['id']>): Promise<Device[]>;

    /**
     * Returns a list of the peripherals (containing any of the specified services) currently connected to the system
     * which have discovered services. Returned devices **may not be connected** to your application. Make sure to check
     * if that's the case with function {@link #blemanagerisdeviceconnected|isDeviceConnected}.
     * @param {Array<UUID>} serviceUUIDs List of service UUIDs. Device must contain at least one of them to be listed.
     * @returns {Promise<Array<Device>>} List of known devices with discovered services as stated in the parameter.
     */
    connectedDevices(serviceUUIDs: Array<UUID>): Promise<Device[]>;

    // Mark: Connection management ---------------------------------------------------------------------------------------

    /**
     * Connects to {@link Device} with provided ID.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {?ConnectionOptions} options Platform specific options for connection establishment.
     * @returns {Promise<Device>} Connected {@link Device} object if successful.
     */
    connectToDevice(deviceIdentifier: Device['id'], options?: ConnectionOptions): Promise<Device>;

    /**
     * Disconnects from {@link Device} if it's connected or cancels pending connection.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier to be closed.
     * @returns {Promise<Device>} Returns closed {@link Device} when operation is successful.
     */
    cancelDeviceConnection(deviceIdentifier: Device['id']): Promise<Device>;

    /**
     * Monitors if {@link Device} was disconnected due to any errors or connection problems.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier to be monitored.
     * @param {function(error?: BleError, device: Device)} listener - callback returning error as a reason of disconnection
     * if available and {@link Device} object. If an error is null, that means the connection was terminated by
     * {@link #blemanagercanceldeviceconnection|bleManager.cancelDeviceConnection()} call.
     * @returns {Subscription} Subscription on which `remove()` function can be called to unsubscribe.
     */
    onDeviceDisconnected(
      deviceIdentifier: Device['id'],
      listener: (error?: BleError, device: Device) => void
    ): Subscription;

    /**
     * Check connection state of a {@link Device}.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @returns {Promise<boolean>} Promise which emits `true` if device is connected, and `false` otherwise.
     */
    isDeviceConnected(deviceIdentifier: Device['id']): Promise<boolean>;

    // Mark: Discovery ---------------------------------------------------------------------------------------------------

    /**
     * Discovers all {@link Service}s and {@link Characteristic}s for {@link Device}.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {?string} transactionId Transaction handle used to cancel operation
     * @returns {Promise<Device>} Promise which emits {@link Device} object if all available services and
     * characteristics have been discovered.
     */
    discoverAllServicesAndCharacteristicsForDevice(
      deviceIdentifier: Device['id'],
      transactionId?: string
    ): Promise<Device>;

    // Mark: Service and characteristic getters --------------------------------------------------------------------------

    /**
     * List of discovered {@link Service}s for {@link Device}.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @returns {Promise<Array<Service>>} Promise which emits array of {@link Service} objects which are discovered for a
     * {@link Device}.
     */
    servicesForDevice(deviceIdentifier: Device['id']): Promise<Service[]>;

    /**
     * List of discovered {@link Characteristic}s for given {@link Device} and {@link Service}.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {UUID} serviceUUID {@link Service} UUID.
     * @returns {Promise<Array<Characteristic>>} Promise which emits array of {@link Characteristic} objects which are
     * discovered for a {@link Device} in specified {@link Service}.
     */
    characteristicsForDevice(deviceIdentifier: Device['id'], serviceUUID: UUID): Promise<Characteristic[]>;

    // Mark: Characteristics operations ----------------------------------------------------------------------------------

    /**
     * Read {@link Characteristic} value.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {UUID} serviceUUID {@link Service} UUID.
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {?string} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits first {@link Characteristic} object matching specified
     * UUID paths. Latest value of {@link Characteristic} will be stored inside returned object.
     */
    readCharacteristicForDevice(
      deviceIdentifier: Device['id'],
      serviceUUID: UUID,
      characteristicUUID: UUID,
      transactionId?: string
    ): Promise<Characteristic>;

    /**
     * Write {@link Characteristic} value with response.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {UUID} serviceUUID {@link Service} UUID.
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {Base64} base64Value Value in Base64 format.
     * @param {?string} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits first {@link Characteristic} object matching specified
     * UUID paths. Latest value of characteristic may not be stored inside returned object.
     */
    writeCharacteristicWithResponseForDevice(
      deviceIdentifier: Device['id'],
      serviceUUID: UUID,
      characteristicUUID: UUID,
      base64Value: Base64,
      transactionId?: string
    ): Promise<Characteristic>;

    /**
     * Write {@link Characteristic} value without response.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {UUID} serviceUUID {@link Service} UUID.
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {Base64} base64Value Value in Base64 format.
     * @param {?string} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|cancelTransaction()} function.
     * @returns {Promise<Characteristic>} Promise which emits first {@link Characteristic} object matching specified
     * UUID paths. Latest value of characteristic may not be stored inside returned object.
     */
    writeCharacteristicWithoutResponseForDevice(
      deviceIdentifier: Device['id'],
      serviceUUID: UUID,
      characteristicUUID: UUID,
      base64Value: Base64,
      transactionId?: string
    ): Promise<Characteristic>;

    /**
     * Monitor value changes of a {@link Characteristic}. If notifications are enabled they will be used
     * in favour of indications.
     *
     * @param {Device['id']} deviceIdentifier {@link Device} identifier.
     * @param {UUID} serviceUUID {@link Service} UUID.
     * @param {UUID} characteristicUUID {@link Characteristic} UUID.
     * @param {function(error?: BleError, characteristic?: Characteristic)} listener - callback which emits
     * {@link Characteristic} objects with modified value for each notification.
     * @param {?string} transactionId optional `transactionId` which can be used in
     * {@link #blemanagercanceltransaction|cancelTransaction()} function.
     * @returns {Subscription} Subscription on which `remove()` function can be called to unsubscribe.
     */
    monitorCharacteristicForDevice(
      deviceIdentifier: Device['id'],
      serviceUUID: UUID,
      characteristicUUID: UUID,
      listener: (error?: BleError, characteristic?: Characteristic) => void,
      transactionId?: string
    ): Subscription;
  }

  export const EventEmitter = NativeEventEmitter;
}
