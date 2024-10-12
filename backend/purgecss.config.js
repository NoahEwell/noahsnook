// Dynamic import of the PurgeCSS and CleanCSS libraries
import { PurgeCSS } from "purgecss";
import CleanCSS from "clean-css";
import fs from "fs";

// Log the current working directory to verify path resolution
console.log('Current working directory:', process.cwd());

// Run PurgeCSS with relative paths for all HTML files in public_html and its subdirectories
const purgeCSSResults = await new PurgeCSS().purge({
  content: [
    './public_html/*.html',  // Target top-level HTML files (e.g., index.html)
    './public_html/**/*.html',  // Target second-level HTML files (e.g., resume/resume.html)
    './public_html/**/**/*.html',  // Target all HTML files in subdirectories and special cases like partials
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

// Define the correct output path
const outputDir = "./backend/purged_css";  // Adjusted relative path based on current directory
const outputFilePath = `${outputDir}/purged.min.css`;  // Save as purged.min.css

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the minified CSS to the output file, overwriting it each time
fs.writeFileSync(outputFilePath, minifiedCSS, "utf8");

// Log confirmation
console.log(`Minified Purged CSS saved to: ${outputFilePath}`);
