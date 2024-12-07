import { Firestore } from "@google-cloud/firestore";

async function storeData(data: any, id: string) {
	const firestore = new Firestore();
	const docRef = firestore.collection("predictions").doc(id);
	await docRef.set(data);
}

export default storeData;
