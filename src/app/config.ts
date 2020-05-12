let envs = [];
let env = "testing";
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
    baseMediaUrl: "http://localhost/andco-server-new/",
    pdfUrl: "http://localhost/andco-server-new/uploads/pdf/"
    // isvisited: false,
    // counter: 0,
}

envs['testing'] = {
    baseApiUrl: "https://test.andcowith.me:9001/api",
    pdfUrl: "https://test.andcowith.me:9001/uploads/pdf/",
    baseMediaUrl: "https://test.andcowith.me:9001/",
    // isvisited: false,
    // counter: 0,
}

export const config = envs[env];
