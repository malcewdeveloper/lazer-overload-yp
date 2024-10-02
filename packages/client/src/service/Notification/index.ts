import { TNotificationOpen } from "./type";

class NotificationClass {
    status: "default" | "denied" | "granted" = "default";

    constructor() {
        if ("Notification" in window) {
            Notification.requestPermission().then((res) => {
                this.status = res;
            });
        }
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
