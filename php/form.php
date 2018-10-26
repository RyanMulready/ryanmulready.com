<?php	
if( isset( $_POST["submit"] ) ) {

	// Email Recepient for Enquiry Form
	$ToEmail = 'nope@no.com';

	$EmailSubject = 'Inquiry from ' .$_POST["name"];
	
	$mailheader = "From: " .$_POST["email"]. "\r\n";
	$mailheader .= "Reply-To: " .$_POST["email"]. "\r\n";
	$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n";
	$MESSAGE_BODY = "<strong>Name:</strong> " .$_POST["name"]. "<br>";
	$MESSAGE_BODY .= "<strong>Email:</strong> " .$_POST["email"]. "<br>";
	$MESSAGE_BODY .= "<strong>Message:</strong> " .nl2br($_POST["comments"]);

	mail($ToEmail, $EmailSubject, $MESSAGE_BODY, $mailheader) or die ("Failure"); 
	echo "Your mail has been sent successfuly ! Thank you for your feedback";
}
?>
