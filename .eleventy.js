const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src${src}`, {
    widths: [300, 800, null],
    formats: ["avif", "jpeg"],
    urlPath: "/images/",
    outputDir: "./dist/images/"
  });

  let imageAttributes = {
    alt,
    sizes,
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/css/");
	eleventyConfig.addPassthroughCopy("./src/fonts/");
	eleventyConfig.addWatchTarget("./src/css/");
	eleventyConfig.addPassthroughCopy("./src/images/");
	eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });

	eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
	return {
		dir: {
			input: "src",
			output: "dist",
			includes: "_includes",
			layouts: "_layouts",
		},
	};
}