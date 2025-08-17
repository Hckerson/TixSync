import { QrcodeService } from "src/lib/qr-code.service"

const qrcode = new QrcodeService()

const url = qrcode.generateQrCode('https://google.com')
console.log(url)
