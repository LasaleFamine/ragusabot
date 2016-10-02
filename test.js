
var resolver = require('image-resolver')

resolver.register(new ImageResolver.FileExtension());
resolver.register(new ImageResolver.MimeType());
resolver.register(new ImageResolver.Opengraph());
resolver.register(new ImageResolver.Webpage());

resolver.resolve( "http://example.com/", function( result ){
    if ( result ) {
        console.log( result.image );
    } else {
        console.log( "No image found" );
    }
});
