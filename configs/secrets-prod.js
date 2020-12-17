// module.exports={
//     googleClientId:process.env.GOOGLE_CLIENT_ID,
//     googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
//     mongoDbURI:process.env.MONGODB_URI,
//     cookieKey:process.env.COOKIE_KEY
// }


const mongoDbUser='jeanpaulrustom';
const mongoDbPassword='Jeanpaul1999rLUFFY79153043';
const mongoDbDatabaseName='oauthpractice';

module.exports={
    googleClientID:"638014093776-ci5e6sugeiol5ra1md51dfsrvu8lo878.apps.googleusercontent.com",
    googleClientSecret:"Ox8Q61dzXnvNsQf3EmZPsxkt",
    mongoDbURI:`mongodb+srv://${mongoDbUser}:${mongoDbPassword}@jpcluster.lv3bz.mongodb.net/${mongoDbDatabaseName}?retryWrites=true&w=majority`,
    cookieKey:'igfdjkfdsilkfgxhgsdxc'
}