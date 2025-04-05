import { DATABASE_ID, databases, Query } from "../../lib/appwrite";

const USER_COLLECTION_ID = "users";

/**
 * Crée un document utilisateur dans la base de données
 * @param {string} userId 
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
export async function createUserDocument(userId, userData) {
    return await databases.createDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId,
        userData
    );
}

/**
 * Récupère un document utilisateur
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
export async function getUserDocument(userId) {
    return await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId
    );
}

/**
 * Recherche des utilisateurs selon différents critères
 * @param {string} name - Nom à rechercher
 * @param {string} email - Email à rechercher
 * @returns {Promise<Array<Object>>}
 */
export async function searchUsers({name, email}) {
    const queries = [];
    
    if (name) {
        queries.push(Query.equal('name', name));
    }
    
    if (email) {
        queries.push(Query.equal('email', email));
    }

    return await databases.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID,
        queries.length > 0 ? queries : undefined
    );
}

/**
 * Récupère tous les utilisateurs
 * @returns {Promise<Array<Object>>}
 */
export async function getAllUsers() {
    return await databases.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID
    );
}


/**
 * Met à jour le solde d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @param {number} amount - Montant à ajouter (peut être négatif pour soustraire)
 * @returns {Promise<Object>} - Document utilisateur mis à jour
 */
export const updateUserBalance = async (userId, amount) => {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId,
        {
          solde: amount
        }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du solde:", error);
      throw error;
    }
  };
  