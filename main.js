$(document).ready(function(){
	var template = Handlebars.compile($('#tracks-template').html());
	$(document).on('click','button', function(e){
		$('.tracks').empty()
		var q = $('input[name=search]').val()
		var url = `https://api.spotify.com/v1/search?q=${q}&type=track`
		$.ajax({
			method:'get',
			url: url
		}).done(function(data){
			$('.tracks').append(template({tracks:data.tracks.items}))
		}).fail(function(){
			console.log('unable to process request')
		})
	})
})