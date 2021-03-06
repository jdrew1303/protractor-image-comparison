const chalk = require('chalk'),
    conventionalChangelog = require('conventional-changelog'),
    fs = require('fs'),
    path = require('path');

generateChangelog();

/**
 * Removes the / prefix in the tag compare URL.
 * @param {String} data
 * @returns {String} new content
 */
function fixSlashPrefixCompareUrls(data) {
    const compareUrlSlashPrefixNeedle = /\/http/g,
        compareUrlSlashPrefixReplacement = 'http';

    return data.replace(compareUrlSlashPrefixNeedle, compareUrlSlashPrefixReplacement);
}

function generateChangelog() {
    console.log(chalk.blue('Updating Changelog'));

    let data = '';
    const stream = conventionalChangelog({
        preset: 'angular',
        releaseCount: 0
    });

    stream.on('data', function (chunk) {
        data += chunk;
    });

    stream.on('end', function () {
        data = fixSlashPrefixCompareUrls(data);
        fs.writeFileSync(path.resolve(process.cwd(), 'CHANGELOG.md'), data);

        console.log(chalk.green('CHANGELOG.md is updated with the latest changes'));
    });
}