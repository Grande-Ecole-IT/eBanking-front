import { DATABASE_ID, databases, ID } from "../../lib/appwrite";

const TRANSACTIONS_COLLECTION_ID = "transactions";

/**
 * Crée un document transaction
 * @param {string} sender - ID de l'expéditeur
 * @param {string} receiver - ID du destinataire 
 * @param {string} motif - Motif de la transaction
 * @param {number} montant - Montant de la transaction
 * @param {string} type - Type de transaction
 * @returns {Promise<Object>}
 */
export async function createTransaction(sender, receiver, motif, montant, type) {
    return await databases.createDocument(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        ID.unique(),
        {
            sender,
            receiver,
            motif,
            montant,
            type
        }
    );
}

/**
 * Récupère les transactions selon l'expéditeur et/ou le destinataire
 * @param {string} [senderId] - ID de l'expéditeur (optionnel)
 * @param {string} [receiverId] - ID du destinataire (optionnel) 
 * @returns {Promise<Array<Object>>}
 */
export async function getTransactions({senderId, receiverId} = {}) {
    const queries = [];
    
    if (senderId) {
        queries.push(['sender', '=', senderId]);
    }
    
    if (receiverId) {
        queries.push(['receiver', '=', receiverId]);
    }

    return await databases.listDocuments(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        queries.length > 0 ? queries : undefined
    );
}
