serial.onDataReceived(serial.delimiters(Delimiters.Comma), function () {
    message = serial.readUntil(serial.delimiters(Delimiters.Comma))
    conversion = parseFloat(message)
    if (conversion == 0) {
        Start = false
        basic.showIcon(IconNames.No)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        vitesseM1 = 0
        vitesseM2 = 0
        angle = 90
        servos.P2.setAngle(90)
        serial.writeLine("*p" + angle + "*")
        serial.writeLine("*SV50*")
    } else if (conversion == 9) {
        Start = true
        basic.showIcon(IconNames.Heart)
        if (recul == false) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.digitalWritePin(DigitalPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.digitalWritePin(DigitalPin.P16, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.digitalWritePin(DigitalPin.P14, 1)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.digitalWritePin(DigitalPin.P16, 1)
        }
        serial.writeLine("*SV50*")
    } else if (conversion == 7) {
        recul = false
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else if (conversion == 8) {
        recul = true
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 1)
    } else if (conversion == 1 && angle < 165) {
        angle += 5
    } else if (conversion == 3 && angle > 10) {
        angle += -5
    } else if (conversion == 5 && (vitesseM1 <= 900 && vitesseM2 <= 900)) {
        vitesseM1 += 100
        vitesseM2 += 100
    } else if (conversion == 6 && (vitesseM1 >= 100 && vitesseM2 >= 100)) {
        vitesseM1 += -100
        vitesseM2 += -100
    } else if (conversion == 2) {
        if (vitesseM1 <= 900) {
            vitesseM1 += 100
        }
        if (vitesseM2 >= 100) {
            vitesseM2 += -100
        }
    } else if (conversion == 4) {
        if (vitesseM2 <= 900) {
            vitesseM2 += 100
        }
        if (vitesseM1 >= 100) {
            vitesseM1 += -100
        }
    }
    if (Start == true) {
        pins.analogWritePin(AnalogPin.P0, vitesseM1)
        pins.analogWritePin(AnalogPin.P1, vitesseM2)
        servos.P2.setAngle(angle)
        serial.writeLine("*p" + angle + "*")
        serial.writeLine("*G" + vitesseM1 + "*")
        serial.writeLine("*D" + vitesseM2 + "*")
    }
    if (Start == false) {
        servos.P2.setAngle(angle)
        serial.writeLine("*p" + angle + "*")
        serial.writeLine("*G" + vitesseM1 + "*")
        serial.writeLine("*D" + vitesseM2 + "*")
    }
})
let conversion = 0
let message = ""
let vitesseM2 = 0
let vitesseM1 = 0
let recul = false
let angle = 0
let Start = false
serial.setBaudRate(BaudRate.BaudRate9600)
Start = false
angle = 90
recul = false
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
vitesseM1 = 0
vitesseM2 = 0
pins.analogWritePin(AnalogPin.P0, vitesseM1)
pins.analogWritePin(AnalogPin.P1, vitesseM2)
basic.pause(500)
servos.P2.setAngle(90)
serial.redirect(
SerialPin.P12,
SerialPin.P8,
BaudRate.BaudRate9600
)
basic.clearScreen()
basic.showString("Bonjour Lille !")
basic.showIcon(IconNames.No)
basic.forever(function () {
	
})
