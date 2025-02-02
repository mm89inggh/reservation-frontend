import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification/notification.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers:[NotificationService]
})
export class NotificationsComponent implements OnInit {
  notificaciones: any[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(data => {
      this.notificaciones = data;
    });
  }
}