//dotenv load
require('dotenv').config();

//discord.js load
const {REST, Routes} = require('discord.js');
const botID = process.env.botID;
const token = process.env.token;
const serverID = process.env.serverID;
//load test
console.log(botID);
console.log(token);
console.log(serverID);

//comannds
const rest = new REST().setToken(token);
const slashRegister = async () =>{
  try{
    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: [
          {
            name:"ping",
            description:"Pong!"
          }
        ]
    })

  }catch(errer){
    //errer
  }

}


//slashRegister;
slashRegister();