import { ToastService } from 'src/app/service/toast/toast.service';
import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalr.HubConnection;

  constructor(
    private toastSV: ToastService
  ) {
    const token = localStorage.getItem("AccessToken") ?? "";
    this.hubConnection = new signalr.HubConnectionBuilder()
      .withUrl("https://localhost:5001/notification", {
        skipNegotiation: true,
        transport: signalr.HttpTransportType.WebSockets,
        accessTokenFactory: () => token
      })
      .configureLogging(signalr.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("error:" + err));
  }

  addListener() {
    this.hubConnection.on("notify", (data) => {
      this.handleNotifyResponse(data);
    })
  }

  disconnect() {
    this.hubConnection.off("notify");
    this.hubConnection.stop();
  }

  askServer(data: any) {
    var param = {
      AssignedUserID: data.AssignedUserID,
      TaskCode: data.TaskCode
    }
    this.hubConnection.invoke("AskServer", param)
      .catch(err => {
        console.log(err);
      });
  }

  handleNotifyResponse(data: any) {
    switch(data.EventName) {
      case "REMIND_WORK":
        const msg = `The task ${data.TaskCode} assigned to you is due in ${data.MinuteLeft ?? 10} minutes!`
        this.toastSV.showWarning(msg, "Dealine task", {
          timeOut: 8000,
          progressBar: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right'
        });
        break;
      case "ASSIGN_TASK":
        this.toastSV.showWarning(data.Content, "Assign task", {
          timeOut: 8000,
          progressBar: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right'
        });
        break;
    }
  }
}
