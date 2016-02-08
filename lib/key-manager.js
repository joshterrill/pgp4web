var openpgp = require('openpgp');
var $ = require("jquery");

window.generate = function() {
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var password = $("input[name='password']").val();
    var encryptionstrength = $("select[name='encryptionstrength']").val();

    var userId = name = " <" + email + ">";

    var options = {
        numBits: encryptionstrength,
        userId: userId,
        passphrase: password
    };

    openpgp.generateKeyPair(options).then(function(keypair) {
        // success
        var privkey = keypair.privateKeyArmored;
        var pubkey = keypair.publicKeyArmored;
        $(".generatedpublickey").html("<h2>Public Key</h2><pre>"+pubkey+"</pre>");
        $(".generatedprivatekey").html("<h2>Private Key</h2><pre>"+privkey+"</pre>");
        $(".generateButton").html("Generate");
    }).catch(function(error) {
        $(".generatedpublickey").html("<pre>"+error+"</pre>");
        $(".generateButton").html("Generate");
    });
}

window.encrypt = function() {
    var key = $(".recipientKey").val();
    var publicKey = openpgp.key.readArmored(key);
    var plaintTextMessage = $(".senderMessage").val();

    openpgp.encryptMessage(publicKey.keys, plaintTextMessage).then(function(pgpMessage) {
        $(".messageOutput").html(pgpMessage);
        $(".encryptButton").html("Encrypt");
    }).catch(function(error) {
        $(".messageOutput").html(error);
        $(".encryptButton").html("Encrypt");
    });
}

window.decrypt = function() {
    var key = $(".generateprivatekey").val();
    var privateKey = openpgp.key.readArmored(key).keys[0];
    privateKey.decrypt($(".privatePassword").val());

    var pgpMessage = $(".generatedencryptedmessage").val();
    pgpMessage = openpgp.message.readArmored(pgpMessage);

    openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
        $(".decryptedmessage").html(plaintext);
        $(".decryptButton").html("Decrypt");
    }).catch(function(error) {
        $(".decryptedmessage").html(error);
        $(".decryptButton").html("Decrypt");
    });
}