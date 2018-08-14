$(document).foundation();

$(document).ready(function(){
	scrollToForm();
	hideInterested();
	validateForm();
});

$(window).scroll(function(){
	hideInterested();
});

function scrollToForm(){
	$("#interested").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#sidebar").offset().top
	    }, 1000);
	});
}

function hideInterested(){
	var totalHeight = $('.hero').outerHeight() + $('#body').outerHeight();
	if ($(window).scrollTop() >= totalHeight - $(window).height()) {
		$('#interested').addClass('invisible');
	}else{
		$('#interested').removeClass('invisible');
	}
}

function showError(message){
	$('#error').css('display','block');
	$('#error').html(message);
}

// Validate form before sending
function validateForm(){
	$('#contact-form').find('#submit').click(function(event){
		event.preventDefault();

		var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		var email       = $('#email').val();
		var fName       = $('#fname').val();
		var lName       = $('#lname').val();
		var cName       = $('#cname').val();
		var phone       = $('#phone').val();
		var message     = $('#message').val();

		$('#contact-form input, #contact-form textarea').removeClass('invalid');

		if(fName === ''){
	  	showError('Please enter a first name');
	  	$('#fname').addClass('invalid');
	  	return false;
	  }else if(lName === ''){
	  	showError('Please enter a last name');
	  	$('#lname').addClass('invalid');
	  	return false;
	  }else if(cName === ''){
	  	showError('Please enter a company name');
	  	$('#cname').addClass('invalid');
	  	return false;
	  }else if(phone === ''){
	  	showError('Please enter a phone number');
	  	$('#phone').addClass('invalid');
	  	return false;
	  }else if (!emailFormat.test(email)) {
			showError('Please enter a valid email');
			$('#email').addClass('invalid');
			return false;
	  }else if (message === '') {
			showError('Please enter a message');
			$('#message').addClass('invalid');
			return false;
	  }else{
			sendFormData();
		}
	});
}

// Send form data, hide form, and display success message
function sendFormData(){
	$.ajax({
		type: 'POST',
		success: function(data){
			__ss_noform.push(['submit', null, '2e6e78f9-e62b-41a6-ab5d-b280cdbeaf8e']);

    	$('#contact-form, .sidebar h2').css('display','none');
    	$('.form-sticky').append('<h4 class="confirmation">Thank you! We have received your submission and will contact you shortly.</h4>');
		}

	});
}