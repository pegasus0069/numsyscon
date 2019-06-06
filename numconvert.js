var range = {
    2  : /^([-+]?)([01]*)(\.[01]*)?$/, //For Binary
    8  : /^([-+]?)([0-7]*)(\.[0-7]*)?$/, //For Octal
    10 : /^([-+]?)(\d*)(\.\d*)?$/, //For Decimal
    16 : /^([-+]?)([0-9a-f]*)(\.[0-9a-f]*)?$/i }; //For Hexadecimal

function numberOnInput(input) {
	var base = parseInt(input.name.substr(4));
	var s = input.value;
	// To allow 0x in front of hex numbers
	if (base == 16 && s.substr(0, 2) == '0x') {
		s = s.substr(2);
	}
	s = s.replace(/^ +| +$/g, '');

	var n;
	var matches = s.match(range[base]);
	if (!matches) {
	    n = NaN;
	} else {
		n = parseInt(matches[1] + '0' + matches[2], base);
	  if (matches[3] && matches[3].length >= 2) {
		  n += (matches[1] == '-' ? -1 : +1) * parseInt(matches[3].substr(1), base) / Math.pow(base, matches[3].length - 1);
    }
	}
	// Check for invalid characters!
	var bases = [2, 8, 10, 16];
	for (var i = 0; i < bases.length; i++) {
		if (bases[i] != base) {
			var output;
			if (isNaN(n)) {
				output = 'ভুল ইনপুট ভাই!';
			} else if (16.25.toString(16) == '10.4') {
				output = n.toString(bases[i]);
			} else {
				output = (n > 0 ? Math.floor(n) : Math.ceil(n)).toString(bases[i]);
				if (n % 1) {
					output += '.' + Math.round((Math.abs(n) % 1) * Math.pow(bases[i], 8)).toString(bases[i]);
					output = output.replace(/0+$/, '');
				}
			}
			document.getElementById('base' + bases[i]).value = output.toUpperCase();
        }
	}
}

window.onload = function() {
	var base10 = document.getElementById('base10');
	base10.value = 10;
	numberOnInput(base10);
}
