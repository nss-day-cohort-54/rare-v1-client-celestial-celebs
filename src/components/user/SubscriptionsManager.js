export const getAllSubscriptions = () => {
  return fetch("http://localhost:8088/subscriptions").then((res) => res.json());
};

export const getSingleSubscription = (subscriptionId) => {
  return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`).then(
    (response) => response.json()
  );
};

export const createSubscription = (body) => {
  return fetch(`http://localhost:8088/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
