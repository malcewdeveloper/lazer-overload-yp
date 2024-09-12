import { TNotificationOpen } from "./type";

class NotificationClass {
    status: NotificationPermission = "default";

    constructor() {
        if (!("Notification" in window)) {
            console.log("This browser does not support notifications.");
        }

        Notification.requestPermission().then((res) => {
            this.status = res;
        });
    }

    open = ({ title, body, icon }: TNotificationOpen) => {
        if (this.status !== "granted") return;

        const noty = new Notification(title, {
            body,
            icon,
        });

        setTimeout(() => noty.close(), 10 * 1000);
    };
}

export default new NotificationClass();
