import { account, ID } from '../lib/appwrite';
import { getProfilePicture, uploadProfilePicture } from './buckets/picturesService';
import { createUserDocument, getUserDocument } from './databases/users';

/**
 * Inscription complète d'un utilisateur
 * @param {Object} credentials 
 * @param {File} [profileImage] 
 * @returns {Promise<Object>}
 */
export async function createUser(email, password, name , profileImage = null) {
    try {
        // 1. Création du compte Auth
        const authAccount = await account.create(ID, email, password, name);
        
        // 2. Upload de l'image si fournie
        let profileImageId = null;
        if (profileImage) {
            profileImageId = await uploadProfilePicture(profileImage, authAccount.$id);
        }

        // 3. Création du document utilisateur
        const userData = {
            name,
            email,
            profileImageId,
            createdAt: new Date().toISOString()
        };
        
        await createUserDocument(authAccount.$id, userData);

    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Connexion d'un utilisateur
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export async function loginWithEmail(email, password) {
    await account.createEmailPasswordSession(email, password);
    return await getCurrentUser();
}

/**
 * Récupère l'utilisateur actuellement connecté
 * @returns {Promise<Object|null>}
 */
export async function getCurrentUser() {
    try {
        const authAccount = await account.get();
        const userDocument = await getUserDocument(authAccount.$id);
        
        return {
            id: authAccount.$id,
            email: authAccount.email,
            name: authAccount.name,
            ...userDocument,
            profileImageUrl: getProfilePicture(userDocument.profileImageId)
        };
    } catch (error) {
        console.error('Erreur récupération utilisateur:', error);
        return null;
    }
}

/**
 * Déconnexion
 * @returns {Promise<void>}
 */
export async function logout() {
    await account.deleteSession('current');
}