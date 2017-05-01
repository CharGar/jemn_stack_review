var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );

// globals
var port = 3456;

// mongoose
mongoose.connect( 'localhost:/27017/tauPets' );
// our schema
var albumSchema = mongoose.Schema({
  name: String,
  artist: String,
  releaseYear: Number,
  imageUrl: String
}); // end schema

// model
var album = mongoose.model( 'album', albumSchema );

//uses
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'public' ) );

//spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); //end server up

app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); //end base get

app.get( '/albums', function( req, res ){
  album.find().then( function( data ){
    res.send( data );
  }); // end find.then
}); //end get albums

app.post( '/albums', function( req, res ){
  console.log( 'in albums post:', req.body );
  var newAlbum = album( req.body );
  newAlbum.save().then( function(){
    res.send( 200 );
  }); //end save.then
}); //end post albums

app.delete( '/albums', function( req, res ){
  console.log( 'in delete albums route' );
  album.remove( { _id: req.body.id }, function(err) {
    if ( err ) {
      res.send( 400 );
    } //end Error
    else {
      res.send( 200 )
    } // end no error
  }); //end album remove
}); //end delete album
