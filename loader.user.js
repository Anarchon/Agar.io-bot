// ==UserScript==
// @name        AposLoader
// @namespace   AposLoader
// @description Grabs latest versions of the bot scripts automatically.
// @include     http://agar.io/
// @version     1.36
// @grant       none
// @author      http://www.twitch.tv/apostolique
// ==/UserScript==

var aposLoaderVersion = 1.36;
var Account = "Anarchon";
var Branch = "beta";
var sha = "0f69175ed0525cb7ba681be2c2f7fe83ee8a0599";
function getLatestCommit() {
    window.jQuery.ajax({
            url: "https://api.github.com/repos/"+Account +"/Agar.io-bot/git/refs/heads/" + Branch,
            cache: false,
            dataType: "jsonp"
        }).done(function(data) {
            console.dir(data["data"])
            console.log("hmm: " + data["data"]["object"]["sha"]);
            sha = data["data"]["object"]["sha"];
            console.log ("acc: "+Account);
            window.jQuery.get('https://raw.githubusercontent.com/' + Account + '/Agar.io-bot/' + Branch +'/launcher.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
                var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
                latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));

                latestVersion = parseFloat(latestVersion + 0.0000);
                 console.log("Launcher Version: " + latestVersion);
                var script1 = "https://cdn.rawgit.com/" + Account + "/Agar.io-bot/" + sha + "/launcher.user.js";
                console.log("Script: " + script1);
                window.jQuery("body").append('<script type="text/javascript" src="' + script1 + '"></script>');
                
            });
            window.jQuery.get('https://raw.githubusercontent.com/' + Account + '/Agar.io-bot/'+ Branch + '/bot.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
                var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
                latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));

                latestVersion = parseFloat(latestVersion + 0.0000);
                console.log("Bot Version: " + latestVersion);
                var script2 = "https://cdn.rawgit.com/" + Account + "/Agar.io-bot/" + sha + "/bot.user.js";
                console.log("Script: " + script2);
                window.jQuery("body").append('<script type="text/javascript" src="' + script2 + '"></script>');
            });

            function update(prefix, name, url) {
                window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
                window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
                window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
                window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
                window.jQuery('#' + prefix + 'Link').on('click', function() {
                    window.jQuery("#" + prefix + "Dialog").hide();
                    window.jQuery("#" + prefix + "Dialog").remove();
                });
                window.jQuery("#" + prefix + "Dialog").show();
            }

            window.jQuery.get('https://raw.githubusercontent.com/' + Account + '/Agar.io-bot/' + Branch + '/loader.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
                var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
                latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));

                latestVersion = parseFloat(latestVersion + 0.0000);
                var myVersion = parseFloat(aposLoaderVersion + 0.0000);

                if (latestVersion > myVersion) {
                    update("aposLoader", "loader.user.js", "https://github.com/" + Account + "/Agar.io-bot/blob/" + Branch + "/loader.user.js/");
                }
                console.log('Current loader.user.js Version: ' + myVersion + " on Github: " + latestVersion);
            });
        }).fail(function() {});
}

getLatestCommit();
