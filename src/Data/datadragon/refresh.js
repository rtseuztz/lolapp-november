const fs = require('fs');
const writeFileSync = fs.writeFileSync;

async function refresh() {
    const version = await getVersion();
    const promises = [];
    promises.push(getChampions(version));
    // promises.push(getItems(version));
    // promises.push(getProfileIcons(version));
    // promises.push(getSplashSquare(version));

    await Promise.all(promises);
}

async function getVersion() {
    const versionURL = "https://ddragon.leagueoflegends.com/api/versions.json";
    const versionJSON = await (await fetch(versionURL)).json();
    const version = versionJSON[0];
    return version;
}

async function getChampions(version) {
    const championsURL = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
    const championsJSON = await (await (fetch(championsURL))).json();
    const championsList = Object.keys(championsJSON.data);
    // Converts the array to an object with the ... (spread)
    const championsObj = { ...championsList };
    await writeFileSync("./champions.json", JSON.stringify(championsObj));
    const championNames = Object.keys(championsObj).map(id => championsObj[id]);
    for (let i = 0; i < championNames.length; i++) {
        let championIconURL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championNames[i]}.png`;
        let championIconResponse = await fetch(championIconURL);
        let arrayBuffer = await championIconResponse.arrayBuffer();
        let championIconData = Buffer.from(arrayBuffer);
        let championIconPath = `../../../public/champions/${championNames[i]}.png`;
        await writeFileSync(championIconPath, championIconData);
    }
}

async function getItems(version) {
    const itemsURL = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`;
    const itemsJSON = await (await fetch(itemsURL)).json();
    await writeFileSync("./items.json", JSON.stringify(itemsJSON));
}
async function getProfileIcons(version) {
    const profileIconsURL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/profileicon.json`;
    const profileIconsJSON = await (await fetch(profileIconsURL)).json();
    await writeFileSync("./profileIcons.json", JSON.stringify(profileIconsJSON));
    let keys = Object.keys(profileIconsJSON.data);
    for (let i = 0; i < keys.length; i++) {
        let profileIcon = profileIconsJSON.data[keys[i]];
        let profileIconURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIcon.image.full}`;
        let profileIconResponse = await fetch(profileIconURL);
        let arrayBuffer = await profileIconResponse.arrayBuffer();
        let profileIconData = Buffer.from(arrayBuffer);
        let profileIconPath = `../../../public/profileIcons/${profileIcon.image.full}`;
        await writeFileSync(profileIconPath, profileIconData);
    }
}
async function getSplashSquare(version) {
    const splashSquareURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;
    const splashSquareResponse = await fetch(splashSquareURL);
    const splashSquareData = splashSquareResponse;
    const championNames = Object.keys(splashSquareData);

    for (const championName of championNames) {
        const championData = splashSquareData[championName];
        const championImageURL = `${splashSquareURL}/${championData.image.full}`;
        const imageResponse = await fetch(championImageURL, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(imageResponse, 'binary');
        const imagePath = `./public/champions/${championData.image.full}`;
        await writeFileSync(imagePath, imageData);
    }
}

refresh();
