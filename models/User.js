// --->> Burda Veritabaninda Bulunan Objelerimizin Tanimlari Olusturulacak
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'] //girilmesi sart girilmese hata mesaji alacak
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true, // bir email ile tek islem yapabilirsin
    match: [
      //burda hangi email adresinin kabul edilebilir oldugunu gorucez(Reg ex validation)
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Plese provide a valid email'
    ]
  },
  role: {
    type: String,
    default: 'user', //admin disindaki hersey user
    enum: ['user', 'admin'] //alinacak rol kapasitesi
  },
  password: {
    type: String,
    minlength: [6, 'Please provide a password with minlength :6'],
    required: [true, 'Please provide a password'],
    select: false //burda getuser yapinca parolanin gorunmemesi icin
  },
  createdAt: {
    //kayit tarihi
    type: Date,
    default: Date.now //o anki zaman
  },
  title: {
    // zorulnu alanlar degil
    type: String
  },
  about: {
    // zorunlu alanlar degil
    type: String
  },
  place: {
    type: String
  },
  website: {
    type: String
  },
  profile_image: {
    type: String,
    default: 'default.jpg' // kullanici resmi varsa buraya yerlestiricez
  },
  blocked: {
    // adminlerin bir kullaniciyi engelleyebilme yetenegi sunar
    type: Boolean,
    default: false //ilk basta kimse engellenmemis
  }
})

// UserSchema Methods JWT islemleri
UserSchema.methods.generateJwtFromUser = function(){
  // SECRET_KEY belirleme bunu config.env de belirledik
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env

  // veri Payload
  const payload = {
    id: this._id, //suanki kaydimizin uzerindeki id degeri alindi
    name: this.name
  }
  // TOKEN olusturma
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE
  })

  return token;
}

// Modelimizi Kaydetmeden Once(Pre) yapilacaklar
UserSchema.pre('save', function (next) {
  // Parola Degismemis ise ise
  if (!this.isModified('password')) {
    next() //asagiya girmeden kayit islemerine devam etmek
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err) // ---> eger burada bir hata varsa CustomErrorHandler a gonderilecek
    bcrypt.hash(this.password, salt, (err, hash) => {
      // eger parolada herhangi bir hata varsa CustomErrorHandler‘a donecek!
      if (err) next(err)
      this.password = hash;

      next() // next  ile kayitetme islemlerimizi bitirmis
    })
  })
})


//olusan schemayi user olarak mongooose(VeriTabani)‘a kaydetmek
module.exports = mongoose.model('User', UserSchema) 