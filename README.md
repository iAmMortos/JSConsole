# JSConsole
A simple JavaScript console that envelops the standard console.log() function and writes to a dockable, GUI console on your HTML page for testing purposes.

To use the console, include this JavaScript code in your project, and call the `enableConsole()` function.  
There are a few optional parameters that can be added to the function as well:  
`enableConsole([width[,height[,fontSize]]]);`  
`width: the width of the console in pixels (default is 300px)`  
`height: the height of the console in pixels (default is 200px)`  
`fontSize: the size of the console's font in pixels (default is 10px)`

After you have called `enableConsole()`, any `console.log()` call will print its text content to the on-screen console before also sending it to the standard JavaScript console.

The console is transparent so that the objects behind it can still be seen.  
When the console is clicked, the click is also passed to the objects behind the console.

The console can be docked / undocked using the button.

The animations are accomplished using jQuery, which must be _added to your project separately_.
