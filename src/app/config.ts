let envs = [];
let env = "development";
// const baseUrl = ''
// const baseMediaUrl = ''
envs['production'] = {
    baseApiUrl: 'https://admin.triviapost.in:5000/api/',
    baseMediaUrl: 'https://admin.triviapost.in/server/',
    // isvisited: false,
    // counter: 0,
}
envs['development'] = {
    baseApiUrl: "http://192.168.1.144:3000/api",
    baseMediaUrl: "http://192.168.1.144:3000/andco_server(final)/",
    // isvisited: false,
    // counter: 0,
}

envs['testing'] = {
    baseApiUrl: "https://test.andcowith.me:9001/api",
    // baseMediaUrl: "https://test.andcowith.me:3001/",
    // isvisited: false,
    // counter: 0,
}

export const config = envs[env];
