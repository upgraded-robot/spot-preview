$(document).ready(function(){
	var template = Handlebars.compile($('#tracks-template').html());
	$('button').on('click', function(e){
		console.log('hey')
		e.preventDefault()
		var q = 'muse'
		var url = `https://api.spotify.com/v1/search?q=${q}&type=track`;
		$.ajax({
			method:'get',
			url: url
		}).done(function(data){
			console.log(data.tracks.items)
			$('.tracks').append(template({tracks:data.tracks.items}))
		}).fail(function(){
			console.log('unable to process request')
		})
	})
})