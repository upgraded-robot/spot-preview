$(document).ready(function(){
	var template = Handlebars.compile($('#tracks-template').html()); //compile handlbars template
	$(document).on('keyup','input', function(e){
		if(e.keyCode == '13'){ //
			$('.tracks').empty() //remove previously found tracks
			$('.previous-search').detach() //remove previous search term
			var q = $('input[name=search]').val() //get search term from input
			var url = 'https://api.spotify.com/v1/search?q='+q+'&type=track' //spotify api endpoint
			// ajax call 
			$.ajax({ 
				method:'get',
				url: url
			}).done(function(data){
				//append the compiled template where tracks will be the tracks.items object of the ajax response
				$('.tracks').append(template({tracks:data.tracks.items}))
				//append div showing the searched keyword
				$('.tracks').prepend('<div class="previous-search">Displaying results for:'+q+'</div>') 
				//empty search input field
				$('input[name=search]').val('')
				$('.search').animate({"min-height":"30vh", "font-size":"10pt"}, 600)
			}).fail(function(err){
				console.log( err)
				$('.tracks').append('<div class="error">Unable to process request</div>')
			})
		}
	})
	$(document).on('focus', 'input', function(e){
		$('.search').animate({"min-height":"80vh", "font-size":"12pt"}, 1000)
	})
})