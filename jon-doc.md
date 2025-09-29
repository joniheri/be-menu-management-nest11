# System Requierement

- Node JS 22.x.x

# Sintaks

| Nest Sintak                                | Description                                   |
| ------------------------------------------ | --------------------------------------------- |
| nest -v                                    | untuk lihat versi nest                        |
| npm i -g @nestjs/cli                       | install nest-cli as global if not install yet |
| nest new <project-name>                    | make new project nest                         |
| nest generate module <modul-name>          | make module                                   |
| nest generate controller <controller-name> | make controller                               |
| nest generate service <controller-name>    | make service                                  |
| npx nest info                              | see info in project nest                      |

| NPM Sintak               | Keterangan                                   |
| ------------------------ | -------------------------------------------- |
| npm i --legacy-peer-deps | Install dependencies dengan legacy peer deps |

| NPX Sintak                                                                 | Keterangan                                                   |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| npx sequelize-cli init                                                     | Membuat folder dan file konfigurasi awal untuk sequelize-cli |
| npx sequelize-cli model:generate --name TableName --attributes name:string | Membuat/Generate file migration dan model                    |
| npx sequelize-cli db:migrate                                               | Jalankan migrasi                                             |

| Git Sintak                           | Keterangan                                                   |
| ------------------------------------ | ------------------------------------------------------------ |
| git init -b <nama-branch>            | Inisialisasi repository git baru dengan nama branch tertentu |
| git branch -D <nama-branch>          | Menghapus branch lokal secara paksa                          |
| git push origin --delete <nama_lama> | Menghapus branch di remote repository (GitHub/GitLab, dll)   |
| git branch -m <nama_baru>            | Mengganti nama branch saat ini                               |
