import fs from 'node:fs';
import path from 'node:path';
import {glob} from 'glob';
import _ from 'lodash';

// Paths
const TSX_FILES_PATTERN = './src/**/*.tsx'; // Adjust this pattern if needed
const TRANSLATIONS_FILE = './public/locales/en/translations.json';

// Regex to match t('string')
const T_FUNCTION_REGEX = /t\(['"](.*?)['"]\)/g;

// Function to replace underscores with spaces in a string
function replaceUnderscoresWithSpaces(value: string): string {
  return value.replace(/_/g, ' '); // Replace underscores with spaces
}

// Function to extract strings from a file
function extractStringsFromFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = T_FUNCTION_REGEX.exec(content)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

// Function to update translations file
function updateTranslationsFile(newStrings: string[]): void {
  // Read existing translations
  let translations: Record<string, string> = {};
  if (fs.existsSync(TRANSLATIONS_FILE)) {
    translations = JSON.parse(fs.readFileSync(TRANSLATIONS_FILE, 'utf8'));
  }

  // Add new strings to translations
  newStrings.forEach((string) => {
    if (!translations[string]) {
      // Replace underscores with spaces in the value
      translations[string] = replaceUnderscoresWithSpaces(string);
    }
  });

  // Sort translations alphabetically
  translations = _.fromPairs(_.toPairs(translations).sort());

  // Write updated translations back to file
  fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify(translations, null, 2));
  console.log(`Updated ${TRANSLATIONS_FILE} with ${newStrings.length} new strings.`);
}

// Main function
function main(): void {
  // Find all .tsx files
  const tsxFiles: string[] = glob.sync(TSX_FILES_PATTERN);

  // Extract strings from all files
  const allStrings: string[] = [];
  tsxFiles.forEach((file) => {
    const strings = extractStringsFromFile(file);
    allStrings.push(...strings);
  });

  // Remove duplicates
  const uniqueStrings: string[] = [...new Set(allStrings)];

  // Update translations file
  updateTranslationsFile(uniqueStrings);
}

// Run the script
main();