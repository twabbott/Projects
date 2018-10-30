with (siteMap.createTab("Main", true)) {
    with (createSection("Popular")) {
        addItem("Wikipedia", "wikipedia.png", "https://en.wikipedia.org");
        addItem("Merriam Webster", "mw.png", "https://www.merriam-webster.com");
        addItem("Netflix", "netflix.png", "https://www.netflix.com");
        addItem("Amazon", "amazon.jpeg", "https://www.amazon.com");
        addItem("Pluralsight", "pluralsight.png", "https://www.pluralsight.com");
    }
    with (createSection("Social Media")) {
        addItem("Faceook", "facebook.svg", "https://www.facebook.com");
        addItem("Nextdoor", "nextdoor.png", "https://www.nextdoor.com");
        addItem("Twitter", "twitter.jpeg", "https://www.twitter.com");
        addItem("LinkedIn", "linkedin.jpg", "https://www.linkedin.com");
        addItem("YouTube", "youtube.png", "https://www.youtube.com");
        addItem("Instagram", "instagram.png", "https://www.instagram.com");
        addItem("Pinterest", "pinterest.png", "https://www.pinterest.com/");
    }
    with (createSection("School Links")) {
        with (addItemWithMenu("UVU",  "wolverines.jpg", "UVU Logo", "https://www.uvu.edu")) {
            addMenuItem("Canvas Login", "https://uvu.instructure.com");
            addMenuItem("myUVU", "https://my.uvu.edu/");
        }
        with (addItemWithMenu("BYU", "cougars.png", "BYU Logo", "https://www.byu.edu")) {
            addMenuItem("Learning Suite", "https://learningsuite.byu.edu");
            addMenuItem("Testing Center", "https://testing.byu.edu");
        }
    }
}

with (siteMap.createTab("Reading")) {
    with (createSection("News")) {
        addItem("CNN", "cnn.svg", "https://cnn.com");
        addItem("Fox News", "fox-news.png", "https://www.foxnews.com/");
    }
    with (createSection("Tech Blogs")) {
        addItem("Ars Technica", "ars-technica.svg", "https://www.arstechnica.com");
        addItem("The Verge", "the-verge.png", "https://www.theverge.com");
        addItem("c|net", "cnet.png", "https://www.cnet.com");
        addItem("Wired", "wired.svg", "https://www.wired.com");
        addItem("Phys.org", "phys-org.jpg", "https://phys.org");
        addItem("Science Alert", "science-alert.png", "https://www.sciencealert.com");
        addItem("Space.com", "space-com.png", "https://www.space.com");
    }
}
