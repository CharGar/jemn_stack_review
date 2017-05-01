$( document ).ready( function(){
  console.log( 'JQ' );

  $( '#addAlbumButton' ).on( 'click', function(){
    var objectToSend = {
      artist: $( '#artistIn' ).val(),
      name: $( '#albumIn' ).val(),
      releaseYear: $( '#releaseYearIn' ).val(),
      imageUrl: $( '#imageUrlIn' ).val(),
    }; //end objectToSend
    $.ajax({
      url: '/albums',
      type: 'POST',
      data: objectToSend,
      success: function( response ){
        console.log( 'back from server with:', response );
        getAlbums();
        clearInputs();
      } // end success
    }); //end ajax
  }); // end addAlbumButton on click

  $( document ).on( 'click', '.removeButton', function(){
    var myId = $( this ).data( 'id' );
    console.log( 'removing:', myId );
    var objectToSend = {
      id: myId
    }; //end objectToSend
    $.ajax({
      url: '/albums',
      type: 'DELETE',
      data: objectToSend,
      success: function( response ){
        console.log( 'back from server with:', response );
        getAlbums();
      } //end success
    }); //end ajax
  }); //end document on click removeButton

  // start up
  getAlbums();
}); //end doc ready


var clearInputs = function(){
  console.log( 'in clearInputs' );
  $( '#artistIn' ).val( '' );
  $( '#albumIn' ).val( '' );
  $( '#releaseYearIn' ).val( '' );
  $( '#imageUrlIn' ).val( '' );
}; //end func

var getAlbums = function(){
  console.log( 'in getAlbums' );
  $.ajax({
    url: '/albums',
    type: 'GET',
    success: function( response ){
      console.log( 'back from server with:', response );
      updateDom( response );
    } //end success
  }); // end ajax
}; //end getAlbums

var updateDom = function( albums ){
  var outputDiv = $( '#outputDiv' );
  outputDiv.empty();
  for (var i = 0; i < albums.length; i++) {
    console.log( 'appending:', albums[i] );
    outputDiv.append( '<div class="col-sm-3 card"><img src="' + albums[i].imageUrl + '" width=100%><h3><strong>' + albums[i].artist + '</strong></h3><p>' + albums[i].name + '</p><p>(' + albums[i].releaseYear + ')</p><button class="removeButton btn btn-secondary" data-id="' + albums[i]._id + '">Remove</button></div>' );
  } //end for
}; // end func
