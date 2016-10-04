var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'SPGnRr_OUkAAAAAAAAAACLgi-OXWkkjfDHcCpvE5rnf3grlZ_3N36W2pB_EvFTRY' });
 dbx.filesListFolder({ path: '/RagusaBot/images' })
   .then(function (response) {
     var rand = response.entries[Math.floor(Math.random() * response.entries.length)];
     dbx.filesGetTemporaryLink({ path: rand.path_display }).then(function (res) {
       console.log(res)
     }).catch(function (err) {
       console.log(err)
     })
   })
   .catch(function (err) {
     console.log(err);
   });
