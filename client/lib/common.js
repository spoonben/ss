// validation 
trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

isValidPassword = function(val) { 
   if (val.length > 6) {
   	return true;
   } else {
   	return false;
   }
}

usernameRegex = /^[a-zA-Z0-9.\-_$@*!]{3,22}$/;
