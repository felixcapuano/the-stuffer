const hit_data = [];
const throw_data = [];

const hit_len = 10;
for (let i = 0; i < hit_len; i++) {
    hit_data.push({
        id: i,
        type: ["smoke", "flash", "molotov"][Math.floor(Math.random() * 3)],
        lat: parseFloat(((Math.random() * 180) - 90).toFixed(2)),
        lng: parseFloat(((Math.random() * 360) - 180).toFixed(2)),
        map: "de_mirage",
        count: 1,
    });
}

const throw_len = 100;
for (let i = 0; i < throw_len; i++) {
    throw_data.push({
        id: i,
        hit_id: Math.floor(Math.random() * hit_len),
        lat: parseFloat(((Math.random() * 180) - 90).toFixed(2)),
        lng: parseFloat(((Math.random() * 360) - 180).toFixed(2)),
        type: "jumpthrow",
        url: "https://youtu.be/dpGrH8nlZ28?t=564",
        ticks64: true,
        ticks128: true,
        name: "un test",
        description: "je suis une description",
        validated: false,
        likes: 0,
        dislikes: 0,
        reported: [],
        count: 1,
    });
}

export { hit_data, throw_data };