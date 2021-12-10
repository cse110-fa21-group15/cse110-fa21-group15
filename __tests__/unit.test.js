import {searchForKey, getUrl, getOrganization, convertTime} from "../source/assets/scripts/RecipeCard.js";

// check jest is working
test('basic add test', () => {
    expect(1+2).toBe(3);
}); 

let testRecipeData = {
    "@graph": [
        {
            "@type": "Question",
            "text": "What's your favorite type of cookie?",
            "suggestedAnswer": [
                {
                    "@type": "Answer",
                    "text": "Sugar cookie."
                },
                {
                    "@type": "Answer",
                    "text": "Chocolate chip cookie."
                }
            ]
        }
    ],
    "@context": "http://schema.org",
    "url": "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/",
    "publisher": {
        "@type": "Organization",
        "name": "Delish",
        "logo": {
            "@type": "ImageObject",
            "url": "https://assets.hearstapps.com/sites/delish/assets/images/logos/logo-jsonld.58eed96.png",
            "width": 219,
            "height": 60
        }
    },
    "@type": "Recipe",
    "author": {
        "name": "Makinze Gore",
        "@type": "Person"
    },
    "datePublished": "2019-08-23T00:38:05.323880Z",
    "headline": "Spooky Ghost Cookies",
    "image": {
        "@type": "ImageObject",
        "height": 1267,
        "thumbnail": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg?crop=0.668xw:1.00xh;0.160xw,0&resize=100:*",
        "url": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg",
        "width": 1900
    },
    "mainEntityOfPage": {
        "@id": "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/",
        "@type": "WebPage"
    },
    "thumbnailUrl": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg?crop=0.668xw:1.00xh;0.160xw,0&resize=100:*",
    "isAccessibleForFree": "False",
    "hasPart": [
        {
            "@type": "WebPageElement",
            "isAccessibleForFree": "False",
            "cssSelector": ".content-container"
        }
    ],
    "name": "Spooky Ghost Cookies",
    "prepTime": "PT10M",
    "cookTime": "PT0S",
    "totalTime": "PT2H",
    "recipeIngredient": [
        "3 cups all-purpose flour, plus more for surface",
        "1 tsp. baking powder",
        "1/2 tsp. kosher salt",
        "1 cups (2 sticks)&nbsp;butter, softened",
        "1 cups granulated sugar",
        "1 large egg",
        "1 tbsp. milk",
        "1 tsp. pure vanilla extract&nbsp;",
        "3 cups powdered sugar",
        "1/4 cups light corn syrup",
        "1/4 cups milk, plus more for thinning",
        "1/4 tsp. almond (or vanilla)&nbsp;extract",
        "Black food coloring"
    ],
    "recipeInstructions": "In a large bowl, whisk together flour, baking powder, and salt.&nbsp; In another large bowl, beat butter and sugar together. Add egg, milk, and vanilla and beat until combined, then add flour mixture gradually until just combined. Shape into a disk and wrap in plastic. Refrigerate 1 hour. When ready to roll, preheat oven to 350º and line two large baking sheets with parchment.&nbsp;Lightly flour a clean work surface and roll out dough until 1/8” thick. Using a ghost cookie cutter, cut out cookies. Re-roll scraps and cut out more cookies.&nbsp;Transfer to prepared baking sheets and freeze for 10 minutes. Bake until edges are lightly golden, 8 to 10 minutes. Place on a wire cooling rack and let cool completely.&nbsp; Meanwhile, make icing:&nbsp;In a medium bowl, combine powdered sugar, corn syrup, milk, and almond extract.&nbsp; Place about 1/4 of icing into a small bowl and dye black with black food coloring.&nbsp; Place about half the&nbsp;white icing in a piping bag fitted with a small round tip and pipe edges around cookies.&nbsp;&nbsp; Thin remaining white icing by adding 1 teaspoon milk at a time until icing runs easily on cookies, but isn't water thin. Place icing in another piping bag with a small round tip and fill in centers of cookies. Use a toothpick to pop any air bubbles and to spread icing to help fill any gaps. Let cookies dry until icing is set, 15 minutes.&nbsp; Place black icing in a piping bag with a small round tip and pipe eyes and mouths onto cookies.&nbsp;",
    "video": {
        "@type": "VideoObject",
        "contentUrl": "https://streaming.hearstdigitalstudios.com/bd452b54-dc1f-4f06-b139-feb518142277/video_rover_16x9_1080p_hd_1574691121_26638.mp4",
        "description": "Decorating sugar cookies is much easier than you think. Two different types of icings, a buttercream and a royal icing will give you beautiful results.",
        "duration": "PT3M",
        "embedUrl": "https://glimmer.hearstapps.com/?id=5d02b073-887b-437a-9bff-c461000753dd",
        "name": "Decorate Sugar Cookies Like A Pro This Holiday Season",
        "thumbnailUrl": "https://hips.hearstapps.com/hmg-prod/images/delish-sugar-cookies-048-1541789899.jpg",
        "uploadDate": "2018-12-11T14:27:03.526517Z"
    },
    "recipeCuisine": [],
    "recipeCategory": [
        "cocktail party",
        "dinner party",
        "Halloween",
        "dessert"
    ],
    "recipeYield": "24",
    "description": "These Ghost Cookies will be the cutest and spookiest part of your Halloween spread."
};

test('searchForKey Author Name Success Test', () => {
    expect(searchForKey(testRecipeData, 'author').name).toBe("Makinze Gore");
});

test('searchForKey Author Name Fail Test', () => {
    expect(searchForKey(testRecipeData, 'author').name).not.toBe("Kevin Hart");
});

test('searchForKey cookTime Success Test', () => {
    expect(searchForKey(testRecipeData, 'cookTime')).toBe("PT0S");
});

test('searchForKey cookTime Fail Test', () => {
    expect(searchForKey(testRecipeData, 'cookTime')).not.toBe("PT5S");
});

test('searchForKey headline Success Test', () => {
    expect(searchForKey(testRecipeData, 'headline')).toBe("Spooky Ghost Cookies");
});

test('searchForKey headline Fail Test', () => {
    expect(searchForKey(testRecipeData, 'headline')).not.toBe("Chicken Noodle Soup");
});

test('searchForKey prepTime Success Test', () => {
    expect(searchForKey(testRecipeData, 'prepTime')).toBe("PT10M");
});

test('searchForKey prepTime Fail Test', () => {
    expect(searchForKey(testRecipeData, 'prepTime')).not.toBe("PT5M");
});

test('searchForKey recipeYield Success Test', () => {
    expect(searchForKey(testRecipeData, 'recipeYield')).toBe("24");
});

test('searchForKey recipeYield Fail Test', () => {
    expect(searchForKey(testRecipeData, 'recipeYield')).not.toBe("34");
})

test('searchforkey thumbnailUrl Success Test', () => {
    expect(searchForKey(testRecipeData, 'thumbnailUrl')).toBe("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg?crop=0.668xw:1.00xh;0.160xw,0&resize=100:*");
});

test('searchforkey thumbnailUrl Fail Test', () => {
    expect(searchForKey(testRecipeData, 'thumbnailUrl')).not.toBe("https://google.com");
});

test('searchForKey url Success Test', () => {
    expect(searchForKey(testRecipeData, 'url')).toBe("https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/");
});

test('searchForKey url Fail Test', () => {
    expect(searchForKey(testRecipeData, 'url')).not.toBe("https://youtube.com");
});

test('getUrl Success Test' , () => {
    expect(getUrl(testRecipeData)).toBe("https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/");
});

test('getUrl Fail Test' , () => {
    expect(getUrl(testRecipeData)).not.toBe("https://geoguesser.com");
});

test('getOrganization Success Test', () => {
    expect(getOrganization(testRecipeData)).toBe("Delish");
});

test('getOrganization Fail Test', () => {
    expect(getOrganization(testRecipeData)).not.toBe("Google");
});

test('convertTime Success Test', () => {
    expect(convertTime(searchForKey(testRecipeData,"totalTime"))).toBe("2 hr");
});

test('convertTime Fail Test', () => {
    expect(convertTime(searchForKey(testRecipeData,"totalTime"))).not.toBe("1 hr");
});

