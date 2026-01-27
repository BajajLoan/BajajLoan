export const initOneSignal = () => {
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({
      appId: "82c74ef4-3066-4099-a7b4-fb5873cbd59b",
      notifyButton: { enable: false },
      allowLocalhostAsSecureOrigin: true, // VITE + localhost
    });
  });
};

export const loginOneSignalUser = (userId) => {
  OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.login(userId.toString()); // 🔥 MUST
  });
};

export const logoutOneSignalUser = () => {
  OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.logout();
  });
};

export const requestNotificationPermission = () => {
  OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.Notifications.requestPermission();
  });
};
