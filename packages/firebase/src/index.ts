import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

export const newOrder = functions.https.onRequest((req, resp) => {
  const orderId = req.get("orderId");
  if (!orderId) {
    resp.status(422).send(JSON.stringify({
      error: "missing order id",
    }));

    return;
  }

  findAndNotifyDriver(orderId);
});

const findAndNotifyDriver = async (orderId: string) => {
  const q = await firebase.firestore()
      .collection("/drivers")
      .where("status", "==", "available")
      .limit(1)
      .get();

  const driver = q.docs[0];

  if (!driver) {
    console.error("Could not find driver");
    return;
  }

  const notificationKey = driver.get("notificationKey") as string;
  if (!notificationKey) {
    console.error("Missing notificationKey", driver);
    return;
  }

  await firebase.messaging().sendToDeviceGroup(notificationKey, {
    notification: {
      title: "New pickup",
      body: "An order is ready for pickup",
    },
  });

  await firebase.firestore().doc(`/drivers/${driver.id}`).update({
    orderId,
  });

  await firebase.firestore().doc(`/orders/${orderId}`).update({
    driverId: driver.id,
  });
};
