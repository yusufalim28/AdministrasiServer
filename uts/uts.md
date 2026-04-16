1. Buat instance EC2 sesuai spesifikasi di atas.
2. Buat Elastic IP (EIP) dan Attach (hubungkan) EIP tersebut ke instance EC2 Anda secara permanen.
3. Konfigurasi Security Group dengan ketat sesuai aturan di atas
  - Web Server: Menggunakan Nginx (Bukan Apache)
  ![alt text](<Screenshot 2026-04-16 165333.png>)
  ![alt text](<Screenshot 2026-04-16 165346.png>)
  - Monitoring: Wajib mengaktifkan Detailed CloudWatch Monitoring dan membuat 1 buah Alarm jika penggunaan CPU menyentuh >80%.
  ![alt text](<Screenshot 2026-04-16 170608.png>)
4. Konfigurasi Web Server
5. Gunakan aplikasi SFTP (seperti FileZilla atau WinSCP)
![alt text](<Screenshot 2026-04-16 171512.png>)
6. Pindahkan source code tersebut ke Document Root Nginx/Apache (biasanya di /var/www/html).
7. Tampilan nya
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)