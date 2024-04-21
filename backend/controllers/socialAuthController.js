const User = require("../Models/user")
const jwt = require ("jsonwebtoken");
const secretKey = "your-secret-key";
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '829700418921-41kov6odt6mbba27qabl6q1b9jv4k5mm.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
const socialAuth =  async (req, res) => {
    const token = req.params.token;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
//   console.log(ticket)
//   console.log(payload)
  const userid = payload['sub'];

  const doc = await User.findOne({ email: payload.email })
        // Email not found
        if (!doc) {
            const newUser = new User({
                email: payload.email,
                
                
                fullName: payload.name,
                role:'user',
                avatar: payload.picture
                // ... other fields of the model
            });
    
            // Save the user to the database
            await newUser.save();
        } 

        
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  let userToSend = {
    userName: '',
    fullName: doc.fullName,
    id: doc._id,
    role: doc.role,
    email: doc.email,
    gender: '',
    phoneNumber: ''
};

const newtoken = jwt.sign(userToSend, secretKey, { expiresIn: '24h' });


res.json({ msg: "Welcome", token: newtoken });
}
// socialAuth().catch(console.error);

module.exports= {socialAuth};