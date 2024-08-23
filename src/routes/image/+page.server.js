import fs from 'fs';
import path from 'path';

export const prerender = true;

function getSvgImagesFromDir(type) {
    const directory = path.join('static', type);
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.svg'));
    return files.map((file, index) => ({
        id: index + 1,
        src: `/${type}/${file}`
    }));
}

export async function load() {

    const facialHairImages = getSvgImagesFromDir('facial-hair');
    const hairstyleImages = getSvgImagesFromDir('head');
    const faceStyleImages = getSvgImagesFromDir('face');
    const accessoriesStyleImages = getSvgImagesFromDir('accessories');
    // Return the lists of images to the +page.svelte component
    return {
        facialHairImages,
        hairstyleImages,
        faceStyleImages,
        accessoriesStyleImages
    };
}
