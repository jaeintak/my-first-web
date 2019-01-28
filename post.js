$(function(){
	$.ajax({
		type: 'GET',
		url: '/getdata',
		success: function(data){
			$.each(data, function(i, item){
				$('#user').append('<li>User Name: '+item.name + '<button>Edit</button>'
				+ '<button>Delete</button>'+'<br>'+ 'Date: '+item.date+'<br>'+
					'Content: '+item.content+ '<br>'+ '</li>');
			});
		}
	});

	/*$('.:input').on('click', function(){
		alert('wow');
	})*/

	/*$('#add').on('click', function(){
		var nameSchema = {
				name: $('#idcontent').val()
			};

		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: '/postdata',
			data: JSON.stringify(nameSchema),
			dataType: 'json',
			success: function(newUser){
				console.log('please say something!');
				$('#user').append('<li>name: '+newUser.name+'</li>');

			},
			error: function(){
				alert('error saving user');
			}
		});
	});*/
});