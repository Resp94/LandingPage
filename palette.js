import { Vibrant } from 'node-vibrant/node';

Vibrant.from('public/logo.png').getPalette()
    .then((palette) => {
        console.log('--- Vibrant Palette ---');
        if (palette.Vibrant) console.log(`Vibrant: ${palette.Vibrant.hex}`);
        if (palette.DarkVibrant) console.log(`Dark Vibrant: ${palette.DarkVibrant.hex}`);
        if (palette.LightVibrant) console.log(`Light Vibrant: ${palette.LightVibrant.hex}`);
        if (palette.Muted) console.log(`Muted: ${palette.Muted.hex}`);
        if (palette.DarkMuted) console.log(`Dark Muted: ${palette.DarkMuted.hex}`);
        if (palette.LightMuted) console.log(`Light Muted: ${palette.LightMuted.hex}`);
    })
    .catch((err) => console.error(err));
