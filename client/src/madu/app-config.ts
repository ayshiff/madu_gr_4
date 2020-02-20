export class AppConfig {
    API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    ID_TOKEN: string | null = null;
    reloadUser: Function | null = null;
}
export default new AppConfig();
