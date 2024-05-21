// const jwt = require ("jsonwebtoken");
// const axios = require ("axios");





// application.get('redirect',async function(req,res)  {
// var data = {
//   code:req.query.code,
//   grant_type:"authorization_code",
//   redirect_uri:"http://localhost:3000/redirect"
// }

//   //new access token
// const ClientId ="1fqF0gRkTBGOoqXOZUMChQ"
// const ClientSecret="tIs9cx08PnsMnUjk1v96B67ndXDwh5uR"
// var config = {
//   method:'post',
//   url:'https://zoom.us/oauth/token',
//   headers:{
//     "Authorization": Buffer.from(`${ClientId}:${ClientSecret}`),
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   data:data
// }
//   // Send the POST request
// axios(config)
// .then(response => {
//   // Handle the response
//   console.log('Response:', response);
//    res.json(response);
// })
// .catch(error => {
//   // Handle any errors that occurred during the request
//   console.error('Error:', error.response.data);
//   res.json(error.response.data);
// });
// });























// // Enter your API key and your API secret
// API_KEY = '1fqF0gRkTBGOoqXOZUMChQ'
// API_SEC = 'tIs9cx08PnsMnUjk1v96B67ndXDwh5uR'

// API_KEY2 = 'P5AWTfgFSredgKGLmkGEEQ'
// API_SEC2 = 'fdewTSn5fc9aIEYqMMysnVpeXbZxyFhu'

// meetingdetails = {"topic": "The title of your zoom meeting",
// 				"type": 2,
// 				"start_time": "2019-06-14T10: 21: 57",
// 				"duration": "45",
// 				"timezone": "Europe/Madrid",
// 				"agenda": "test",

// 				"recurrence": {"type": 1,
// 								"repeat_interval": 1
// 								},
// 				"settings": {"host_video": "true",
// 							"participant_video": "true",
// 							"join_before_host": "true",
// 							"mute_upon_entry": "False",
// 							"watermark": "true",
// 							"audio": "voip",
// 							"auto_recording": "cloud"
// 							}
// 				}

// const generateToken = () => {
//     // Create a payload of the token containing API Key & expiration time
//     const payload = {
//         iss: API_KEY,
//         exp: Math.floor(Date.now() / 1000) + 5000 
//         // expiresIn: Math.floor(Date.now() / 1000) + 5000 // Expiration time in seconds
//     };

//     // Secret used to generate token signature
//     const secretKey = 'YOUR_API_SECRET';

//     // Generate the token with payload and options including algorithm
//     const token = jwt.sign(payload, API_SEC, { algorithm: 'HS256'});
//     console.log(token)
//     // var basicAuthEncoded = Buffer.from(API_KEY + ':' + API_SEC).toString('base64');
//     return token;
// }

// headers = {'authorization': 'Bearer ' + "ZckmifHeQ6up8sfWiHuXDA",
// 			'content-type': 'application/json'}

// const getAccessToken = (req,res) => {
//     // Send the POST request
// axios.post('https://zoom.us/oauth/token', meetingdetails, { headers })
//   .then(response => {
//     // Handle the response
//     console.log('Response:', response);
//      res.json(response);
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the request
//     console.error('Error:', error.response.data);
//     res.json(error.response.data);
//   });
// }

// const createZoomMeeting = (req,res) => {
//     // Send the POST request
// axios.post('https://api.zoom.us/v2/users/wajdibejaoui26@gmail.com/meetings', meetingdetails, { headers })
//   .then(response => {
//     // Handle the response
//     console.log('Response:', response);
//      res.json(response);
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the request
//     console.error('Error:', error.response.data);
//     res.json(error.response.data);
//   });
// }

// module.exports= {createZoomMeeting};