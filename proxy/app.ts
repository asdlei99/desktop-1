import NativeMessage from './nativemessage';
import IPC from './ipc';

const args = process.argv.slice(2);

class Proxy {
    private ipc: IPC;
    private nativeMessage: NativeMessage;

    constructor() {
        this.ipc = new IPC();
        this.nativeMessage = new NativeMessage(this.ipc);
    }

    run() {
        this.ipc.connect();
        this.nativeMessage.listen();
        
        this.ipc.onMessage = this.nativeMessage.send;
    }
}

const proxy = new Proxy();
proxy.run();