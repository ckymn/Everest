// burda kendi hata mesajimizi ve kendi statuslarimizi gondermek icin kendi class‘imizi olusturduk
class CustomError extends Error { 
  constructor (message, status) {
    super(message)
    this.status = status
  }
}

module.exports = CustomError;