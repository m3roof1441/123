const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');

const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const prefix = 'N';
client.login(process.env.BOT_TOKEN);
client.on('ready', function() {
    console.log(`i am ready ${client.user.username}`);
});
// تم برمجة الكود من قبل فارس
var servers = [];
var queue = [];
var guilds = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];
var now_playing = [];

// تم برمجة الكود من قبل فارس

client.on('ready', () => {
     client.user.setActivity("Run Away",{type: 'WATCHING'})
// تم برمجة الكود من قبل فارس

});

// تم برمجة الكود من قبل فارس



// تم برمجة الكود من قبل فارس

client.on('message', function(message) {
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content

    if (msg.content(prefix + 'play')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        if (args.length == 0) {
            let play_info = new Discord.RichEmbed()
                .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('طلب بواسطة: ' + message.author.tag)
                .setDescription('**قم بإدراج رابط او اسم الأغنيه**')
            message.channel.sendEmbed(play_info)
            return;
        }// تم برمجة الكود من قبل فارس
        if (queue.length > 0 || isPlaying) {
            getID(args, function(id) {
                add_to_queue(id);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    let play_info = new Discord.RichEmbed()
                        .setAuthor(client.user.username, client.user.avatarURL)
                        .addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
                          ${videoInfo.title}
                          **`)
                        .setColor("#a637f9")
                        .setFooter(' - ' + message.author.tag)
                        .setThumbnail(videoInfo.thumbnailUrl)
                    message.channel.sendEmbed(play_info);
                    queueNames.push(videoInfo.title);
                    now_playing.push(videoInfo.title);

                });
            });
        }// تم برمجة الكود من قبل فارس
        else {

            isPlaying = true;
            getID(args, function(id) {
                queue.push('placeholder');
                playMusic(id, message);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    let play_info = new Discord.RichEmbed()
                        .setAuthor(client.user.username, client.user.avatarURL)
                        .addField('**تم التشغيل ✅**', `**${videoInfo.title}
                              **`)
                        .setColor("RANDOM")
                        .addField(`طلب بواسطة`, message.author.username)
                        .setThumbnail(videoInfo.thumbnailUrl)

                    // .setDescription('?')
                    message.channel.sendEmbed(play_info)

                     client.user.setGame(videoInfo.title);
                });
            });
        }// تم برمجة الكود من قبل فارس
    }
    else if (msg.content(prefix + 'skip')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        message.channel.send('Done :white_check_mark:').then(() => {
            skip_song(message);
            var server = server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        });
    }
    else if (message.content(prefix + 'vol')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        if (args > 100) return message.channel.send('1 - 100 || **فقط**')
        if (args > 1) return message.channel.send('1 - 100 || **فقط**')
        dispatcher.setVolume(1 * args / 50);
        message.channel.sendMessage(`**__ ${dispatcher.volume*50}% مستوى الصوت __**`);
    }
    else if (msg.content(prefix + 'pause')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        message.channel.send('Done :white_check_mark:تــم ').then(() => {
            dispatcher.pause();
        });
    }
    else if (msg.content(prefix + 'ok')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
            message.channel.send('Done :white_check_mark:تــم ').then(() => {
            dispatcher.resume();
        });
    }
    else if (msg.content(prefix + 'leave')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        message.channel.send('Done :white_check_mark:تــم  ');
        var server = server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
    else if (mess.content(prefix + 'join')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        message.member.voiceChannel.join().then(message.channel.send(':ok:'));
    }// تم برمجة الكود من قبل فارس
    else if (mess.content(prefix + 'stop')) {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
        if (isPlaying == false) return message.channel.send(':anger: || **__تم الايقاف__**');
        let playing_now_info = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .addField('تمت إضافة الاغنيه بقائمة الإنتظار', `**
                  ${videoInfo.title}
                  **`)
            .setColor("RANDOM")
            .setFooter('طلب بواسطة: ' + message.author.tag)
            .setThumbnail(videoInfo.thumbnailUrl)
        message.channel.sendEmbed(playing_now_info);
    }
});
// تم برمجة الكود من قبل فارس
function skip_song(message) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:  **يجب ان تكون في روم صوتي**');
    dispatcher.end();
}

function playMusic(id, message) {// تم برمجة الكود من قبل فارس
    voiceChannel = message.member.voiceChannel;


    voiceChannel.join().then(function(connectoin) {
        let stream = ytdl('https://www.youtube.com/watch?v=' + id, {
            filter: 'audioonly'
        });
        skipReq = 0;
        skippers = [];

        dispatcher = connectoin.playStream(stream);
        dispatcher.on('end', function() {
            skipReq = 0;
            skippers = [];// تم برمجة الكود من قبل فارس
            queue.shift();
            queueNames.shift();
            if (queue.length === 0) {
                queue = [];
                queueNames = [];
                isPlaying = false;
            }
            else {
                setTimeout(function() {
                    playMusic(queue[0], message);
                }, 500);
            }
        });
    });
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYoutubeID(str));
    }
    else {
        search_video(str, function(id) {
            cb(id);
        });
    }
}

function add_to_queue(strID) {
    if (isYoutube(strID)) {
        queue.push(getYoutubeID(strID));
    }
    else {
        queue.push(strID);
    }
}

function search_video(query, cb) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        cb(json.items[0].id.videoId);
    });
}


function isYoutube(str) {
    return str.toLowerCase().indexOf('youtube.com') > -1;
}

client.on('message', message => {
     if (message.content === "$help") {
                         if(!message.channel.guild) return message.reply('** This command only for servers**');

         message.channel.sendMessage('**Done :ok_hand:**')
// تم برمجة الكود من قبل فارس

message.author.send("**Music Comands**" + `  **

  Comands:

${prefix}invite - to invite bot

  Music:

${prefix}play - shows the song that is currently playing
${prefix}queue [pagenum] - shows the current queue
${prefix}join - <title|URL|subcommand> - plays the provided song
${prefix}skip - votes to skip the current song

  DJ:

${prefix}ok <title|URL|subcommand> - plays the provided song
${prefix}skip - skips the current song
${prefix}pause - pauses the current song
${prefix}skipt <position> - skips to the specified song
${prefix}stop - stops the current song and clears the queue
${prefix}vol [0-100] - sets or shows volume

  OwnerBot:

${prefix}setname - change name bot
${prefix}setavatar - change avatar bot
${prefix}ply - change playing bot
${prefix}wat - change watching bot
${prefix}lis - change LISTENING bot
${prefix}str - change streming bot
 **`)


     }
    });




client.on('message', message => {
    var prefix = "N";// تم برمجة الكود من قبل فارس

      if (!message.content.startsWith(prefix)) return;
      var args = message.content.split(' ').slice(1);
      var argresult = args.join(' ');
      if (message.author.id == 393435687594229761) return;

    if (message.content.startsWith(prefix + 'setname')) {
    if (message.author.id !== '393435687594229761') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
      client.user.setUsername(argresult).then
          message.channel.sendMessage(`**${argresult}** : تم تغير الأسم`)
      return message.reply("**لا تستطيع تغير الأسم الا بعد ساعتين**");
    } else

    if (message.content.startsWith(prefix + 'setavatar')) {
    if (message.author.id !== '393435687594229761') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **') //ايديك هنا
    client.user.setAvatar(argresult);
        message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
    }


// تم برمجة الكود من قبل فارس
     });

	const devs = ['393435687594229761']; //ايديك هنا
const adminprefix = "N";// البريفيكس الي تبيه لأوامر ساحب البوت
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);// تم برمجة الكود من قبل فارس
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else // تم برمجة الكود من قبل فارس
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }


});

// تم برمجة الكود من قبل فارس
// تم برمجة الكود من قبل فارس
