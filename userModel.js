const Mongoose = require('mongoose')

const userDocumentSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.ObjectId,
  loginId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: String
})

const userDocumentModel = Mongoose.model('user', userDocumentSchema)
const saveUser = (userDocument) => {
  return new Promise((resolve, reject) => {    
    const user = new userDocumentModel({
      _id: new Mongoose.Types.ObjectId(),
      ...userDocument
    });
    user.save((err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

const getUser = (userDocument) => {
  return new Promise((resolve, reject) => {
    const {
      loginId,
      password
    } = userDocument
    userDocumentModel.findOne({ loginId }, (err,docs) => {
      if (!err) {
        if (!docs) {
          const error = {
            loginResponseStatus: 'INVALID_USER',
            msg: 'Entered Email id does not exist. Register now'
          }
          reject(error)
        }

        const {
          password: storedPass
        } = docs || {}

        if ( storedPass === password) {
          resolve(docs)
        } else {
          const error = {
            loginResponseStatus: 'UN_AUTHORIZED',
            msg: 'Entered id & password does not match.'
          }  
          reject(error)
        }
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  saveUser,
  getUser
}