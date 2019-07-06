// init project
const Discord = require("discord.js");
const moment = require("moment");
const hours = require('hours');
const request = require("request");
const express = require("express");
const app = express();
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might cCTall it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
const math = require("mathjs");
const ms = require("ms");
// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
const secret = process.env.SECRET;
const keepalive = require ("express-glitch-keepalive");
// config.token contains the bot's token
// config.prefix contains the message prefix.
const ascii = require('ascii-art');
const p = config.prefix;
app.use(keepalive);
 
app.get('./keepalive-log.json', (req, res) => {
  res.json('Ok');
});
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot jest aktywny!`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`${client.users.size} użytkowników || ${p}help`, { type: 'LISTENING' });
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  const newServer = new Discord.RichEmbed()
  .setTitle("Dołączyłem na nowy serwer!")
  .setColor("RANDOM")
  .setDescription(`Nazwa serwera: ${guild.name}`)
  .addField("Serwer ma", `${guild.memberCount} członków`)
  .addField("Właścicielem serwera jest", `${guild.owner}`)
  client.channels.get("542377497031999497").send(newServer);
  client.user.setActivity(`${client.users.size} użytkowników || ${config.prefix}help`, { type: 'LISTENING' })
 });
 

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  const newServer = new Discord.RichEmbed()
  .setTitle("Odszedłem z serwera!")
  .setDescription(`Nazwa serwera: ${guild.name}`)
  .setColor("RANDOM")
  .addField("Mam nadzieję,", `że jeszcze tam wrócę!`)
  client.channels.get("542377497031999497").send(newServer);
  client.user.setActivity(`${client.users.size} użytkowników || ${config.prefix}help`, { type: 'LISTENING' });
});
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '👋witamy-żegnamy👋');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  let welcomeEmbed = new Discord.RichEmbed()
  .setColor("#1abc27")
  .setTitle("Nowy członek!")
  .setDescription('Witamy nowy członku! :tada: :tada: :tada:')
  .setThumbnail(member.avatarURL)
  .addField('A tym członkiem jest:', member)
  .setFooter('Powitania')
  .setTimestamp();
  channel.send(welcomeEmbed);
});

client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '👋witamy-żegnamy👋');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  let goodbyeEmbed = new Discord.RichEmbed()
  .setColor("#bc1f1a")
  .setTitle("Członek odszedł!")
  .setDescription('Żegnaj! mamy nadzieję że wrócisz! będziemy za tobą tęsknić!')
  .setThumbnail(member.avatarURL)
  .addField('A tym członkiem jest:', member)
  .setFooter('Pożegnania')
  .setTimestamp();
  channel.send(goodbyeEmbed);
});

client.on("message", async message => {
    if(message.author.bot) return;
  const autor = message.author.tag;
  const prefix = config.prefix;
      if (message.isMentioned(client.user)) {
    message.reply('eee nie pinguj! (masz podpowiedź w moim statusie)');
}
  if (message.channel.id === "529711061029486592"){
    return;
  }
    const embed = new Discord.RichEmbed()
  .setTitle("Pomoc")
  .setColor("#00AE86")
  .setDescription("Tutaj zobaczysz komendy do bota.")
    .addField("Info", "Bot posiada również plugin do powitań i pożegnań. Aby go aktywować, twój serwer musi mieć taki kanał, aby go stworzyć, wpisz `fb:kanał-pip`")
  .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/2000px-Blue_question_mark_icon.svg.png")
  .setTimestamp()
  .addField(`Prefix: \`${config.prefix}\``, "Prefix bota")
  .addField("Kategoria: administracja", "Komendy dla administratora")
  .addField("<> ważne argumenty", "() nieistotne argumenty")
  .addField(`${config.prefix}kick <osoba> (powód)`, "Wyrzuca wzmienioną osobę z powodem (powód). Uprawnienia: KICK_MEMBERS")
  .addField(`${config.prefix}ban <osoba> (powód)`, "Banuje wzmienioną osobę z powodem (powód). Uprawnienia: BAN_MEMBERS")
  .addField(`${config.prefix}purge <ilość>`, "Usuwa określoną ilość wiadomości. Uprawnienia: MANAGE_MESSAGES")
  .addField("Kategoria: informacje", "Komendy informacyjne")
  .addField(`${config.prefix}help lub ${config.prefix}pomoc`, "Wysyła tę wiadomość.")
  .addField(`${config.prefix}ping`, "Wysyła moje opóźnienie.")
  .addField(`${config.prefix}uptime`, "Wysyła czas działania bota.")
  .addField(`${config.prefix}zapros`, "Wysyła zaproszenie bota na serwer.")
    .addField(`${config.prefix}zapros-serwer`, "Wysyła zaproszenie na serwer bota.")
      .addField(`${prefix}serverinfo lub ${prefix}serverInfo lub ${prefix}Serverinfo lub ${prefix}ServerInfo`, "Wysyła informacje o serwerze.")
    .addField(`${prefix}userinfo (użytkownik)`, "Wysyła info o użytkowniku (użytkownik).")
  .addField("Kategoria: 4fun", "Komendy 4fun")
  .addField(`${config.prefix}say <wiadomość>`, "Wysyła <wiadomość>.")
    .addField(`${config.prefix}spoiler <wiadomość> lub ${config.prefix}`, "Wysyła wiadomość ze spoilerem.")
    .addField(`${config.prefix}ascii <text>`, "Wysyła text w formacie Discordowego ASCII.")
  .addField(`${config.prefix}siema`, "Bot edytuje wiadomość wiele razy i przez to powstaje :regional_indicator_s: :regional_indicator_i: :regional_indicator_e: :regional_indicator_m: :regional_indicator_a:.")
const eMbed2 = new Discord.RichEmbed()
    .addField("Kategoria: inne", "Inne komendy")
    .addField(`${config.prefix}propozcja <propozycja>`, `Wysyła twoją propozycję na serwer FiberBOT DEV na kanał <#537630197730770944> (#propozycje). [Chcesz zobaczyć jak to wygląda w praniu? Dołącz na serwer!](https://discord.gg/YrKjUd7 "LINK DO SERWERA BOTA")`)
    .addField(`${config.prefix}dbl lub ${config.prefix}DBL`, "Wysyła link do Discord Bot List bota.")
    .addField("Pamiętaj!", "Nigdy nie używaj w komendach nawiasów przykładowych: <>, ()!")
    .addField("Aby uzyskać pomoc na temat danej komendy,", "wpisz fb:help (komenda)")
.setColor(embed.color)
.setFooter (`Wywołane przez ${message.author.tag}`)
  // This event will run on every single message received, from any channel or DM.
  console.log(`(${message.guild.name})" [${message.author.tag}]: ${message.content}`);
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  let msg = message.content.slice(config.prefix.length); // slice of the prefix on the message

        let args = msg.split(" "); // break the message into part by spaces

        let command = args[0].toLowerCase(); // set the first word as the command in lowercase just in case

        args.shift();
   if (command === "uptime" || command === "up"){
let totalSeconds = (client.uptime / 1000);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
    let uptime = `Bot jest uruchomiony ${hours} godzin/y, ${minutes} minut ${seconds} sekund`;
    message.channel.send(`${uptime}`);
     return;
  }
  // Let's go with a few common example commands! Feel free to delete or change those.
  if (command === "zapros" || command === "zaproszenie" || command === "zapro"){
    let inviteEmbed = new Discord.RichEmbed()
        .setTitle("Żeby zaprosić bota, kliknij w link poniżej:")
        .setDescription(`[ZAPROŚ BOTA](https://discordapp.com/api/oauth2/authorize?client_id=527866167516463104&permissions=8&scope=bot "WEJDŹ W TEN LINK, ABY ZAPROSIĆ BOTA NA SWÓJ SERWER")`)
        .setColor("RANDOM")    
    message.channel.send(inviteEmbed);
    return;
  } 
  
  if (command === "zapros-serwer" || command === "zaproszenie-serwer" || command === "zapro-serwer"){
    let zaprosserwer = new Discord.RichEmbed()
    .setTitle("Żeby wejść na serwer bota, kliknij w link poniżej:")
    .setColor("RANDOM")
    .setDescription(`[WEJDŹ NA SERWER](https://discord.gg/YrKjUd7 "KLIKNIJ W TEN LINK, ŻEBY WEJŚĆ NA SERWER BOTA")`)
    message.channel.send(zaprosserwer);
    return;
  }
  
  if(command === "ping" || command === "opóźnienie") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Moje opóźnienie to ${m.createdTimestamp - message.createdTimestamp} milisekund/y. Opóźnienie API to ${Math.round(client.ping)} milisekund/y.`);
  return;
  }
  
  if(command === "say" || command === "mów" || command === "powiedz") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ").replace(/@everyone/g, "nie").replace(/@here/g, "nie");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
    return;
  }
  
  if(command === "kick" || command === "wyrzuć") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.hasPermission("KICK_MEMBERS")){
      return message.reply("nie masz permisji, aby użyć tej komendy.");
      return;
    }
    {
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("oznacz właściwego użytkownika!");
    if(!member.kickable) 
      return message.reply("nie mogę wyrzucić tego użytkownika! czy on ma wyższą rolę ode mnie? czy mam permisję do wyrzucania członków?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "nie podano powodu.";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`przepraszam ${message.author}, nie mogę wyrzucić tego użytkownika: ${error}`));
    message.channel.send(`${member.user.tag} został wyrzucony przez ${message.author.tag}. powód: ${reason}`);
    return;
    }
  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.hasPermission("BAN_MEMBERS")){
      return message.reply("nie masz permisji, aby użyć tej komendy!");
    return;
    }
    {
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("oznacz właściwego użytkownika!");
    if(!member.bannable) 
      return message.reply("nie mogę zbanować tego użytkownika! czy on ma wyższą rolę ode mnie? czy mam permisję do wyrzucania członków?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "nie podano powodu.";
    
    await member.ban(reason)
      .catch(error => message.reply(`przepraszam ${message.author} nie mogę zbanować tego użytkownika: ${error}`));
    message.channel.send(`${member.user.tag} został zbanowany przez ${message.author.tag}. powód: ${reason}`);
  return;
    }
  }
  
  if(command === "purge" || command === "p" || command === "kasuj" || command === "delete" || command === "prune"){
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.reply("nie masz permisji, aby użyć tej komendy!");
   }
  {
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("podaj numer wiadomości od 2 do 100, ile mam ich usunąć.");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`nie mogę usunąć wiadomości z powodu: ${error}`));
  return; 
  }
  }
  if (command === "help" || command === "pomoc"){
    const arg = args.join(" ");
    if (!arg){
  message.channel.send(embed);
      message.channel.send(eMbed2);
    return;
    }
    if (arg === "kick" || arg === "wyrzuć"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}kick`)
     .addField("Opis:", "Wyrzuca danego użytkownika.")
     .addField("Użycie:", "fb:kick <użytkownik> (powód)")
     .addField("Aliasy:", "kick, wyrzuć")
     .addField("Permisje:", "Wyrzucanie członków")
     message.channel.send(em);
      return;
    }
    if (arg === "ban"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}ban`)
     .addField("Opis:", "Banuje danego użytkownika.")
     .addField("Użycie:", "fb:ban <użytkownik> (powód)")
     .addField("Aliasy:", "ban")
     .addField("Permisje:", "Banowanie członków")
     message.channel.send(em);
      return;
    }
    if (arg === "purge" || arg === "kasuj" || arg === "delete" || arg === "p" || arg === "prune"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}purge`)
     .addField("Opis:", "Usuwa daną ilość wiadomości.")
     .addField("Użycie:", "fb:purge <ilość>")
     .addField("Aliasy:", "purge, prune, kasuj, delete, p")
     .addField("Permisje:", "Zarządzanie wiadomościami")
     message.channel.send(em);
      return;
    }
    if (arg === "help" || arg === "pomoc"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}help`)
     .addField("Opis:", "Wysyła tę wiadomość.")
     .addField("Użycie:", "fb:help")
     .addField("Aliasy:", "help, pomoc")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "ping" || arg === "opóźnienie"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}ping`)
     .addField("Opis:", "Wysyła opóźnienie bota.")
     .addField("Użycie:", "fb:ping")
     .addField("Aliasy:", "ping, opóźnienie")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "uptime" || arg === "up"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}uptime`)
     .addField("Opis:", "Wysyła uptime bota.")
     .addField("Użycie:", "fb:uptime")
     .addField("Aliasy:", "uptime, up")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "zapros" || arg === "zaproszenie" || arg === "zapro"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}zapros`)
     .addField("Opis:", "Wysyła zaproszenie bota na serwer.")
     .addField("Użycie:", "fb:zapros")
     .addField("Aliasy:", "zapros, zaproszenie, zapro")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "zapros-serwer" || arg === "zaproszenie-serwer" || arg === "zapro-serwer"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}zapros-serwer`)
     .addField("Opis:", "Wysyła zaproszenie na serwer bota.")
     .addField("Użycie:", "fb:zapros-serwer")
     .addField("Aliasy:", "zapros-serwer, zaproszenie-serwer, zapro-serwer")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "serverinfo" || arg === "serverInfo" || arg === "Serverinfo" || arg === "ServerInfo"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}serverinfo`)
     .addField("Opis:", "Wysyła informacje o serwerze.")
     .addField("Użycie:", "fb:serverinfo")
     .addField("Aliasy:", "serverinfo, serverInfo, ServerInfo, Serverinfo")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "userinfo" || arg === "uinfo" || arg === "infouzytkownik"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}userinfo`)
     .addField("Opis:", "Wysyła informacje o użytkowniku.")
     .addField("Użycie:", "fb:userinfo (użytkownik)")
     .addField("Aliasy:", "userinfo, uinfo, infouzytkownik")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "say" || arg === "mów" || arg === "powiedz"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}say`)
     .addField("Opis:", "Bot powtarza wiadomość.")
     .addField("Użycie:", "fb:say <wiadomość>")
     .addField("Aliasy:", "say, mów, powiedz")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "siema"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}siema`)
     .addField("Opis:", "Bot wysyła <więcej pod komendą>.")
     .addField("Użycie:", "fb:siema")
     .addField("Aliasy:", "siema")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "propozycja" || arg === "propo" || arg === "zaproponuj"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}propozycja`)
     .addField("Opis:", "Wysyła propozycję na kanał CiachBOT DEV. Więcej info pod fb:help.")
     .addField("Użycie:", "fb:propozycja <text>")
     .addField("Aliasy:", "propozycja, propo, zaproponuj")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "kanał-pip" || arg === "kpip"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}kanał-pip`)
     .addField("Opis:", "Tworzy kanał do powitań i pożegnań.")
     .addField("Użycie:", "fb:kpip")
     .addField("Aliasy:", "kanał-pip, kpip")
     .addField("Permisje:", "Zarządzanie kanałami")
     message.channel.send(em);
      return;
    }
    if (arg === "restart"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}restart`)
     .addField("Opis:", "Restartuje bota.")
     .addField("Użycie:", "fb:restart")
     .addField("Aliasy:", "restart")
     .addField("Permisje:", "Właściciel bota")
     message.channel.send(em);
      return;
    }
    if (arg === "spoiler" || arg === "spoil"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}spoiler`)
     .addField("Opis:", "Wysyła wiadomość ze spoilerem.")
     .addField("Użycie:", "fb:spoiler <wiadomość>")
     .addField("Aliasy:", "spoiler, spoil")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
  if (arg === "eval" || arg === "exec" || arg === "ex" || arg === "ev"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}exec`)
     .addField("Opis:", "Ewaluuje kod js.")
     .addField("Użycie:", "fb:exec <kod js>")
     .addField("Aliasy:", "exec, eval, ex, ev")
     .addField("Permisje:", "Właściciel bota")
     message.channel.send(em);
      return;
    }
      if (arg === "dbl" || arg === "DBL"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}dbl`)
     .addField("Opis:", "Wysyła link do Discord Bot List bota.")
     .addField("Użycie:", "fb:dbl")
     .addField("Aliasy:", "dbl, DBL")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    if (arg === "ascii"){
     const em = new Discord.RichEmbed()
     .setTitle(`Pomoc komendy ${prefix}ascii`)
     .addField("Opis:", "Wysyła tekst w formacie Discordowego ASCII.")
     .addField("Użycie:", "fb:ascii <text>")
     .addField("Aliasy:", "ascii")
     .addField("Permisje:", "Brak")
     message.channel.send(em);
      return;
    }
    else {
    const em = new Discord.RichEmbed()
    .setTitle("Błąd!")
    .setDescription(`Nie znaleziono komendy ${prefix}${arg}!`)
    message.channel.send(em);
      return;
    }
  }
  if (command === "siema"){
  const siemaedit = await message.channel.send("Siema");
    siemaedit.edit(":regional_indicator_s:");
    siemaedit.edit(":regional_indicator_s: :regional_indicator_i:");
    siemaedit.edit(":regional_indicator_s: :regional_indicator_i: :regional_indicator_e:");
    siemaedit.edit(":regional_indicator_s: :regional_indicator_i: :regional_indicator_e: :regional_indicator_m:");
    siemaedit.edit(":regional_indicator_s: :regional_indicator_i: :regional_indicator_e: :regional_indicator_m: :regional_indicator_a:");
  }
    if (command === "serverinfo" || command === "serverInfo" || command === "Serverinfo" || command === "ServerInfo"){
        function checkBots(guild) {
    let botCount = 0; // This is value that we will return
    guild.members.forEach(member => { // We are executing this code for every user that is in guild
      if(member.user.bot) botCount++; // If user is a bot, add 1 to botCount value
    });
    return botCount; // Return amount of bots
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; // If user isn't bot, add 1 to value. 
    });
    return memberCount;
  }

  let embed = new Discord.RichEmbed()
  .setTitle(`Komenda wywołana przez: ${autor}`)
    .setAuthor(`Informacje o serwerze ${message.guild.name}`, message.guild.iconURL) // Will set text on top of embed to <guild name> - Informations, and will place guild icon next to it
    .setColor('#f4df42') // Will set color of embed
    .addField('Właściciel serwera:', message.guild.owner, true) // Will add in-line field with server owner
    .addField('Region serwera:', message.guild.region, true) // Will add in-line field with server region
    .addField('Liczba kanałów:', message.guild.channels.size, true) // Will add in-line field with total channel count
    .addField('Ilość wszystkich członków (wraz z botami):', message.guild.memberCount) // Will add in-line field with total member count
    // Now we will use our methods that we've created before
    .addField('Ilość użytkowników:', checkMembers(message.guild), true)
    .addField('Ilość botów:', checkBots(message.guild), true)
    // We also can add field with verification level of guild
    .addField('Poziom weryfikacji:', message.guild.verificationLevel, true)
    // And now, we can finally add footer and timestamp
    .setFooter('Serwer został stworzony:')
    .setTimestamp(message.guild.createdAt); // Will set timestamp to date when guild was created

    // And now we can send our embed{
   return message.channel.send(embed);
    }
   if (command === "userinfo" || command === "uinfo" || command === "infouzytkownik"){
      
    let member = message.mentions.members.first() || message.member,
  user = member.user;
    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setColor(`RANDOM`)
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField('Dołączył:', `${moment.utc(user.joinServer).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
        .addField('Status:', user.presence.status, true)
    if (member.presence.game){
     embed.addField('Gra:', member.presence.game, true) 
    }
    if (!member.presence.game){
     embed.addField('Gra:', 'Użytkownik aktualnie nie gra w żadną grę.', true) 
    }
         embed.addField('Role:', member.roles.map(r => `${r}`).join(' | '), true)
           .setFooter(`ID: ${user.id}`)
        .setTimestamp();

    message.channel.send({ embed: embed });
    return;
  }
  if (command === "exec" || command === "eval" || command === "ex" || command === "ev"){
   if (message.author.id !== "320471581547560964") return message.reply("nie masz permisji!");
  const Discord = require ("discord.js");
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Execute')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code.replace(client.token, "Odmowa dostępu ze względów bezpieczeństwa innych.")
}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    } 
  }
  if (command === "restart"){
 if (message.author.id !== config.owner) return message.reply("nie masz permisji!");
  message.channel.send("restartuję...");
    client.destroy();
  } 
  if (command === "propozycja" || command === "propo" || command === "zaproponuj"){
    const propo = args.join(" ");
    if (!propo){
     const embed = new Discord.RichEmbed()
     .setAuthor(message.author.tag)
     .setTitle("Zaproponuj")
     .setDescription("Musisz wpisać przedmiot!")
     .setThumbnail(message.author.avatarURL)
     .setColor("#ff0000")
     message.channel.send(embed)
      return;
    }
   const em = new Discord.RichEmbed()
   .setAuthor(message.author.tag)
   .setThumbnail(message.author.avatarURL)
   .setTitle("Nowa propozycja!")
   .setDescription(propo)
   .setColor("#08ff00")
   client.channels.get("537630197730770944").send(em);
    const wyslane = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.avatarURL)
    .setTitle("Zaproponuj")
    .setColor("#08ff00")
    .setDescription(`Pomyślnie wysłano propozycję ${propo} na serwer FiberBOT DEV na kanał <#537630197730770944> (#propozycje)!`)
    message.channel.send(wyslane);
    return;
   }
  if (command === "kanał-pip" || command === "kpip"){
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("nie masz wystarczających permisji, aby użyć tej komendy! wymagane uprawnienia: ZARZĄDZANIE KANAŁAMI!");
   message.guild.createChannel("👋witamy-żegnamy👋", "Text");
    message.reply("pomyślnie stworzono kanał do powitań i pożegnań! pamiętaj o ustawieniu permisji!");
  }
  if (command === "spoiler" || command === "spoil"){
   let arg = args.join(" ").replace(/@everyone/g, "nie").replace(/@here/g, "nie");
    if (!arg) return message.reply("wpisz spoiler, jaki mam wysłać!");
    message.channel.send("Oto twój spoiler");
    message.channel.send("||" + arg + "||");
  }
  if (command === "ascii"){
    if (!args.join(' ')) return message.reply('wpisz text!')

    ascii.font(args.join(' '), 'Doom', async txt =>{
        message.channel.send(txt, {
            code: 'md'
        });
    })
  }
  if (command === "DBL" || command === "dbl") {
    const cembed = new Discord.RichEmbed()
    .setTitle("Bot na Discord Bot List:")
    .setDescription(`[KLIKNIJ](https://discordbots.org/bot/527866167516463104 "KLIKNIJ, ABY PRZEJŚĆ NA DISCORD BOT LIST BOTA.")`)
    .setColor("RANDOM")
    message.channel.send(cembed);
    return;
  } 
});
client.login("TOKEN");
