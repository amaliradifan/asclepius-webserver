import { Firestore } from "@google-cloud/firestore";

export async function getData() {
    const firestore = new Firestore();
    const snapshot = await firestore.collection("predictions").get();
    const predictions = snapshot.docs.map((doc) => doc.data());
    return predictions;
}