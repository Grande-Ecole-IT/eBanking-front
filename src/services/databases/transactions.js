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
 * Récupère les transactions d'un expéditeur particulier
 * @param {string} senderId - ID de l'expéditeur
 * @returns {Promise<Array<Object>>}
 */
export async function getTransactionsBySender(senderId) {
    return await databases.listDocuments(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        [['sender', '=', senderId]]
    );
}
