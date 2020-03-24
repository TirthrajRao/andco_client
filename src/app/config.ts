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
    baseApiUrl: "http://localhost:3000/api",
    baseMediaUrl: "http://localhost/andco-server/",
    // isvisited: false,
    // counter: 0,
}

envs['testing'] = {
    baseApiUrl: "https://test.andcowith.me:9001/api",
    baseMediaUrl: "https://test.andcowith.me:9001/server/",
    // isvisited: false,
    // counter: 0,
}

export const config = envs[env];
