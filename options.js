$(function(){
	$('#saveConfig').click(function() {
		var baseUrl = $('#base_url').val();
		var username = $('#username').val();
		var password = $('#password').val();
		var obj; 
		chrome.storage.local.set({'baseUrl' : baseUrl, 'username' : username, 'password': password}, function() {
			if (chrome.extension.lastError) {
				$('#errorMessage').text('Error saving data')
			} else {
				window.close()
			}
		});	
	});
});