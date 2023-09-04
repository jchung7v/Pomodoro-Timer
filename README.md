I have not considered Service-Worker from the beginning. This was a fatal mistake. I had to change lots of codes because I forgot the fact that the timer should be running in the background indenpendently, as long as the user uses Chrome browser.

Now, I have to implement service-worker.