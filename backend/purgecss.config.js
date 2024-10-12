// Dynamic import of the PurgeCSS and CleanCSS libraries
import { PurgeCSS } from "purgecss";
import CleanCSS from "clean-css";
import fs from "fs";

// Log the current working directory
console.log('Current working directory:', process.cwd());

// Run PurgeCSS for all HTML files in public_html and its subdirectories
const purgeCSSResults = await new PurgeCSS().purge({
  content: [
    './public_html/*.html',  // Top-level HTML
    './public_html/**/*.html',  // Subdirectories
    './public_html/**/**/*.html',  // Deeper subdirectories like partials
  ],
  css: [
    './public_html/assets/css/bootstrap.min.css',  // Bootstrap CSS
    './public_html/assets/css/style.css'  // Custom CSS
  ]
});

// Combine all purged CSS into one file
const combinedCSS = purgeCSSResults.map(result => result.css).join("\n");

// Minify the combined CSS using CleanCSS
const minifiedCSS = new CleanCSS().minify(combinedCSS).styles;

// Define the output path inside `public_html`
const outputFilePath = "./public_html/assets/css/purged.min.css";

// Write the minified CSS to the output file, overwriting it each time
fs.writeFileSync(outputFilePath, minifiedCSS, "utf8");

// Log confirmation
console.log(`Minified Purged CSS saved to: ${outputFilePath}`);
