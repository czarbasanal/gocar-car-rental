import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(storageCollection: string, file: File): Promise<AngularFireUploadTask> {
    const filePath = `${storageCollection}/${encodeURIComponent(file.name)}`;
    const task: AngularFireUploadTask = this.storage.upload(filePath, file);

    await firstValueFrom(task.snapshotChanges());
    return task;
  }

  async generateFileURL(fileRef: AngularFireStorageReference): Promise<string> {
    try {
      const url = await firstValueFrom(fileRef.getDownloadURL());
      return url;
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw new Error('Failed to retrieve download URL');
    }
  }

  async delete(fileUrl: string): Promise<void> {
    const fileRef = this.storage.refFromURL(fileUrl);
    await firstValueFrom(fileRef.delete());
  }


}
