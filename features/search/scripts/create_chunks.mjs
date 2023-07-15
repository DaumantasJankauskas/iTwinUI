/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * This script is used to create the text chunks and also the code example chunks for the search index.
 * The output of this script are two files `text_chunks.json` and `code_chunks.json` in the `features/search/_data` folder.
 *
 * This can be run as a standalone script using `yarn create-chunks`
 * Or as part of the `yarn build` script, so that the chunks are always up-to-date.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { getPropsTableValuesFromTypesFile } from '../../../apps/website/src/utils/props_utils.mjs';

import { globby } from 'globby';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_FOLDER = path.resolve(
  `${__dirname}/../../../apps/website/src/pages/docs`,
);
const EXAMPLES_FOLDER = path.resolve(`${__dirname}/../../../examples`);
const OUTPUT_FOLDER = path.resolve(
  `${__dirname}/../../../features/search/_data`,
);

const getLines = (text) => {
  return text.split(/\r?\n/);
};

/**
 * Read the file at the given path
 * @param {string} path
 * @returns {Promise<string | null>} The file content or null if error reading file
 */
const readFile = async (path) => {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * Returns the value of the `field` in the frontmatter
 * @param {Array<string>} lines
 * @param {string} field
 * @returns {string | null} The value of the field or null if not found
 */
const getFieldFromFrontmatter = (lines, field) => {
  let i;

  for (i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Reached end of frontmatter
    if (line === '---') {
      break;
    }

    const parts = line.split(':').map((p) => p.trim());

    // Error in frontmatter format
    if (parts.length !== 2) {
      continue;
    }

    if (parts[0] === field) {
      return parts[1];
    }
  }

  return null;
};

/**
 * Returns an array of lines after formatting the fileContent
 * @param {string} fileContent
 * @returns {Promise<Array<string>>}
 */
const getFormattedFileLines = async (fileContent) => {
  /**
   * Replace the <PropsTable /> tag with the real props table value
   * @param {Array<string>} lines
   * @returns {Promise<Array<string>>}
   */
  const replacePropsTableWithRealProps = async (lines) => {
    /**
     * Replace `@itwin/itwinui-react` with the relative path in the provided `propsPath`
     * @param {string} propsPath
     * @returns {string}
     */
    const getRelativePath = (propsPath) => {
      const relativePath = propsPath.replace(
        '@itwin/itwinui-react',
        path.resolve(`${__dirname}/../../../packages/itwinui-react`), // relative from root of `website` workspace
      );

      return relativePath;
    };

    const replaceProps = async (lines) => {
      const newLines = [];

      for (const line of lines) {
        const lineTrim = line.trim();
        if (lineTrim.startsWith('<PropsTable') && lineTrim.endsWith('/>')) {
          // Capture the path
          const propsPathKeyMatches = lineTrim.match(
            /<PropsTable +path={frontmatter\.(.+)} +\/>/,
          );
          // If exactly 1 match is found (=== 2 because the first match is the whole string)
          if (propsPathKeyMatches && propsPathKeyMatches.length === 2) {
            const propsPathKey = propsPathKeyMatches[1];
            const propsPathValue = getFieldFromFrontmatter(
              lines,
              propsPathKey,
            ).slice(1, -1); // Slice to remove the leading and trailing single quotes

            const propTableValues = getPropsTableValuesFromTypesFile(
              getRelativePath(propsPathValue),
            );
            newLines.push(JSON.stringify(propTableValues));
          } else {
            newLines.push(line);
          }
        } else {
          newLines.push(line);
        }
      }

      return newLines;
    };

    const newLines = await replaceProps(lines);
    return newLines;
  };

  /**
   * Replace the <p>{frontmatter.description}</p> tag with the real description
   * @param {Array<string>} lines
   * @returns {Array<string>}
   */
  const replaceDescriptionTagWithRealDescription = (lines) => {
    const description = getFieldFromFrontmatter(lines, 'description');

    return lines.map((line) => {
      if (line.trim() === '<p>{frontmatter.description}</p>') {
        return description;
      }
      return line;
    });
  };

  let lines = getLines(fileContent);

  lines = await replacePropsTableWithRealProps(lines);
  lines = replaceDescriptionTagWithRealDescription(lines);

  return lines;
};

const removeUnnecessaryCode = async (lines) => {
  const removeFrontmatter = (lines) => {
    let i;

    // Assume i=0 always contains "---"
    for (i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        break;
      }
    }

    return lines.slice(i + 1);
  };

  const removeImports = (lines) => {
    return lines.filter((line) => !line.trim().startsWith('import'));
  };

  const removeAllLiveExamples = (lines) => {
    const newLines = [];
    let isInLiveExample = false;

    for (const line of lines) {
      const lineTrim = line.trim();
      if (lineTrim.startsWith('<LiveExample')) {
        isInLiveExample = true;
      }

      if (!isInLiveExample) {
        newLines.push(line);
      }

      if (lineTrim.startsWith('</LiveExample>')) {
        isInLiveExample = false;
      }
    }

    return newLines;
  };

  lines = removeFrontmatter(lines);
  lines = removeImports(lines);
  lines = removeAllLiveExamples(lines);

  return lines;
};

/**
 * Get the index objects for the given lines
 *
 * Sample input:
 * ```jsx
 * lines = [
 *  'Alert is an element',
 *  '## Appearance',
 *  'Alert should be concise',
 *  '### Informational',
 *  'Default style',
 *  '## Placement',
 *  'Either inline or sticky',
 * ]
 * title = 'Alert'
 * ```
 *
 * Sample output:
 * ```jsx
 * [
 *  {
 *    "header": ['Alert'],
 *    "content": 'Alert is an element',
 *  },
 *  {
 *    "header": ['Alert', 'Appearance'],
 *    "content": 'Alert should be concise',
 *  },
 *  {
 *    "header": ['Alert', 'Appearance', 'Informational'],
 *    "content": 'Default style',
 *  },
 *  {
 *    "header": ['Alert', 'Appearance', 'Placement'],
 *    "content": 'Either inline or sticky',
 *  },
 * ]
 * ```
 * Returns index objects for the given file
 * @param {string} filePath
 * @returns
 */
const getIndexObjects = async (filePath) => {
  // Read file
  const componentName = path.parse(filePath).name;
  const fileContent = await readFile(filePath);

  // Get tile, lines (formatted)
  let lines = await getFormattedFileLines(fileContent);
  const title = getFieldFromFrontmatter(lines, 'title');
  lines = await removeUnnecessaryCode(lines);

  const indexObjects = [];
  let currentHeading = [title];
  let buffer = [];

  const flushBuffer = () => {
    const pageLink = `/docs/${componentName}`;

    // TODO: Confirm if this is the right way to get headline link
    const headingLink =
      currentHeading.length > 1 // If headings exist apart from the title
        ? `#${currentHeading[currentHeading.length - 1]
            .toLowerCase()
            // Replace all spaces with one hyphen
            .replace(/ +/g, '-') // E.g. "`as`   prop" -> "`as`-prop"
            // Remove all non alphanumeric characters except hyphens
            .replace(/[^a-z0-9-]/g, '')}` // E.g. "`as`-prop" -> "as-prop"
        : '';
    const link = pageLink + headingLink;

    indexObjects.push({
      header: [...currentHeading],
      link: link,
      content: buffer
        .join(' ')
        .replace(/\n/g, ' ') // Since any \n could signify a new paragraph to ChatGPT (even through both sentences are under the same heading)
        .replace(/ +/g, ' ') // Reduce multiple spaces to just one space
        .trim(),
    });
    buffer = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith('#')) {
      // E.g. line = "## Appearance"

      // E.g header = "Appearance"
      const header = line.trim().replace(/#+ */g, '');
      // E.g. headerHashes = "##"
      const headerHashes = line.trim().match(/#+/g)[0];

      flushBuffer();

      // If same level or down one or more levels, pop stale headings
      while (headerHashes.length <= currentHeading.length) {
        currentHeading.pop();
      }

      currentHeading.push(header);
    } else {
      buffer.push(line);
    }
  }

  flushBuffer();

  return indexObjects;
};

const getExampleIndexObjects = async (filePath) => {
  // Read file
  const codeExampleTitle = path.parse(filePath).name;
  const fileContent = await readFile(filePath);

  let lines = getLines(fileContent);
  lines = lines.slice(4); // Remove first 4 copyright lines

  return [
    {
      codeExampleTitle: codeExampleTitle,
      codeExample: lines.join('\n'),
    },
  ];
};

/**
 * Get the index objects for the given file path
 * @param {string} filePath
 * @returns
 */
const getIndexObjectsForFile = async (filePath) => {
  const indexObjects = await getIndexObjects(filePath);
  return indexObjects;
};

const getDocsFiles = async () => {
  // Since globby only works with posix paths with only forward slashes
  const docsFolderPosix = path.posix.join(DOCS_FOLDER).replace(/\\/g, '/');
  const globPattern = `${docsFolderPosix}/**/*.mdx`;
  const files = await globby(globPattern);

  return files;
};

const getExampleFiles = async () => {
  // Since globby only works with posix paths with only forward slashes
  const docsFolderPosix = path.posix.join(EXAMPLES_FOLDER).replace(/\\/g, '/');
  const globPattern = `${docsFolderPosix}/**/*.tsx`;
  const files = await globby(globPattern);

  return files;
};

const main = async () => {
  const docFilePaths = await getDocsFiles();
  const exampleFilePaths = await getExampleFiles();

  const docsIndexObjects = [];
  const exampleIndexObjects = [];

  console.log(`Processing ${docFilePaths.length} docs files...`);
  for (const docFilePath of docFilePaths) {
    const indexObjectsForFile = await getIndexObjectsForFile(docFilePath);
    docsIndexObjects.push(...indexObjectsForFile);
    console.log(`Processed ${path.basename(docFilePath)}`);
  }

  console.log(`Processing ${exampleFilePaths.length} example files...`);
  for (const exampleFilePath of exampleFilePaths) {
    const exampleIndexObjectsForFile = await getExampleIndexObjects(
      exampleFilePath,
    );
    exampleIndexObjects.push(...exampleIndexObjectsForFile);
    console.log(`Processed ${path.basename(exampleFilePath)}`);
  }

  // Write docsIndexObjects to a json file called "docs_chunks.json"
  await fs.writeFile(
    path.join(OUTPUT_FOLDER, 'docs_chunks.json'),
    JSON.stringify(docsIndexObjects, null, 2),
  );

  // Write exampleIndexObjects to a json file called "example_chunks.json"
  await fs.writeFile(
    path.join(OUTPUT_FOLDER, 'example_chunks.json'),
    JSON.stringify(exampleIndexObjects, null, 2),
  );
};

main();