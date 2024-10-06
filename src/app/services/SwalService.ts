import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor(
  ) { }

  alertWithSuccess(message?: string) {
    Swal.fire(
      {
        title: 'Success',
        text: message,
        timer: 4000,
        icon: 'success',
        iconColor: '#a5dc86',
        confirmButtonText: 'Close',
      }
    );
  }

  alertWithError(message?: string) {
    Swal.fire(
      {
        title: 'Error',
        text:message,
        timer: 4000,
        icon: 'error',
        iconColor: '#D8000C',
        confirmButtonText: 'Close',
      }
    );
  }

  alertDelete(callback: Function, title?: string, text?: string, confirmText?: string, cancelText?: string, afterApproveTitle?: string, afterApproveText?: string) {
    Swal.fire({
      title: 'swal.Are you sure?',
      text: "swal.You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText:  'swal.Yes, delete it!',
      cancelButtonText: 'swal.Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire(
          'swal.Deleted!',
          'swal.Record has been deleted',
          'success'
        )
      }
    });
  }

  alertApproval(callback: Function, title?: string, text?: string, confirmText?: string, cancelText?: string, afterApproveTitle?: string, afterApproveText?: string) {
    Swal.fire({
      title: 'swal.Are you sure?',
      text: "swal.You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'swal.Yes, approve it!',
      cancelButtonText: 'swal.Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire(
          'swal.Approved!',
          'swal.Record has been approved',
          'success'
        )
      }
    });
  }

  alertComplete(callback: Function, title?: string, text?: string, confirmText?: string, cancelText?: string, afterApproveTitle?: string, afterApproveText?: string) {
    Swal.fire({
      title: 'swal.Are you sure?',
      text: "swal.You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'swal.Yes, complete it!',
      cancelButtonText: 'swal.Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire(
          'swal.Completed!',
          'swal.Record has been completed',
          'success'
        )
      }
    });
  }

}
