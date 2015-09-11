// This function intercepts the console.log() calls and prints the output to the result pane to the right like a standard console instead of the hidden console.
function enableConsole(width, height, fontSize) {
    this.width = typeof width === 'undefined' ? 300 : width;
    this.height = typeof height === 'undefined' ? 200 : height;
    this.fontSize = typeof fontSize === 'undefined' ? 10 : fontSize;
    this.lineMax = 1000;
    this.opacity = 0.6;
    this.isHidden = false;
    this.buttonRightOffset = 0;
    this.scrollEnabled = false;
    var _self = this;
    
    var _body = $("body");
    
    var _console = $(document.createElement("div"));
    _console.css({
        "background-color": "black",
        "color": "white",
        "position": "fixed",
        "right": "0",
        "bottom": "0",
        "width": this.width + "px",
        "height": this.height + "px",
        "overflow": "auto",
        "padding": "10px",
        "font-family": '"Lucida Console", "Courier New", "Courier"',
        "font-size": this.fontSize + "px",
        "z-index": "999999",
        "pointer-events": "none",
        "opacity": this.opacity,
        "border-radius":"5px 0 0 0"
    });
    _body.append(_console);
    
    var _hideShowButton = $(document.createElement("div"));
    _hideShowButton.css({
        "color": "white",
        "text-align": "center",
        "width": "40px",
        "height": "40px",
        "background-color": "black",
        "opacity": this.opacity,
        "position": "fixed",
        "bottom": (this.height - 20 - 5) + "px",
        "right": (buttonRightOffset + 5) + "px",
        "border-radius": "50%",
        "font-size": "20px",
        "font-family": "sans-serif",
        "line-height": "35px",
        "user-select": "none",
        "cursor": "pointer",
        "overflow": "hidden",
        "z-index": "1000000"
    });
    _hideShowButton.text("\u2193");
    _hideShowButton.click(function()
    {
        if (_self.isHidden)
        {
            $(this).animate({"bottom": (_self.height - 20 - 5) + "px", "right": (_self.buttonRightOffset + 5) + "px"});
            $(_console).animate({"bottom": "0px"});
            $(this).text("\u2193");
        }
        else
        {
            $(this).animate({"bottom":"5px", "right": "5px"});
            $(_console).animate({"bottom": -(20 + _self.height) + "px"});
            $(this).text(">_");//\u2191");
        }
        _self.isHidden = !_self.isHidden;
    });
    
    _body.append(_hideShowButton);
    
    var oldLog = console.log;
    console.log = function (object) {
        var output = object === undefined ? "" : object.toString();
        output = output.replace(/ /g, "&nbsp;");
        while (output.search("\r\n") !== -1) output = output.replace("\r\n", "<br />");
        while (output.search('\n') !== -1) output = output.replace('\n', "<br />");
        while (output.search('\r') !== -1) output = output.replace('\r', "<br />");
        _console.append("<span class='consoleLine'>" + output + "</span><br />");
        while (_console.children().length > lineMax * 2)
            _console.children()[0].remove();
        _console.scrollTop(_console[0].scrollHeight);
        if (!_self.scrollEnabled && _console[0].scrollHeight > (_self.height + 20))
        {
            _self.scrollEnabled = true;
            _self.buttonRightOffset = 17;
            if (!_self.isHidden)
            	$(_hideShowButton).animate({"right": (_self.buttonRightOffset + 5) + "px"});
        }
        
        // Sends the message to the standard javascript console as well.
        oldLog.apply(console, arguments);
    };
}
