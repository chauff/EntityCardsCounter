# Entity Cards Counter

A Firefox extension to quickly count the number of SERPs with(out) entity cards. 

Implemented for Google and DuckDuckGo.

Installation instructions for temporary add-ons can be found [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension).

Once the temporary add-on is installed, use Google/DuckDuckGo as usual. When the extension is triggered a small border appears around the SERP: `peachPuff` if an entity card was detected, `cornflowerBlue` otherwise. The web console shows off the total counts. The data is stored in local storage, **and is lost when the browser is restarted**.

*That doesn't seem very useful?* Right! Put together just to get an idea of how many SERPs contain an entity card during regular search sessions.