import { DATABASE_ID, databases } from "../../lib/appwrite";

const USER_COLLECTION_ID = "users"
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