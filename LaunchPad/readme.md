# Projects

LaunchPad is a start page that you put on your hard drive, and you use it as your homepage and as your new-tab page.  It has the following benefits:
* It loads fast, because it's on your hard drive.
* Not dependent on any web resources.  Written entirely in vanilla JavaScript.
* You control what goes on your web page's start page.
* You can launch the page when you're offline, and the whole thing loads without errors.  

# Setup

Just drop this in a folder, then double-click on index.html.  Now go into your browser's settings and set your homepage.  If you want to set the new-tab page, you'll probably have to install a plugin and then tell the plugin to load up LaunchPad using
the local URL (i.e.: File://launchpad/index.html).

# Configuration

Configuration is easy (some minor programming required).  All the page content is controlled by /scripts/pageInit.js.  It should be pretty easy to figure out.  Content is broken up into side-tabs, where each side-tab has sections, and each section has links.  You can have two link types, one that is just an image (which is sized to fit in 170x100 pixels), or you can have a thumbnail icon with up to four links on the right side.


