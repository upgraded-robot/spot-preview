$(document).ready(function(){
	var template = Handlebars.compile($('#tracks-template').html());
	$(document).on('keyup','input', function(e){
		if(e.keyCode == '13'){
			$('.tracks').empty()
			$('.previous-search').detach()
			var q = $('input[name=search]').val()
			var url = `https://api.spotify.com/v1/search?q=${q}&type=track`
			$.ajax({
				method:'get',
				url: url
			}).done(function(data){
				$('.tracks').append(template({tracks:data.tracks.items}))
				$('.search-form').append(`<div class="previous-search">Displaying results for: ${q}</div>`)
				$('input[name=search]').val('')
				$('.search').animate({"min-height":"30vh", "font-size":"10pt"}, 500)
			}).fail(function(){
				console.log('unable to process request')
			})
		}
	})
	$(document).on('focus', 'input', function(e){
		$('.search').animate({"min-height":"80vh", "font-size":"12pt"}, 1000)
	})
})