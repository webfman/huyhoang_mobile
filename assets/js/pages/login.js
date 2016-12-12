$(document).ready(function(){
	document.oncontextmenu = function () { return false; }
	/* ---------- Placeholder Fix for IE ---------- */
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-blue'
	});
});