import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

export const newOrder = functions.https.onRequest(async (req, resp) => {
  const orderId = req.get("orderId");
  if (!orderId) {
    resp.status(422).send(JSON.stringify({
      error: "missing order id",
    }));

    return;
  }

  await findAndNotifyDriver(orderId);

  resp.status(204);
});

const findAndNotifyDriver = async (orderId: string) => {
  const q = await firebase.firestore()
      .collection("/drivers")
      .where("status", "==", "available")
      .limit(1)
      .get();

  // TODO: sort list using calculateCrowDistance

  const driver = q.docs[0];

  if (!driver) {
    console.error("Could not find driver");
    return;
  }

  console.log("findAndNotifyDriver: found driver", driver);

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

  await firebase.firestore().doc(`/orders/${orderId}`).update({
    driverId: driver.ref.path,
  });
};
