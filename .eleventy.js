module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData("IMRJ_URL",
    "http://www.inventariodosmonumentosrj.com.br/index.asp?iMENU=catalogo&iiCOD=");
  eleventyConfig.addGlobalData("WIKIDATA_URL",
    "https://www.wikidata.org/wiki/");

  eleventyConfig.addPassthroughCopy("assets");
};