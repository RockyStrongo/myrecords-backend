import getConnexion from '../db/getConnexion';

class Connexion {
    static get connexionInstance() {
        return getConnexion();
    }
}

export default Connexion