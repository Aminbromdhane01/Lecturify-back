export default () => ({
    port: process.env.PORT,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET

});