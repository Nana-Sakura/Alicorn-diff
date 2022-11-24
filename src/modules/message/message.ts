import nodeNotifier from "node-notifier";
import noti from "node-notifier";/*
interface notiobj {
    title: string,
    subtitle: string,
    message: string,
    icon: string,
    contentImage: string,
    sound: string,
    wait: boolean
}*/
export default (a: nodeNotifier.Notification) => {
    noti.notify(a);
}