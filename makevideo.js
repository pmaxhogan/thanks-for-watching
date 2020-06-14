const { spawn } = require('child_process');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const format = (str, obj) => str.replace(/{([\da-zA-Z_-]+)}/g, (match, key) => typeof obj[key] !== 'undefined' ? obj[key] : match);

const getTmpFilePrefix = () => path.join(os.tmpdir(), crypto.randomBytes(16).toString('hex'));

const writeMLTFile = async (title) => {
    const string = (await fs.readFile(path.join(__dirname, 'assets', 'project.template.mlt'))).toString();
    // https://en.wikipedia.org/wiki/Symlink_race
    // should be secure enough
    const renderedVideoPath = getTmpFilePrefix() + '.mp4';
    const outputFileText = format(string, {title, outFile: renderedVideoPath, basePath: path.join(__dirname, 'assets')});
    const mltFilePath = getTmpFilePrefix() + '.mlt';
    await fs.writeFile(mltFilePath, outputFileText);
    return {mltFilePath, renderedVideoPath};
};

const meltIt = path => new Promise(resolve => {
    let command = "melt";
    let args = [path];
    if(process.env.NODE_ENV === "production"){
        command = 'xvfb-run';
        args = ['-a', 'melt'];
    }
    spawn(command, args).on('close', () => resolve()).stderr.on('data', data => console.log(`stderr: ${data}`))
});

const makeVideo = async text => {
    console.log('writing mlt file');
    const {mltFilePath, renderedVideoPath} = await writeMLTFile(text);
    console.log('melting');
    await meltIt(mltFilePath);
    return renderedVideoPath;
};

module.exports = makeVideo;
