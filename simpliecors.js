// Copyright (C) 2012 Johannes Boyne & ARCHKOMM GmbH. All rights reserved.
// Johannes Boyne <johannes@boyne.de>
// www.archkomm.com
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// check if it is an Internet Explorer 8 abd XDomainRequest is available
if ($.browser.msie && window.hasOwnProperty('XDomainRequest')) {
	// rewrite jQuery's ajax function
	$.ajax = function(confObj) {
		console.log('AJAX:', confObj.url);
		
		// create XDR object 
		var xdr = new XDomainRequest(); 
		// error
		xdr.onerror	= function () {
			confObj.error(xdr, xdr.responseText, "XDR onerror")
		}
		// completly loaded
		xdr.onload	= function () {
			confObj.success(xdr.responseText, "", xdr)
		}

		// open connection with server using GET method
		xdr.open("get", confObj.url);
		
		// "send" // call request
		xdr.send();
	}
}