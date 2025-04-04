import { storage } from "../../lib/appwrite";


const STORAGE_BUCKET_ID  = "profile_pic";
/**
 * Upload une image de profil
 * @param {File} imageFile - Le fichier image à uploader
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<string>} L'ID du fichier uploadé
 */
export async function uploadProfilePicture(imageFile, userId) {
    try {
        // Vérification du type de fichier
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(imageFile.type)) {
            throw new Error('Type de fichier non autorisé. Seuls JPEG, PNG et GIF sont acceptés.');
        }

        // Vérification de la taille (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (imageFile.size > maxSize) {
            throw new Error('La taille de l\'image ne doit pas dépasser 5MB.');
        }

        const result = await storage.createFile(
            "profile_pic",
            userId,
            imageFile,
        );
        return result.$id;
    } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image de profil:', error);
        throw error;
    }
}

/**
 * Récupère l'URL de l'image de profil
 * @param {string} fileId - ID du fichier
 * @param {number} [width=200] - Largeur de l'image
 * @param {number} [height=200] - Hauteur de l'image
 * @returns {string} URL de l'image
 */
export function getProfilePicture(fileId) {
    return storage.getFilePreview(
        STORAGE_BUCKET_ID,
        fileId
    );
}

/**
 * Supprime une image de profil
 * @param {string} fileId - ID du fichier
 * @returns {Promise<void>}
 */
export async function deleteProfilePicture(fileId) {
    try {
        await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image de profil:', error);
        throw error;
    }
}